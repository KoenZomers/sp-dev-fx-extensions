import * as React from 'react';
import * as ReactDom from 'react-dom';

import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';

import { escape } from '@microsoft/sp-lodash-subset';

import TenantGlobalNavBar from './components/TenantGlobalNavBar';
import { ITenantGlobalNavBarProps } from './components/ITenantGlobalNavBarProps';
import TenantGlobalFooterBar from './components/TenantGlobalFooterBar';
import { ITenantGlobalFooterBarProps } from './components/ITenantGlobalFooterBarProps';

import IMenuItem from './components/IMenuItem';
import styles from './AppCustomizer.module.scss';
import * as strings from 'GlobalNavigationApplicationCustomizerStrings';

const LOG_SOURCE: string = 'TenantGlobalNavBarApplicationCustomizer';
const NAV_TERMS_KEY: string = 'global-navigation-terms';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITenantGlobalNavBarApplicationCustomizerProperties {
  TopMenuItems?: string;
  BottomMenuItems?: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TenantGlobalNavBarApplicationCustomizer
  extends BaseApplicationCustomizer<ITenantGlobalNavBarApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;
  private _topMenuItems: IMenuItem[];
  private _bottomMenuItems: IMenuItem[];

  @override
  public async onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

    // Retrieve the menu items from the properties
    if(this.properties.TopMenuItems !== undefined && this.properties.TopMenuItems !== null && this.properties.TopMenuItems != "") {
      this._topMenuItems = JSON.parse(this.properties.TopMenuItems);
    }
    if(this.properties.BottomMenuItems !== undefined && this.properties.BottomMenuItems !== null && this.properties.BottomMenuItems != "") {
      this._bottomMenuItems = JSON.parse(this.properties.BottomMenuItems);
    }

    console.log(`TopMenu: ${this._topMenuItems}`);
    console.log(`BottomMenu: ${this._bottomMenuItems}`);

    // Call render method for generating the needed html elements
    this._renderPlaceHolders();

    return Promise.resolve<void>();
  }

  private _renderPlaceHolders(): void {

    // Handling the top placeholder
    if (!this._topPlaceholder) {
      this._topPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholder) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }

      if (this._topMenuItems != null && this._topMenuItems.length > 0) {
        const element: React.ReactElement<ITenantGlobalNavBarProps> = React.createElement(
          TenantGlobalNavBar,
          {
            menuItems: this._topMenuItems,
          }
        );

        ReactDom.render(element, this._topPlaceholder.domElement);
      }
    }

    // Handling the bottom placeholder
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Bottom,
          { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error('The expected placeholder (Bottom) was not found.');
        return;
      }

      if (this._bottomMenuItems != null && this._bottomMenuItems.length > 0) {
        const element: React.ReactElement<ITenantGlobalNavBarProps> = React.createElement(
          TenantGlobalFooterBar,
          {
            menuItems: this._bottomMenuItems,
          }
        );

        ReactDom.render(element, this._bottomPlaceholder.domElement);
      }
    }
  }

  private _onDispose(): void {
    console.log('[TenantGlobalNavBarApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}

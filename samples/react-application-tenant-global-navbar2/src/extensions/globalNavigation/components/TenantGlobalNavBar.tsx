import * as React from 'react';
import styles from '../AppCustomizer.module.scss';
import { ITenantGlobalNavBarProps } from './ITenantGlobalNavBarProps';
import { ITenantGlobalNavBarState } from './ITenantGlobalNavBarState';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

import IMenuItem from './IMenuItem';

export default class TenantGlobalNavBar extends React.Component<ITenantGlobalNavBarProps, ITenantGlobalNavBarState> {

  private projectMenuItem(menuItem: IMenuItem, itemType: ContextualMenuItemType) : IContextualMenuItem {
      return({
        key: menuItem.title,
        name: menuItem.title,
        itemType: itemType,
        iconProps: null,
        href: menuItem.url,
        subMenuProps: menuItem.subItems != undefined && menuItem.subItems.length > 0 ? 
            { items : menuItem.subItems.map((i) => { return(this.projectMenuItem(i, ContextualMenuItemType.Normal)); }) } 
            : null,
        isSubMenu: itemType != ContextualMenuItemType.Header,
      });
  }

  public render(): React.ReactElement<ITenantGlobalNavBarProps> {

    const commandBarItems: IContextualMenuItem[] = this.props.menuItems.map((i) => {
        return(this.projectMenuItem(i, ContextualMenuItemType.Header));
    });

    return (
      <div className={`ms-bgColor-neutralLighter ms-fontColor-white ${styles.app}`}>
        <div className={`ms-bgColor-neutralLighter ms-fontColor-white ${styles.top}`}>
            <CommandBar
            className={styles.commandBar}
            items={ commandBarItems }
            />
        </div>
      </div>
    );
  }
}

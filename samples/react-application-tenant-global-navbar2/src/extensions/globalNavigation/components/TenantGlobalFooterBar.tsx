import * as React from 'react';
import styles from '../AppCustomizer.module.scss';
import { ITenantGlobalFooterBarProps } from './ITenantGlobalFooterBarProps';
import { ITenantGlobalFooterBarState } from './ITenantGlobalFooterBarState';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem, ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';

import IMenuItem from './IMenuItem';

export default class TenantGlobalFooterBar extends React.Component<ITenantGlobalFooterBarProps, ITenantGlobalFooterBarState> {

  private projectMenuItem(menuItem: IMenuItem, itemType: ContextualMenuItemType) : IContextualMenuItem {
    return({
      key: menuItem.title,
      name: menuItem.title,
      itemType: itemType,
      iconProps: null,
      href: menuItem.url,
      subMenuProps: menuItem.subItems.length > 0 ? 
          { items : menuItem.subItems.map((i) => { return(this.projectMenuItem(i, ContextualMenuItemType.Normal)); }) } 
          : null,
      isSubMenu: itemType != ContextualMenuItemType.Header,
    });
  }

  public render(): React.ReactElement<ITenantGlobalFooterBarProps> {

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

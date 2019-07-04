/** Definition of a menu item */
export default interface IMenuItem {
    title: string;
    url: string;
    subItems: IMenuItem[];
}

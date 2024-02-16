export interface Menu {
    label?: string;
    icon?: string;
    routerlink?: string;
    //  region abdel to control if menu have subMenu?
    expandable?: boolean; 
    subMenu?: Menu[];
}

    
export class MenuState {
    currentMenu: Menu | null = null;

    updateCurrentMenu(menu: Menu): void {
        this.currentMenu = menu;
    }
}



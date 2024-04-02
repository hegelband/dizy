export class SideBar {
    constructor(button) {
        this.button = button;
        console.log('Sidebar created with button ' + button);
    }
}

class Window {
    constructor(xyz = SideBar) {
        this.sideBar = xyz;
        console.log('Window create with sidebar ' + xyz);
    }
}

export default Window;

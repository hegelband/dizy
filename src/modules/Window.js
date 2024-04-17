// export class SideBar {
//     constructor(button) {
//         this.button = button;
//         console.log('Sidebar created with button ' + button);
//     }
// }

import sss from "./SideBar";

export class AbstractWindow {
    constructor(xyz = sss) {
        this.sideBar = xyz;
    }
}

class Window extends AbstractWindow {
    constructor(xxx = sss) {
        super(xxx);
        // comment
        console.log('Window create with sidebar ' + xxx);
    }

    done() { }
}

export default Window;

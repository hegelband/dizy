// export class SideBar {
//     constructor(button) {
//         this.button = button;
//         console.log('Sidebar created with button ' + button);
//     }
// }

import SideBar from "./SideBar.js";

export class AbstractWindow {
  constructor(xyz = SideBar) {
    this.sideBar = xyz;
  }
}

class Window extends AbstractWindow {
  constructor(sideBar) {
    super(sideBar);
    // comment
    console.log("Window create with sidebar " + sideBar);
  }

  done() {}
}

export default Window;

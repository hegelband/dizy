import { DemandedConfig, SessionConfig, SingletoneConfig } from "./DIObjectConfig.js";
import Window from "./modules/Window.js";
import Button from "./modules/Button.js";
import SideBar from "./modules/SideBar.js";
import dot from "./modules/dot.js";
import rectangle from "./modules/rectangle.js";
import ContextContainerFactory from "./containers/ContextContainerFactory.js";

class UserForm {
	constructor(button) {
		this.button = button;
	}
}

const names = {
	windowName: Symbol.for("window"),
	sideBarName: Symbol.for("sideBar"),
	buttonName: "button",
	rectangleName: "rectangle",
};

const DIConfig = [
	new DemandedConfig(
		names.windowName,
		Window,
		() => {
			console.log(10);
		},
		function () {
			console.log(this.sideBar.button.width);
		},
	),
	new SingletoneConfig(names.sideBarName, SideBar),
	new SessionConfig(names.buttonName, Button),
];

const DISecondConfig = [new SessionConfig("dot", dot), new SessionConfig(names.rectangleName, rectangle)];

const appContext = ContextContainerFactory.createContainer(DIConfig, "app context");
const appSecondContext = ContextContainerFactory.createContainer(DISecondConfig, "app second context", appContext);

const userFormDIObjectConfig = new SingletoneConfig("userForm", UserForm);

appContext.init();
appSecondContext.init();
appContext.getInstance(names.windowName);
console.log(appContext.getInstance(names.rectangleName));
console.log(appContext.getChildren());
appContext.getInstance(Window);
console.log(appContext.addDIObject(userFormDIObjectConfig));
console.log(appContext.getInstance("userForm"));

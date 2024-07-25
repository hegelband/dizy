import {
	DemandedConfig as DemandedConfigModule,
	SessionConfig as SessionConfigModule,
	SingletoneConfig as SingletoneConfigModule,
} from "./DIObjectConfig.js";
import Window from "./modules/Window.js";
import Button from "./modules/Button.js";
import SideBar from "./modules/SideBar.js";
import dot from "./modules/dot.js";
import rectangle from "./modules/rectangle.js";
import ContextContainerFactory from "./containers/ContextContainerFactory.js";

const names = {
	windowName: Symbol.for("window"),
	sideBarName: Symbol.for("sideBar"),
	buttonName: "button",
	rectangleName: "rectangle",
};

const DIConfig = [
	new DemandedConfigModule(
		names.windowName,
		Window,
		() => {
			console.log(10);
		},
		function () {
			console.log(this.sideBar.button.width);
		},
	),
	new SingletoneConfigModule(names.sideBarName, SideBar),
	new SessionConfigModule(names.buttonName, Button),
];

const DISecondConfig = [new SessionConfigModule("dot", dot), new SessionConfigModule(names.rectangleName, rectangle)];

const appContext = ContextContainerFactory.createContainer(DIConfig, "app context");
const appSecondContext = ContextContainerFactory.createContainer(DISecondConfig, "app second context", appContext);

appContext.init();
appSecondContext.init();
appContext.getInstance(names.windowName);
console.log(appContext.getInstance(names.rectangleName));
console.log(appContext.getChildren());
appContext.getInstance(Window);

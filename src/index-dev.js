import {
	DemandedConfig,
	// eslint-disable-next-line no-unused-vars
	DIObjectConfig,
	SessionConfig,
	SingletoneConfig,
} from "./DIObjectConfig.js";
import InjectableWindow from "./modules/Window.js";
import InjectableButton from "./modules/Button.js";
import InjectableSideBar from "./modules/SideBar.js";
// import Injectabldot from "./modules/dot.js";
// import Injectablrectangle from "./modules/rectangle.js";
import ContextContainerFactory from "./containers/ContextContainerFactory.js";
import Injectabledot from "./modules/dot.js";
// eslint-disable-next-line no-unused-vars
import ContextContainer from "./containers/ContextContainer.js";
import Injectablerectangle from "./modules/rectangle.js";
import line from "./modules/line.js";

// class UserForm {
// 	constructor(button) {
// 		this.button = button;
// 	}
// }

const names = {
	windowName: Symbol.for("window"),
	sideBarName: Symbol.for("sideBar"),
	buttonName: "button",
	rectangleName: "rectangle",
};

const DIConfig = [
	new DemandedConfig(
		names.windowName,
		InjectableWindow,
		() => {
			console.log(10);
		},
		function () {
			console.log(this.sideBar.button.width);
		},
	),
	new SingletoneConfig(names.sideBarName, InjectableSideBar),
	new SessionConfig(names.buttonName, InjectableButton),
	new SingletoneConfig("Injectabledot", Injectabledot),
	new SingletoneConfig("line", line),
	new SingletoneConfig("Injectablerectangle", Injectablerectangle),
];

const appContext = ContextContainerFactory.createContainer(DIConfig, "app context");

appContext.init();

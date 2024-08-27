import {
	DemandedConfig as DemandedConfigModule,
	// eslint-disable-next-line no-unused-vars
	DIObjectConfig,
	SessionConfig as SessionConfigModule,
	SingletoneConfig as SingletoneConfigModule,
} from "./DIObjectConfig.js";
import InjectableWindow from "./modules/Window.js";
import InjectableButton from "./modules/Button.js";
import InjectablSideBar from "./modules/SideBar.js";
// import Injectabldot from "./modules/dot.js";
// import Injectablrectangle from "./modules/rectangle.js";
import ContextContainerFactory, {
	createDIObjectClassConstructor,
	createDIObjectFunctionConstructor,
} from "./containers/ContextContainerFactory.js";
import Injectabledot from "./modules/dot.js";
import DIObjectKeyFactory from "./containers/helpers/DIObjectKeyFactory.js";
import { parseType } from "../ReflectionJs/index.js";

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
	new DemandedConfigModule(
		names.windowName,
		InjectableWindow,
		() => {
			console.log(10);
		},
		function () {
			console.log(this.sideBar.button.width);
		},
	),
	new SingletoneConfigModule(names.sideBarName, InjectablSideBar),
	new SessionConfigModule(names.buttonName, InjectableButton),
	new SingletoneConfigModule("Injectabledot", Injectabledot),
];

const appContext = ContextContainerFactory.createContainer(
	DIConfig,
	"app context",
	null,
	new DIObjectKeyFactory(),
	(name) => name.slice(10),
	DIConfig.reduce((res, curr) => ({ ...res, [curr.type.name]: res.type }), {}),
);

const getDIObjects = (config, propName, context) =>
	config.reduce((obj, curr) => {
		obj[propName(curr.type.name)] =
			parseType(curr.type) === "class"
				? createDIObjectClassConstructor(curr.type, context)
				: createDIObjectFunctionConstructor(curr.type, context);
		return obj;
	}, {});

const { Window } = getDIObjects(DIConfig, (name) => name.slice(10), appContext);

appContext.init();

appContext.getInstance(Injectabledot);

class SmallWindow {
	constructor() {
		return appContext.getInstance("window");
	}
}

console.log(new SmallWindow());
console.log(new Window());

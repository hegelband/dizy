import DIClazzModule from "./DIClazz.js";
import {
	DIObjectConfig as DIObjectConfigModule,
	DemandedConfig as DemandedConfigModule,
	SessionConfig as SessionConfigModule,
	SingletoneConfig as SingletoneConfigModule,
} from "./DIObjectConfig.js";
import DIObjectKeyModule from "./containers/helpers/DIObjectKey.js";
import ContextContainerModule from "./containers/ContextContainer.js";
import AbstractContextContainerModule from "./containers/AbstractContextContainer.js";
import DemandedFactoryModule from "./containers/DemandedFactory.js";
import SessionContainerModule from "./containers/SessionContainer.js";
import SimpleContainerModule from "./containers/SimpleContainer.js";
import SingletoneContainerModule from "./containers/SingletoneContainer.js";
import DemandedLifecycleModule from "./lifecycle/DemandedLifecycle.js";
import LifecycleModule from "./lifecycle/Lifecycle.js";
import SessionLifecycleModule from "./lifecycle/SessionLifecycle.js";
import SingletoneLifecycleModule from "./lifecycle/SingletoneLifecycle.js";

// const names = {
//     windowName: Symbol.for('window'),
//     sideBarName: Symbol.for('sideBar'),
//     buttonName: 'button',
//     rectangleName: 'rectangle',
// };

// const DIConfig = [
//     // new DemandedConfig(
//     //     'abstractWindow',
//     //     AbstractWindow
//     // ),
//     new DemandedConfigModule(
//         names.windowName,
//         Window,
//         function () {
//             console.log(10);
//         },
//         function () {
//             console.log(this.sideBar.button.width);
//         }
//     ),
//     new SingletoneConfigModule(names.sideBarName, SideBar),
//     new SessionConfigModule(names.buttonName, Button),
// ];

// const DISecondConfig = [
//     new SessionConfigModule('dot', dot),
//     new SessionConfigModule(names.rectangleName, rectangle),
// ];

// const appContext = new ContextContainerModule(DIConfig, 'app context');
// const appSecondContext = new ContextContainerModule(DISecondConfig, 'app second context', appContext);

// appContext.init();
// appSecondContext.init();
// appContext.getInstance(names.windowName);
// console.log(appContext.getInstance(names.rectangleName));
// console.log(appContext.getChildren());
// const w = appContext.getInstance(Window);
// console.log(appContext.typeMatch(names.windowName, Window));
// const aw = appContext.getInstance(AbstractWindow);

// const DIConfig = [
//     new DIObjectConfig('animal', Animal, LifecycleEnum.Demanded),
//     new DIObjectConfig('woman', Woman),
//     new DIObjectConfig('man', Man),
//     new DIObjectConfig('simple', Simple, LifecycleEnum.Singletone),
//     new DIObjectConfig('dot', dot),
//     new DIObjectConfig('line', line),
//     new DIObjectConfig('square', square),
//     new DIObjectConfig('rectangle', rectangle),
// ];

// const appContext = new ContextContainer(DIConfig, 'App Context');
// appContext.init();

// const simpleObj = appContext.getInstance(Simple);
// const manObg = appContext.getInstance(Man);

// appContext.getInstance(Simple);

// console.log('This is Simple singletone from AppContext ', simpleObj);
// console.log('This is Man session from AppContext ', manObg);

// const testPromise = new Promise((resolve, reject) => {
//     setTimeout(() => resolve(5), 1000);
// });

// testPromise.then((res) => {
//     console.log(res);
//     return res + 5;
// });

// testPromise.then((res) => {
//     console.log(res);
//     return res + 10;
// })

const Dizy = {
	ContextContainer: ContextContainerModule,
	AbstractContextContainer: AbstractContextContainerModule,
	DemandedFactory: DemandedFactoryModule,
	SimpleContainer: SimpleContainerModule,
	SessionContainer: SessionContainerModule,
	SingletoneContainer: SingletoneContainerModule,
	DIObjectKey: DIObjectKeyModule,
	DemandedConfig: DemandedConfigModule,
	SessionConfig: SessionConfigModule,
	SingletoneConfig: SingletoneConfigModule,
	DIObjectConfig: DIObjectConfigModule,
	DIClazz: DIClazzModule,
	DemandedLifecycle: DemandedLifecycleModule,
	SingletoneLifecycle: SingletoneLifecycleModule,
	SessionLifecycle: SessionLifecycleModule,
	Lifecycle: LifecycleModule,
};

module.exports.ContextContainer = Dizy.ContextContainer;
module.exports.AbstractContextContainer = Dizy.AbstractContextContainer;
module.exports.DemandedConfig = Dizy.DemandedConfig;
module.exports.SessionConfig = Dizy.SessionConfig;
module.exports.SingletoneConfig = Dizy.SingletoneConfig;
module.exports.DIObjectConfig = Dizy.DIObjectConfig;
module.exports.DIClazz = Dizy.DIClazz;
module.exports.DIObjectKey = Dizy.DIObjectKey;
module.exports.SingletoneContainer = Dizy.SingletoneContainer;
module.exports.SimpleContainer = Dizy.SimpleContainer;
module.exports.DemandedFactory = Dizy.DemandedFactory;
module.exports.SessionContainer = Dizy.SessionContainer;
module.exports.DemandedLifecycle = Dizy.DemandedLifecycle;
module.exports.SingletoneLifecycle = Dizy.SingletoneLifecycle;
module.exports.SessionLifecycle = Dizy.SessionLifecycle;
module.exports.Lifecycle = Dizy.Lifecycle;

module.exports = Dizy;

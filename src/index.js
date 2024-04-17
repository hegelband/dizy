import { DemandedConfig, SessionConfig, SingletoneConfig } from './DIObjectConfig.js';
import ContextContainer from './containers/ContextContainer.js';
import Window, { AbstractWindow } from './modules/Window.js';
// import { SideBar } from './modules/Window.js';
import Button from './modules/Button.js';
import SideBar from './modules/SideBar.js';
import rectangle from './modules/rectangle.js';

const names = {
    windowName: Symbol.for('window'),
    sideBarName: Symbol.for('sideBar'),
    buttonName: 'button',
    rectangleName: 'rectangle',
};

const DIConfig = [
    new DemandedConfig(
        'abstractWindow',
        AbstractWindow
    ),
    new DemandedConfig(
        names.windowName,
        Window,
        function () {
            console.log(10);
        },
        function () {
            console.log(this.sideBar.button.width);
        }
    ),
    new SingletoneConfig(names.sideBarName, SideBar),
    new SessionConfig(names.rectangleName, rectangle),
    new SessionConfig(names.buttonName, Button),
];

const appContext = new ContextContainer(DIConfig, 'app context');

appContext.init();
appContext.getInstance(names.windowName);
const w = appContext.getInstance(Window);
const aw = appContext.getInstance(AbstractWindow);

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

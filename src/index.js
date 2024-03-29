import Animal from './modules/Animal.js';
import Man, { Simple } from './modules/Man.js';
import Woman from './modules/Woman.js';
import DIObjectConfig, { DIObjectLifecycle } from './DIObjectConfig.js';
import ContextContainer from './containers/ContextContainer.js';
import dot from './modules/dot.js';
import line from './modules/line.js';
import square from './modules/square.js';
import rectangle from './modules/rectangle.js';

const DIConfig = [
    new DIObjectConfig('animal', Animal, DIObjectLifecycle.Demanded),
    new DIObjectConfig('woman', Woman),
    new DIObjectConfig('man', Man),
    new DIObjectConfig('simple', Simple, DIObjectLifecycle.Singletone),
    new DIObjectConfig('dot', dot),
    new DIObjectConfig('line', line),
    new DIObjectConfig('square', square),
    new DIObjectConfig('rectangle', rectangle),
];

const appContext = new ContextContainer(DIConfig, 'App Context');
appContext.init();

const simpleObj = appContext.getInstance(Simple);
const manObg = appContext.getInstance(Man);

appContext.getInstance(Simple);

console.log('This is Simple singletone from AppContext ', simpleObj);
console.log('This is Man session from AppContext ', manObg);

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

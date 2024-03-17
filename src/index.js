import DIObjectConfig from './DIObjectConfig.js';
import AppContext from './AppContext.js';

const DIConfig = [
    // new DIObjectConfig('your DI object name', DIObject),
];

new AppContext(DIConfig).init();

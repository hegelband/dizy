/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/AppContext.js":
/*!***************************!*\
  !*** ./src/AppContext.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getClassConstructorArgsNames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/getClassConstructorArgsNames */ "./src/utils/getClassConstructorArgsNames.js");
/* harmony import */ var _utils_getFunctionArgsNames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getFunctionArgsNames */ "./src/utils/getFunctionArgsNames.js");
/* harmony import */ var _utils_parseType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/parseType */ "./src/utils/parseType.js");



class AppContext {
  constructor(config = {}) {
    this.config = config;
  }
  #contextReady = false;
  allClasses = [];
  sessionScope = new Map();
  init() {
    if (this.#contextReady) return;
    this.#contextReady = true;
    this.allClasses = [];
    this.config.forEach(containerObject => {
      console.log(containerObject.type.toString());
      const typeOfContainerObject = (0,_utils_parseType__WEBPACK_IMPORTED_MODULE_2__["default"])(containerObject.type);
      const containerObjectTypeStr = containerObject.type.toString();
      this.allClasses.push({
        name: containerObject.name,
        type: containerObject.type,
        isClass: typeOfContainerObject === 'class',
        constructor: typeOfContainerObject === 'class' ? (0,_utils_getClassConstructorArgsNames__WEBPACK_IMPORTED_MODULE_0__["default"])(containerObjectTypeStr) : (0,_utils_getFunctionArgsNames__WEBPACK_IMPORTED_MODULE_1__["default"])(containerObjectTypeStr)
      });
      // ToDo Все объекты с наименованиями объявленными в аргументах containerObject находятся в контейнере
      // ToDo Отсутствие циклических зависимостей
      // ToDo Правила жизненных циклов
      // Построение дерева зависимостей
    });
    this.allClasses.sort((a, b) => {
      return a.constructor.args.length - b.constructor.args.length;
    });
    this.allClasses.forEach(cls => {
      this.createInstance(cls);
    });
  }
  createInstance(clazz) {
    if (this.sessionScope.has(clazz.name)) {
      return this.sessionScope.get(clazz.name);
    }
    const argumentValues = [];
    if (clazz.constructor.args.length > 0) {
      clazz.constructor.args.forEach(arg => {
        const argClazz = this.allClasses.find(cls => cls.name === arg);
        argumentValues.push(this.createInstance(argClazz));
      });
    }
    let instance;
    if (clazz.isClass) {
      instance = new clazz.type(...argumentValues);
    } else {
      instance = new FunctionWrapper(clazz.type, argumentValues);
    }
    this.sessionScope.set(clazz.name, instance);
    return instance;
  }
}
class FunctionWrapper {
  constructor(func, args) {
    this.func = func;
    this.args = args;
    console.log('Func with args ', func, args);
  }
  call() {
    this.func(...args);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppContext);

/***/ }),

/***/ "./src/DIObjectConfig.js":
/*!*******************************!*\
  !*** ./src/DIObjectConfig.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const DIObjectLifecycle = {
  Persistent: 0,
  Session: 1,
  Singleton: 2,
  Prototype: 3,
  Demanded: 4
};
class DIObjectConfig {
  constructor(name = '', type = {}, lifecycle = DIObjectLifecycle.Singleton) {
    this.name = name;
    this.type = type;
    this.lifecycle = lifecycle;
  }
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DIObjectConfig);

/***/ }),

/***/ "./src/modules/Animal.js":
/*!*******************************!*\
  !*** ./src/modules/Animal.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Animal {
  constructor() {
    console.log('animal');
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animal);

/***/ }),

/***/ "./src/modules/Man.js":
/*!****************************!*\
  !*** ./src/modules/Man.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Man {
  constructor(animal) {
    console.log('man with ', animal);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Man);

/***/ }),

/***/ "./src/modules/Woman.js":
/*!******************************!*\
  !*** ./src/modules/Woman.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Woman {
  constructor(animal, man) {
    console.log('woman with animal and man', animal, man);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Woman);

/***/ }),

/***/ "./src/modules/dot.js":
/*!****************************!*\
  !*** ./src/modules/dot.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dot = () => {
  console.log('Func dot');
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dot);

/***/ }),

/***/ "./src/modules/line.js":
/*!*****************************!*\
  !*** ./src/modules/line.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function line(dot, animal) {
  console.log('Func line with dot and animal ', dot, animal);
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (line);

/***/ }),

/***/ "./src/modules/rectangle.js":
/*!**********************************!*\
  !*** ./src/modules/rectangle.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const rectangle = function Re(square) {
  console.log('Func rectangle with square ', square);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rectangle);

/***/ }),

/***/ "./src/modules/square.js":
/*!*******************************!*\
  !*** ./src/modules/square.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const square = function (line, woman) {
  console.log('Func square with line and woman ', line, woman);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (square);

/***/ }),

/***/ "./src/utils/getClassConstructorArgsNames.js":
/*!***************************************************!*\
  !*** ./src/utils/getClassConstructorArgsNames.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class HasNoConstructorError extends Error {
  constructor() {
    this.message = 'DI object has no one constructor. Need one or more.';
    super(this.message);
  }
}
const getClassConstructorArgsNames = clsStr => {
  const separator = 'constructor';
  const startIndex = clsStr.indexOf(separator, 0);
  if (startIndex === -1) {
    throw new HasNoConstructorError();
  }
  const openBraceStartIndex = clsStr.indexOf('(', startIndex);
  const closeBraceStartIndex = clsStr.indexOf(')', openBraceStartIndex);
  const argsStr = clsStr.slice(openBraceStartIndex + 1, closeBraceStartIndex);
  const args = argsStr.split(',').map(arg => arg.trim()).filter(arg => arg !== '');
  return {
    startPosition: startIndex,
    args
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getClassConstructorArgsNames);

/***/ }),

/***/ "./src/utils/getFunctionArgsNames.js":
/*!*******************************************!*\
  !*** ./src/utils/getFunctionArgsNames.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const getFunctionArgsNames = funcStr => {
  const openBraceStartIndex = funcStr.indexOf('(', 0);
  const closeBraceStartIndex = funcStr.indexOf(')', openBraceStartIndex);
  const argsStr = funcStr.slice(openBraceStartIndex + 1, closeBraceStartIndex);
  const args = argsStr.split(',').map(arg => arg.trim()).filter(arg => arg !== '');
  return {
    startPosition: openBraceStartIndex,
    args
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getFunctionArgsNames);

/***/ }),

/***/ "./src/utils/parseType.js":
/*!********************************!*\
  !*** ./src/utils/parseType.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class NotAllowedDIObjectType extends Error {
  constructor(type) {
    this.message = `Not allowed DI object type of ${type.constructor.name}`;
    super(this.message);
  }
}
function parseType(type) {
  if (typeof type !== 'function') {
    throw new NotAllowedDIObjectType(type);
  }
  ;
  const typeStr = type.toString();
  return typeStr.startsWith('class') ? 'class' : 'function';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parseType);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_Animal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Animal.js */ "./src/modules/Animal.js");
/* harmony import */ var _modules_Man_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Man.js */ "./src/modules/Man.js");
/* harmony import */ var _modules_Woman_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/Woman.js */ "./src/modules/Woman.js");
/* harmony import */ var _DIObjectConfig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DIObjectConfig.js */ "./src/DIObjectConfig.js");
/* harmony import */ var _AppContext_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AppContext.js */ "./src/AppContext.js");
/* harmony import */ var _modules_dot_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/dot.js */ "./src/modules/dot.js");
/* harmony import */ var _modules_line_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/line.js */ "./src/modules/line.js");
/* harmony import */ var _modules_square_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/square.js */ "./src/modules/square.js");
/* harmony import */ var _modules_rectangle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/rectangle.js */ "./src/modules/rectangle.js");









const DIConfig = [new _DIObjectConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"]('animal', _modules_Animal_js__WEBPACK_IMPORTED_MODULE_0__["default"]), new _DIObjectConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"]('woman', _modules_Woman_js__WEBPACK_IMPORTED_MODULE_2__["default"]), new _DIObjectConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"]('man', _modules_Man_js__WEBPACK_IMPORTED_MODULE_1__["default"]), new _DIObjectConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"]('dot', _modules_dot_js__WEBPACK_IMPORTED_MODULE_5__["default"]), new _DIObjectConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"]('line', _modules_line_js__WEBPACK_IMPORTED_MODULE_6__["default"]), new _DIObjectConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"]('square', _modules_square_js__WEBPACK_IMPORTED_MODULE_7__["default"]), new _DIObjectConfig_js__WEBPACK_IMPORTED_MODULE_3__["default"]('rectangle', _modules_rectangle_js__WEBPACK_IMPORTED_MODULE_8__["default"])];
new _AppContext_js__WEBPACK_IMPORTED_MODULE_4__["default"](DIConfig).init();
})();

/******/ })()
;
//# sourceMappingURL=main.js.map
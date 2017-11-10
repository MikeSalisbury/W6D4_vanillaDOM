/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

let DOMNodeCollection = __webpack_require__(1);
let queue  = [];

document.addEventListener('DOMContentLoaded', (event) => {
  queue.forEach((el) => {
    el();
  });
});

Window.prototype.$l = function $l(arg) {

  if (arg instanceof HTMLElement) {
    return new DOMNodeCollection(arg);
  } else if (arg instanceof Function) {
    if (document.readyState === "complete") {
      arg();
    }
    queue.push(arg);
  } else {
    return document.querySelectorAll(`${arg}`);
  }
};

$l.extend = (obj1, ...objs) => {
  objs.forEach((obj) => {
    obj1 = obj;
  });
  return obj1;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(HTMLElements) {
    this.HTMLElements = HTMLElements;
  }

  each(cb) {
    this.HTMLElements.forEach(cb);
  }

  html(string) {
    if (string && typeof string === 'string') {
      this.each((el) => {
        el.innerHTML = string;
      });
    } else {
      return this.HTMLElements[0].innerHTML;
    }
    return this.HTMLElements;
  }

  empty() {
    this.each((el) => {
      el.innerHTML = "";
    });

    return this.HTMLElements;
  }

  append(arg) {
    switch(arg.constructor) {
      case HTMLElement:
        this.each((el) => {
          const element = document.createElement(arg);
          el.appendChild(element);
        });
        break;
      case DOMNodeCollection:
        this.each((el) => {
          arg.each((argEl) => {
            el.appendChild(argEl);
          });
        });
        break;
      case String:
        this.each((el) => {
          this.html(arg);
        });
        break;
      default:
        console.log(`arg is not valid`);
        break;
    }
  }

  attr(attribute, value) {
    if (value === undefined) {
      return this.HTMLElements[0].getAttribute(attribute);
    } else {
      this.each((el) => {
        el.setAttribute(attribute, value);
      });
      return this;
    }
  }

  addClass(arg) {
    this.each((el) => {
      if (el.classname.length > 0) {
        el.classname += " ";
      }
      el.className += arg;
    });
  }

  removeClass(arg) {
    this.each( (el) => {
      if (el.className === arg) {
        el.className = "";
      }
    });

  }

  children() {
    let kids = [];
    this.each((el) => {
      kids.push(el.children);
    });
    return new DOMNodeCollection(kids);
  }

  parent() {
    let parentals = [];
    this.each( (el) => {
      parentals.push(el.parentElement);
    });
    return new DOMNodeCollection(parentals);
  }

  find(arg) {
    let matching = [];
    this.each( (el) => {
      matching.push(el.querySelectorAll(arg));
    });
    return new DOMNodeCollection(matching);
  }

  remove() {
    this.each( (el) => {
      el.parentNode.removeChild(el);
    });
  }

  on(type, cb) {
    this.each((el) => {
      el.addEventListener(type, cb);
      if (el.eventlistens === undefined) {
        el.eventlistens = [cb];
      } else {
        el.eventlistens.push(cb);
      }
    }) ;
  }

  off(type, listener) {
    this.each((el) => {
      if (listener === undefined) {
        el.eventlistens.forEach((listen) => {
          el.removeEventListener(type, listen);
        });
      } else {
        el.removeEventListener(type, listener);
      }
    });
  }


}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
let DOMNodeCollection = require('./dom_node_collection');
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

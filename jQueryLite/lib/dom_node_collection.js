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

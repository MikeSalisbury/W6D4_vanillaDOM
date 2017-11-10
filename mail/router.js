class Router {
  constructor(node) {
    this.node = node;
  }

  start() {
    this.render ();
    window.addEventListener('hashchange', () => {
      this.render();
    });
  }

  activeRoute() {
    const hash = window.locatation.hash;
    return hash.slice(1);
  }

  render() {
    this.node.innerHTML = "";
    const route = this.activeRoute();
    const paragraph = document.createElement('p');
    paragraph.innerHTML = route;
    this.node.appendChild(paragraph);
  }
}

module.exports = 'Router';

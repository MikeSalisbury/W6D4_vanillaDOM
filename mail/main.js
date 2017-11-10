const Router = require('./router');

document.addEventListener('DOMContentLoaded', (event) => {
  const lis = document.querySelectorAll('.sidebar-nav li');
  lis.forEach((li) => {
    li.addEventListener('click', (e) => {
      window.location.hash = e.target.textContent.toLowerCase();
    });
  });
  const content = document.querySelector(".content");
  const router = new Router(content);
  router.start();
});

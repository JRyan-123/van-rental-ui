
document.addEventListener('DOMContentLoaded', () => {
  // init AOS once
  AOS.init({ duration: 800, once: true });


});


function loadContent( selector, url) {
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
      return res.text();
    })
    .then(html => {
      const target = document.querySelector(selector);
      target.innerHTML = html;

    })
    .catch(err => {
      console.error('loadSection error:', err);
    });
}

  // load initially and on button click
loadContent('#nav', 'partials/navbar.html');
loadContent('#hero', 'partials/hero.html');
loadContent('#rides', 'partials/rides.html');
loadContent('#promo', 'partials/promo.html');
loadContent('#contacts', 'partials/contacts.html');
loadContent('#footer', 'partials/footer.html');



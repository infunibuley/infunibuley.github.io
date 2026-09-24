function loadLayout() {
  fetch('/layouts/header.html')
    .then(res => {
      if (!res.ok) throw new Error(`Could not load header: ${res.status}`);
      return res.text();
    })
    .then(html => {
      const headerEl = document.getElementById('site-header');
      if (headerEl) headerEl.innerHTML = html;
    })
    .catch(err => console.error(err));

  fetch('/layouts/footer.html')
    .then(res => {
      if (!res.ok) throw new Error(`Could not load footer: ${res.status}`);
      return res.text();
    })
    .then(html => {
      const footerEl = document.getElementById('site-footer');
      if (footerEl) footerEl.innerHTML = html;
    })
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', loadLayout);
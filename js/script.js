// Website Portofolio — script.js
// Sengaja minimal: hanya toggle menu mobile, tidak ada dependency eksternal.

(function () {
  var nav = document.getElementById('bkm-nav');
  var toggle = document.getElementById('bkm-nav-toggle');

  if (!nav || !toggle) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Tutup menu mobile otomatis saat salah satu link diklik
  nav.querySelectorAll('.bkm-nav-links a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Filter galeri (halaman galeri.html)
(function () {
  var filterBar = document.getElementById('bkm-filter-bar');
  var grid = document.getElementById('bkm-gallery-grid');
  if (!filterBar || !grid) return;

  var buttons = filterBar.querySelectorAll('.bkm-filter-btn');
  var items = grid.querySelectorAll('.bkm-gallery-item');

  filterBar.addEventListener('click', function (e) {
    var btn = e.target.closest('.bkm-filter-btn');
    if (!btn) return;

    buttons.forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');

    var filter = btn.getAttribute('data-filter');
    items.forEach(function (item) {
      var match = filter === 'all' || item.getAttribute('data-category') === filter;
      item.classList.toggle('is-hidden', !match);
    });
  });
})();

// Form konsultasi (halaman contact.html)
// Catatan: ini hanya demo di sisi browser (belum kirim ke server mana pun).
// Sambungkan atribut action pada <form> ke layanan seperti Formspree/Getform,
// atau ganti listener ini dengan fetch() ke endpoint/Vercel Serverless Function-mu.
// Ganti kode demo lama di file .js Anda dengan kode di bawah ini:
(function () {
  var form = document.getElementById('bkm-contact-form');
  var status = document.getElementById('bkm-form-status');
  if (!form || !status) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Menghentikan pengiriman default halaman biasa
    
    var data = new FormData(form);
    status.innerHTML = "Sedang mengirim pesan...";
    status.className = "bkm-form-status"; // Reset class status
    status.style.color = "orange";

    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(function(response) {
      if (response.ok) {
        status.innerHTML = "Terima kasih! Pesan Anda telah berhasil dikirim.";
        status.style.color = "green";
        status.classList.add('is-visible'); // Memunculkan teks status bawaan css template
        form.reset(); // Mengosongkan form setelah sukses
      } else {
        status.innerHTML = "Ups! Terjadi kendala pengiriman ke Formspree.";
        status.style.color = "red";
        status.classList.add('is-visible');
      }
    }).catch(function(error) {
      status.innerHTML = "Gagal mengirim, periksa koneksi internet Anda.";
      status.style.color = "red";
      status.classList.add('is-visible');
    });
  });
})();

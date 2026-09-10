let currentPage = 1;
const totalPages = 5;

function renderPagination() {
  const pageNumbersContainer = document.getElementById("pageNumbers");
  if (!pageNumbersContainer) return;

  pageNumbersContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    if (i === currentPage) {
      btn.classList.add("active");
    }
    btn.onclick = () => goToPage(i);
    pageNumbersContainer.appendChild(btn);
  }

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages;
}

function changePage(direction) {
  currentPage += direction;
  renderPagination();
}

function goToPage(page) {
  currentPage = page;
  renderPagination();
}

document.addEventListener("DOMContentLoaded", () => {
  renderPagination();
});

function renderPaginationButtons() {
  const pageNumbersContainer = document.getElementById("pageNumbers");
  if (!pageNumbersContainer) return;

  // Hitung total halaman (contoh: 11 artikel / 9 = 2 halaman)
  const totalPages = Math.ceil(allArticles.length / itemsPerPage);

  pageNumbersContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    if (i === currentPage) {
      btn.classList.add("active");
    }
    btn.onclick = () => goToPage(i);
    pageNumbersContainer.appendChild(btn);
  }

  // Atur status tombol Prev & Next
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function changePage(direction) {
  currentPage += direction;
  renderBlogPage(); // Render ulang artikel & tombol
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Otomatis scroll ke atas
}

function goToPage(page) {
  currentPage = page;
  renderBlogPage(); // Render ulang artikel & tombol
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Jalankan saat halaman pertama kali dibuka
document.addEventListener("DOMContentLoaded", () => {
  renderBlogPage();
});

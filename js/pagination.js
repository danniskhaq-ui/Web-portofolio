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

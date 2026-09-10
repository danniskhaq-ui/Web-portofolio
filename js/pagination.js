.pagination {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 14px;
  border: 1px solid #4b0082; /* Border indigo */
  background-color: #fff;
  color: #4b0082; /* Teks indigo */
  font-weight: 500;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
}

/* Efek saat kursor diarahkan ke tombol */
.pagination button:hover:not(:disabled) {
  background-color: #4b0082; /* Background jadi indigo */
  color: #fff; /* Teks jadi putih */
}

/* Tampilan tombol halaman yang sedang aktif */
.pagination button.active {
  background-color: #4b0082; /* Indigo dominan */
  color: white;
  border-color: #4b0082;
  box-shadow: 0 2px 6px rgba(75, 0, 130, 0.3); /* Soft shadow indigo */
}

/* Tampilan tombol saat disabled (tidak bisa diklik) */
.pagination button:disabled {
  border-color: #ccc;
  color: #ccc;
  opacity: 0.6;
  cursor: not-allowed;
}

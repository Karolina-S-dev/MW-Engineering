const video = document.querySelector(".hero-video");
video.playbackRate = 0.6;

// -----Modal Gallery Air Liquide-----

let btnGalleryAirLiquide = document.querySelector("#btn-gallery-air-liquide");
let modalGalleryBackground = document.querySelector(
  ".modal-gallery-background",
);

//wyświetlenie modala
btnGalleryAirLiquide.addEventListener("click", () => {
  modalGalleryBackground.classList.add("active");
});

//zamykanie X
let closingX = document.querySelector("#closing-X");
closingX.addEventListener("click", () => {
  modalGalleryBackground.classList.remove("active");
});

//zamykanie po kliknięciu tła
modalGalleryBackground.addEventListener("click", (e) => {
  if (e.target === modalGalleryBackground) {
    modalGalleryBackground.classList.remove("active");
  }
});

//zamykanie na Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modalGalleryBackground.classList.remove("active");
  }
});


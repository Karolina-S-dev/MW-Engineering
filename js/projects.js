const video = document.querySelector(".hero-video");
video.playbackRate = 0.6;

// ----- Modal Gallery -----

const buttons = document.querySelectorAll(".btn-activate-modal");
const galleries = document.querySelectorAll(".modal-gallery-background");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    galleries.forEach((gallery) => {
      gallery.classList.remove("active");
    });

    const target = button.dataset.target;

    document.getElementById(target).classList.add("active");
  });
});

//funkcja do zamykania modala
function closeAllGalleries() {
  galleries.forEach((gallery) => {
    gallery.classList.remove("active");
  });
}

//zamykanie X
const closingButtons = document.querySelectorAll("#closing-X");
closingButtons.forEach((button) => {
  button.addEventListener("click", closeAllGalleries);
});

//zamykanie po kliknięciu tła
galleries.forEach((gallery) => {
  gallery.addEventListener("click", (e) => {
    if (e.target === gallery) {
      closeAllGalleries();
    }
  });
});

//zamykanie na Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAllGalleries();
  }
});

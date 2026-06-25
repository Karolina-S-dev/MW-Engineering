const video = document.querySelector(".hero-video");
if (video) {
  video.playbackRate = 0.6;
}

// ----- Modal Gallery -----

const buttons = document.querySelectorAll(".btn-activate-modal");
const galleries = document.querySelectorAll(".modal-gallery-background");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    galleries.forEach((gallery) => {
      gallery.classList.remove("active");
    });

    const target = button.dataset.target;
    const targetGallery = document.getElementById(target);

    if (targetGallery) {
      targetGallery.classList.add("active");
    }
  });
});

//funkcja do zamykania modala
function closeAllGalleries() {
  galleries.forEach((gallery) => {
    gallery.classList.remove("active");
  });
}

//zamykanie X
const closingButtons = document.querySelectorAll(".closing-x");
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

// ----- nav-burger -----
let navBurger = document.querySelector("#nav-burger");
let navLinks = document.querySelector(".nav-links");

if (navBurger && navLinks) {
  navBurger.addEventListener("click", () => {
    if (navLinks.style.opacity == "1") {
      navLinks.style.opacity = "0";
    } else {
      navLinks.style.opacity = "1";
    }
  });
}

// ----- Contact form toast -----

const params = new URLSearchParams(window.location.search);
const formMessage = document.getElementById("form-message");

if (formMessage && params.has("status")) {
  if (params.get("status") === "success") {
    formMessage.textContent = "Dziękujemy! Wiadomość została wysłana.";
    formMessage.classList.add("success");
  } else {
    formMessage.textContent = "Nie udało się wysłać wiadomości.";
    formMessage.classList.add("error");
  }


  window.history.replaceState({}, "", window.location.pathname);

  setTimeout(() => {
    formMessage.style.opacity = "0";

    setTimeout(() => {
      formMessage.style.display = "none";
    }, 400);
  }, 5000);
}

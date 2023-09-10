function dealWithDarkMode() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    themeToggleLightIcon.classList.remove("hidden");
    themeToggleDarkIcon.classList.add("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    themeToggleDarkIcon.classList.remove("hidden");
    themeToggleLightIcon.classList.add("hidden");
  }

  var themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn.addEventListener("click", function () {
    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // if set via local storage previously
    if (themeToggleDarkIcon.classList.contains("hidden")) {
      //Estamos no light mode
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");

      themeToggleDarkIcon.classList.remove("hidden");
      themeToggleLightIcon.classList.add("hidden");
    } else {
      //Não estamos no light mode
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");

      themeToggleDarkIcon.classList.add("hidden");
      themeToggleLightIcon.classList.remove("hidden");
    }
  });

  // It's best to inline this in `head` to avoid FOUC (flash of unstyled content) when changing pages or themes
}
dealWithDarkMode();

ScrollTrigger.normalizeScroll(true);

/*
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,
  spaceBetween: 10,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination"
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar"
  }
});*/

gsap.registerPlugin();

// reset position of the loading screen

function init() {
  const loader = document.querySelector(".loader");

  // reset position of the loading screen
  gsap.set(loader, {
    yPercent: -100,
    autoAlpha: 1
  });

  function loaderIn() {
    // GSAP tween to strech the loading screen across the whole screen
    return gsap.fromTo(
      loader,
      {
        yPercent: -100
      },
      {
        duration: 1.2,
        yPercent: -10,
        ease: "Power1.inOut"
      }
    );
  }

  function loaderAway() {
    // GSAP tween to hide loading screen
    return gsap.fromTo(
      loader,
      {
        yPercent: -10
      },
      {
        delay: 0.5,
        duration: 1.2,
        yPercent: 100,
        ease: "Power1.inOut"
      }
    );
  }

  // do something before the transition starts
  barba.hooks.before((data) => {
    const loaderText = document.getElementById("loaderText");
    loaderText.textContent = data.trigger.getAttribute("nextPageText");

    document.querySelector("html").classList.add("is-transitioning");
    barba.wrapper.classList.add("is-animating");
  });

  // do something after the transition finishes
  barba.hooks.after((data) => {
    console.log("here!");
    document.querySelector("html").classList.remove("is-transitioning");

    console.log("current -> ", data.current.namespace);
    console.log("next -> ", data.next.namespace);

    if (data.next.namespace === "home") {
      const bottomDOM = document.getElementsByTagName("body")[0];
      const newScript_1 = document.createElement("script");
      const newScript_2 = document.createElement("script");

      const oldScript_1 = document.getElementById("main-script-1");
      const oldScript_2 = document.getElementById("main-script-2");

      newScript_1.src = "index.js";
      newScript_1.id = "main-script-1";

      newScript_2.src = "newIndex.js";
      newScript_2.id = "main-script-2";

      oldScript_1.remove();
      oldScript_2.remove();

      bottomDOM.appendChild(newScript_1);
      bottomDOM.appendChild(newScript_2);

      ScrollTrigger.refresh();
    }

    barba.wrapper.classList.remove("is-animating");
    ga("set", "page", window.location.pathname);
    ga("send", "pageview");
  });

  // scroll to the top of the page
  barba.hooks.enter((data) => {
    window.scrollTo(0, 0);
  });

  barba.init({
    transitions: [
      {
        async leave() {
          await loaderIn();
        },
        enter() {
          loaderAway();
        }
      }
    ]
  });
}

window.addEventListener("load", function () {
  init();
});

function dealWithDarkMode() {
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

  console.log("estamos em: ", window.location.href);

  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");

    themeToggleLightIcon.style.display = "block";
    themeToggleDarkIcon.style.display = "none";
  } else {
    document.documentElement.classList.remove("dark");

    themeToggleDarkIcon.style.display = "block";
    themeToggleLightIcon.style.display = "none";
  }

  var themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn.addEventListener("click", function () {
    // toggle icons inside button
    console.log("cliquei!");
    // if set via local storage previously
    if (themeToggleDarkIcon.style.display === "none") {
      //Estamos no light mode
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");

      themeToggleDarkIcon.style.display = "block";
      themeToggleLightIcon.style.display = "none";
    } else {
      //Não estamos no light mode
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");

      themeToggleDarkIcon.style.display = "none";
      themeToggleLightIcon.style.display = "block";
    }
  });

  console.log("light : ", themeToggleLightIcon.className);
  console.log("dark : ", themeToggleDarkIcon.classList);

  // It's best to inline this in `head` to avoid FOUC (flash of unstyled content) when changing pages or themes
}

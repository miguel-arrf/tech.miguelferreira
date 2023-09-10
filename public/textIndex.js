var getHeight = (el) => {
  const computedStyle = getComputedStyle(el);

  let elementHeight = el.clientHeight; // height with padding
  elementHeight -=
    parseFloat(computedStyle.paddingTop) +
    parseFloat(computedStyle.paddingBottom);
  return elementHeight;
};

function RepeatTextScrollFx(Domel) {
  // DOM elements
  var DOM = {
    // main element ([data-text-rep])
    el: null,
    // all text spans except the last one (this will be the centered one and doesn't translate
    words: null
  };
  var totalWords = 9;
  var tyIncrement = 12;
  var delayIncrement = 0.1;
  var scrollTimeline;
  var observer;
  var isLoaded;

  DOM.el = Domel;

  function layout() {
    const halfWordsCount = Math.floor(totalWords / 2);
    let innerHTML = "";

    for (let i = 0; i < totalWords; ++i) {
      let ty;
      let delay;

      if (i === totalWords - 1) {
        ty = 0;
        delay = 0;
      } else if (i < halfWordsCount) {
        ty = halfWordsCount * tyIncrement - tyIncrement * i;
        delay = delayIncrement * (halfWordsCount - i) - delayIncrement;
      } else {
        ty =
          -1 *
          (halfWordsCount * tyIncrement - (i - halfWordsCount) * tyIncrement);
        delay =
          delayIncrement * (halfWordsCount - (i - halfWordsCount)) -
          delayIncrement;
      }
      console.log("DOM.el.innerHTML: ", DOM.el.innerHTML);

      innerHTML += `<span class="bg-gray-100 dark:bg-black dark:text-white" data-delay="${delay}" data-ty="${ty}">${DOM.el.innerHTML}</span>`;
    }

    DOM.el.innerHTML = innerHTML;
    DOM.el.classList.add("text-rep");

    DOM.words = [...DOM.el.querySelectorAll("span")].slice(0, -1);
  }
  function setBoundaries() {
    // Set up the margin top and padding bottom values
    const paddingBottomMarginTop =
      (getHeight(DOM.el) * Math.floor(totalWords / 2) * tyIncrement) / 100;
    gsap.set(DOM.el, {
      marginTop: paddingBottomMarginTop,
      paddingBottom: paddingBottomMarginTop
    });
  }

  function createScrollTimeline() {
    scrollTimeline = gsap
      .timeline({ paused: true })

      .to(DOM.words, {
        duration: 1,
        ease: "power1",
        yPercent: (_, target) => target.dataset.ty,
        delay: (_, target) => target.dataset.delay
      });
  }
  function createObserver() {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px",
      threshold: 0
    };

    // credits: from https://medium.com/elegant-seagulls/parallax-and-scroll-triggered-animations-with-the-intersection-observer-api-and-gsap3-53b58c80b2fa
    observer = new IntersectionObserver((entry) => {
      if (entry[0].intersectionRatio > 0) {
        if (!isLoaded) {
          isLoaded = true;
        }
        gsap.ticker.add(progressTween);
      } else {
        if (isLoaded) {
          gsap.ticker.remove(progressTween);
        } else {
          isLoaded = true;
          // add and remove immediately
          gsap.ticker.add(progressTween, true);
        }
      }
    }, observerOptions);

    var progressTween = () => {
      // Get scroll distance to bottom of viewport.
      const scrollPosition = window.scrollY + window.innerHeight;
      // Get element's position relative to bottom of viewport.
      const elPosition = scrollPosition - DOM.el.offsetTop;
      // Set desired duration.
      const durationDistance = window.innerHeight + DOM.el.offsetHeight;
      // Calculate tween progresss.
      const currentProgress = elPosition / durationDistance;
      // Set progress of gsap timeline.
      scrollTimeline.progress(currentProgress);
    };

    observer.observe(DOM.el);
  }

  layout();
  setBoundaries();
  createScrollTimeline();
  createObserver();
  window.addEventListener("resize", () => setBoundaries());
}

function textDisplacementAnimation() {
  console.log("FUI CHAMADO!");
  // Preload images and fonts and remove loader
  // Apply the effect on these elements
  document.querySelectorAll("[data-text-rep]").forEach((textEl) => {
    console.log("A CRIAR!: ", textEl);
    RepeatTextScrollFx(textEl);
  });
}

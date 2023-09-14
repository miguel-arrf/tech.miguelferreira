var links = document.querySelectorAll("a[href]");
var cbk = function (e) {
  console.log("currentTarget href: ", e.currentTarget.href);
  console.log("-> window.location.href: ", window.location.href);
  if (e.currentTarget.href === window.location.href) {
    e.preventDefault();
    e.stopPropagation();
  }
};

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", cbk);
}

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

  // init LocomotiveScroll on page load
let locoScroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});

// STARTS LOCOMOTIVE MIDDLEMAN
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);
// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".scrollContainer", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) :    locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
});

/// Horizontal section scroll:
let horizontalSection = document.querySelector('.horizontal')
console.log("horizontalSection.scrollWidth: ", horizontalSection.scrollWidth)


/*let tl = gsap.timeline({defaults:{ease:"none"}})
  .to(".horizontal", {
    x: () => horizontalSection.scrollWidth * -1,
  xPercent: 100
  })

ScrollTrigger.create({
  trigger:".horizontal",
  start: 'center center',
  end: '+=3000px',
  pin: '.containerHorizontal',
  scrub:true,
  markers: true
})*/

gsap.to('.horizontal', {
  x: () => horizontalSection.scrollWidth * -1,
  xPercent: 100,
  scrollTrigger: {
    trigger: '.horizontal',
    start: 'center center',
    end: '+=3000px',
    pin: '.containerHorizontal',
    scrub: true,
    scroller:".scrollContainer",
    markers: true,
    delay: 3,
    invalidateOnRefresh: true,
    snap: {
      snapTo: 0.1,
      duration: 0.02,
      ease: "power1.inOut"
    },
  },
  ease: "power1.inOut" // Add this line 👍
});
console.log("saimos daqui")
// ENDS LOCOMOTIVE MIDDLEMAN

  // do something after the transition finishes
  barba.hooks.after((data) => {
    locoScroll.update();
    //console.log("here!");
    document.querySelector("html").classList.remove("is-transitioning");

    //console.log("current -> ", data.current.namespace);
    //console.log("next -> ", data.next.namespace);

    barba.wrapper.classList.remove("is-animating");
    ga("set", "page", window.location.pathname);
    ga("send", "pageview");
  });

  // scroll to the top of the page
  barba.hooks.enter((data) => {
    window.scrollTo(0, 0);
  });


  barba.init({
    sync: true,
    views: [
      {
        namespace: "blogs",

        async afterEnter({ current, next }) {
          var element = document.getElementById("theFirstBlogPost");

          var nextElement = document.getElementById("unbabelInternship");

          var transitionedFrom = current["namespace"];
          var delay = 0;
          if (transitionedFrom !== "") {
            delay = 1.0;
          }

          gsap.fromTo(
            element,
            {
              opacity: 0,
              y: 60
            },
            { opacity: 1, y: 0, delay: delay + 0.2 }
          );

          gsap.fromTo(
            nextElement,
            {
              opacity: 0,
              y: 60
            },
            { opacity: 1, y: 0, delay: delay }
          );
        }
      },
      {
        namespace: "blogPost-1",
        async beforeEnter({ next }) {
          const bottomDOM = document.getElementsByTagName("body")[0];
          const newScript_4 = document.createElement("script");
          const oldScript_4 = document.getElementById("main-script-4");

          if (oldScript_4 != null) {
            newScript_4.src = "indexBlog.js";
            newScript_4.id = "main-script-1";
            newScript_4.classList.add(Math.random());

            oldScript_4.remove();
            bottomDOM.appendChild(newScript_4);
          } else {
            newScript_4.src = "indexBlog.js";
            newScript_4.id = "main-script-4";
            newScript_4.classList.add(Math.random());

            bottomDOM.appendChild(newScript_4);
          }
        },
        async afterEnter({ next }) {
          console.log("blogPost-1");
          var scrollText = document.querySelector("#scrollText");
          gsap.from(scrollText, {
            scrollTrigger: {
              trigger: scrollText,
              scrub: true,
              start: "top bottom",
              end: "top top"
            },
            ease: "none",
            x: "-100vw"
          });
          var swiper = new Swiper(".mySwiper", {
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            },
            spaceBetween: 25,
            slidesPerView: 1
          });
        }
      },
      {
        namespace: "home",
        async beforeEnter({ next }) {
          gsap.globalTimeline.clear();
          gsap.globalTimeline.clear();
          // Script URLs to load
          //First let's check if the scripts are already there or not, and, if they are, let's remove them
          const bottomDOM = document.getElementsByTagName("body")[0];
          const newScript_1 = document.createElement("script");
          const newScript_2 = document.createElement("script");
          const newScript_3 = document.createElement("script");

          const oldScript_1 = document.getElementById("main-script-1");
          const oldScript_2 = document.getElementById("main-script-2");
          const oldScript_3 = document.getElementById("main-script-3");

          if (
            oldScript_1 != null &&
            oldScript_2 != null &&
            oldScript_3 != null
          ) {
            newScript_1.src = "index.js";
            newScript_1.id = "main-script-1";
            newScript_1.classList.add(Math.random());

            newScript_2.src = "newIndex.js";
            newScript_2.id = "main-script-2";
            newScript_2.classList.add(Math.random());

            newScript_3.src = "indexJS.js";
            newScript_3.id = "main-script-3";
            newScript_3.classList.add(Math.random());
            //console.log("THIS IS NOT WORKING PA0444");

            oldScript_1.remove();
            oldScript_2.remove();
            oldScript_3.remove();

            bottomDOM.appendChild(newScript_1);
            bottomDOM.appendChild(newScript_2);
            bottomDOM.appendChild(newScript_3);

            ScrollTrigger.clearScrollMemory();
            ScrollTrigger.refresh();
          } else {
            newScript_1.src = "index.js";
            newScript_1.id = "main-script-1";
            newScript_1.classList.add(Math.random());

            newScript_2.src = "newIndex.js";
            newScript_2.id = "main-script-2";
            newScript_2.classList.add(Math.random());

            newScript_3.src = "indexJS.js";
            newScript_3.id = "main-script-3";
            newScript_3.classList.add(Math.random());
            //console.log("THIS IS NOT WORKING PA0444");

            bottomDOM.appendChild(newScript_1);
            bottomDOM.appendChild(newScript_2);
            bottomDOM.appendChild(newScript_3);

            ScrollTrigger.clearScrollMemory();
            ScrollTrigger.refresh();
          }
        },
        async afterEnter({ next }) {
          //console.log("aqui cheguei a caminho de viseu!");
          textDisplacementAnimation();
          WWDCText();

          //console.log("mas aqui já nao huwhuh");
          setPinAnimation();
          //console.log("THIS IS NOT WORKING PA1");

          setSectionAnimation();
          //console.log("THIS IS NOT WORKING PA2");

          circles();
          //console.log("THIS IS NOT WORKING PA3");
        }
      }
    ],
    transitions: [
      {
        async leave(data) {
          await loaderIn();
          data.current.container.remove();
        },
        async beforeEnter(data) {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        },
        async enter() {
          loaderAway();
        }
      }
    ]
  });
}

window.addEventListener("load", function () {
  init();
});

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
      //console.log("DOM.el.innerHTML: ", DOM.el.innerHTML);

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
  //console.log("FUI CHAMADO!");
  // Preload images and fonts and remove loader
  // Apply the effect on these elements
  document.querySelectorAll("[data-text-rep]").forEach((textEl) => {
    //console.log("A CRIAR!: ", textEl);
    RepeatTextScrollFx(textEl);
  });
}

function WWDCText() {
  // Rate = Distance over Time r=d/t
  // If we want to define the rate, and
  // the distance is determined,
  // time will have to be variable

  // We want to define the rate, and we can
  // define that statically
  r = 100;
  adjustJank = 4; // Set this to 0 to see the jank I'm talking about ... this just adds to the distance animated to smooth out the seam

  // Get the initial scroll elements and save them for later
  const scrollElems = document.querySelectorAll(".container p");

  // Adjust our tween based on the object and distance given
  function adjustTween(obj, d) {
    // Get the progress of the previous tween if it exists
    let progress = 0;
    if (obj.tween) {
      progress = obj.tween.progress();
      // Kill the previous tween
      obj.tween.kill();
    }

    // r = d/t
    // r*t = d
    // t = d/r

    // Set the proper time
    var t = d / r;

    // Create a new tween to animate our text so that it loops
    // Make sure to save it to the object so we can refer to it later
    obj.tween = gsap
      .fromTo(
        obj.parentElement,
        { x: 0 },
        {
          duration: t,
          x: "-" + (d + adjustJank),
          ease: "linear",
          repeat: -1
        }
      )
      .progress(progress); // Set the progress of the new tween to the same value of
    // the previous tween (if it exists) before it was killed
  }

  // Set up for what appears to be an seamless stream of text
  // This could go in an init() function
  scrollElems.forEach((obj, i) => {
    var d = obj.offsetWidth;
    var parent = obj.parentElement;
    var clone = obj.cloneNode(true);
    parent.appendChild(clone);
    gsap.set(parent.parentElement, { width: d });

    adjustTween(obj, d);
  });

  // Adjust widths and tweens on resize
  window.addEventListener("resize", () => {
    scrollElems.forEach((obj, i) => {
      var d = obj.offsetWidth;
      var parent = obj.parentElement;
      gsap.set(parent.parentElement, { width: d });
      adjustTween(obj, d);
    });
  });
}

gsap.registerPlugin(ScrollTrigger);//, ScrollSmoother);

console.log("index.js");

// create the scrollSmoother before your scrollTriggers

/*function myFunction(x) {
  if (x.matches) {
    ScrollSmoother.create({
      smooth: 0.8,               // how long (in seconds) it takes to "catch up" to the native scroll position
      smoothTouch: true,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
    });
  } else {
    var sm = ScrollSmoother.get();
    if (sm) {
      sm.kill();
    }
  }
}

// match media if the screen width is at least 600px:
var x = window.matchMedia("(min-width: 600px)")
myFunction(x)
x.addListener(myFunction)*/

/*ScrollTrigger.normalizeScroll({
  allowNestedScroll: true, 
  lockAxis: false,
  momentum: self => Math.min(3, Math.abs(self.velocityY) / 1000), // dynamically control the duration of the momentum when flick-scrolling
  type: "touch,wheel,pointer", // now the page will be drag-scrollable on desktop because "pointer" is in the list 
});*/


let welcomeLoader = document.querySelector(".welcomeLoader");
// Uses gsap to put opacity to 0
gsap.to(welcomeLoader, {
  opacity: 0,
  duration: 1,
  delay: 1,
  ease: "power1.inOut",
  onComplete: () => {
    welcomeLoader.style.display = "none";
  }
});

gsap.to(document.querySelector("#loaderTextWelcomeLoader"), {
  opacity: 0,
  duration: 1,
  delay: 0.5,
  ease: "power1.inOut",

});

/// Horizontal section scroll:
let horizontalSection = document.querySelector('.horizontal')

const scroll = new LocomotiveScroll({
  el: document.querySelector('#smooth-wrapper'),
  smooth: true,
  getDirection: true,
  tablet: {smooth: true},
  smartphone: {smooth: true},
})

  /* update scroll (height) when all images are loaded */
  imagesLoaded(document.querySelector('#smooth-wrapper'), { background: true }, function () {
    scroll.update();
    console.log("Images loadeded");
  });


scroll.on("scroll", () => {
  try {
    ScrollTrigger.update();
  } catch {
    console.log("issue updating scrolltrigger")
  }
});

ScrollTrigger.scrollerProxy('#smooth-wrapper', {
  scrollTop(value) {
    return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y
  },
  getBoundingClientRect()  {
return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight}
  },
  pinType: document.querySelector('#smooth-wrapper').style.transform ? "transform" : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.defaults({ scroller: "#smooth-wrapper" });
ScrollTrigger.update();

// Sets horizontal container animation
gsap.to('.horizontal', {
  x: () => horizontalSection.scrollWidth * -1,
  xPercent: 100,
  scrollTrigger: {
    trigger: '.horizontal',
    start: 'center center',
    end: '+=3000px',
    scroller: "#smooth-wrapper",
    pin: '.containerHorizontal',
    scrub: true,
    delay: 3,
    markers: false,
    invalidateOnRefresh: true,
    /*snap: {
      snapTo: 0.1,
      duration: 0.02,
      ease: "power1.inOut"
    },*/
  },
  ease: "power1.inOut"
})



// Sets emoji animation:
gsap.fromTo(
  ".emojiAnimation",
  { opacity: 1, rotate: 0 },
  {
    scrollTrigger: {
      trigger: ".emojiAnimation",
      markers: false,
      start: "20px 80%",
      scrub: 1,
      toggleActions: "play none none none",
      scroller: "#smooth-wrapper"
    },

    opacity: 1,
    duration: 0.3,
    rotate: "50deg"
  }
);

gsap.fromTo(
  ".emojiAnimation1",
  { opacity: 1, rotate: "0deg" },
  {
    scrollTrigger: {
      trigger: ".emojiAnimation1",
      markers: false,
      start: "20px 80%",
      scrub: 1,
      toggleActions: "play none none none",
      scroller: "#smooth-wrapper"
    },

    opacity: 1,
    duration: 0.3,
    rotate: "50deg"
  }
);


// Sets Pin emoji animation:
function setPinAnimation() {
  gsap.fromTo(
    ".pinAnimation",
    { top: "0.5rem", marginTop: "0rem" },
    {
      scrollTrigger: {
        trigger: ".pinAnimation",
        start: "top center",
        scrub: 1,
        markers: false,
        pin: false,
        scroller: "#smooth-wrapper"
      },
      marginTop: "-2.5rem",
      top: "100%",
      opacity: 1
    }
  );
}

setPinAnimation();


// Sets Bye animation:


gsap.fromTo(
  ".byeAnimation",
  { opacity: 0.5 },
  {
    scrollTrigger: {
      trigger: ".byeAnimation",
      start: "bottom bottom",
      markers: false,
      end: "bottom bottom",
      scroller: "#smooth-wrapper"
    },
    opacity: 1
  }
);



// Sets section animations:
function setSectionAnimation() {
  gsap.utils.toArray("section").forEach((section, index) => {
    const w = section.querySelector(".wrapper");
    const [x, xEnd] =
      index % 2
        ? ["100%", (w.scrollWidth - section.offsetWidth) * -1]
        : [w.scrollWidth * -1, 0];
    gsap.fromTo(
      w,
      { x },
      {
        x: xEnd,
        scrollTrigger: {
          trigger: section,
          markers: false,
          end: "bottom 50%",
          scrub: 0.5,
          scroller: "#smooth-wrapper"
        }
      }
    );
  });

  const section = document.querySelector(".coolSection");
  const w = section.querySelector(".wrapper");

  const [x, xEnd] = ["100%", (w.scrollWidth - section.offsetWidth) * -1];
  gsap.fromTo(
    w,
    { x },
    {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        markers: false,
        start: "bottom bottom",
        scrub: 0.5,
        scroller: "#smooth-wrapper"
      }
    }
  );

}


setSectionAnimation();




function scrollToProjects() {
  scroll.stop();
  scroll.scrollTo(document.querySelector("#projectsSection"));
}

ScrollTrigger.config({ignoreMobileResize: true});


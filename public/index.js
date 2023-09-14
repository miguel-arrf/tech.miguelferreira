gsap.registerPlugin(ScrollTrigger);//, ScrollSmoother);

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


/// Horizontal section scroll:
let horizontalSection = document.querySelector('.horizontal')






const scroll = new LocomotiveScroll({
  el: document.querySelector('#smooth-wrapper'),
  smooth: true,
  tabled: {smooth: true},
  smartphone: {smooth: true},
})

scroll.on("scroll", () => {
  console.log("locomoative on scrolll");
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
    markers: true,
    invalidateOnRefresh: true,
    snap: {
      snapTo: 0.1,
      duration: 0.02,
      ease: "power1.inOut"
    },
  },
  ease: "power1.inOut"
})
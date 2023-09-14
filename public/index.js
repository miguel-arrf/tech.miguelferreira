gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
gsap.registerPlugin();

// create the scrollSmoother before your scrollTriggers
ScrollSmoother.create({
  smooth: 0.8,               // how long (in seconds) it takes to "catch up" to the native scroll position
  smoothTouch: true,        // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});

/*ScrollTrigger.normalizeScroll({
  allowNestedScroll: true, 
  lockAxis: false,
  momentum: self => Math.min(3, Math.abs(self.velocityY) / 1000), // dynamically control the duration of the momentum when flick-scrolling
  type: "touch,wheel,pointer", // now the page will be drag-scrollable on desktop because "pointer" is in the list 
});*/



/// Horizontal section scroll:
let horizontalSection = document.querySelector('.horizontal')
console.log("horizontalSection.scrollWidth: ", horizontalSection.scrollWidth)



gsap.to('.horizontal', {
  x: () => horizontalSection.scrollWidth * -1,
  xPercent: 100,
  scrollTrigger: {
    trigger: '.horizontal',
    start: 'center center',
    end: '+=3000px',
    pin: '.containerHorizontal',
    scrub: true,
    delay: 3,
    invalidateOnRefresh: true,
    snap: {
      snapTo: 0.1,
      duration: 0.02,
      ease: "power1.inOut"
    },
  },
  ease: "power1.inOut" // Add this line 👍
})



/*const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".scrollContainer"),
  smooth: true,
  direction: "vertical"
}) */

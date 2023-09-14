gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin();


ScrollTrigger.normalizeScroll(true); // enable

function circles() {
  gsap.to("#secondCircle", {
    duration: 10,
    y: 300,
    x: 40,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    scrollTrigger: {
      trigger: "#secondCircle",
      start: "top bottom",
      toggleActions: "play pause play pause"
    }
  });

  gsap.to("#thirdCircle", {
    duration: 10,
    y: 50,
    x: -600,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    scrollTrigger: {
      trigger: "#thirdCircle",
      start: "top bottom",
      toggleActions: "play pause play pause"
    }
  });

  gsap.to("#fourthCircle", {
    duration: 10,
    y: -500,
    x: -600,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    scrollTrigger: {
      trigger: "#fourthCircle",
      start: "top bottom",
      toggleActions: "play pause play pause"
    }
  });
}

circles();

// completo_card
gsap.fromTo(
  ".completo_card",
  { y: 100, opacity: 0, scale: 0.9 },
  {
    scale: 1,
    y: 0,
    opacity: 1.0,
    duration: 1,
    delay: 0.3,
    ease: Back.easeOut.config(1.7)
  }
);

// halo_card
gsap.fromTo(
  ".halo_card",
  { y: 100, opacity: 0, scale: 0.9 },
  {
    scale: 1,
    y: 0,
    opacity: 1.0,
    duration: 1,
    delay: 0.3,
    ease: Back.easeOut.config(1.7)
  }
);





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
})



/*const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".scrollContainer"),
  smooth: true,
  direction: "vertical"
}) */

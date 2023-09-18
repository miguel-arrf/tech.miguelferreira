document.body.style.overflow = "auto";
document.scrollingElement.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin();



/*
gsap.fromTo(
  ".crcBox",
  { opacity: 0, marginTop: "-200px" },
  {
    scrollTrigger: {
      trigger: ".crcBox",
      start: "20px 80%",
      markers: false,
      end: "bottom 50%",
      scrub: 1,
      toggleActions: "play none none none"
    },
    marginTop: 0,
    opacity: 1
  }
);

gsap.fromTo(
  ".deepLearningBox",
  { opacity: 0, marginTop: "-200px" },
  {
    scrollTrigger: {
      trigger: ".deepLearningBox",
      start: "20px 80%",
      markers: false,
      end: "bottom 50%",
      scrub: 1,
      toggleActions: "play none none none"
    },
    marginTop: 0,
    opacity: 1
  }
);

gsap.fromTo(
  ".nameBox",
  { opacity: 0, marginTop: "-200px" },
  {
    scrollTrigger: {
      trigger: ".nameBox",
      start: "20px 80%",
      markers: false,
      end: "bottom 50%",
      scrub: 1,
      toggleActions: "play none none none"
    },
    marginTop: "2.5rem",
    opacity: 1
  }
);*/




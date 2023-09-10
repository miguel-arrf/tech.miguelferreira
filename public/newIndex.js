document.body.style.overflow = "auto";
document.scrollingElement.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin();

/*gsap.fromTo(
  ".educationBox",
  { opacity: 1, yPercent: "-50" },
  {
    scrollTrigger: {
      trigger: ".educationBox",
      markers: false,
      scrub: 1,
      toggleActions: "play none none none"
    },
    yPercent: "0",
    opacity: 1
  }
);*/
/*
gsap.fromTo(
  ".certificationsBox",
  { opacity: 1, yPercent: "-50" },
  {
    scrollTrigger: {
      trigger: ".certificationsBox",
      markers: false,
      scrub: 1,
      toggleActions: "play none none none"
    },
    yPercent: "0",
    opacity: 1
  }
);*/

/*
gsap.fromTo(
  ".educationBox",
  { opacity: 0, marginTop: "-500px" },
  {
    scrollTrigger: {
      trigger: ".educationBox",
      markers: false,
      scrub: 1,
      toggleActions: "play none none none"
    },
    marginTop: 0,
    opacity: 1
  }
);

gsap.fromTo(
  ".certificationsBox",
  { opacity: 0, marginTop: "-100px" },
  {
    scrollTrigger: {
      trigger: ".certificationsBox",
      start: "860px 80%",
      markers: false,
      end: "bottom 50%",
      scrub: 1,
      toggleActions: "play none none none"
    },
    marginTop: "2.5rem",
    opacity: 1
  }
);*/

gsap.fromTo(
  ".emojiAnimation",
  { opacity: 1, rotate: 0 },
  {
    scrollTrigger: {
      trigger: ".emojiAnimation",
      markers: false,
      start: "20px 80%",
      scrub: 1,
      toggleActions: "play none none none"
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
      toggleActions: "play none none none"
    },

    opacity: 1,
    duration: 0.3,
    rotate: "50deg"
  }
);

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
        pin: false
      },
      marginTop: "-2.5rem",
      top: "100%",
      opacity: 1
    }
  );
}

gsap.fromTo(
  ".pinAnimation",
  { top: "0.5rem", marginTop: "0rem" },
  {
    scrollTrigger: {
      trigger: ".pinAnimation",
      start: "top center",
      scrub: 1,
      markers: false,
      pin: false
    },
    marginTop: "-2.5rem",
    top: "100%",
    opacity: 1
  }
);

gsap.fromTo(
  ".byeAnimation",
  { opacity: 0.5 },
  {
    scrollTrigger: {
      trigger: ".byeAnimation",
      start: "bottom bottom",
      markers: false,
      end: "bottom bottom"
    },
    opacity: 1
  }
);

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
          scrub: 0.5
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
        scrub: 0.5
      }
    }
  );

  const imageSection = document.querySelector(".imageSection");
  const wImage = imageSection.querySelector(".wrapper");

  const [newX, newXEnd] = [
    "100%",
    (wImage.scrollWidth - imageSection.offsetWidth) * -1
  ];
  gsap.fromTo(
    wImage,
    { newX },
    {
      x: newXEnd,
      scrollTrigger: {
        trigger: section,
        markers: false,
        start: "bottom bottom",
        scrub: 0.5
      }
    }
  );
}

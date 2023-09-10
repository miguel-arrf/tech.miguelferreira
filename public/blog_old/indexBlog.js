function configureswiper() {
  var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    spaceBetween: 25,
    slidesPerView: 1
  });
}

function configureGSAP() {
  gsap.registerPlugin(ScrollTrigger);

  var targets = gsap.utils.toArray("p");
  var list = document.querySelector("#list");

  var last3Elements = targets.splice(targets.length - 3, 3);

  targets.push(list);

  targets.forEach((elem) => {
    gsap.from(elem, {
      scrollTrigger: {
        trigger: elem,
        scrub: true,
        start: "top bottom",
        end: "top center"
      },
      filter: "blur(10px)",
      ease: "none",
      y: "20px"
    });
  });

  /*var scrollText = document.querySelector("#scrollText");
  gsap.from(scrollText, {
    scrollTrigger: {
      trigger: scrollText,
      scrub: true,
      start: "top bottom",
      end: "top top"
    },
    ease: "none",
    x: "-100vw"
  });*/

  last3Elements.forEach((elem) => {
    gsap.from(elem, {
      scrollTrigger: {
        trigger: targets[targets.length - 2],
        scrub: true,
        start: "top bottom",
        end: "top center"
      },
      filter: "blur(10px)",
      ease: "none",
      y: "20px"
    });
  });
}

function configureGSAPToKill() {
  gsap.killTweensOf("p");
  gsap.killTweensOf("ul");

  var targets = gsap.utils.toArray("p");
  var list = document.querySelector("#list");
  targets.push(list);

  targets.forEach((elem) => {
    gsap.to(elem, {
      filter: "blur(0px)",

      y: "0px"
    });
  });
}

window.addEventListener("load", function (event) {
  configureswiper();

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
  //configureGSAP();
});

var show = false;

function deactivateButton() {
  if (show) {
    console.log("deactivating filter!");
    configureGSAPToKill();
    var btn = document.querySelector("#deactivateBlurButton");
    btn.innerHTML = "Enable blur effect";
    show = false;
  } else {
    console.log("activating again!");
    var btn = document.querySelector("#deactivateBlurButton");
    btn.innerHTML = "Disable blur effect";
    configureGSAP();
    show = true;
  }
}

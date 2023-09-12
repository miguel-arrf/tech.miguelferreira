gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin();

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

console.log("olá!");

const supabase_url = "https://hgmiwkjjabqohfwocxsq.supabase.co";
const supabase_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnbWl3a2pqYWJxb2hmd29jeHNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA5MzQzMTIsImV4cCI6MTk4NjUxMDMxMn0.SvAbSPzUID67IZijAJK3ed6A3Bjl96qX3ds2LXIo39c";

var supabase = supabase.createClient(supabase_url, supabase_key);
console.log("supabase: ", supabase);

const fetchTodos = async () => {
  const { data, error } = await supabase.from("general").select(); // gets the data from supabase

  if (error) console.log("error", error);
  else console.log(data);
};

fetchTodos();


/// Horizontal section scroll:
let horizontalSection = document.querySelector('.horizontal')
console.log("horizontalSection.scrollWidth: ", horizontalSection.scrollWidth)

gsap.to('.horizontal', {
  x: () => horizontalSection.scrollWidth * -1,
  xPercent: 100,
  scrollTrigger: {
    trigger: '.horizontal',
    start: 'center center -=200px',
    end: '+=3000px',
    pin: '.containerHorizontal',
    scrub: true,
    markers: true,
    invalidateOnRefresh: true,
  }
})
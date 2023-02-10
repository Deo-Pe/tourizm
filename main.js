const navigatorIcon = document.querySelector(".navigator__icon");
const animItems = document.querySelectorAll(".anim-items");
const divScroll = document.querySelector(".gallery_img");
// const scrollDv = window.innerHeight - offDivSc / animStart;
const galeryImg = document.querySelectorAll(".imgBlock");
const navigationM = document.querySelector(".navMobile");
const navigationD = document.querySelector(".hedMenu");
const slides = document.querySelectorAll(".panel");
const counts = document.querySelectorAll(".colum");
const offDivSc = divScroll.offsetHeight;
const animStart = 3;

SmoothScroll({
  stepSize: 40,
  animationTime: 600,
  accelerationDelta: 90,
  accelerationMax: 2,
});

const controller = new ScrollMagic.Controller({
  globalSceneOptions: { triggerHook: "onLeave", duration: "200%" },
});

for (let i = 0; i < slides.length; i++) {
  new ScrollMagic.Scene({
    triggerElement: slides[i],
  })
    .setPin(slides[i], { pushFollowers: false })
    .addTo(controller);
}
//mobile menu
navigatorIcon.addEventListener("click", () => {
  navigatorIcon.classList.toggle("_active");
  document.querySelector(".navMobile").classList.toggle("activeNavMobile");
  document.body.classList.toggle("togleBody");
});

//galery
if (galeryImg.length > 0) {
  galeryImg.forEach((img) => {
    img.addEventListener("click", () => {
      const block = document.createElement("div");
      const content = `
        <div >
            <img class="activImgBlock" src="${img.src}">
        </div>
    `;
      block.classList.add("blockImg");
      document.body.classList.add("stop-scrolling");
      document.body.prepend(block);
      block.insertAdjacentHTML("afterbegin", content);
      block.addEventListener("click", (e) => {
        if (e.target === block) {
          document.body.removeChild(block);
          document.body.classList.remove("stop-scrolling");
        }
      });
    });
  });
}
//header animation
function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };
}

function animOnScroll() {
  for (let i = 0; i < animItems.length; i++) {
    const animItem = animItems[i];
    const animItemHeight = animItem.offsetHeight;
    const animItemOffset = offset(animItem).top;

    let animItemPoint = window.innerHeight - animItemHeight / animStart;
    if (animItemHeight > window.innerHeight) {
      animItemPoint = window.innerHeight - window.innerHeight / animStart;
    }

    if (
      pageYOffset > animItemOffset - animItemPoint &&
      pageYOffset < animItemOffset + animItemHeight
    ) {
      animItem.classList.add("_active");
    } else {
      if (!animItem.classList.contains("_anim-no-hide")) {
        animItem.classList.remove("_active");
      }
    }
  }
}
if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  setTimeout(() => {
    animOnScroll();
  }, 300);
}
//anim text
$(".gallery_img").scroolly([
  {
    from: "el-top = vp-bottom - 100px",
    to: "el-bottom = vp-bottom - 100px",
    cssFrom: {
      opacity: ".0",
    },
    cssTo: {
      opacity: "1",
    },
  },
  {
    from: "el-top = vp-top + 100px",
    to: "el-bottom = vp-top + 100px",
    cssFrom: {
      opacity: "1",
    },
    cssTo: {
      opacity: ".0",
    },
  },
]);

//mobile style
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  for (el of navigationM.children) {
    el.addEventListener("click", (e) => {
      const block = e.target.dataset.goto;
      window.scrollBy({
        top:
          document.querySelector(block).getBoundingClientRect().top +
          window.scrollY,
        behavior: "smooth",
      });
      document.querySelector(".navMobile").classList.toggle("activeNavMobile");
      navigatorIcon.classList.toggle("_active");
      document.body.classList.toggle("togleBody");
    });
  }
} else {
  for (el of navigationD.children) {
    el.addEventListener("click", (e) => {
      const block = e.target.dataset.goto;

      window.scrollBy({
        top:
          document.querySelector(block).getBoundingClientRect().top +
          window.scrollY,
        behavior: "smooth",
      });
    });
  }
}

//IntersectionObserver
const optionObserver = {
  root: null,
  rootMargin: "0px",
};

function up(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(document.querySelector(".counter"));
    }
    counts.forEach((span) => {
      let startCoun = 0;
      const timer = setInterval(() => {
        startCoun += 10;
        span.innerHTML = `${startCoun}`;
        if (startCoun >= span.dataset.count) {
          clearInterval(timer);
        }
      }, 50);
    });
  });
}
const observer = new IntersectionObserver(up, optionObserver);
observer.observe(document.querySelector(".counter"));

//arrow up
$("body").append('<div class="upbtn"></div>');
$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $(".upbtn").css({
      right: "-120px",
      bottom: "-120px",
    });
  } else {
    $(".upbtn").css({
      right: "-220px",
      bottom: "-220px",
    });
  }
});
$(".upbtn").on("click", function () {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    500
  );
  return false;
});

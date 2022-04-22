SmoothScroll({
    stepSize: 40,
    animationTime: 600,
    accelerationDelta: 90,
    accelerationMax: 2,
})

const controller = new ScrollMagic.Controller({ globalSceneOptions: { triggerHook: "onLeave", duration: "200%" } });

const slides = document.querySelectorAll(".panel");

for (let i = 0; i < slides.length; i++) {
    new ScrollMagic.Scene({
        triggerElement: slides[i]
    })
        .setPin(slides[i], { pushFollowers: false })
        .addTo(controller);
}


const animItems = document.querySelectorAll('.anim-items');
const divScroll = document.querySelector('.gallery_img');
const animStart = 3;
const offDivSc = divScroll.offsetHeight;
let scrollDv = window.innerHeight - offDivSc / animStart;
const galeryImg = document.querySelectorAll(".imgBlock")


if (galeryImg.length > 0) {
    galeryImg.forEach(img => {
        img.addEventListener('click', () => {
            const block = document.createElement("div")
            const content = `
		<div >
            <img class="activImgBlock" src="${img.src}">
		</div>
	`
            block.classList.add('blockImg')
            document.body.classList.add('stop-scrolling')
            document.body.prepend(block);
            block.insertAdjacentHTML("afterbegin", content);
            block.addEventListener('click', (e) => {
                if (e.target === block) {
                    document.body.removeChild(block);
                    document.body.classList.remove('stop-scrolling');
                }
            });
            // console.log(img.src);
        })
    });
}

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {

        for (let i = 0; i < animItems.length; i++) {
            const animItem = animItems[i];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;


            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            } else {
                if (!animItem.classList.contains('_anim-no-hide')) {
                    animItem.classList.remove('_active');
                }
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        }
    }

    setTimeout(() => {
        animOnScroll();
    }, 300);

}





$('.gallery_img').scroolly([{
    from: 'el-top = vp-bottom - 100px',
    to: 'el-bottom = vp-bottom - 100px',
    cssFrom: {
        opacity: '.0'
    },
    cssTo: {
        opacity: '1'
    }
}, {
    from: 'el-top = vp-top + 100px',
    to: 'el-bottom = vp-top + 100px',
    cssFrom: {
        opacity: '1'
    },
    cssTo: {
        opacity: '.0'
    }
}]);



$('.hedMenu').scroolly([
    {
        from: 'con-top',
        to: 'con-bottom - 100el = vp-top',
        css: {
            position: 'fixed',
            right: '35%',
            top: '5%'
        }
    },
    {
        from: 'con-bottom - 100el = vp-top',
        css: {
            position: 'absolute'
        }
    }

], $('.header'));
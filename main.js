const animItems = document.querySelectorAll('.anim-items');
const divScroll = document.querySelector('.gallery_img');
const animStart = 3;
const offDivSc = divScroll.offsetHeight;
let scrollDv = window.innerHeight - offDivSc / animStart;

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll() {
        let dvTop = divScroll.getBoundingClientRect().top;

        if (dvTop <= scrollDv && dvTop > 0) {
            console.log(111);
        }




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
    css:{
        position: 'fixed',
        right: '35%',
        top: '5%'
    }
},
{   
    from: 'con-bottom - 100el = vp-top',
    css:{
        position: 'absolute'
    }
}
    
], $('.header'));
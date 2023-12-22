function CSSlider(node){
    // timings
    let autoDelay = 5000;
    let currentSlideIndex = 0;
    let currentStepProgress = 0;
    let currentProgress = 0;
    let timerID = 0;    
    
    // make slider of images
    let elPictureSlider = node.querySelector('.cs_slider_pictures');
    let elContentSlider = node.querySelector('.cs_slider_contents');
    let elCarousel = node.querySelector('.cs_slider_carousel');
    let elLanding = node.querySelector('.cs_slider_bodies');
    
    let listSlideNavTriggers = node.querySelectorAll('.cs_slider_navitem');
    let listPictures = node.querySelectorAll('.cs_slider_bodies .cs_slider_picture');
    let listContents = node.querySelectorAll('.cs_slider_bodies .cs_slider_content');

    // console.log(elPictureSlider,listPictures)
    // elPictureSlider.append(...listPictures);
    elCarousel.classList.remove('d-none');
    elLanding.classList.add('d-none');
    node.classList.add('csslider');

    let wrapIntoSwiper = (listNodes,elTarget,params={})=>{
        
        let elSwiper = document.createElement('div');
            elSwiper.className = 'swiper br-16'; elTarget.append(elSwiper);
    
        let elSwiperWrapper = document.createElement('div');
            elSwiperWrapper.className = 'swiper-wrapper'; elSwiper.append(elSwiperWrapper);
    
            listNodes.forEach(el => {
            let elSwiperSlide = document.createElement('div');
            elSwiperSlide.className = 'swiper-slide'; elSwiperWrapper.append(elSwiperSlide);
            elSwiperSlide.append(el);
        });

        return new Swiper(elSwiper,params);

    }

    let swiperPics = wrapIntoSwiper(listPictures,elPictureSlider,{effect:'slide',loop:false,spaceBetween:24});
    let swiperText = wrapIntoSwiper(listContents,elContentSlider,{effect: "fade",loop:false,simulateTouch:false});

    let swipers = [swiperPics, swiperText];

    // let swChangeHandler = (is,sw)=>{
    //     // console.log(sw.activeIndex,is)
    //     swipers.filter((item, index) => index != is).forEach(item => item.slideTo(sw.activeIndex))
    //     // sw.activeIndex
    // }
    let swChangeHandler = (sw)=>{
        currentSlideIndex = sw.realIndex;
        swiperText.slideTo(currentSlideIndex);
        setProgress(currentSlideIndex);
        // active
        listSlideNavTriggers.forEach(el => el.classList.remove('active'));
        listSlideNavTriggers[currentSlideIndex].classList.add('active');
        // console.log(listSlideNavTriggers);
    }

    // swipers.forEach((sw,i) => {
    //     sw.on('slideChange',swChangeHandler.bind(sw,i));
    // })
    swiperPics.on('slideChange',swChangeHandler);

    let fnGoTo = (n)=>{
        currentSlideIndex = n;
        currentStepProgress = 0;
        setProgress(n);
        swipers.forEach(sw => sw.slideTo(n));
        // swiper.slideTo(index, speed, runCallbacks)
    }

    let setProgress = (index=0, currProgress=0)=>{
        node.style.setProperty('--index',index);

    }
    let setCurrProgress = (currProgress=0)=>{
        
        let v = node.style.getPropertyValue('--curr-progress');
        if(v != currProgress){
            // console.log(node.style.getPropertyValue('--index'),currProgress);
            node.style.setProperty('--curr-progress',currProgress);
        }
    }

    // nav

    let navHandler = (n) => {
        // console.log('navHandler',n);
        fnGoTo(n);
        currentStepProgress = 0; setCurrProgress(currentStepProgress);
    }

    listSlideNavTriggers.forEach((el,i)=>el.addEventListener('click',navHandler.bind(el,i)))    

    let startTimer = ()=>{
        if(timerID) stopTimer();
        
        let count = node.style.getPropertyValue('--count'); if(!count) return;
        let steps = Math.floor(elCarousel.clientWidth / count);
        let delay = Math.round(autoDelay / steps);
        timerID = setInterval(()=>{
            currentProgress = (currentStepProgress % steps) / steps;
            setCurrProgress(Math.floor(currentProgress * 100));
            // console.log(currentProgress)
            currentStepProgress++;
            let isStart = (currentStepProgress % steps) == 0;
            if(isStart){
                // console.log('go!');
                fnGoTo((currentSlideIndex+1) % count);
                }
        },delay);
        // console.log('steps',steps,delay);
        
    }

    let stopTimer = ()=>{
        if(timerID) timerID = clearInterval(timerID);
    };

    swChangeHandler({realIndex:0});
    // startTimer();

    let windowScrollHandler = function(e){
        // let wy = window.scrollY;
        let wh = window.outerHeight;
        let rect = node.getBoundingClientRect();
        let by = rect.y;
        let bb = wh - rect.bottom;
        let runTimer = (by < wh && bb < (wh-64));



        if(runTimer && !timerID) startTimer();
        if(runTimer == false) stopTimer();

    };

    window.addEventListener('scroll',windowScrollHandler);

}
document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('.cs_slider').forEach(el => new CSSlider(el)));

// main_cards
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.main_cards .swiper').forEach(
        el => new Swiper(el,{
            effect:'slide',
            loop:true,
            slidesPerView: 1,
            spaceBetween:24,
            navigation: {
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
            },
            breakpoints:{
                768:{
                    slidesPerView: 2,
                },
                1280:{
                    slidesPerView: 'auto',
                    // centeredSlides: true,

                }
            }
        })
    );
    document.querySelectorAll('.main_cards_head .control').forEach((el,i)=>el.addEventListener('click',function(e){
        // console.log()
        let el = e.currentTarget;
        let css = [...el.classList].map(c=>`.${c}`).join('')
        let target = el.closest('.main_cards').querySelector(`.main_cards .swiper ${css}`);//.querySelector(css);
        if(target) target.dispatchEvent(new Event('click'));
        //console.log()
    }))
});



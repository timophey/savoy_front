"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function CSSpoiler(node) {
  var eventOpened = new CustomEvent('opened');
  var eventClosed = new CustomEvent('closed');
  var trigger = node.querySelector('.spoiler-head');
  var body = node.querySelector('.spoiler-body');
  node.classList.add('spoiler-initialized');
  var actionOpen = function actionOpen() {
    var bh = body.scrollHeight;
    node.classList.add('active');
    node.style.setProperty('--bh', bh);
    node.dispatchEvent(eventOpened);
  };
  var actionClose = function actionClose() {
    node.classList.remove('active');
    node.style.setProperty('--bh', null);
    node.dispatchEvent(eventClosed);
  };
  var actionToggle = function actionToggle() {
    return node.classList.contains('active') ? actionClose() : actionOpen();
  };
  trigger.addEventListener('click', actionToggle);
  return {
    open: actionOpen,
    close: actionClose,
    toggle: actionToggle
  };
}
function CSAccordion(node) {
  var listNodes = node.querySelectorAll('.spoiler');
  var eventLeave = new CustomEvent('leave');
  var eventComes = new CustomEvent('comes');
  var eventLeaveHalf = new CustomEvent('leaveHalf');
  var eventComesHalf = new CustomEvent('comesHalf');
  var arSpoiler = [];
  var switchOpened = function switchOpened(n) {
    arSpoiler.forEach(function (sp, i) {
      return i != n && arSpoiler[i].close();
    });
  };
  listNodes.forEach(function (el, i) {
    arSpoiler[i] = new CSSpoiler(el);
    el.addEventListener('opened', switchOpened.bind(node, i));
  });
  var visible = false;
  var visibleHalf = false;
  var windowScrollHandler = function windowScrollHandler() {
    var wh = window.outerHeight;
    var rect = node.getBoundingClientRect();
    var by = rect.y;
    var bb = wh - rect.bottom;
    var vis = by < wh && bb < wh - 64;
    // whole
    if (vis != visible) {
      node.dispatchEvent(vis ? eventComes : eventLeave);
      console.log(vis ? 'come' : 'leave');
      visible = vis;
    }
    // half
    var vih = by < wh / 2 && bb < wh / 2 + 64; // && bbh < (wh/2-64)
    //console.log('vih',vih,bb);
    if (vih != visibleHalf) {
      node.dispatchEvent(vih ? eventComesHalf : eventLeaveHalf);
      console.log(vih ? 'comesHalf' : 'leaveHalf');
      visibleHalf = vih;
    }
  };
  window.addEventListener('scroll', windowScrollHandler);
}
document.addEventListener('DOMContentLoaded', function () {
  _toConsumableArray(document.querySelectorAll('.spoiler')).filter(function (el) {
    return !el.matches('.accordion .spoiler');
  }).forEach(function (el) {
    return new CSSpoiler(el);
  });
  document.querySelectorAll('.accordion').forEach(function (el) {
    return new CSAccordion(el);
  });
});
function CSInput(node) {
  var rRoot = document.createElement('div');
  rRoot.className = 'csinput';
  node.parentElement.append(rRoot);
  if (node.disabled) rRoot.classList.add('disabled');
  rRoot.append(node);
  var elLabel = document.createElement('div');
  elLabel.className = 'csinput-label';
  elLabel.innerText = node.placeholder;
  rRoot.append(elLabel);
  var checkDirty = function checkDirty() {
    var isEmpty = String(node.value).trim().length == 0;
    rRoot.dataset.dirty = isEmpty ? 0 : 1;
  };
  var onFocus = function onFocus() {
    rRoot.classList.add('active');
  };
  var onBlur = function onBlur() {
    rRoot.classList.remove('active');
    checkDirty();
  };
  elLabel.addEventListener('click', function () {
    node.focus();
  });
  node.addEventListener('blur', onBlur);
  node.addEventListener('focus', onFocus);
  checkDirty();
}
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.form-input').forEach(function (el) {
    return new CSInput(el);
  });
});
function CSSelect(node) {
  var rRoot = document.createElement('div');
  rRoot.className = 'csselect';
  node.parentElement.append(rRoot);
  var rValue = document.createElement('div');
  rValue.className = 'csselect-value';
  rRoot.append(rValue);
  rRoot.append(node);
  var rPlace = document.createElement('div');
  rPlace.className = 'csselect-inner';
  rPlace.innerText = 'value';
  rValue.append(rPlace);
  var rList = document.createElement('div');
  rList.className = 'csselect-list';
  rRoot.append(rList);
  var rTrigger = document.createElement('div');
  rTrigger.className = 'csselect-trigger';
  rTrigger.innerHTML = '<i class="icon-Chevron-bottom d-active-none"></i><i class="icon-Chevron-top d-none d-active-inline-block"></i>';
  rValue.append(rTrigger);
  var selectOne = function selectOne(n) {
    node.options.selectedIndex = n;
    node.dispatchEvent(new Event('change'));
  };
  var rOpts = _toConsumableArray(node.options).map(function (op, i) {
    var rItem = document.createElement('div');
    rItem.className = 'csselect-item';
    rItem.innerHTML = op.innerHTML;
    rItem.addEventListener('click', selectOne.bind(rItem, i));
    rItem.addEventListener('mousedown', selectOne.bind(rItem, i));
    rItem.addEventListener('touchstart', selectOne.bind(rItem, i));
    rList.append(rItem);
    return rItem;
  });
  // console.log(rOpts)

  var valueFromOriginal = function valueFromOriginal() {
    var i = node.options.selectedIndex;
    var op = node.options[i];
    rOpts.forEach(function (el) {
      return el.classList.remove('active');
    });
    rOpts[i].classList.add('active');
    rPlace.innerHTML = op.innerHTML;
  };
  var actionExpand = function actionExpand() {
    // console.log('actionExpand')
    var bh = rList.scrollHeight;
    var rt = rRoot.getBoundingClientRect();
    var wh = window.outerHeight;
    var bt = wh - rt.bottom - rt.height * 2;

    // console.log(bh, bt, bh > bt)
    rRoot.classList.add('active');
    node.focus();
    rList.dataset.dno = bh > bt ? 1 : 0;
    rList.style.setProperty('height', "".concat(bh, "px"));
  };
  var actionCollapse = function actionCollapse() {
    // console.log('actionCollapse')
    rRoot.classList.remove('active');
    rList.style.setProperty('height', null);
  };
  var actionToggle = function actionToggle() {
    // console.log('actionToggle')
    return rRoot.classList.contains('active') ? actionCollapse() : actionExpand();
  };
  rRoot.addEventListener('click', actionToggle);
  node.addEventListener('change', valueFromOriginal);
  node.addEventListener('blur', function () {
    return setTimeout(actionCollapse, 100);
  });

  // node.style.setProperty('visibility','none');

  // console.log(node.options)
  valueFromOriginal();
}

// form-select

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.form-select').forEach(function (el) {
    return new CSSelect(el);
  });
});
function CSHHTop(node) {
  var eventLeave = new CustomEvent('leave');
  var eventComes = new CustomEvent('comes');

  // в заголовке могут быть текстовые и стилевые ноды
  // console.log(node);

  var getNodes = function getNodes(el) {
    var nodes = [];
    var list = el.childNodes;
    list.forEach(function (nd) {
      // console.log(nd,nd.tagName,nodes)
      if (nd.tagName) nodes.push.apply(nodes, _toConsumableArray(getNodes(nd)));else nodes.push(nd);
    });
    return nodes;
  };
  var textNodes = getNodes(node);
  var textSpans = [];
  // console.log(textNodes);

  var spanComesHandler = function spanComesHandler(i) {
    // пока без проверок
    // this.classList.remove('cshh-hidden');
    // нужно показать слово, если оно на расстоянии себя от низа
    var rect = this.getBoundingClientRect();
    var wh = window.outerHeight;
    var bb = wh - rect.bottom - rect.height,
      by = rect.y;
    if (bb > 64) {
      this.classList.remove('cshh-hidden');
    }
    // if(!i)
    //     console.log(this.innerText,`${by} < ${wh}`,by < wh,'bb',bb,'bb > 64',bb > 64)
  };
  textNodes.forEach(function (nd) {
    var words = nd.textContent.split(' ');
    // console.log(words)

    words.forEach(function (sw, i, ar) {
      var wrap0 = document.createElement('span');
      // wrap0.style.display='inline-block'; // moved to css
      wrap0.className = 'cshh cshh-hidden';
      wrap0.addEventListener('comes', spanComesHandler.bind(wrap0, i));
      var wrap1 = document.createElement('span');
      // wrap1.style.display='inline-block';  // moved to css
      wrap1.innerText = sw;
      wrap0.append(wrap1);
      nd.parentElement.insertBefore(wrap0, nd);
      // wrap0.append()
      if (i < ar.length - 1) {
        nd.parentElement.insertBefore(document.createTextNode(' '), nd);
      }
      textSpans.push(wrap0);
    });
    nd.remove();
  });
  var visible = false;
  var visibleHalf = false;
  var windowScrollHandler = function windowScrollHandler() {
    var wh = window.outerHeight;
    var rect = node.getBoundingClientRect();
    var by = rect.y;
    var bb = wh - rect.bottom;
    var vis = by < wh && bb < wh - 64;
    if (vis != visible) {
      // console.log('CSHHTop visible',vis);
      // ask each span test homself if visible =)
    }
    if (vis) textSpans.filter(function (el) {
      return el.matches('.cshh-hidden');
    }).forEach(function (el) {
      return el.dispatchEvent(eventComes);
    });
    visible = vis;
    var vih = by < wh / 2 && bb < wh / 2 + 64;
    if (vih != visibleHalf) {
      // node.dispatchEvent(vih ? eventComesHalf : eventLeaveHalf);
      // console.log(vih ? 'CSHHTop comesHalf' : 'CSHHTop leaveHalf');
    }
    visibleHalf = vih;
  };
  window.addEventListener('scroll', windowScrollHandler);
}
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.header_hidden_top').forEach(function (el) {
    return new CSHHTop(el);
  });
});
var elHeader;
document.addEventListener('DOMContentLoaded', function () {
  elHeader = document.querySelector('.siteWrapper header');
});
var windowScrollHandler = function windowScrollHandler(e) {
  if (!elHeader) return;
  var y = window.scrollY,
    st = y > 0;
  var themeNow = elHeader.dataset.theme;
  var themeSet = st ? 'dark' : 'light';
  if (themeNow != themeSet) {
    // console.log(themeSet);
    elHeader.dataset.theme = themeSet;
  }
};
window.addEventListener('scroll', windowScrollHandler);
function init_faq() {
  document.querySelectorAll('.main_faq .spoiler').forEach(function (el) {
    el.addEventListener('opened', function (e) {
      var el = e.target;
      var color = String(el.dataset.color).trim();
      if (!color) return;
      var root = el.closest('.main_faq');
      if (!root) return;
      document.body.style.setProperty('background-color', color);
      root.style.setProperty('background-color', color);
      // console.log(color,root)
    });
    el.addEventListener('closed', function (e) {
      var el = e.target;
      // let color = String(el.dataset.color).trim(); if(!color) return;
      var root = el.closest('.main_faq');
      if (!root) return;
      root.style.setProperty('background-color', null);
      document.body.style.setProperty('background-color', null);
      // console.log(color,root)
    });
  });
  var leaveHandler = function leaveHandler() {
    console.log('leaveHalf leaveHandler');
    var cl = this.closest('.main_faq');
    document.body.style.setProperty('background-color', null);
    // и фон блока тоже деактиаируем
    cl.classList.add('leaveHalf');
  };
  var comesHandler = function comesHandler() {
    console.log('comesHalf comesHandler');
    var cl = this.closest('.main_faq');
    if (cl) {
      document.body.style.setProperty('background-color', cl.style.backgroundColor);
    }
    cl.classList.remove('leaveHalf');
    // console.log(this)
  };
  document.querySelectorAll('.accordion').forEach(function (el) {
    el.addEventListener('leaveHalf', leaveHandler.bind(el));
    el.addEventListener('comesHalf', comesHandler.bind(el));
  });
}
document.addEventListener('DOMContentLoaded', init_faq);
function initMainMap() {
  var node = document.querySelector('.main_map_ymap');
  if (!node) return;
  var arPoints = [{
    name: 'Чистые пруды',
    latlng: [55.7666, 37.638495],
    link: 'https://yandex.ru/maps/org/savoy_chistyye_prudy/6353151837/'
  }, {
    name: 'Новослободская',
    latlng: [55.775626, 37.601317],
    link: 'https://yandex.ru/maps/org/savoy_italyanskiy_kvartal/61406058907/'
  }];
  var mapCenter = [arPoints.map(function (item) {
    return item.latlng[0];
  }).reduce(function (a, b) {
    return a + b;
  }, 0) / arPoints.length, arPoints.map(function (item) {
    return item.latlng[1];
  }).reduce(function (a, b) {
    return a + b;
  }, 0) / arPoints.length];
  console.log(mapCenter);
  console.log([57.140045511428, 65.576221868052]);
  var map = new ymaps.Map(node, {
    // center: [57.140045511428, 65.576221868052],
    center: mapCenter,
    zoom: 13,
    type: 'yandex#map'
    // controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
    // adjustZoomOnTypeChange: true
  }, {
    // searchControlProvider: 'yandex#search'
  });
  map.controls.add('zoomControl', {
    float: 'right'
    // position: {
    //     left: 40,
    //     top: 'center'
    // }
  });
  map.geoObjects.events.add('click', function (event) {
    location.href = event.get('target').properties.get('link');
  });
  var adaptives = {
    0: {
      center: mapCenter,
      zoom: 13,
      width: 0
    },
    1024: {
      center: [55.763248, 37.691611],
      zoom: 12,
      width: 1024
    },
    1280: {
      center: [55.770661, 37.665679],
      zoom: 13,
      width: 1024
    }
  };
  var timerResize = 0;
  var doResize = function doResize() {
    var geometry = {};
    for (var key in adaptives) {
      if (+key <= window.innerWidth) {
        geometry = adaptives[key];
      }
    }
    console.log(geometry);
    map.setCenter(geometry.center, geometry.zoom);
  };
  arPoints.forEach(function (item) {
    var mark = new ymaps.Placemark(item.latlng, {
      // iconContent: 'Москва', 
      hintContent: item.name,
      hintFitPane: false,
      link: item.link
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'images/icon_mark.svg',
      iconImageSize: [32, 32],
      hideIconOnBalloonOpen: false
    });

    // var hint1 = new ymaps.Hint(item.name, item.latlng, {
    //     // maxWidth: 200
    //     });
    console.log(map);
    // map.hint.add(hint1);
    // mark.hint.open();
    // mark.events.add('mouseenter', function(e){
    //     console.log('mouseenter',mark)
    //     mark.balloon.open();
    // })
    // mark.events.add('mouseleave', function(e){
    //     mark.balloon.close();
    // })

    map.geoObjects.add(mark);
  });
  doResize();
  window.addEventListener('resize', function () {
    clearTimeout(timerResize);
    timerResize = setTimeout(doResize, 500);
  });

  // mouseenter
}
window.addEventListener('load', initMainMap);
function CSSlider(node) {
  // timings
  var autoDelay = 5000;
  var currentSlideIndex = 0;
  var currentStepProgress = 0;
  var currentProgress = 0;
  var timerID = 0;

  // make slider of images
  var elPictureSlider = node.querySelector('.cs_slider_pictures');
  var elContentSlider = node.querySelector('.cs_slider_contents');
  var elCarousel = node.querySelector('.cs_slider_carousel');
  var elLanding = node.querySelector('.cs_slider_bodies');
  var listSlideNavTriggers = node.querySelectorAll('.cs_slider_navitem');
  var listPictures = node.querySelectorAll('.cs_slider_bodies .cs_slider_picture');
  var listContents = node.querySelectorAll('.cs_slider_bodies .cs_slider_content');

  // console.log(elPictureSlider,listPictures)
  // elPictureSlider.append(...listPictures);
  elCarousel.classList.remove('d-none');
  elLanding.classList.add('d-none');
  node.classList.add('csslider');
  var wrapIntoSwiper = function wrapIntoSwiper(listNodes, elTarget) {
    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var elSwiper = document.createElement('div');
    elSwiper.className = 'swiper br-16';
    elTarget.append(elSwiper);
    var elSwiperWrapper = document.createElement('div');
    elSwiperWrapper.className = 'swiper-wrapper';
    elSwiper.append(elSwiperWrapper);
    listNodes.forEach(function (el) {
      var elSwiperSlide = document.createElement('div');
      elSwiperSlide.className = 'swiper-slide';
      elSwiperWrapper.append(elSwiperSlide);
      elSwiperSlide.append(el);
    });
    return new Swiper(elSwiper, params);
  };
  var swiperPics = wrapIntoSwiper(listPictures, elPictureSlider, {
    effect: 'slide',
    loop: false,
    spaceBetween: 24
  });
  var swiperText = wrapIntoSwiper(listContents, elContentSlider, {
    effect: "fade",
    loop: false,
    simulateTouch: false
  });
  var swipers = [swiperPics, swiperText];

  // let swChangeHandler = (is,sw)=>{
  //     // console.log(sw.activeIndex,is)
  //     swipers.filter((item, index) => index != is).forEach(item => item.slideTo(sw.activeIndex))
  //     // sw.activeIndex
  // }
  var swChangeHandler = function swChangeHandler(sw) {
    currentSlideIndex = sw.realIndex;
    swiperText.slideTo(currentSlideIndex);
    setProgress(currentSlideIndex);
    // active
    listSlideNavTriggers.forEach(function (el) {
      return el.classList.remove('active');
    });
    listSlideNavTriggers[currentSlideIndex].classList.add('active');
    // console.log(listSlideNavTriggers);
  };

  // swipers.forEach((sw,i) => {
  //     sw.on('slideChange',swChangeHandler.bind(sw,i));
  // })
  swiperPics.on('slideChange', swChangeHandler);
  var fnGoTo = function fnGoTo(n) {
    currentSlideIndex = n;
    currentStepProgress = 0;
    setProgress(n);
    swipers.forEach(function (sw) {
      return sw.slideTo(n);
    });
    // swiper.slideTo(index, speed, runCallbacks)
  };
  var setProgress = function setProgress() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var currProgress = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    node.style.setProperty('--index', index);
  };
  var setCurrProgress = function setCurrProgress() {
    var currProgress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var v = node.style.getPropertyValue('--curr-progress');
    if (v != currProgress) {
      // console.log(node.style.getPropertyValue('--index'),currProgress);
      node.style.setProperty('--curr-progress', currProgress);
    }
  };

  // nav

  var navHandler = function navHandler(n) {
    // console.log('navHandler',n);
    fnGoTo(n);
    currentStepProgress = 0;
    setCurrProgress(currentStepProgress);
  };
  listSlideNavTriggers.forEach(function (el, i) {
    return el.addEventListener('click', navHandler.bind(el, i));
  });
  var startTimer = function startTimer() {
    if (timerID) stopTimer();
    var count = node.style.getPropertyValue('--count');
    if (!count) return;
    var steps = Math.floor(elCarousel.clientWidth / count);
    var delay = Math.round(autoDelay / steps);
    timerID = setInterval(function () {
      currentProgress = currentStepProgress % steps / steps;
      setCurrProgress(Math.floor(currentProgress * 100));
      // console.log(currentProgress)
      currentStepProgress++;
      var isStart = currentStepProgress % steps == 0;
      if (isStart) {
        // console.log('go!');
        fnGoTo((currentSlideIndex + 1) % count);
      }
    }, delay);
    // console.log('steps',steps,delay);
  };
  var stopTimer = function stopTimer() {
    if (timerID) timerID = clearInterval(timerID);
  };
  swChangeHandler({
    realIndex: 0
  });
  // startTimer();

  var windowScrollHandler = function windowScrollHandler(e) {
    // let wy = window.scrollY;
    var wh = window.outerHeight;
    var rect = node.getBoundingClientRect();
    var by = rect.y;
    var bb = wh - rect.bottom;
    var runTimer = by < wh && bb < wh - 64;
    if (runTimer && !timerID) startTimer();
    if (runTimer == false) stopTimer();
  };
  window.addEventListener('scroll', windowScrollHandler);
}
document.addEventListener('DOMContentLoaded', function () {
  return document.querySelectorAll('.cs_slider').forEach(function (el) {
    return new CSSlider(el);
  });
});

// main_cards
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.main_cards .swiper').forEach(function (el) {
    return new Swiper(el, {
      effect: 'slide',
      loop: true,
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
        nextEl: '.swiper-btn-next',
        prevEl: '.swiper-btn-prev'
      },
      breakpoints: {
        768: {
          slidesPerView: 2
        },
        1280: {
          slidesPerView: 'auto'
          // centeredSlides: true,
        }
      }
    });
  });
  document.querySelectorAll('.main_cards_head .control').forEach(function (el, i) {
    return el.addEventListener('click', function (e) {
      // console.log()
      var el = e.currentTarget;
      var css = _toConsumableArray(el.classList).map(function (c) {
        return ".".concat(c);
      }).join('');
      var target = el.closest('.main_cards').querySelector(".main_cards .swiper ".concat(css)); //.querySelector(css);
      if (target) target.dispatchEvent(new Event('click'));
      //console.log()
    });
  });
});
function initParallax() {
  var images = document.getElementsByClassName('image-transform');
  new simpleParallax(images, {
    delay: .3,
    transition: 'cubic-bezier(0,0,0,1)'
  });
}
document.addEventListener('DOMContentLoaded', initParallax);

// popups

var initPopups = function initPopups() {
  var listTriggers = document.querySelectorAll('[data-popup]');
  // console.log(listTriggers)
  var togglePopup = function togglePopup(name) {
    var elPopup = document.querySelector(".popup[data-name=\"".concat(name, "\"]"));
    if (!elPopup) return;
    var listTrigger = document.querySelectorAll("[data-popup=\"".concat(name, "\"]"));
    var isOpened = elPopup.dataset.opened == 1;
    if (isOpened) {
      window.scroll(0, elPopup.dataset.scrolled); // (x,y)
      delete document.body.dataset.popupOpened;
      elPopup.dataset.opened = 0;
      elPopup.dataset.scrolled = 0;
      listTrigger.forEach(function (el) {
        return el.classList.remove('active');
      });
    } else {
      elPopup.dataset.opened = 1;
      elPopup.dataset.scrolled = window.scrollY;
      document.body.dataset.popupOpened = name;
      setTimeout(function () {
        return window.scroll(0, 0);
      }, 300);
      listTrigger.forEach(function (el) {
        return el.classList.add('active');
      });
    }
    // console.log('togglePopup',elPopup,isOpened)
  };
  listTriggers.forEach(function (el) {
    return el.addEventListener('click', togglePopup.bind(el, el.dataset.popup));
  });
  // document.querySelectorAll(`.popup-close`).forEach(el => el.addEventListener('click',(e)=>{
  //     console.log(e);
  // }));
};
document.addEventListener('DOMContentLoaded', initPopups);
var initSmooth = function initSmooth() {
  SmoothScroll({
    // Время скролла 400 = 0.4 секунды
    animationTime: 600,
    // Размер шага в пикселях 
    stepSize: 55,
    // Дополнительные настройки:

    // Ускорение 
    accelerationDelta: 30,
    // Максимальное ускорение
    accelerationMax: 2,
    // Поддержка клавиатуры
    keyboardSupport: true,
    // Шаг скролла стрелками на клавиатуре в пикселях
    arrowScroll: 50,
    // Pulse (less tweakable)
    // ratio of "tail" to "acceleration"
    pulseAlgorithm: true,
    pulseScale: 4,
    pulseNormalize: 1,
    // Поддержка тачпада
    touchpadSupport: true
  });
};
document.addEventListener('DOMContentLoaded', initSmooth);
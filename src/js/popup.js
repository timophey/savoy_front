
// popups

let initPopups = function(){
    let listTriggers = document.querySelectorAll('[data-popup]');
    // console.log(listTriggers)
    let togglePopup = function(name){
        let elPopup = document.querySelector(`.popup[data-name="${name}"]`); if(!elPopup) return;
        let listTrigger = document.querySelectorAll(`[data-popup="${name}"]`);
        let isOpened = (elPopup.dataset.opened == 1);
        if(isOpened){
            window.scroll(0,elPopup.dataset.scrolled); // (x,y)
            delete document.body.dataset.popupOpened;
            elPopup.dataset.opened = 0;
            elPopup.dataset.scrolled = 0;
            listTrigger.forEach(el => el.classList.remove('active'));
        }else{
            elPopup.dataset.opened = 1;
            elPopup.dataset.scrolled = window.scrollY;
            document.body.dataset.popupOpened = name;
            setTimeout(()=>window.scroll(0,0),300);
            listTrigger.forEach(el => el.classList.add('active'));
        }
        // console.log('togglePopup',elPopup,isOpened)
    }
    listTriggers.forEach(el => el.addEventListener('click',togglePopup.bind(el,el.dataset.popup)));
    // document.querySelectorAll(`.popup-close`).forEach(el => el.addEventListener('click',(e)=>{
    //     console.log(e);
    // }));
}



document.addEventListener('DOMContentLoaded',initPopups);

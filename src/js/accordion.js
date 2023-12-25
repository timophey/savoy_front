function CSSpoiler(node){
    let eventOpened = new CustomEvent('opened');
    let eventClosed = new CustomEvent('closed');
    let trigger = node.querySelector('.spoiler-head');
    let body = node.querySelector('.spoiler-body');
    node.classList.add('spoiler-initialized');
    
    let actionOpen = function(){
        let bh = body.scrollHeight;
        node.classList.add('active');
        node.style.setProperty('--bh',bh);
        node.dispatchEvent(eventOpened);
    }
    let actionClose = function(){
        node.classList.remove('active');
        node.style.setProperty('--bh',null);
        node.dispatchEvent(eventClosed);
    }
    let actionToggle = function(){
        return node.classList.contains('active') ? actionClose() : actionOpen();
    }
    trigger.addEventListener('click',actionToggle);
    return {
        open: actionOpen,
        close: actionClose,
        toggle: actionToggle,
    }
}

function CSAccordion(node){
    let listNodes = node.querySelectorAll('.spoiler');
    let eventLeave = new CustomEvent('leave');
    let eventComes = new CustomEvent('comes');
    let eventLeaveHalf = new CustomEvent('leaveHalf');
    let eventComesHalf = new CustomEvent('comesHalf');
    let arSpoiler = [];
    let switchOpened = function(n){
        arSpoiler.forEach((sp,i) => i != n && arSpoiler[i].close());
    }
    listNodes.forEach((el,i) => {
        arSpoiler[i] = new CSSpoiler(el);
        el.addEventListener('opened',switchOpened.bind(node,i));
    });
    let visible = false;
    let visibleHalf = false;
    let windowScrollHandler = ()=>{
        let wh = window.outerHeight;
        let rect = node.getBoundingClientRect();
        let by = rect.y;
        let bb = wh - rect.bottom;
        let vis = (by < wh && bb < (wh-64));
        // whole
        if(vis != visible){
            node.dispatchEvent(vis ? eventComes : eventLeave);
            console.log(vis ? 'come' : 'leave');
            visible = vis;
        }
        // half
        let vih = ((by < wh/2) && (bb<(wh/2+64)));// && bbh < (wh/2-64)
        //console.log('vih',vih,bb);
        if(vih != visibleHalf){
            node.dispatchEvent(vih ? eventComesHalf : eventLeaveHalf);
            console.log(vih ? 'comesHalf' : 'leaveHalf');
            visibleHalf = vih;
        }
    }
    window.addEventListener('scroll',windowScrollHandler);
    
}
document.addEventListener('DOMContentLoaded',()=>{
    [...document.querySelectorAll('.spoiler')].filter(el => !el.matches('.accordion .spoiler')).forEach(el => new CSSpoiler(el));
    document.querySelectorAll('.accordion').forEach(el => new CSAccordion(el));
});

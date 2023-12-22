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

function CSAccordion(root){
    let listNodes = root.querySelectorAll('.spoiler');
    let arSpoiler = [];
    let switchOpened = function(n){
        arSpoiler.forEach((sp,i) => i != n && arSpoiler[i].close());
    }
    listNodes.forEach((el,i) => {
        arSpoiler[i] = new CSSpoiler(el);
        el.addEventListener('opened',switchOpened.bind(root,i));
    });
    
}
document.addEventListener('DOMContentLoaded',()=>{
    [...document.querySelectorAll('.spoiler')].filter(el => !el.matches('.accordion .spoiler')).forEach(el => new CSSpoiler(el));
    document.querySelectorAll('.accordion').forEach(el => new CSAccordion(el));
});

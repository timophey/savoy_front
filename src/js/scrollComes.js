function CSCome(node){
    
    let visible = false;
    let windowScrollHandler = ()=>{
        let wh = window.outerHeight;
        let rect = node.getBoundingClientRect();
        let by = rect.y;
        let bb = wh - rect.bottom;
        let vis = (by < wh && bb < (wh-64));
        // console.log(vis)
        if(vis != visible){
            if(vis){
                node.classList.remove('wait-come');
                window.removeEventListener('scroll',windowScrollHandler);
            }
        }
        visible = vis;
    }
    window.addEventListener('scroll',windowScrollHandler);
}

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.wait-come').forEach(el => new CSCome(el));
});
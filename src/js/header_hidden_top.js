function CSHHTop(node){

    let eventLeave = new CustomEvent('leave');
    let eventComes = new CustomEvent('comes');

    // в заголовке могут быть текстовые и стилевые ноды
    // console.log(node);

    let getNodes = (el)=>{
        let nodes = [];
        let list = el.childNodes;
        list.forEach(nd => {
            // console.log(nd,nd.tagName,nodes)
            if(nd.tagName) nodes.push(...getNodes(nd));
            else nodes.push(nd);
        });
        return nodes;
    }
    let textNodes = getNodes(node);
    let textSpans = [];
    // console.log(textNodes);

    let spanComesHandler = function(i){
        // пока без проверок
        // this.classList.remove('cshh-hidden');
        // нужно показать слово, если оно на расстоянии себя от низа
        let rect = this.getBoundingClientRect();
        let wh = window.outerHeight;
        let bb = wh - rect.bottom - rect.height, by = rect.y;
        if(bb > 64){
            this.classList.remove('cshh-hidden');
        }
        // if(!i)
        //     console.log(this.innerText,`${by} < ${wh}`,by < wh,'bb',bb,'bb > 64',bb > 64)
    }

    textNodes.forEach(nd => {
        let words = nd.textContent.split(' ');
        // console.log(words)

        words.forEach((sw,i,ar) => {
            let wrap0 = document.createElement('span');
                // wrap0.style.display='inline-block'; // moved to css
                wrap0.className = 'cshh cshh-hidden';
                wrap0.addEventListener('comes',spanComesHandler.bind(wrap0,i));
            let wrap1 = document.createElement('span');
                // wrap1.style.display='inline-block';  // moved to css
                wrap1.innerText = sw;
                wrap0.append(wrap1);
            nd.parentElement.insertBefore(wrap0, nd);
            // wrap0.append()
            if(i < (ar.length -1)){
                nd.parentElement.insertBefore(document.createTextNode(' '), nd);
            }
            textSpans.push(wrap0);
        });

        nd.remove();
    });
    

    let visible = false;
    let visibleHalf = false;
    let windowScrollHandler = ()=>{
        let wh = window.outerHeight;
        let rect = node.getBoundingClientRect();
        let by = rect.y;
        let bb = wh - rect.bottom;
        let vis = (by < wh && bb < (wh-64));
        if(vis != visible){
            // console.log('CSHHTop visible',vis);
            // ask each span test homself if visible =)
        }
        if(vis)
            textSpans.filter(el => el.matches('.cshh-hidden')).forEach(el => el.dispatchEvent(eventComes));

        visible = vis;
        let vih = ((by < wh/2) && (bb<(wh/2+64)));
        if(vih != visibleHalf){
            // node.dispatchEvent(vih ? eventComesHalf : eventLeaveHalf);
            // console.log(vih ? 'CSHHTop comesHalf' : 'CSHHTop leaveHalf');
        }
        visibleHalf = vih;
    }
    window.addEventListener('scroll',windowScrollHandler);
}

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.header_hidden_top').forEach(el => new CSHHTop(el));
});
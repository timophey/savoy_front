document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.main_faq .spoiler').forEach(el => {
        el.addEventListener('opened', (e)=>{
            let el = e.target;
            let color = String(el.dataset.color).trim(); if(!color) return;
            let root = el.closest('.main_faq'); if(!root) return;
            root.style.setProperty('background-color',color);
            // console.log(color,root)
        });
        el.addEventListener('closed', (e)=>{
            let el = e.target;
            // let color = String(el.dataset.color).trim(); if(!color) return;
            let root = el.closest('.main_faq'); if(!root) return;
            root.style.setProperty('background-color',null);
            // console.log(color,root)
        });
    });

});
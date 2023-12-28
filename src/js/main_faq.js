function init_faq(){
        document.querySelectorAll('.main_faq .spoiler').forEach(el => {
        el.addEventListener('opened', (e)=>{
            let el = e.target;
            let color = String(el.dataset.color).trim(); if(!color) return;
            let root = el.closest('.main_faq'); if(!root) return;
            document.body.style.setProperty('background-color',color);
            root.style.setProperty('background-color',color);
            // console.log(color,root)
        });
        el.addEventListener('closed', (e)=>{
            let el = e.target;
            // let color = String(el.dataset.color).trim(); if(!color) return;
            let root = el.closest('.main_faq'); if(!root) return;
            root.style.setProperty('background-color',null);
            document.body.style.setProperty('background-color',null);
            // console.log(color,root)
        });
    });

    let leaveHandler = function(){
        console.log('leaveHalf leaveHandler')
        let cl = this.closest('.main_faq');
        document.body.style.setProperty('background-color',null); 
        // и фон блока тоже деактиаируем
        if(cl) cl.classList.add('leaveHalf');
    }

    let comesHandler = function(){
        console.log('comesHalf comesHandler');
        let cl = this.closest('.main_faq');
        if(cl){
            document.body.style.setProperty('background-color',cl.style.backgroundColor); 
        }
        if(cl) cl.classList.remove('leaveHalf');
        // console.log(this)
    }

    document.querySelectorAll('.accordion').forEach(el => {
        el.addEventListener('leaveHalf',leaveHandler.bind(el));
        el.addEventListener('comesHalf',comesHandler.bind(el));
    });
    
}

document.addEventListener('DOMContentLoaded',init_faq);


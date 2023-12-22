function CSSelect(node){
    let rRoot = document.createElement('div'); rRoot.className = 'csselect';
    node.parentElement.append(rRoot);

    let rValue = document.createElement('div'); 
        rValue.className = 'csselect-value';
        rRoot.append(rValue);
        rRoot.append(node);
        
    let rPlace = document.createElement('div'); 
        rPlace.className = 'csselect-inner';
        rPlace.innerText = 'value';
        rValue.append(rPlace);

    let rList = document.createElement('div'); 
        rList.className = 'csselect-list';
    rRoot.append(rList);

    let rTrigger = document.createElement('div');
        rTrigger.className = 'csselect-trigger';
        rTrigger.innerHTML = '<i class="icon-Chevron-bottom d-active-none"></i><i class="icon-Chevron-top d-none d-active-inline-block"></i>';
        rValue.append(rTrigger);

    let selectOne = function(n){
        node.options.selectedIndex = n;
        node.dispatchEvent(new Event('change'));
    }

    let rOpts = [...node.options].map((op,i) => {
        let rItem = document.createElement('div'); 
        rItem.className = 'csselect-item';
        rItem.innerHTML = op.innerHTML;
        rItem.addEventListener('click',selectOne.bind(rItem,i));
        rItem.addEventListener('mousedown',selectOne.bind(rItem,i));
        rItem.addEventListener('touchstart',selectOne.bind(rItem,i));
        rList.append(rItem);
        return rItem;
    });
    console.log(rOpts)

    let valueFromOriginal = function(){
        let i = node.options.selectedIndex;
        let op = node.options[i];
        rOpts.forEach(el => el.classList.remove('active'));
        rOpts[i].classList.add('active');
        rPlace.innerHTML = op.innerHTML;
    }

    let actionExpand = function(){
        console.log('actionExpand')
        let bh = rList.scrollHeight;

        let rt = rRoot.getBoundingClientRect();
        let wh = window.outerHeight;
        let bt = wh - rt.bottom - rt.height * 2;
        
        console.log(bh, bt, bh > bt)
        rRoot.classList.add('active');
        node.focus();
        rList.dataset.dno = (bh > bt) ? 1:0;
        rList.style.setProperty('height',`${bh}px`);
    }

    let actionCollapse = function(){
        console.log('actionCollapse')
        rRoot.classList.remove('active');
        rList.style.setProperty('height',null);
    }

    let actionToggle = function(){
        console.log('actionToggle')
        return rRoot.classList.contains('active') ? actionCollapse() : actionExpand();
    }

    rRoot.addEventListener('click',actionToggle);
    node.addEventListener('change',valueFromOriginal);
    node.addEventListener('blur',()=>setTimeout(actionCollapse,100));

    // node.style.setProperty('visibility','none');

    // console.log(node.options)
    valueFromOriginal();
}

// form-select

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.form-select').forEach(el => new CSSelect(el));
});
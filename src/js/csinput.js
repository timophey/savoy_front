function CSInput(node){
    
    let rRoot = document.createElement('div'); rRoot.className = 'csinput';
    node.parentElement.append(rRoot);
    if(node.disabled) rRoot.classList.add('disabled');
    rRoot.append(node);

    let elLabel = document.createElement('div'); elLabel.className = 'csinput-label';
    elLabel.innerText = node.placeholder;
    rRoot.append(elLabel);

    let checkDirty = () => {
        let isEmpty = String(node.value).trim().length == 0;
        rRoot.dataset.dirty = (isEmpty) ? 0 : 1;
    }
    let onFocus = () => {
        rRoot.classList.add('active');
    }
    let onBlur = () => {
        rRoot.classList.remove('active');
        checkDirty();
    }

    elLabel.addEventListener('click',()=>{ node.focus(); });
    node.addEventListener('blur',onBlur);
    node.addEventListener('focus',onFocus);

    checkDirty();
}

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.form-input').forEach(el => new CSInput(el));
});
function CSInput(node){
    
    let rRoot = document.createElement('div'); rRoot.className = 'csinput';
    node.parentElement.append(rRoot);
    if(node.disabled) rRoot.classList.add('disabled');
    rRoot.append(node);

    let elLabel = document.createElement('div'); elLabel.className = 'csinput-label';
    elLabel.innerText = node.placeholder;
    rRoot.append(elLabel);

    let elInvalid = document.createElement('div'); elInvalid.className = 'csinput-invalid color-actiondanger-heavy';
    elInvalid.innerText = '';
    rRoot.append(elInvalid);


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
        checkValid();
    }
    let checkValid = () => {
        let v = node.validity;
        rRoot.dataset.invalid = (v.valid) ? 1 : 0;
        elInvalid.innerText = node.validationMessage;
        // if(v.valid){
        //     rRoot.classList.remove('invalid');
        //     elInvalid.innerText = '';
        // }else{
        //     rRoot.classList.add('invalid');
        // }
    }

    elLabel.addEventListener('click',()=>{ node.focus(); });
    node.addEventListener('blur',onBlur);
    node.addEventListener('focus',onFocus);

    checkDirty();
}

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.form-input').forEach(el => new CSInput(el));
});
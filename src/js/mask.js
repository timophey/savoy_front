function initPhoneMask(node){
    const maskOptions = {
        mask: '+{7} (000) 000-00-00'
      };
    const mask = IMask(node, maskOptions);
}
document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('input[name*="phone"],input[name*="PHONE"]').forEach(initPhoneMask);
});
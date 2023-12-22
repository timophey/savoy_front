let elHeader;
document.addEventListener('DOMContentLoaded',()=>{
    elHeader = document.querySelector('.siteWrapper header');
})
let windowScrollHandler = function(e){
    if(!elHeader) return;
    let y = window.scrollY, st = (y > 0);
    let themeNow = elHeader.dataset.theme;
    let themeSet = (st) ? 'dark':'light';
    if(themeNow != themeSet){
        // console.log(themeSet);
        elHeader.dataset.theme = themeSet;
    }
}
window.addEventListener('scroll',windowScrollHandler);
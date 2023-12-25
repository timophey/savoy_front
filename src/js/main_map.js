function initMainMap(){
    let node = document.querySelector('.main_map_ymap'); if(!node) return;

    let arPoints = [
        {
            name:'Чистые пруды',
            latlng:[55.7666,37.638495,]
        },        
        {
            name:'Новослободская',
            latlng:[55.775626,37.601317,],
        }
    ];

    let mapCenter = [
        arPoints.map(item => item.latlng[0]).reduce((a,b)=>a+b,0) / arPoints.length,
        arPoints.map(item => item.latlng[1]).reduce((a,b)=>a+b,0) / arPoints.length,
    ];

    console.log(mapCenter)
    console.log([57.140045511428, 65.576221868052])

    let map = new ymaps.Map(node,{
        // center: [57.140045511428, 65.576221868052],
        center: mapCenter,
        zoom: 13,
        type: 'yandex#map',
        // adjustZoomOnTypeChange: true
    });

    arPoints.forEach(item => {
        let mark = new ymaps.Placemark( item.latlng, { 
            // iconContent: 'Москва', 
            hintContent: item.name,
            hintFitPane: false,
        },{
            iconLayout: 'default#image',
            iconImageHref: 'images/icon_mark.svg',
            iconImageSize: [32, 32],
            hideIconOnBalloonOpen: false,
        });

        var hint1 = new ymaps.Hint(item.name, item.latlng, {
            // maxWidth: 200
            });
            console.log(map)
        // map.hint.add(hint1);
        // mark.hint.open();
        // mark.events.add('mouseenter', function(e){
        //     console.log('mouseenter',mark)
        //     mark.balloon.open();
        // })
        // mark.events.add('mouseleave', function(e){
        //     mark.balloon.close();
        // })

        

        map.geoObjects.add(mark);
    });

    
    // mouseenter

}
window.addEventListener('load',initMainMap);
function initMainMap(){
    let node = document.querySelector('.main_map_ymap'); if(!node) return;

    let arPoints = [
        {
            name:'Чистые пруды',
            latlng:[55.7666,37.638495,],
            link: 'https://yandex.ru/maps/org/savoy_chistyye_prudy/6353151837/',
        },        
        {
            name:'Новослободская',
            latlng:[55.775626,37.601317,],
            link: 'https://yandex.ru/maps/org/savoy_italyanskiy_kvartal/61406058907/',
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
        // controls: ['zoomControl', 'searchControl', 'typeSelector',  'fullscreenControl', 'routeButtonControl']
        // adjustZoomOnTypeChange: true
    },{
        // searchControlProvider: 'yandex#search'
    });

    map.controls.add('zoomControl', {
        float: 'right',
        // position: {
        //     left: 40,
        //     top: 'center'
        // }
    });

    map.geoObjects.events.add('click', function (event) {
        location.href = event.get('target').properties.get('link');
    });

    let adaptives = {
        0: {
            center: mapCenter,
            zoom: 13,
            width: 0,
        },
        1024: {
            center: [55.763248,37.691611,],
            zoom: 12,
            width: 1024,
        },
        1280: {
            center: [55.770661,37.665679,],
            zoom: 13,
            width: 1024,
        },
    }

    let timerResize = 0;
    let doResize = function(){
        
        let geometry = {}
        for(var key in adaptives){
            if(+key <= window.innerWidth){
                geometry = adaptives[key];
            }
        }
        console.log(geometry)
        map.setCenter(geometry.center,geometry.zoom );
    }

    arPoints.forEach(item => {
        let mark = new ymaps.Placemark( item.latlng, { 
            // iconContent: 'Москва', 
            hintContent: item.name,
            hintFitPane: false,
            link: item.link,
        },{
            iconLayout: 'default#image',
            iconImageHref: 'images/icon_mark.svg',
            iconImageSize: [32, 32],
            hideIconOnBalloonOpen: false,
        });

        // var hint1 = new ymaps.Hint(item.name, item.latlng, {
        //     // maxWidth: 200
        //     });
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

    doResize();

    window.addEventListener('resize',()=>{
        clearTimeout(timerResize);
        timerResize = setTimeout(doResize,500);
    })

    
    // mouseenter

}
window.addEventListener('load',initMainMap);
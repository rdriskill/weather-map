(function () {
    // Config
    ////////////////////////////////////////////////////////////////////
    const controlsConfig = [{
            id: 'weatherTimeSliderInHrs',
            type: 'slider',
            position: 'bottomright',
            name: 'Time',
            units: 'hrs',
            min: -2,
            max: 2,
            step: 1,
            initialVal: 0,
            setValue: function(value, layer, map) {
                const now = new Date();
                now.setHours(now.getHours() + Number.parseInt(value));
                layer.options.day = now.toISOString().substring(0,19);
            }
        }
    ];

    const overlaysConfig = [{
        id: 'OWM_VANE_CLOUDS',
        type: 'tile',
        name: 'Clouds',
        url: 'https://a.sat.owm.io/vane/2.0/weather/CL/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&day={day}',
        enabled: true,
        leaflet: {
            day: new Date().toISOString().substring(0,19),
            tileSize: 512,
            zoomOffset: -1,
            controls: {
                weatherTimeSliderInHrs: {
                    enabled: true
                }
            },
            legend: {
                name: 'Clouds',
                units: "%",
                position: 'bottomright',
                gradient: [
                    { value: 0,color: 'rgba(247,247,255, 0)' },
                    { value: 10, color: 'rgba(251,247,255, 0)' },
                    { value: 20, color: 'rgba(244,248,255, 0.1)' },
                    { value: 30, color: 'rgba(240,249,255, 0.2)' },
                    { value: 40,color: 'rgba(221,250,255, 0.4)' },
                    { value: 50,color: 'rgba(224, 224, 224, 0.9)' },
                    { value: 60,color: 'rgba(224, 224, 224, 0.76)' },
                    { value: 70,color: 'rgba(228, 228, 228, 0.9)' },
                    { value: 80,color: 'rgba(232, 232, 232, 0.9)' },
                    { value: 90,color: 'rgba(214, 213, 213, 1)' },
                    { value: 95,color: 'rgba(210, 210, 210, 1)' },
                    { value: 100,color: 'rgba(183, 183, 183, 1)' }
                ]
            }
        }
    }, {
        id: 'OWM_VANE_PRECIP',
        type: 'tile',
        name: 'Precipitation',
        url: 'https://a.sat.owm.io/vane/2.0/weather/PA0/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&palette=0.9:00fa96;1.8:00fa64;2.4:00e600;3:00d300;4.5:00ba00;6:00a000;9:008c00;10.5:007800;11.1:006400;12:005a00;15:005000;18:004600;21:eff800;24:f3eb00;27:fadc00;30:ffcd00;36:ff9600;42:ff5b00;48:ff0000;72:ff0064;96:ff0092;192:aa2bc3;300:7609a4&opacity=0.4&day={day}',
        enabled: true,
        leaflet: {
            day: new Date().toISOString().substring(0,19),
            tileSize: 512,
            zoomOffset: -1,
            controls: {
                weatherTimeSliderInHrs: {
                    enabled: true
                }
            },
            legend: {
                name: 'Rain',
                units: "mm",
                position: 'bottomright',
                gradient: [
                    { value: 0, color: 'rgba(0,255,0, 0)' },
                    { value: 1, color: 'rgba(0,255,0, 0.2)' },
                    { value: 3, color: 'rgba(0,232,46, 0.6)' },
                    { value: 14, color: 'rgba(0,202,145, 0.8)' },
                    { value: 19, color: 'rgba(0,170,208, 0.9)' },
                    { value: 49, color: 'rgba(0,156,229, 1)' },
                    { value: 100, color: 'rgba(14,64,134, 1)' },
                    { value: 200, color: 'rgba(13,113,252, 1)' }
                ]
            }
        }
    }, {
        id: 'OWM_VANE_WIND',
        type: 'tile',
        name: 'Wind Speed',
        url: 'https://a.sat.owm.io/vane/2.0/weather/WS10/3/0/3?appid=9de243494c0b295cca9337e1e96b00e2&day={day}',
        enabled: true,
        leaflet: {
            day: new Date().toISOString().substring(0,19),
            tileSize: 512,
            zoomOffset: -1,
            controls: {
                weatherTimeSliderInHrs: {
                    enabled: true
                }
            },
            legend: {
                name: 'Wind',
                units: "m/s",
                position: 'bottomright',
                gradient: [
                    { value: 0, color: 'rgba(255,255,0, 0)' },
                    { value: 2, color: 'rgba(170, 128, 177, 0.44)' },
                    { value: 3, color: 'rgba(170, 128, 177, 0.54)' },
                    { value: 6, color: 'rgba(176, 128, 177, 0.71)' },
                    { value: 12, color: 'rgba(170, 128, 177, 0.84)' },
                    { value: 25, color: 'rgba(164, 123, 170, 1)' },
                    { value: 50, color: 'rgba(116,76,172, 0.9)' },
                    { value: 100, color: 'rgba(158, 128, 177, 1)' },
                    { value: 200, color: 'rgba(48, 6, 53, 0.82)' }
                ]
            }
        }
    }, {
        id: 'OWM_VANE_TEMP',
        type: 'tile',
        name: 'Temperature',
        url: 'https://a.sat.owm.io/vane/2.0/weather/TA2/{z}/{x}/{y}?appid=9de243494c0b295cca9337e1e96b00e2&fill_bound&day={day}',
        enabled: true,
        leaflet: {
            day: new Date().toISOString().substring(0,19),
            tileSize: 512,
            zoomOffset: -1,
            controls: {
                weatherTimeSliderInHrs: {
                    enabled: true
                }
            },
            legend: {
                name: 'Temp',
                units: "°C",
                position: 'bottomright',
                gradient: [
                    { value: -40, color: 'rgba(159, 85, 181, 0)' },
                    { value: -33, color: 'rgba(44, 106, 187, 8.75)' },
                    { value: -30, color: 'rgba(82, 139, 213, 12.5)' },
                    { value: -25, color: 'rgba(103, 163, 222, 18.75)' },
                    { value: -20, color: 'rgba(142, 202, 240, 25)' },
                    { value: -15, color: 'rgba(155, 213, 244, 31.25)' },
                    { value: -10, color: 'rgba(172, 225, 253, 37.5)' },
                    { value: -5, color: 'rgba(194, 234, 255, 43.75)' },
                    { value: 0, color: 'rgba(255, 255, 208, 50)' },
                    { value: 5, color: 'rgba(254, 248, 174, 56.25)' },
                    { value: 10, color: 'rgba(254, 232, 146, 62.5)' },
                    { value: 15, color: 'rgba(254, 226, 112, 68.75)' },
                    { value: 20, color: 'rgba(253, 212, 97, 75)' },
                    { value: 26, color: 'rgba(244, 168, 94, 82.5)' },
                    { value: 30, color: 'rgba(244, 129, 89, 87.5)' },
                    { value: 35, color: 'rgba(244, 104, 89, 93.75)' },
                    { value: 40, color: 'rgba(244, 76, 73, 100)' }
                ]
            }
        }
    }];
    const baseLayersConfig = [{
            id: 'MAPBOX_SATELLITE',
            type: 'tile',
            name: 'Satellite',
            url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmRyaXNraWxsIiwiYSI6ImNra2FwbnJheDA0cHoyb3BvdGNpYzkzazkifQ.OqTBBc9Bhc__4kLY06QeVg',
            enabled: true,
            leaflet: { tileSize: 512, zoomOffset: -1}
        }, {
            id: 'MAPBOX_LIGHT',
            type: 'tile',
            name: 'Light',
            url: 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmRyaXNraWxsIiwiYSI6ImNra2FwbnJheDA0cHoyb3BvdGNpYzkzazkifQ.OqTBBc9Bhc__4kLY06QeVg',
            enabled: true,
            leaflet: { tileSize: 512, zoomOffset: -1}
        }, {
            id: 'MAPBOX_STREETS',
            type: 'tile',
            name: 'Streets',
            url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicmRyaXNraWxsIiwiYSI6ImNra2FwbnJheDA0cHoyb3BvdGNpYzkzazkifQ.OqTBBc9Bhc__4kLY06QeVg',
            enabled: true,
            leaflet: { tileSize: 512, zoomOffset: -1}
        }
    ]
    // Map Setup
    ////////////////////////////////////////////////////////////////////
    const maps = { bases: {}, overlays: {} };

    const createLayer = (overlay, layers) => {
        if (overlay.enabled) {
            if (overlay.type === 'tile') {
                layers[overlay.name] = L.tileLayer(overlay.url, overlay.leaflet);
            } else if (overlay.type === 'wms') {
                layers[overlay.name] = L.tileLayer.wms(overlay.url, overlay.leaflet);
            } else {
                console.error(`Layer type ${overlay.type} not supported.`);
            }
        }
    };

    overlaysConfig.forEach((overlay) => createLayer(overlay, maps.overlays));
    baseLayersConfig.forEach((overlay) => createLayer(overlay, maps.bases));

    const map = L.map('map', {
        layers: [ maps.bases['Satellite'] ] 
    });

    map.setView([39.132104, -98.681782], 4.5);
    const layers = L.control.layers(maps.bases, maps.overlays).addTo(map);

    controlsConfig.forEach((control) => {
        if (control.type === 'slider') {
            L.control.slider(control, map);
        } else {
            console.error(`Control type ${control.type} not supported.`);
        }
    });

    Object.values(maps.overlays).forEach((tileLayer) => {
        if (tileLayer.options.legend) {
            const legend = L.control.legend(tileLayer, tileLayer.options.legend);
            tileLayer.on('add', () => legend.addTo(map));
            tileLayer.on('remove', () => legend.remove());
        }
    });
})()
L.Control.Legend = L.Control.extend({
    initialize: function (tileLayer, options) {
        L.setOptions(this, options);
        this.tileLayer = tileLayer;
    },
    onAdd: function(map) {
        this.map = map;
        this.container = L.DomUtil.create('div', 'leaflet-control-color-scale leaflet-control leaflet-legend-control');

        const gradientColors = [];
        const gradientValues = []

        this.options.gradient.forEach((gradient, idx) => {
            gradientColors.push(gradient.color);
            gradientValues.push(gradient.value);
        });

        const minVal = Math.min(...gradientValues);
        const maxVal = Math.max(...gradientValues);

        this.container.innerHTML += `
            <div id="color-scale-line" class="leaflet-control-color-scale-line">
                <div id="leaflet-control" class="leaflet-control-color-scale leaflet-control">
                    <div id="scale-value" class="scale-value"><span>${this.options.name}</span></div>
                    <div id="scale-line-gradient" class="leaflet-control-color-scale-line" style="background-image: linear-gradient(to right, ${gradientColors.join()});">
                        <div class="scale-value scale-min-value"><span> ${minVal} ${this.options.units} </span></div>
                        <div class="scale-value scale-avg-value" style="left:50%"><span> ${maxVal /2} ${this.options.units} </span></div>
                        <div class="scale-value scale-max-value"><span> ${maxVal} ${this.options.units} </span></div>
                    </div>
                </div>
            </div>`;

        return this.container;
    }
})

L.control.legend = function(tileLayer, options) {
    return new L.Control.Legend(tileLayer, options);
};

L.Control.Slider = L.Control.extend({
    initialize: function (options, map) {
        const slider = this;
        slider.map = map;

        L.setOptions(this, options);

        slider.layersRequiringControl = 0;
        map.on('overlayadd', (e) => {
            if (e.layer.options.controls && e.layer.options.controls[slider.options.id] && e.layer.options.controls[slider.options.id].enabled) {
                if (slider.layersRequiringControl === 0) {
                    slider .addTo(map);
                }
                slider.layersRequiringControl += 1;
            }
        });

        map.on('overlayremove', (e) => {
            if (e.layer.options.controls && e.layer.options.controls[slider.options.id] && e.layer.options.controls[slider.options.id].enabled) {
                slider.layersRequiringControl -= 1;
                if (slider.layersRequiringControl === 0) {
                    slider.remove();
                }
            }
        });
    },
    onAdd: function(map) {
        const slider = this;
        slider.map = map;
        slider.container = L.DomUtil.create('div', 'leaflet-slider-control');

        /* Prevent click events propagation to map */
        L.DomEvent.disableClickPropagation(slider.container);

        slider.container.innerHTML = `
            <label for="${slider.options.name}">${slider.options.name}</label>
            <input
                id="${slider.options.name}"
                name="${slider.options.name}"
                type="range"
                min="${slider.options.min}"
                max="${slider.options.max}"
                step="${slider.options.step}"
                value="${slider.options.initialVal}"
            >
            <output>${slider.options.initialVal} ${slider.options.units}</output>
        `;

        slider.rangeInput = L.DomUtil.get(slider.container).children[1];

        slider.rangeInput.oninput = function (e) {
            this.nextElementSibling.value = this.value + ' ' + slider.options.units;
        }

        L.DomEvent.on(slider.rangeInput, "input", function() {
            slider.map.eachLayer(function (layer) {
                if (layer.options.controls && layer.options.controls[slider.options.id] && layer.options.controls[slider.options.id].enabled) {
                    layer.options[layer.options.controls[slider.options.id].attrName] = 
                    layer.options.controls[slider.options.id].getValue
                            ? layer.options.controls[slider.options.id].getValue(slider.rangeInput.value)
                            : slider.rangeInput.value
                    layer.redraw();
                }
            });
        });

        return slider.container;
    },
    onRemove: function() {
        L.DomUtil.remove(this.container);
    },
})

L.control.slider = function(options, map) {
    return new L.Control.Slider(options, map);
};
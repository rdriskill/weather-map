L.Control.ControlGroup = L.Control.extend({
    initialize: function (tileLayer) {
        L.setOptions(this, tileLayer.options.controlGroup);
        this.tileLayer = tileLayer;
    },
    onAdd: function (map) {
        this.container = L.DomUtil.create('div', 'control-group');
        this.items = [];

        this.container.innerHTML += `<h3 class="heading">${this.tileLayer.options.controlGroup.name}</h3>`;
        
        if (this.tileLayer.options.controlGroup && this.tileLayer.options.controlGroup.items) {
            this.tileLayer.options.controlGroup.items.forEach((itemConfig) => {
                let item;

                if (itemConfig.type === 'slider') {
                    item = L.control.slider(this.tileLayer, this.container, itemConfig);
                } else if (itemConfig.type === 'legend') {
                    item = L.control.legend(this.tileLayer, this.container, itemConfig);
                } else {
                    throw new Error(`Control group item type ${itemConfig.type} is invalid.`);
                }

                if (item) {
                    this.items.push(item);
                    item.addTo(map);
                }
            });
        }

        return this.container;
    }
});

L.control.controlGroup = function(tileLayer) {
    return new L.Control.ControlGroup(tileLayer);
};

L.Control.Legend = L.Control.extend({
    initialize: function (tileLayer, container, options) {
        L.setOptions(this, options);
        this.tileLayer = tileLayer;
        this.container = container;
    },
    onAdd: function(map) {
        this.map = map;
        const htmlElement = L.DomUtil.create('div', 'legend', this.container);

        const gradientColors = [];
        const gradientValues = []

        this.options.gradient.forEach((gradient, idx) => {
            gradientColors.push(gradient.color);
            gradientValues.push(gradient.value);
        });

        const minVal = Math.min(...gradientValues);
        const maxVal = Math.max(...gradientValues);

        htmlElement.innerHTML += `
            <h4 class="sub-heading">${this.options.name}</h4>
            <div class="container">
                <div class="min-val"> ${minVal} ${this.options.units} </div>
                <div class="med-val"> ${maxVal /2} ${this.options.units} </div>
                <div class="max-val"> ${maxVal} ${this.options.units} </div>
                <div class="gradient" style="background-image: linear-gradient(to right, ${gradientColors.join()});">
                </div>
            </div>
        `;

        return this.container;
    }
})

L.control.legend = function(tileLayer, container, options) {
    return new L.Control.Legend(tileLayer, container, options);
};

L.Control.Slider = L.Control.extend({
    initialize: function (tileLayer, container, options) {
        L.setOptions(this, options);
        this.tileLayer = tileLayer;
        this.container = container;
    },
    onAdd: function(map) {
        const slider = this;
        slider.map = map;
        const htmlElement = L.DomUtil.create('div', 'slider', slider.container);

        /* Prevent click events propagation to map */
        L.DomEvent.disableClickPropagation(htmlElement);

        htmlElement.innerHTML += `
            <h4 class="sub-heading">${slider.options.name}</h4>
            <div class="container">
                <label for="${slider.options.name}">${slider.options.initialVal} ${slider.options.units}</label>
                <input
                    class="range"
                    type="range"
                    id="${slider.options.name}"
                    name="${slider.options.name}"
                    min="${slider.options.min}"
                    max="${slider.options.max}"
                    step="${slider.options.step}"
                    value="${slider.options.initialVal}"
                >
            </div>
        `;

        slider.rangeInput = L.DomUtil.get(htmlElement).children[1].children[1];
        slider.rangeInput.oninput = function (e) {
            this.previousElementSibling.innerHTML = this.value + ' ' + slider.options.units;
        }

        L.DomEvent.on(slider.rangeInput, "input", function() {
            if (slider.options.setValue) {
                slider.options.setValue(slider.rangeInput.value, slider.tileLayer, slider.map);
                slider.tileLayer.redraw();
            } else {
                throw new Error(`Control group item does not have method setValue() defined.`);
            }
        });

        return this.container;
    }
})

L.control.slider = function(tileLayer, container, options) {
    return new L.Control.Slider(tileLayer, container, options);
};
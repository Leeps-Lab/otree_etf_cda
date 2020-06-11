import { html, PolymerElement } from '/static/otree-redwood/node_modules/@polymer/polymer/polymer-element.js';
import '/static/otree-redwood/src/redwood-period/redwood-period.js';

class DisableInterfaceOverlay extends PolymerElement {

    static get template() {
        return html`
            <style>
                #overlay {
                    position: fixed;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: gray;
                    transition: opacity 0.1s linear;
                    opacity: 0.5;
                    z-index: 100;
                }
            </style>

            <redwood-period
                on-period-start="_periodStart"
                on-period-end="_periodEnd"
            ></redwood-period>
            <div id="overlay" style$="[[_disableOverlay(running)]]"></div>
        `;
    }

    _periodStart() {
        this.$.overlay.style.opacity = 0;
        this.$.overlay.addEventListener('transitionend', e => {
            e.target.style.display = 'none';
        }, {once: true});
    }

    _periodEnd() {
        this.$.overlay.style.display = 'initial';
        setTimeout(() => {
            this.$.overlay.style.opacity = 0.5;
        });
    }

}

window.customElements.define('disable-interface-overlay', DisableInterfaceOverlay);

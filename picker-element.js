import { LitElement, html, css } from 'lit-element';

class PickerElement extends LitElement {
  static get properties() {
    return {
      legend: { type: String },
      name: { type: String },
      options: { type: Array },
      value: { type: String },
      size: { type: Number },
    }
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }

        .center {
          width: fit-content;
          margin: auto;
        }
        
        .legend {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .label {
          font-size: 1rem;
        }
      `
    ];
  }

  constructor() {
    super();
    this.value = '';
    this.size = 3;
  }

  render() {
    return html`
      <link rel="stylesheet" href="./salesforce-lightning-design-system.min.css">
      <style>
        .icon-size {
          height: ${this.size}rem;
          width: ${this.size}rem;
        }
      </style>
      <fieldset class="slds-form-element">
        <legend class="slds-form-element__legend slds-form-element__label legend center">
          ${this.legend}
        </legend>
        <div class="slds-form-element__control wrapper center">
          ${this.options ? this.options.map((opt) => (html`
            <div class="slds-visual-picker slds-visual-picker_large">
              <input
                type="radio"
                id="opt-${opt.value}"
                value="${opt.value}"
                .name="${this.name}" 
                @click="${this._onSelect}"
                opt-input />
              <label for="opt-${opt.value}">
                <span class="slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center">
                  <span class="slds-is-selected">
                    <span class="slds-icon_container">
                      <img class="slds-icon icon-size" alt="" src="${opt.image}"/>
                    </span>
                  </span>
                  <span class="slds-is-not-selected">
                    <span class="slds-icon_container">
                      <img class="slds-icon icon-size " alt="" src="${opt.image}"/>
                    </span>
                  </span>
                </span>
                <span class="slds-visual-picker__body">
                  <span class="slds-text-title label">${opt.label}</span>
                </span>
              </label>
              </div>
          `)) : null}
        </div>
      </fieldset>
    `;
  }

  _onSelect(e) {
    this.value = e.currentTarget.value;
    this.dispatchEvent(new CustomEvent('picker-value-changed', {
      detail: {
        value: e.currentTarget.value,
      },
    }));
  }
}

window.customElements.define('picker-element', PickerElement);

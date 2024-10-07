import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.max = 1000;
    this.min = null;
    this.count = 0;

  }

  static get properties() {
    return {
      title: { type: String },
      max: { type: Number },
      min: { type: Number },
      count: { type: Number }

    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }

      .count-display
        {
          font-size: var(--ddd-font-size-xl);
          
        }


  
      button {
        padding: 8px;;
        font-size: 24px;
        border: 2px solid;
        color: black; 
        margin: var(--ddd-spacing-2);
        margin-top:var(--ddd-spacing-8); }

        button:focus,
        button:hover 
        {
          background-color: var(--ddd-theme-default-navy40);
        }

        button:disabled
        {
          opacity: .5;
          cursor: not-allowed;
        }

      

      
    

      
    `];
  }





  increment(e) {
    if (this.count < this.max)
      this.count++;
  }

  decrement(e) {
    if (this.count > this.min)
      this.count--;
  }


  getCountColor() {
    if (this.count === this.min || this.count === this.max) {
      return 'var(--ddd-theme-default-skyBlue)';
    } else if (this.count === 21) {
      return 'var(--ddd-theme-default-roarGolden)';
    } else if (this.count === 18) {
      return 'var(--ddd-theme-default-original87Pink)';
    }

    return 'var(--ddd-theme-primary)';
  }

  updated(changedProperties) {
    if (changedProperties.has('count')) {
      if (this.count === 21) {
        this.makeItRain();
      }
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      () => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }


  render() {
    return html`
<div class="wrapper">
<confetti-container id="confetti">

  
 <div class="count-display" style="color: ${this.getCountColor()}"> ${this.count}</div>

 <button title="decrement"
  @click="${this.decrement}"
  ?disabled="${this.count === this.min}"> - </button>

 <button title="increment" 
 @click="${this.increment}"
 ?disabled="${this.count === this.max}"> + </button>
  <div>${this.title}</div>
  </confetti-container>
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);
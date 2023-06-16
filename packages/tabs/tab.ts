class Tab extends HTMLElement {
    private _label = document.createElement('label');
    private _selected = false;
    constructor() {
        super();        
    }
    connectedCallback() {
        let style = document.createElement('style');
        style.textContent = `
        .c-tabs label {
            display: inline-block;
        }
        `;
        this.appendChild(style);
        this.appendChild(this._label);
        this.label = this.getAttribute('label') || '';
    }
    static get observedAttributes() {
        return ['label', 'selected'];
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {	    
        switch (name) {
            case 'label':
                this.label = newValue;
                break;
            case 'selected':
                this.selected = newValue?.toLowerCase() === 'true' || newValue === '';
                break;     
            default:
                break;
        }
    }
    get label() {
        return this._label.innerText;
    }
    set label(label) {
        this._label.innerText = label;
        this.dispatchEvent(new Event('changed:label'));
    }
    get selected() {
        return this._selected;
    }
    set selected(selected) {
        this._selected = selected;
        if (this._selected) {
            this._label.classList.add('selected');
        }
        else {
            this._label.classList.remove('selected');
        }
    }
}

customElements.define('c-tab', Tab);
class Tab extends HTMLElement {
    private _label = document.createElement('label');
    private _selected = false;
    constructor() {
        super();        
    }
    connectedCallback() {
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
            case 'checked':
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
    }
}

customElements.define('c-tab', Tab);
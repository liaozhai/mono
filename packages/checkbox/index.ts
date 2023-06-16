class Checkbox extends HTMLElement {

    private _checkbox = document.createElement('span');
    private _checked = false;
    private _right = false;
    private _label = document.createElement('label');
    private _wrapper = document.createElement('div');

    constructor() {
        super();            
    }
    render() {
        this._label.remove();
        this._checkbox.remove();
        if (this.right) {
            this._wrapper.appendChild(this._label);
            this._wrapper.appendChild(this._checkbox);
        }
        else {
            this._wrapper.appendChild(this._checkbox);
            this._wrapper.appendChild(this._label);            
        }
    }
    static get observedAttributes() {
        return ['label', 'checked', 'right'];
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {	    
        switch (name) {
            case 'label':
                this.label = newValue;
                break;
            case 'checked':
                this.checked = newValue?.toLowerCase() === 'true' || newValue === '';
                break;
            case 'right':
                this.right = newValue?.toLowerCase() === 'true' || newValue === '';
                break;
            default:
                break;
        }
    }
    connectedCallback() {
        this._wrapper.classList.add('checkbox');
        this._wrapper.addEventListener('click', e => {
            e.stopPropagation();
            this.checked = !this.checked;
        });

        let style = document.createElement('style');
        style.textContent = `        
        .checkbox {
            cursor: pointer;            
        }
        .checkbox,
        .checkbox > * {
            display: inline-block;
            vertical-align: middle;            
        }
        .checkbox > .box {
            margin-right: 0.3em;
        }
        `;
        this.appendChild(style);
        
        this._checkbox.classList.add('box');
        this._checkbox.classList.add('material-icons');
        this._label.classList.add('label');

        this.appendChild(this._wrapper);

        const checked = this.getAttribute('checked');
        this.checked = checked?.toLowerCase() === 'true' || checked === '';
        this.label = this.getAttribute('label') || '';
        const right = this.getAttribute('right');
        this.right = right?.toLowerCase() === 'true' || right === '';
    }
    get checked() {
        return this._checked;
    }
    set checked(checked) {
        this._checked = checked;
        this._checkbox.innerText = this._checked ? 'check_box' : 'check_box_outline_blank';
        this.dispatchEvent(new Event('click'));
    }
    get label() {
        return this._label.innerText;
    }
    set label(label) {
        this._label.innerText = label;
        this.dispatchEvent(new Event('changed:label'));
    }
    get right() {
        return this._right;
    }
    set right(right) {
        this._right = right;
        this.render();
        this.dispatchEvent(new Event('changed:right'));
    }
}

customElements.define('c-checkbox', Checkbox);
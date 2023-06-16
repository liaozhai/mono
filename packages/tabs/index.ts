import './tab';

class Tabs extends HTMLElement {
    private _tabs = document.createElement('div');
    private _pages = document.createElement('div');
    private _wrapper = document.createElement('div');
    private _selected = 0;
    constructor() {
        super();       
    }    
    connectedCallback() {
        let style = document.createElement('style');
        style.textContent = `
        .c-tabs .tabs > * {
            vertical-align: middle;
        }
        .c-tabs .pages .hidden {
            display: none;
        }        
        `;
        this.appendChild(style);

        this._wrapper.classList.add('c-tabs');
        this._tabs.classList.add('tabs');
        this._wrapper.appendChild(this._tabs);

        this._pages.classList.add('pages');
        this._wrapper.appendChild(this._pages);
        const pages = this.querySelectorAll('c-page');
        for (let i = 0; i < pages.length; ++i) {            
            const p = pages[i];
            p.remove();
            this._pages.appendChild(p);            
            const t = document.createElement('c-tab');
            t.addEventListener('click', e => {
                e.stopPropagation();
                this.selected = i;
            });
            const label = p.getAttribute('label');
            t.setAttribute('label', label || '');
            const selected = p.getAttribute('selected');
            if (selected === '' || selected?.toLowerCase() === 'true') {
                this._selected = i;
                t.setAttribute('selected', 'true');
            }
            this._tabs.appendChild(t);
        }
        this.update();
        this.appendChild(this._wrapper);
    }

    update() {
        const tabs = this._tabs.children;
        const pages = this._pages.children;
        for (let i = 0; i < tabs.length; ++i) {
            const t = tabs[i];
            const p = pages[i];
            if (i === this._selected) {
                t.setAttribute('selected', '');
                p.classList.remove('hidden');
                p.classList.add('selected');
            }
            else {
                t.removeAttribute('selected');
                p.classList.remove('selected');
                p.classList.add('hidden');
            }
        }
    }

    get selected() {
        return this._selected;
    }

    set selected(selected) {
        this._selected = selected;
        this.update();        
    }
}

customElements.define('c-tabs', Tabs);
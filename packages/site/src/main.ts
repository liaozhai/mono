import './index.css';
import '@components/checkbox';
import '@components/tabs';

window.addEventListener('load', () => {
    const app = document.getElementById('app');
    if(app) {
        app.innerHTML = `
        <c-tabs>
            <c-page label="Checkboxes">
                <c-checkbox checked label="Option 1"></c-checkbox>
                <c-checkbox label="Option 2"></c-checkbox>
                <c-checkbox label="Option 3"></c-checkbox>
            </c-page>
            <c-page label="Fields">
                Some fields
            </c-page>
        </c-tabs>
        `;
    }    
});

export class Toast {
    static #container = null;

    static #getContainer() {
        if (!this.#container) {
            this.#container = document.createElement('div');
            this.#container.className = 'toast-container';
            this.#container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                max-width: 300px;
            `;
            document.body.appendChild(this.#container);
        }
        return this.#container;
    }

    static #createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.cssText = `
            background: ${type === 'success' ? '#126615ff' : type === 'error' ? '#f31607ff' : '#217dc9ff'};
            color: white;
            padding: 12px 16px;
            margin-bottom: 8px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: opacity 0.3s ease;
        `;
        toast.textContent = message;

        this.#getContainer().appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);

        toast.addEventListener('click', () => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        });
    }

    static success(message) {
        this.#createToast(message, 'success');
    }

    static error(message) {
        this.#createToast(message, 'error');
    }

    static info(message) {
        this.#createToast(message, 'info');
    }
}

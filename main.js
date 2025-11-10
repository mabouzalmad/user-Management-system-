
import { UserManager } from './models/UserManager.js';
import { UIManager } from './ui/UIManager.js';
import { api } from './services/api.js';
import { Toast } from './ui/Toast.js';

class App {
    constructor() {
        this.userManager = new UserManager();
        this.uiManager = null;
    }

    async init() {
        try {
            const data = await api.get('./data.json');
            await this.userManager.seedUsers(data.users);
            
            this.uiManager = new UIManager(this.userManager);
            this.uiManager.render();
            
            Toast.info('User Management System loaded successfully!');
        } catch (error) {
            if (error.type === 'NETWORK') {
                Toast.info('Using local storage data only');
            } else {
                Toast.error('Failed to initialize app: ' + error.message);
            }
         
            this.uiManager = new UIManager(this.userManager);
            this.uiManager.render();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
});

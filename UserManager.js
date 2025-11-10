
import { User } from './User.js';
import { NotFoundError } from '../utils/errors.js';
import { storage } from '../services/storage.js';

const STORAGE_KEY = 'users-v1';

export class UserManager {
    #users = [];
    #nextId = 1;

    constructor() {
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        const stored = storage.get(STORAGE_KEY);
        if (stored && Array.isArray(stored)) {
            this.#users = stored.map(userData => new User(userData));
            this.#nextId = Math.max(...this.#users.map(u => u.id), 0) + 1;
        }
    }

    async #save() {
        await storage.set(STORAGE_KEY, this.#users.map(user => user.toJSON()));
    }

    async addUser(data) {
        const userData = {
            id: this.#nextId++,
            name: data.name,
            email: data.email,
            age: data.age
        };

        const user = new User(userData);
        this.#users.push(user);
        await this.#save();
        return user;
    }

    getUser(id) {
        const user = this.#users.find(u => u.id === id);
        if (!user) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        return user;
    }

    async updateUser(id, data) {
        const user = this.getUser(id);
        user.update(data);
        await this.#save();
        return user;
    }

    async deleteUser(id) {
        const index = this.#users.findIndex(u => u.id === id);
        if (index === -1) {
            throw new NotFoundError(`User with ID ${id} not found`);
        }
        this.#users.splice(index, 1);
        await this.#save();
    }

    getAll() {
        return [...this.#users];
    }

    async seedUsers(usersData) {
        if (this.#users.length === 0 && usersData.length > 0) {
            this.#users = usersData.map(userData => new User(userData));
            this.#nextId = Math.max(...this.#users.map(u => u.id), 0) + 1;
            await this.#save();
        }
    }
}
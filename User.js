

export class User {
    #id;
   #name;
   #email;
   #age;
    constructor({ id, name, email, age }) {
        this.#id = id;
        this.#name = name;
        this.#email = email;
        this.#age = age;
        
    
            this.validate(); 
    }

    validate() {
        if (typeof this.#name !== "string" || this.#name.length < 2) {
            throw new Error("Nom contient minimum 2 caractères");
        }

        if (!Number.isInteger(this.#id) || this.#id <= 0) {
            throw new Error("ID doit etre un entier positif ");
        }

        if (typeof this.#age !== "number" || this.#age < 1 || this.#age > 120) {
            throw new Error("Âge doit être entre 1 et 120");
        }

        if (typeof this.#email !== "string" ||!this.#email.includes("@") ||!this.#email.includes(".")) {
            throw new Error("Email doit contenir '@' et '.'");
        }
    }
      
    update(data) {
        if (data.name !== undefined) this.#name = data.name;
        if (data.email !== undefined) this.#email = data.email;
        if (data.age !== undefined) this.#age = data.age;

        this.validate();
    }

      toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            email: this.#email,
            age: this.#age
        };
    }
   get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
   get email() {
        return this.#email;
    }
  get age() {
        return this.#age;
    }


}
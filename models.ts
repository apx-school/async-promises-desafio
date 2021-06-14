import * as jsonfile from "jsonfile";

class Contact {
    id: number;
    name: string;
}

class ContactsCollection {
    data: Contact[] = [];
    load(): Promise<any> {
        // usar la version Async (readFile)
        const promise: Promise<any> = jsonfile.readFile("./contacts.json");
        promise.then((obj) => {
            this.data = obj;
        });
        return promise;
    }
    getAll() {
        return this.data;
    }
    addOne(contact: Contact) {
        this.data.push(contact);
    }
    save() {
        // usar la version Async (writeFIle)
        jsonfile.writeFile("./contacts.json", this.data);
    }
    getOneById(id) {
        const encontrado = this.data.find((contacto) => {
            if (contacto.id == id) {
                return true;
            }
        });

        return encontrado;
    }
}
export { ContactsCollection, Contact };

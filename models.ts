import * as jsonfile from "jsonfile";

class Contact {
  id: number;
  name: string;
}

class ContactsCollection {
  data: Contact[] = [];
  promesa: Promise<any>;
  load() {
    const promesa = jsonfile.readFile("./contacts.json");
    promesa.then((json) => {
      this.data = json;
    });
    return promesa;
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    jsonfile.writeFile("./contacts.json", this.data);
  }
  getOneById(id) {
    const encontrado = this.data.find((contacto) => {
      return contacto.id == id;
    });

    return encontrado;
  }
}
export { ContactsCollection, Contact };

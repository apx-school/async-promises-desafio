import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];

  async load() {
    const promesa = jsonfile.readFile(__dirname + "/contacts.json");
    promesa.then( (json) => {
      this.data = json;
    })
    return promesa;
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  async save() {
    // usar la version Async (writeFIle)
    //jsonfile.writeFileSync(__dirname + "/contacts.json", this.data);

    const promesa = jsonfile.writeFile(__dirname + "/contacts.json", this.data)
    promesa.then( (json) => {

    })
  }
  getOneById(id) {
    const encontrado = this.data.find((contacto) => {
      if (contacto?.id == id) {
        return true;
      }
    });

    return encontrado;
  }
}
export { ContactsCollection, Contact };

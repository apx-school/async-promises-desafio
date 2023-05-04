import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  async load() {
    // usar la version Async (readFile)
    const prom = jsonfile.readFile(__dirname + "/contacts.json");
    const json = await prom;
    this.data = json;
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
    return jsonfile.writeFile(__dirname + "/contacts.json", this.data);
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

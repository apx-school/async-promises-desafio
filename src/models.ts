import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile)
    const aPromise = jsonfile
      .readFile(__dirname + "/contacts.json")
      .then((data) => {
        this.data = data;
      });
    return aPromise;
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
    this.save();
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

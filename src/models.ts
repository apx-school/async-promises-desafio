import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name?: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    const promise = jsonfile.readFile(__dirname + "/contacts.json");
    promise.then((json) => {
      this.data = json;
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

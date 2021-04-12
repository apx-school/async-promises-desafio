import * as jsonfile from "jsonfile";
import * as find from "lodash/find";

class Contact {
  id: number;
  name: string;
}

class ContactsCollection {
  data: Contact[] = [];

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
    return find(this.data, { id: id });
  }
}
export { ContactsCollection, Contact };

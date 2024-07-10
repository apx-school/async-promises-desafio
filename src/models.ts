import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    return jsonfile.readFile(__dirname + "/contacts.json")
      .then((json) => {
        this.data = json;
      })
      .catch((err) => {
        console.error("Error loading contacts.json:", err);
      });
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    return jsonfile.writeFile(__dirname + "/contacts.json", this.data)
      .catch((err) => {
        console.error("Error saving contacts.json:", err);
      });
  }
  getOneById(id) {
    return this.data.find((contacto) => contacto?.id == id);
  }
}

export { ContactsCollection, Contact };
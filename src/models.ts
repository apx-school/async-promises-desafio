import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    return jsonfile
      .readFile(__dirname + "/contacts.json")
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    return jsonfile
      .writeFile(__dirname + "/contacts.json", this.data)
      .catch((error) => {
        console.error(error);
        throw error;
      });
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

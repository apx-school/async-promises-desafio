import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile)
    return jsonfile.readFile(__dirname + "/contacts.json").then((c) => {
      this.data = c;
      // console.log({ c });
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
      .then(() => {
        return "Guardado con exito.";
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

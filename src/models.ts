import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile)
    const firstPromise = jsonfile.readFile(__dirname + "/contacts.json");
    firstPromise.then((json) => {
      this.data = json;
    });
    return firstPromise;
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
    const secondPromise = jsonfile.writeFile(
      __dirname + "/contacts.json",
      this.data
    );
    secondPromise.then((save) => {
      return save;
    });
    return secondPromise;
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

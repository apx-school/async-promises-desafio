import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    const json = jsonfile.readFile(__dirname + "/contacts.json");
    json.then((json) => {
      this.data = json;
    });
    return json;
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    const promesa = jsonfile.writeFile(__dirname + "/contacts.json", this.data);
    return promesa;
  }

  getOneById(id: number) {
    const encontrado = this.data.find((contacto) => {
      if (contacto?.id == id) {
        return true;
      }
    });

    return encontrado;
  }
}
export { ContactsCollection, Contact };

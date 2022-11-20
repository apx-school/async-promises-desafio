import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];

  load() :Promise<any>{
    return jsonfile.readFile(__dirname + "/contacts.json").then((json) => {
      this.data = json;
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
  }
  getOneById(id) {
    const encontrado = this.data.find((contacto) => {
      if (contacto?.id == id) {
        return true;
      }
    })
    return encontrado;
  }
}
export { ContactsCollection, Contact };

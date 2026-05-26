import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load(): Promise<any> {
  return jsonfile.readFile(__dirname + "/contacts.json").then((json) => {
    this.data = json;
    return this.data;
  });
}
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save(): Promise<any> {
   return jsonfile.writeFile(__dirname + "/contacts.json", this.data, { spaces: 2 });
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

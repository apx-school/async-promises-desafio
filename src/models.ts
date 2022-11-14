import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    const promesa = jsonfile.readFile(__dirname + "/contacts.json");
    promesa.then((item) => {
      this.data = item;
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
    const promesa = jsonfile.writeFile(__dirname + "/contacts.json", this.data);
    promesa.then((respuesta) => {
      console.log(respuesta);
    });
    return promesa;
  }
  getOneById(id) {
    return this.data.find((item) => item.id == id);
  }
}
export { ContactsCollection, Contact };

import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name?: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load(): Promise<any> {
    // usar la version Async (readFile)
    const promesa = jsonfile
      .readFile(__dirname + "/contacts.json")
      .then((json) => {
        this.data = json;
        //console.log("Load() Datos cargados:", this.data);
        return this.data;
      })
      .catch((error) => {
        console.error(error);
        throw error;
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
    // usar la version Async (writeFIle)
    // console.log("Ejecutando save() con datos:", this.data);
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

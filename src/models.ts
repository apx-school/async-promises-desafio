import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile)
    const file = __dirname + "/contacts.json";

    const promesa = jsonfile.readFile(file);
    promesa.then((data) => {
      this.data = data; // Guardás los datos en this.data
      console.log("Datos Importados");
    });
    promesa.catch((error) => {
      console.error("Hubo un error: " + error);
      // Podrías lanzar el error si querés que se maneje más arriba
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
    const file = __dirname + "/contacts.json";
    const savePromise = jsonfile.writeFile(file, this.data);
    return savePromise;
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

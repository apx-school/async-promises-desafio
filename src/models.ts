import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name?: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile). Retorna un objeto del tipo Promise
    const promesa =  jsonfile.readFile(__dirname + "/contacts.json");
    promesa.then(json => { 
      this.data = json 
    });
    promesa.catch(e => {
      console.log("Error", e)
    });
    // Esto devuelve un objeto del tipo promesa, asi que podemos engancharos con .then
    return promesa;
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFile). Acá no hay algo esperando que se termine de guardar el archivo, por ende simplemente con el then devolvemos un mensaje de éxito o de error
    return jsonfile.writeFile(__dirname + "/contacts.json", this.data, { spaces: 2 })
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

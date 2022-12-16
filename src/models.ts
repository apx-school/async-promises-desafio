import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

//Modificar el model y sustituir las funciones de la librería 
//jsonfile readFileSync() y writeFileSync() por las funciones 
//asincrónicas que utilizan promesas readFile() y writeFile().

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile)
    const promesa = jsonfile.readFile(__dirname + "/contacts.json")
      promesa.then((json) => {
        this.data =json;
      });
      return promesa;
    };
    // this.data = json;
  
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
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

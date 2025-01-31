import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile)
    const promesa = jsonfile.readFile(__dirname + "/contacts.json");    
    promesa.then((json)=> {
      this.data = json; //luego de leido el archivo se carga en el atributo data como una Collection
    })

    //console.log(this.data);
     
    return promesa; //la retorno para que pueda ser usada en el index y en los test (mediante el controlador)
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
    const promise = jsonfile.writeFile(__dirname + "/contacts.json", this.data);
    return promise; //Necesito retornarla para que pueda utilizarse en los test
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

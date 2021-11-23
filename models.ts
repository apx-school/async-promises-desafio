import * as jsonfile from "jsonfile";

class Contact {
  id: number;
  name: string;
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile)
  const file = "./contacts.json" ;
  const promise = jsonfile.readFile(file);
  promise
  .then( (res) =>{
    this.data = res
  } )
  return promise



  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
    const file = "./contacts.json"
    jsonfile.writeFile(file, this.data)
    
    


  }
  getOneById(id) {
    const encontrado = this.data.find((contacto) => {
      if (contacto.id == id) {
        return true;
      }
    });

    return encontrado;
  }
}
export { ContactsCollection, Contact };

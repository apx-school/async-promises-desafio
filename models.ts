import * as jsonfile from "jsonfile";

class Contact {
  id: number;
  name: string;
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile)
//     const jsonfile = require('jsonfile')
// const archivoALeer = "./contacts.json"
const archivoLeido = jsonfile.readFile("./contacts.json")
//.then(obj => console.dir(obj))
//archivoLeido.catch(error => console.error(error))
    // const json = jsonfile.readFileSync("./contacts.json");
   archivoLeido.then((json)=>
   this.data=json)
   return archivoLeido
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
//     const jsonfile = require('jsonfile')
 
// const file = "./contacts.json"
// const obj = { name: 'JP' }
 
// jsonfile.writeFile(file, obj)
//   .then(res => {
//     console.log('Write complete')
//   })
//   .catch(error => console.error(error))
    return jsonfile.writeFile("./contacts.json", this.data);
  }
  getOneById(id) {
     const encontrado = this.data.find((contacto) => { 
       return contacto.id == id}
       )
       return encontrado
}
}
  
export { ContactsCollection, Contact }
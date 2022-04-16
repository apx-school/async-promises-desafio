import * as jsonfile from "jsonfile";

class Contact {
  id: number;
  name: string;
}

class ContactsCollection {
  data: Contact[] = [];
  load() {
    // usar la version Async (readFile)
    const loadPromise = jsonfile.readFile("./contacts.json")
    loadPromise.then((res) => {
      this.data = res;
      // console.log(this);
    });
    loadPromise.catch((err) => {
      console.log("Esto falló");
    });
    return loadPromise;
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
    jsonfile.writeFile("./contacts.json", this.data);
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

// const prueba = new ContactsCollection();
// prueba.load().then(res => {
//   console.log(prueba.getAll(), 3)
// })
// console.log(prueba.data, 2) 
// console.log(prueba.getAll(), 3)
export { ContactsCollection, Contact };

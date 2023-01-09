import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class ContactsCollection {
  data: Contact[] = [];
  load(): Promise<any> {
    // usar la version Async (readFile)
    const json = jsonfile.readFile(__dirname + "/contacts.json");
    return json.then((res) => {
      res.map((contact) => {
        this.data.push(contact);
      });
    });
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  save() {
    // usar la version Async (writeFIle)
    const promesa = jsonfile.writeFile("./contacts.json", this.data);
    return promesa.then((res) => {
      return res;
    });
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
/*

const c1 = new Contact(123, "8choa");
const coll = new ContactsCollection();
const c = coll.load();
console.log(coll.getAll());
coll.addOne(c1);
c.then(() => {
  coll.save();
});

const refresh = guardando.then(() => {
  coll.load();
});

const buscando = refresh.then(() => {
  console.log(coll.getOneById(123));
});
*/
export { ContactsCollection, Contact };

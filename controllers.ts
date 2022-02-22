import { ContactsCollection } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: any;
}

class ContactsController {
  contacts: ContactsCollection;
  promise: Promise<any>
  constructor() {
    this.contacts = new ContactsCollection();
    const promise = this.contacts.load();
    this.promise = promise
  }
  processOptions(options: ContactsControllerOptions) {
    var resultado;
    if (options.action == "get") {
      var contactos = this.contacts.data
      var idExiste = contactos.find(c => c.id == options.params)
      if (idExiste) {
        resultado = this.contacts.getOneById(options.params)
      } else {
        resultado = this.contacts.getAll()
      }
    } else if (options.action == "save" && options.params) {
      this.contacts.addOne(options.params);
      this.contacts.save();
    }
    return resultado;
  }
}
export { ContactsController };

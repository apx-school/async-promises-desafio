import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: Contact;
}

class ContactsController {
  contacts: ContactsCollection;
  contactosLeidos: Promise<any>;
  constructor() {
    this.contacts = new ContactsCollection();
    this.contactosLeidos = this.contacts.load();
  }
  processOptions(options: ContactsControllerOptions): Promise<any> {
    return this.contactosLeidos.then(() => {
      var resultado;
      if (options.action == "get" && options.params.id) {
        resultado = this.contacts.getOneById(options.params.id);
      } else if (options.action == "get") {
        resultado = this.contacts.getAll();
      } else if (options.action == "save" && options.params) {
        this.contacts.addOne(options.params);
        resultado = this.contacts.save();
      }
      return resultado;
    });
  }
}
export { ContactsController };

import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: Contact;
}

class ContactsController {
  contacts: ContactsCollection;
  cargador: boolean;
  constructor() {
    this.contacts = new ContactsCollection();
    this.cargador = false;
  }
  async cargadorDeContacts() {
    await this.contacts.load();
    this.cargador = true;
  }
  async processOptions(options: ContactsControllerOptions) {
    if (!this.cargador) {
      await this.cargadorDeContacts();
    }
    var resultado;
    if (options.action == "get" && options.params.id) {
      resultado = this.contacts.getOneById(options.params.id);
    } else if (options.action == "get") {
      resultado = this.contacts.getAll();
    } else if (options.action == "save" && options.params) {
      this.contacts.addOne(options.params);
      await this.contacts.save();
    }
    return resultado;
  }
}
export { ContactsController };

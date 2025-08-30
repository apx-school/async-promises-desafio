import { ContactsCollection, Contact } from "./models";

export interface ContactsControllerOptions {
  action: "get" | "save";
  params: {
    id: number; // id es obligatorio
    name?: string; // name es opcional
  };
}

class ContactsController {
  contacts: ContactsCollection;
  promise: Promise<any>;
  constructor() {
    this.contacts = new ContactsCollection();
    const promise = this.contacts.load();
    this.promise = promise;
  }
  async processOptions(options: ContactsControllerOptions) {
    var resultado;
    if (options.action == "get" && options.params.id) {
      resultado = this.contacts.getOneById(options.params.id);
    } else if (options.action == "get") {
      resultado = this.contacts.getAll();
    } else if (options.action == "save" && options.params) {
      this.contacts.addOne(options.params);
      resultado = await this.contacts.save();
    }
    return resultado;
  }
}
export { ContactsController };

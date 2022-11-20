import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: any;
}

class ContactsController {
  contacts: ContactsCollection;
  constructor() {
    this.contacts = new ContactsCollection();
    this.promesa = this.contacts.load();
  }

  promesa :Promise<any>;

  processOptions(options: ContactsControllerOptions) {
    var resultado;
    return this.promesa.then(() => {
      if (options.action == "get" && options.params.id) {
        resultado = this.contacts.getOneById(options.params.id);
      } else if (options.action == "get") {
        resultado = this.contacts.getAll();
      } else if (options.action == "save" && options.params) {
        this.contacts.addOne(options.params);
        return this.contacts.save();
      }
      return resultado;
    })
  }
}
export { ContactsController };

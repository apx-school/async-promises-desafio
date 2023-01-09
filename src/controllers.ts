import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: any;
}

class ContactsController {
  contacts: ContactsCollection;
  loaded: Promise<Contact>;
  constructor() {
    this.contacts = new ContactsCollection();
    const promesa = this.contacts.load();
    this.loaded = promesa;
  }
  processOptions(options: ContactsControllerOptions) {
    if (options.action == "get" && options.params.id) {
      this.loaded.then(() => {
        console.log(this.contacts.getOneById(options.params.id));
      });
    } else if (options.action == "get") {
      this.loaded.then(() => {
        console.log(this.contacts.getAll());
      });
    } else if (options.action == "save" && options.params) {
      return this.loaded.then(() => {
        this.contacts.addOne(options.params);
        this.contacts.save();
      });
    }
  }
}

export { ContactsController };

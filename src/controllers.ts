import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: Contact;
}

class ContactsController{
  contacts: ContactsCollection;
  initPromise: Promise<any>;

  constructor() {
    this.contacts = new ContactsCollection();
    this.initPromise = this.contacts.load();
  }

 processOptions(options: ContactsControllerOptions): Promise<any> {
  return this.initPromise.then(() => {
    if (options.action == "get" && options.params.id) {
      return this.contacts.getOneById(options.params.id);
    } else if (options.action == "get") {
      return this.contacts.getAll();
    } else if (options.action == "save" && options.params) {
      this.contacts.addOne(options.params);

      return this.contacts.save().then(() => {
        return options.params;
      });
    }
  });
}
}
export { ContactsController };
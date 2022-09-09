import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: Contact;
}

class ContactsController {
  contacts: ContactsCollection;
  // El tipo Promise en TS viene acompañado de otro tipo que le indica qué otro tipo o clase arroja la rta de la Promesa. Con esto nos alcanza para que el controlador tenga una promesa en sus props
  promesa: Promise<any>;
  constructor() {
    this.contacts = new ContactsCollection();
    // Recordemos que load() devuelve una promesa, por ende tenemos disponible el método then y catch
    const promesa = this.contacts.load();
    // Esta es la promesa que vuelve del json que lo hicimos async y ahora podemos manipularlo desde el index
    this.promesa = promesa;
  }
  processOptions(options: ContactsControllerOptions) {
    var resultado;
    if (options.action == "get" && options.params.id) {
      resultado = this.contacts.getOneById(options.params.id);
    } else if (options.action == "get") {
      resultado = this.contacts.getAll();
    } else if (options.action == "save" && options.params) {
      this.contacts.addOne(options.params);
      this.contacts.save();
    }
    return resultado;
  }
}
export { ContactsController };

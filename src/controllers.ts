import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: Contact;
}

class ContactsController {
  contacts: ContactsCollection;
  promesa: Promise<any>;

  constructor() {
    this.contacts = new ContactsCollection();
    this.promesa = this.contacts.load();
  }

  processOptions(options: ContactsControllerOptions) {
    let resultado;
    if (options.action === "get") {
      if (options.params && options.params.id) {
        resultado = this.contacts.getOneById(options.params.id);
      } else {
        resultado = this.contacts.getAll();
      }
    } else if (options.action === "save" && options.params) {
      // console.log("Agregando contacto:", options.params); // Verifica que el contacto se esté agregando
      this.contacts.addOne(options.params);
      return this.contacts.save().then(() => {
        return this.contacts.load().then((contactosActualizados) => {
          // console.log("Contactos actualizados:", contactosActualizados); // Verifica qué contactos se están cargando
          return contactosActualizados; // Retornar el resultado aquí
        });
      });
    }
    return Promise.resolve(resultado);
  }
}
export { ContactsController };

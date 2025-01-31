import { ContactsCollection, Contact } from "./models";

export class ContactsControllerOptions {
  action: "get" | "save";
  params: any;
}

class ContactsController {
  contacts: ContactsCollection;
  promesa: Promise<any>;
  constructor() {
    this.contacts = new ContactsCollection();
    const promesa = this.contacts.load(); //El controlador se guarda la promesa, no la lista de contactos
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
      return this.contacts.save().then(() => {
        return this.contacts.load().then((contactosActualizados) => {
            resultado = contactosActualizados
        }); //actualizo la collection de contactos
      });
      
    }
    return resultado;
  }
}
export { ContactsController };

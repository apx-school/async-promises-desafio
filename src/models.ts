import * as jsonfile from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];

  // Método load que devuelve una promesa
  load(): Promise<void> {
    return jsonfile.readFile(__dirname + "/contacts.json")
      .then((json) => {
        this.data = json; // Asigna los datos leídos
      })
      .catch((error) => {
        console.error("Error al cargar contactos:", error);
        throw error; // Vuelve a lanzar el error para que el llamador lo maneje
      });
  }

  getAll() {
    return this.data;
  }

  addOne(contact: Contact) {
    this.data.push(contact);
  }

  // Método save que devuelve una promesa
  save(): Promise<void> {
    return jsonfile.writeFile(__dirname + "/contacts.json", this.data)
      .catch((error) => {
        console.error("Error al guardar contactos:", error);
        throw error; // Vuelve a lanzar el error
      });
  }

  getOneById(id: number): Contact | undefined {
    return this.data.find((contacto) => contacto?.id === id);
  }

  // Método para eliminar un contacto por ID
  removeById(id: number): boolean {
    const index = this.data.findIndex((contacto) => contacto.id === id);
    if (index !== -1) {
      this.data.splice(index, 1); // Elimina el contacto del array
      return true; // Indica que se eliminó con éxito
    }
    return false; // Indica que no se encontró el contacto
  }
}

export { ContactsCollection, Contact };

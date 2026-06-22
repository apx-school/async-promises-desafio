import * as jsonfile from "jsonfile";
import { readFileSync, writeFileSync } from "jsonfile";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];
  async load(): Promise<void> {
    try {
      this.data = await jsonfile.readFile(__dirname + "/contacts.json");
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  }
  getAll() {
    return this.data;
  }
  addOne(contact: Contact) {
    this.data.push(contact);
  }
  async save() {
    try {
      await jsonfile.writeFile(__dirname + "/contacts.json", this.data);
      return this.data;
    } catch (error) {
      console.error("Error saving contacts:", error);
      throw error;
    }
  }
  getOneById(id: number) {
    const encontrado = this.data.find((contacto) => {
      if (contacto?.id == id) {
        return true;
      }
    });

    return encontrado;
  }
}
export { ContactsCollection, Contact };

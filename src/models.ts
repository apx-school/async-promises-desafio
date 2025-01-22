import "./contacts.json";
import { readFile, writeFile } from "fs/promises";

class Contact {
  id?: number = undefined;
  name: string = "";
}

class ContactsCollection {
  data: Contact[] = [];

  async load() {
    try {
      const json = await readFile(__dirname + "\\contacts.json", "utf-8");
      this.data = JSON.parse(json);
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
      await writeFile(__dirname + "\\contacts.json", JSON.stringify(this.data, null, 2));
    } catch (error) {
      console.error("Error saving contacts:", error);
    }
  }

  getOneById(id: number) {
    return this.data.find((contact) => contact?.id === id);
  }
}

export { ContactsCollection, Contact };

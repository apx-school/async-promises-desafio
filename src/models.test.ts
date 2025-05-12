import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test.serial("Testeo el load del modelo", async (t) => {
  const model = new ContactsCollection();
  await model.load(); // Espera a que la promesa se resuelva
  t.deepEqual(contactsObject, model.getAll());
});

test.serial("Testeo el addOne del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 30,
    name: "Marce",
  };
  model.addOne(mockContact);
  t.deepEqual(model.getAll(), [mockContact]);
});

test.serial("Testeo el save del modelo", async (t) => {
  const model = new ContactsCollection();
  await model.load(); // Espera a que la promesa se resuelva
  const mockContact = {
    id: 30,
    name: "Marce",
  };
  model.addOne(mockContact);
  await model.save(); // Espera a que la promesa se resuelva
  const fileContent = await jsonfile.readFile(__dirname + "/contacts.json"); // Usa readFile en lugar de readFileSync
  t.deepEqual(fileContent, model.getAll());
});

test.serial("Testeo el getOneById del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 31,
    name: "Marce",
  };
  model.addOne(mockContact);
  const one = model.getOneById(31);
  t.deepEqual(one, mockContact);
});

// Nueva prueba para removeById
test.serial("Testeo el removeById del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 32,
    name: "Juan",
  };
  model.addOne(mockContact);
  const wasRemoved = model.removeById(32);
  t.true(wasRemoved); // Debe devolver true al eliminar
  t.is(model.getAll().length, 0); // La colección debe estar vacía
});

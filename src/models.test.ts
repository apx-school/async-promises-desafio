import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import { readFile } from "fs/promises";

test.serial("Testeo el load del modelo", async (t) => {
  const model = new ContactsCollection();
  await model.load();
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
  await model.load(); // Aseguramos que los datos se carguen antes de guardar
  const mockContact = {
    id: 30,
    name: "Marce",
  };
  model.addOne(mockContact);
  await model.save(); // Guardar el nuevo contacto

  // Leer el contenido del archivo actualizado para verificar el guardado
  const fileContent = JSON.parse(await readFile(__dirname + "/contacts.json", "utf-8"));
  t.deepEqual(fileContent, model.getAll());
});

test.serial("Testeo el getOneById del modelo", async (t) => {
  const model = new ContactsCollection();
  await model.load(); // Cargamos datos antes de usar `getOneById`
  const mockContact = {
    id: 31,
    name: "Marce",
  };
  model.addOne(mockContact);
  const one = model.getOneById(31);
  t.deepEqual(one, mockContact);
});

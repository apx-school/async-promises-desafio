import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";
import * as path from "path";

test.serial("Testeo el load del modelo", async (t) => {
  const filePath = path.join(__dirname, "contacts.json");

  // Datos de prueba para cargar
  const testData = [
    { id: 1, name: "Ana" },
    { id: 2, name: "Paula" },
    { id: 3, name: "Mer" },
    { id: 4, name: "Dana" }
  ];

  // Escribe los datos de prueba en el archivo
  await jsonfile.writeFile(filePath, testData, { spaces: 2 });

  // Crear una instancia del modelo y cargar datos
  const model = new ContactsCollection();
  await model.load();

  // Verificar que los datos cargados sean correctos
  t.deepEqual(model.getAll(), testData);
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

test.serial("Testeo el save del modelo", async (t) => {
  const filePath = path.join(__dirname, "contacts.json");
  const mockContact = {
    id: 30,
    name: "Marce",
  };
  await jsonfile.writeFile(filePath, mockContact, { spaces: 2 });
  const model = new ContactsCollection();
  model.addOne(mockContact)
  await model.save();

  t.deepEqual(model.getOneById(30), mockContact);
});

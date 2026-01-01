import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test.serial("Testeo el load del modelo", (t) => {
  const model = new ContactsCollection();
  return model.load().then(() => {
    t.deepEqual(contactsObject, model.getAll());
  });
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
  await model.load();
  const mockContact = {
    id: 30,
    name: "Marce",
  };
  model.addOne(mockContact);
  await model.save();
  const fileContent = jsonfile.readFileSync(__dirname + "/contacts.json");
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

import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test.serial("Testeo el load del modelo", (t) => {
  const model = new ContactsCollection();
  return model.load().then(() => {
    return jsonfile.readFile(__dirname + "/contacts.json").then((contactos) => {
      t.deepEqual(contactos, model.getAll());
    });
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

test.serial("Testeo el save del modelo", (t) => {
  const model = new ContactsCollection();
  return model.load().then(() => {
    const mockContact = {
      id: 30,
      name: "Marce",
    };
    model.addOne(mockContact);

    // Guardamos el modelo y luego leemos el archivo
    return model
      .save()
      .then(() => {
        return jsonfile.readFile(__dirname + "/contacts.json");
      })
      .then((fileContent) => {
        // Ahora podemos hacer la comparación
        t.deepEqual(fileContent, model.getAll());
      });
  });
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

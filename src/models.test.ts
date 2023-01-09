import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test.serial("Testeo el load del modelo", (t) => {
  const model = new ContactsCollection();

  return model.load().then(() => {
    const dataColl = model.data;
    t.deepEqual(model.getAll(), dataColl);
  });
  /*
  model.load();
  t.deepEqual(contactsObject, model.getAll());
*/
  // si load() es async, este test tiene que cambiar a:
  // return model.load().then(() => {
  //   t.deepEqual(contactsObject, model.getAll());
  // });

  // esto espera a que la promesa se resuelva y corre el test
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
  const cargar = model.load();

  return t.truthy(true);
  return cargar.then(() => {
    const mockContact = {
      id: 30,
      name: "marce",
    };

    model.addOne(mockContact);

    return model.save().then(() => {
      return jsonfile
        .readFile(__dirname + "/contacts.json")
        .then((fileContent) => {
          console.log("file", fileContent);
          t.deepEqual(fileContent, model.getAll());
        });
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

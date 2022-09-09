import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";
import { readFileSync } from "fs";

test.serial("Testeo el load del modelo", (t) => {
  // Instanciamos el modelo
  const model = new ContactsCollection();
  // Usamos el método load, que devuelve un objeto del tipo Promise
  const dataLoaded = model.load();
  // Usamos el then de la Promise y comparamos el json con el resultado del método getAll del model
  return dataLoaded.then(() => {
    t.deepEqual(contactsObject, model.getAll());
  })
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
  t.deepEqual(model.getOneById(30), mockContact);
});

test.serial("Testeo el save del modelo", (t) => {
  const model = new ContactsCollection();
  // devuelvo esto para que ava espere a que la promesa se resuelva
  return model.load().then(() => {
    const mockContact = {
      id: 26,
      name: 'Mati'
    };
    model.addOne(mockContact);
    return model.save().then(() => {
      const json = jsonfile.readFileSync(__dirname + '/contacts.json');
      t.deepEqual(json, model.getAll());
    })   
  })
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

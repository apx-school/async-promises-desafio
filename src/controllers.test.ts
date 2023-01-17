import test from "ava";
import { readFile, readFileSync } from "jsonfile";
import { ContactsController } from "./controllers";

test("Testeo el constructor del controller", (t) => {
  const model = new ContactsController();
  const modelGetAll = model.promise.then(() => {
    return model.contacts.getAll();
  });
  t.truthy(modelGetAll);
});
test("Testeo el método processOptions", (t) => {
  const model = new ContactsController();
  return model.promise.then(() => {
    const pruebaPrimerIf = model.processOptions({
      action: "get",
      params: { id: 1, name: "Ana" },
    });
    const comparadorPruebaPrimerIf = model.contacts.getOneById(1);
    t.deepEqual(pruebaPrimerIf, comparadorPruebaPrimerIf);
    // return model.promise.then(() => {
    //   const pruebaSegundoIf = model.processOptions({
    //     action: "get",
    //     params: { id: 50, name: "noname" },
    //   });
    //   const comparadorPruebaSegundoIf = model.contacts.getAll();
    //   t.deepEqual(pruebaSegundoIf, comparadorPruebaSegundoIf);
    // });

    // const pruebaTercerIf = model.processOptions({
    //   action: "save",
    //   params: { id: 5, name: "Ignacio" },
    // });
    // const comparadorPruebaTercerIf = model.contacts.getOneById(5);
    // t.deepEqual(comparadorPruebaTercerIf, { id: 5, name: "Ignacio" });
  });
});

// test("Testeo el constructor del controller", (t) => {
//   const model = new ContactsController();
//   const fileModel = readFile(__dirname + "./contacts.json");
//   const modelGetAll = model.promise.then(() => {
//     return model.contacts.getAll();
//   });
//   t.deepEqual(fileModel, modelGetAll);
// });

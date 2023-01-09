import test from "ava";
import { ContactsController } from "./controllers";
import * as jsonfile from "jsonfile";

test("Testeo el constructor del controller", (t) => {
  const controller = new ContactsController();
  //no va por que hay que esperar a que termine el constructor,
  //se puede llamar a la propiedad loaded

  return controller.loaded.then(() => {
    const get = controller.contacts.getAll();

    const file = jsonfile.readFileSync(__dirname + "/contacts.json");
    t.deepEqual(file, get);
  });
});

test("Testeo el método processOptions", (t) => {
  const controller = new ContactsController();
  const getOne = controller.processOptions({
    action: "get",
    params: { id: 2 },
  });
  const getP = getOne?.then(() => {
    controller.contacts.getOneById(2);
  });
  t.deepEqual(getOne, getP);

  const getAll = controller.processOptions({
    action: "get",
    params: 0,
  });

  const file = jsonfile.readFileSync(__dirname + "/contacts.json");
  t.notDeepEqual(getAll, file);

  const addOne = controller.processOptions({
    action: "save",
    params: { id: 123456, name: "si" },
  });

  const fileSaved = addOne?.then(() => {
    controller.contacts.getOneById(123456);
  });

  t.truthy(fileSaved);
});

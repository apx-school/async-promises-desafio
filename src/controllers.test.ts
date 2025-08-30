import test from "ava";
import { ContactsController } from "./controllers";
import jsonfile from "jsonfile";
import { Contact } from "./models";

test.serial("Testeo el constructor del controller", (t) => {
  // test de prueba
  const controller = new ContactsController();
  t.deepEqual(controller.contacts.data, []);
  controller.promesa.then(() => {
    const file = jsonfile.readFileSync(__dirname + "/contacts.json");
    t.deepEqual(controller.promesa, file);
  });
});

test.serial("Testeo el método processOptions", (t) => {
  const controller = new ContactsController();
  return controller.promesa.then(() => {
    //Cuando se terminen de importar los datos hacer lo siguiente:
    const prueba1 = controller.processOptions({
      action: "get",
      params: { id: 3, name: "Mer" },
    });
    const pruebaGet1 = controller.contacts.getOneById(3);
    t.deepEqual(prueba1, pruebaGet1);
  });
});

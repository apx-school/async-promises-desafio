import test from "ava";
import { ContactsController } from "./controllers";
import { ContactsControllerOptions } from "./controllers";

test("Testeo el constructor del controller", (t) => {
  const controller = new ContactsController();
  return controller.promesa.then(() => {
    t.truthy([controller.contacts]);
  });
});

/* test("Testeo el método processOptions", (t) => {
  const controller = new ContactsController();
  return controller.promesa.then(() => {
    var options: ContactsControllerOptions = {
      action: "get",
      params: { id: 1, name: null },
    };
    t.deepEqual(controller.processOptions(options), {
      id: 1,
      name: "Ana",
    });

    var options: ContactsControllerOptions = {
      action: "get",
      params: { id: null, name: null },
    };
    t.deepEqual(controller.processOptions(options), [
      { id: 1, name: "Ana" },
      { id: 2, name: "Paula" },
      { id: 3, name: "Mer" },
      { id: 4, name: "Dana" },
      { id: 33, name: "mervin" },
    ]);

    var options: ContactsControllerOptions = {
      action: "save",
      params: { id: 44, name: "Matias" },
    };
    controller.processOptions(options);
    t.deepEqual(
      controller.processOptions({
        action: "get",
        params: { id: null, name: null },
      }),
      [
        { id: 1, name: "Ana" },
        { id: 2, name: "Paula" },
        { id: 3, name: "Mer" },
        { id: 4, name: "Dana" },
        { id: 33, name: "mervin" },
        { id: 44, name: "Matias" },
      ]
    );
  });
}); */

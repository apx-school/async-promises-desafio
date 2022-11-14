import test from "ava";
import { ContactsController, ContactsControllerOptions } from "./controllers";

test("Testeo el constructor del controller", (t) => {
  const controller = new ContactsController();
  const respuesta = controller.promesa.then(() => {
    t.truthy(controller);
  });
  return respuesta;
});

/*
test("Testeo el método processOptions", (t) => {
  const controller = new ContactsController();
  const opciones: ContactsControllerOptions = {
    action: "get",
    params: { id: 1, name: "Ana" },
  };
  const resultado = controller.processOptions(opciones);
  t.deepEqual(resultado, { id: 1, name: "Ana" });
});
*/


// test("Testeo el método processOptions", (t) => {
//   const controller = new ContactsController();
//   controller.promesa.then(() => {
//     const opciones = new ContactsControllerOptions();
//     opciones.action = "get";
//     opciones.params = { id: 1, name: "Ana" };

//     t.truthy(controller.processOptions(opciones));
//   });
// });
/*--------------------------------------------------
import test from "ava";
import { ContactsController, ContactsControllerOptions } from "./controllers";
test("Testeo el constructor del controller", (t) => {
  const controller = new ContactsController();
  controller.contacts.getAll();
  t.truthy(controller);
});*/
/*
test("Testeo el método processOptions", (t) => {
  const controller = new ContactsController();
  const opciones: ContactsControllerOptions = {
    action: "get",
    params: { id: 3 },
  };
  const resultado = controller.processOptions(opciones);
  t.deepEqual(resultado, { id: 3, name: "Mer" });
}); */

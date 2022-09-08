import test from "ava";
import { ContactsController, ContactsControllerOptions } from "./controllers";
import * as jsonfile from "jsonfile";

test("Testeo el constructor del controller", (t) => {
  const controller = new ContactsController();
  t.truthy(controller.contacts);
});

test("Testeo el método processOptions con get y id", (t) => {
  const controller = new ContactsController(); /// instancio mi controller {contacts[arrayGuardado y metodos], processOptions()}
  const mockOptions = new ContactsControllerOptions(); //instancio mi class options {action:"get"|"save", params:{id}}

  const listaContactos = jsonfile.readFile(__dirname + "/contacts.json");
  mockOptions.action = "get";
  mockOptions.params = { id: 1, name: "marcelo" };
  const datoByOptions = controller.processOptions(mockOptions);
  t.deepEqual(datoByOptions, listaContactos[0]); //controller.contacts.datosGuardados[0]
});

test("Testeo el método processOptions con get y sin id", (t) => {
  const controller = new ContactsController();
  const mockOptions = new ContactsControllerOptions();
  jsonfile.readFile(__dirname + "/contacts.json");
  mockOptions.action = "get";
  mockOptions.params = {};
  const datos = controller.processOptions(mockOptions);
  t.deepEqual(datos, controller.contacts.data);
});

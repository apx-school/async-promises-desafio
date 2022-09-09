import test from "ava";
import { ContactsControllerOptions, ContactsController  } from "./controllers";
import { Contact, ContactsCollection } from "./models";

test("Testeo el constructor del controller", (t) => {
  const controller = new ContactsController();
  t.truthy(controller.contacts && controller.promesa);
});

/* test("Testeo el método processOptions", (t) => {
}); */

import test from "ava";
import { ContactsController, ContactsControllerOptions } from "./controllers";
import { Contact, ContactsCollection } from "./models";

test("Testeo el constructor del controller", async (t) => {
  const controller = new ContactsController();
  await controller.promise;
  const options: ContactsControllerOptions = {
    action: "get",
    params: { id: 0, name: "" },
  };
  const result = await controller.processOptions(options);
  t.truthy(Array.isArray(result));
});
test("Testeo el metodo processOptions", async (t) => {
  const controller = new ContactsController();
  await controller.promise;
  const newContact = { id: 100, name: "Pablito" };

  await controller.processOptions({ action: "save", params: newContact });
  const found = await controller.processOptions({
    action: "get",
    params: { id: 100, name: "" },
  });
  t.deepEqual(found, newContact);
});

import test from "ava";
import { ContactsController } from "./controllers";
import { ContactsCollection } from "./models";

test("Testeo el constructor del controller", (t) => {
  const controller = new ContactsController();
  t.true(controller.contacts instanceof ContactsCollection);
  t.false(controller.cargador);
});

// test("Testeo el método processOptions", (t) => {});

test("Testeo processOptions en el caso en el que action es get y existe params.id", async (t) => {
  const controller = new ContactsController();

  await controller.cargadorDeContacts();

  const result = await controller.processOptions({
    action: "get",
    params: { id: 1, name: "" },
  });
  t.deepEqual(result, controller.contacts.getOneById(1));
});

test("Testeo processOptions en el caso en el que action es get y NO existe params.id", async (t) => {
  const controller = new ContactsController();

  await controller.cargadorDeContacts();

  const result = await controller.processOptions({
    action: "get",
    params: { name: "" },
  });

  t.deepEqual(result, controller.contacts.getAll());
});

test("Testeo processOptions en el caso en el que action es save", async (t) => {
  const controller = new ContactsController();
  await controller.cargadorDeContacts();
  await controller.processOptions({
    action: "save",
    params: { id: 912, name: "gonzalo" },
  });
  const result = await controller.contacts.data.find((c) => c.id === 912);
  const expected = { id: 912, name: "gonzalo" };
  t.deepEqual(result, expected);
});

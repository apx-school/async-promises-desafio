import test from "ava";
import { ContactsController } from "./controllers";
import { ContactsCollection } from "./models";

// Mock para pruebas
const mockContact = {
  id: 42,
  name: "Test Contact",
};

test("Testeo el constructor del controller", async (t) => {
  const controller = new ContactsController();
  await controller.contacts.load(); // Asegura que se carguen los datos antes de la prueba
  t.truthy(controller.contacts.getAll()); // Verifica que la colección se inicialice correctamente
});

test("Testeo el método processOptions - Obtener todos los contactos", async (t) => {
  const controller = new ContactsController();
  await controller.contacts.load(); // Asegura que se carguen los datos antes de probar

  const options = {
    action: "get" as "get", // Asegura el tipo de `action` como "get"
    params: { id: 0, name: "" }, // No se especifica ID para obtener todos
  };

  const result = await controller.processOptions(options);
  const allContacts = controller.contacts.getAll();
  t.deepEqual(result, allContacts);
});

test("Testeo el método processOptions - Obtener contacto por ID", async (t) => {
  const controller = new ContactsController();
  await controller.contacts.load();

  // Agregar un contacto para probar
  controller.contacts.addOne(mockContact);
  await controller.contacts.save();

  const options = {
    action: "get" as "get", // Asegura el tipo de `action` como "get"
    params: { id: 42, name: "" },
  };

  const result = await controller.processOptions(options);
  t.deepEqual(result, mockContact); // Verifica que se obtenga el contacto correcto
});

test("Testeo el método processOptions - Guardar un nuevo contacto", async (t) => {
  const controller = new ContactsController();

  const newContact = {
    id: 99,
    name: "New Test Contact",
  };

  const options = {
    action: "save" as "save", // Asegura el tipo de `action` como "save"
    params: newContact,
  };

  const result = controller.processOptions(options);

  // Cargar los datos nuevamente para verificar que se haya guardado
  await controller.contacts.load();
  const savedContact = controller.contacts.getOneById(99);

  t.deepEqual(savedContact, newContact); // Verifica que el contacto se haya guardado correctamente
});

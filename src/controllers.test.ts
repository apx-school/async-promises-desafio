import test from "ava";
import { ContactsController } from "./controllers";
import * as jsonfile from "jsonfile";

test("Testeo el constructor del controller", (t) => {
  const testMock = new ContactsController();
  testMock.promise.then(() => {
    testMock.contacts.getAll();
  });

  return t.truthy(testMock);
});

test("Testeo el método processOptions", (t) => {
  const testMock = new ContactsController();

  return testMock.promise.then(() => {
    const paramsTwo = { name: "Franco" };
    const processTwo = testMock.processOptions({
      action: "get",
      params: paramsTwo,
    });
    return jsonfile.readFile(__dirname + "/contacts.json").then((contactos) => {
      t.deepEqual(processTwo, contactos);
    });
  });
});

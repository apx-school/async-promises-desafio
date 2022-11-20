import test from "ava";
import { ContactsController } from "./controllers";
import * as js from 'jsonfile';

test.serial("Testeo el constructor del controller", (t) => {
  const mockController = new ContactsController();
  return mockController.promesa.then(() => {
    return js.readFile(__dirname + '/contacts.json').then(data => {
      t.deepEqual(data,mockController.contacts.getAll());
    });
  });
});

test.serial("Testeo el método processOptions", (t) => {
  const mockController = new ContactsController();
  return mockController.promesa.then(() => {
    const mockContact = {
      id: 123,
      name: "Luffy"
    };
    const promesaUno :Promise<any> = mockController.processOptions({action: "save", params: mockContact}).then(() => {
      return mockController.processOptions({action:"get",params:{id:123}}).then(get => 
        t.deepEqual(mockContact, get))
    });
    const promesaDos :Promise<any> = js.readFile(__dirname + '/contacts.json').then(data => {
      return mockController.processOptions({action:"get",params:{}}).then(get => 
        t.deepEqual(data, get))
    });
    return Promise.all([promesaUno,promesaDos]);
  })
});

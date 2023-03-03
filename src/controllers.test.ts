import test from "ava";
import { ContactsController, ContactsControllerOptions } from "./controllers";

test("Testeo el constructor del controller", (t) => {
  // test de prueba
  const contacto= new ContactsController();
  const mock= {
    id:15,
    name:"Cristian"
  }
  contacto.contacts.addOne(mock);
  return contacto.contacts.load().then(()=>{
    t.truthy(contacto);
  });
});

test("Testeo el método processOptions", (t) => {
  const controller = new ContactsController();
  const maqueta={
    id:5,
    name:"cris"
  }
  controller.contacts.addOne(maqueta);
  return controller.contacts.load().then(()=>{
    const opciones: ContactsControllerOptions={
      action:"get",
      params: {id:5,name:""}
    }
    const resultado= controller.processOptions(opciones);
    const elOtroArgumento=controller.contacts.getOneById(5);
    t.deepEqual(resultado,elOtroArgumento)
  });
});
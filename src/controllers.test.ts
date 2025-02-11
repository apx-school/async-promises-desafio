import test from "ava";
import { ContactsController } from "./controllers";
import "./contacts.json";
import * as jsonfile from "jsonfile";

test.serial("Testeo el constructor del controller", (t) => {
  const controlador = new ContactsController(); //en este momento nuevoControlador ya tiene cargardo el json y se creo el atributo promesa
  //cuando finaliza la promesa encadeno la lectura del archivo
  return controlador.promesa.then((contactosDelControlador) => {
    //tengo los contactos cargados
    //console.log("Esto devuelve la promesa del constructor del controller", contactosDelControlador);

    //const contactosDelControlador = controladorDePrueba.contacts.data;

    return jsonfile.readFile(__dirname + "/contacts.json").then((contactos) => {
      //console.log("Esto devuelve el JSON", contactos);

      // Comparamos las colecciones
      t.deepEqual(contactosDelControlador, contactos);
    });
  });
});

test("Testeo la búsqueda de un contacto", (t) => {
  const controlador2 = new ContactsController();

  return controlador2.promesa.then(() => {
    const contacto = controlador2
      .processOptions({
        action: "get",
        params: { id: 1 },
      })
      .then((contacto) => {
        t.deepEqual(contacto, { id: 1, name: "Ana" });
      });
  });
});

test.serial("Testeo la búsqueda de todos los contactos", (t) => {
  const controlador3 = new ContactsController();

  return controlador3.promesa.then((contactosEsperados) => {
    const contactos = controlador3
      .processOptions({
        action: "get",
        params: {},
      })
      .then((contactos) => {
        console.log(contactos, contactosEsperados);
        return t.deepEqual(contactos, contactosEsperados);
        // jsonfile.readFile(__dirname + "/contacts.json").then(() => {});
      });
  });
});

test.serial("Testeo la grabación de un nuevo contacto", (t) => {
  const controlador4 = new ContactsController();

  return controlador4.promesa.then(() => {
    const nuevoContacto = { id: 7, name: "Nuevo Contacto" };

    return controlador4
      .processOptions({ action: "save", params: nuevoContacto })
      .then(() => {
        const contactosActualizados = controlador4
          .processOptions({
            action: "get",
            params: {},
          })
          .then((contactosActualizados) => {
            t.true(
              contactosActualizados.some(
                (contacto) =>
                  contacto.id === 7 && contacto.name === "Nuevo Contacto"
              )
            );
          });
      });
  });
});
// test("Testeo el método processOptions", (t) => {});

import { ContactsCollection } from "./models";
import { ContactsController, ContactsControllerOptions } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv): ContactsControllerOptions {
  const resultado = minimist(argv);

  return {
    action: resultado.action,
    params: JSON.parse(resultado.params),
  };
}

function main() {
  // Main ahora es async
  // Es necesario hacer async el procesamiento de opciones desde main ya que hay que estar seguros de que terminó de cargar el archivo con el load();
  // Si nosotros dejásemos main() como en el desafío del cap XI, arrojaría por console primeramente 'undefined' porque esto ocurre antes de que load guarde la data del json. Entonces acá tenemos que escuchar de alguna forma que el load del controller terminó de leerse. Recordemos que el load al tener readFile ahora devuelve una promesa. Entonces acá necesitamos que el controller tenga una promesa adentro y termine de cargar con el load() la info del json para POSTERIORMENTE seguir.
  const controller = new ContactsController();
  controller.promesa.then(() => {
    const params = parseaParams(process.argv.slice(2));
    const result = controller.processOptions(params);
    console.log(result);
  })

}

main();

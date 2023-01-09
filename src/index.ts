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
  const controller = new ContactsController();
  const params = parseaParams(process.argv.slice(2));
  const result = controller.processOptions(params);
  //console.log(result);

  /*
  const cController = new ContactsController();
  cController.processOptions({ action: "get", params: { id: 2 } });
  const guardando = cController.processOptions({
    action: "save",
    params: { id: 96, name: "ale" },
  });
  */
}

main();

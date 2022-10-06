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
  let controller = new ContactsController();
  let params = parseaParams(process.argv.slice(2));
  let result = controller.processOptions(params);
  result.then((c) => {
    console.log(c);
  });
}

main();
//processOptions

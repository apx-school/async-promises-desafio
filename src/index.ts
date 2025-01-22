import { ContactsController, ContactsControllerOptions } from "./controllers";
import * as minimist from "minimist";

function parseaParams(argv): ContactsControllerOptions {
  const resultado = minimist(argv);
  const params = resultado.params ? JSON.parse(resultado.params) : {};
  console.log(resultado.params);
  return {
    action: resultado.action,
    params,
  };
}

async function main() {
  console.log(__dirname + "\\nombreArchivo");
  const controller = new ContactsController();
  await controller.initialize();
  const params = parseaParams(process.argv.slice(2));
  console.log(params);
  const resultado = await controller.processOptions(params);
  console.log(resultado);
}

main();

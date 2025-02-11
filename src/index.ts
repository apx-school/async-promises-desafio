import { ContactsCollection } from "./models";
import { ContactsController, ContactsControllerOptions } from "./controllers";
import minimist from "minimist";

function parseaParams(argv): ContactsControllerOptions {
  const resultado = minimist(argv);

  return {
    action: resultado.action,
    params: resultado.params ? JSON.parse(resultado.params) : undefined,
  };
}

function main() {
  const controller = new ContactsController();
  controller.promesa.then(() => {
    const params = parseaParams(process.argv.slice(2));
    controller.processOptions(params).then((result) => {
      console.log("Resultado final:", result);
    });
  });
}

main();

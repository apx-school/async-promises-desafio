import test from "ava";
import { ContactsCollection } from "./models";
import * as contactsObject from "./contacts.json";
import * as jsonfile from "jsonfile";

test("Testeo el load del modelo", (t)=>{
  const model=new ContactsCollection();
  return model.load().then(()=>{
    t.deepEqual(contactsObject,model.getAll())
  });
});

test("Testeo el addOne del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 30,
    name: "Marce",
  };
  model.addOne(mockContact);
  t.deepEqual(model.getAll(), [mockContact]);
});

test("Testeo el save del modelo",(t)=>{
  const model=new ContactsCollection();
  return model.load().then(()=>{
    const maqueta={
      id:23,
      name:"cristian"
    };
    model.addOne(maqueta);
    return model.save().then(()=>{
      const fileContent=jsonfile.readFileSync(__dirname+"/contacts.json");
      t.deepEqual(fileContent,model.getAll());
    });

  });
});

test("Testeo el getOneById del modelo", (t) => {
  const model = new ContactsCollection();
  const mockContact = {
    id: 31,
    name: "Marce",
  };
  model.addOne(mockContact);
  const one = model.getOneById(31);
  t.deepEqual(one, mockContact);
});

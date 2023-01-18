import test from "ava";
import { ContactsController,ContactsControllerOptions } from "./controllers";
import * as jsonfile from "jsonfile"

test("Testeo el constructor del controller", (t) => {
    const contacto = new ContactsController()
     const ejemploMock = {
         id: 5,
         name: "jesus"
        }
        contacto.contacts.addOne(ejemploMock);
        return contacto.contacts.load().then(()=>{
        const merArgumento =  contacto.contacts.getAll() 
                const segundoArgumento =    jsonfile.readFileSync("./contacts.json") 
                 t.deepEqual(merArgumento,segundoArgumento)        
        });

});

test("Testeo el método processOptions", (t) => {
    const elemPrueba = new ContactsController()
    const datosMock = {
        id: 10,
        name : "lolo"
    }
    elemPrueba.contacts.addOne(datosMock)
    return elemPrueba.contacts.load().then(()=>{
        const parametros:ContactsControllerOptions =
        {
            action:"get",
            params: {id:10,name:""}
            
        }
            const resultao = elemPrueba.processOptions(parametros)
            const otroResultao = elemPrueba.contacts.getOneById(10)     
        t.deepEqual(resultao,otroResultao)
    })
    
       
});

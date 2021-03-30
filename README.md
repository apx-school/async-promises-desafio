# Desafío

- Forkear y clonar este repo

- dentro del módulo **models.ts** crear y exportar la clase **ContactsCollection**

  - la clase debe tener una propiedad interna (se puede llamar como quieran) donde se guarde el array con la data
  - debe tener un método **load()** que cargue la info desde el contacts.json y guardarla en **data**
  - getAll() debe devolverme la collection completa
  - addOne(contact) {} debe agregar un contacto a la lista
  - save debe escribir todo el objeto interno en el archivo **contacts.json**
  - getOneById(id) debe devolver uno de los contactos por id

- dentro del módulo **controllers.ts** crear la clase **ContactsController**

  - su constructor debe:
    - instanciar **ContactsCollection** y guardarlo en una prop interna
    - invocar al método load (para que se carge la data del archivo **contacts.json**)
  - debe tener un método **processOptions** que reciba como parámetro un objeto del tipo **ContactsControllerOptions**
    - dependiendo de las propiedades **action** y **params** debe interactuar con el modelo (ContactsController) e invocar distintos métodos
      - en el caso de que el **action** sea "get" y el objeto **params** tenga un id, debe devolver un contacto en particular, si **id** no existe significa que debe devolver todos los contactos
      - en el caso de que **action** sea "save" **params** es lo que se debe usar como contacto nuevo

- completar los tests para **ContactsController** en **controllers.test.ts**


- parsear los argumentos en **index.ts** usando https://www.npmjs.com/package/minimist
- instanciar el **ContactsController** e invocar a su método **processOptions**
- imprimir la respuesta en la terminal

- Enviar un PR con los cambios y chequear que los tests de github pasen correctamente

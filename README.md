# dogdatepmv
Primera versión del proyecto final para el bootcamp Hack a BOS. Todava tiene muchas limitaciones pero ya se ve la idea.

Pasos a seguir para probar el proyecto:

1. Clonar el repositorio.
2. cd dogdatepmv/backend/api
3. npm install
4. Volvemos a la carpeta dogdatepmv y vamos a cd frontend y hacemos npm install
5. Ejecutamos sudo service mongod start para correr la base de datos de Mongodb
6. desde la carpeta dogdatepmv/backend/api hacemos npm start
7. desde la carpeta dogdatepmv/frontend hacemos npm start
8. Accedemos en el navegador a http://localhost:4200

Debéis tener en cuenta que al usar la base de datos de Mongo esta se genera sola. Por lo que al principio no habrá usuarios y si visitáis la pestaña "Perros" no os saldrá ninguno hasta que haya por lo menos dos registrados. Ya que esa pestaña muestra solo los demás perros y no al perro logado.


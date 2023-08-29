PASOS QUE REALICE PARA ELABORAR MI PROYECTO CREANDO UNA COMUNIACION A LA API DE NOTION USANDO ANGULAR
USAMOS BOOTSTRAP PARAR CSS
USAMOS LA IA PARA LA CREACION DE LOS DATOS DE LA TABLA

la api de notion exige que se use snake case para nombrar sus propiedades es decir

autor = Autor donde autor es minuscula
...


Las carpetas pages & components se crean como carpetas no como modulos 
Comandos Angular -
ng new AngularAPINotion
//Para crear un modulo dentro de app y crear ahi una carpeta usamos
// ng g m nombre
//para crearlo en la carpeta principal osea src
// ng g m nombre --flat
//para crear un modulo dentro de una carpeta ya existent y crear rutas
//ng g m nombre --routing		<- usamoos este crea rutas y module
//para crear un componente dentro de una carpeta
//ng g c carpeta/nombre
// para crear un servicio
// ng g s notion-api

Para pedir datos a la API se manda un POST a la BD en : databases/{databaseId}/query
Para crear nuevos datos se manda un POST a : https://api.notion.com/v1/pages/ 
con el contenido serializado-> se usa un DTO para serialiar y que sea mas facil definir los tipos
En los header hay que definir la id de la BD por que sera el padre y cada fila contara como una hoja para la estructura de notion

--------------------------------------------------------------------------------------------------
Auth: secret_EQHJJsK52S3L6B2ad8tFJmtj8I5uPR3WglPPKFrg40b
POSTMAN LINK : https://web.postman.co/workspace/My-Workspace~08fc3363-1b91-44ab-8066-4de54f42ae3b/request/28685331-60ebb90a-914e-42ee-9521-13c5d396e4d9
DB LINK: 2eecf8516a124a69aa9607315c9d5617
Authorizacion: Token barear 
Referencias de la API status code: https://notion.notion.site/API-Reference-914a8531daa84753aacdf01274df8ec5
Info DB : https://developers.notion.com/reference/database#all-databases
Info DB property : https://developers.notion.com/reference/property-object
Dependencia de notion: npm i @notionhq/client	

estructura de la pagina
object.results[0].id

Estrucutura Obj importante
de id quiero page id 
de titulo title	
de autor plain_text
de descripcion plain_text
de fecha de realizacio date.start
de properties.subida o modificada: created_time
de properties.hecha: checkbox

Que quiero que tenga?
HECHO - Formulario para crear tareas 
FIXED - Formulario para modificar tareas
HECHO - Ver tareas
HECHO - Ver tareas por id/nombre[barra de busqueda]?

Que debera contener en la tabla/db?
- Titulo = 
- Descripcion = 
- Nombre de la persona -> Autor
- Hora de subida -> fecha de subida
- a que hora/dia/semana/mes se debe hacer -> fecha de realizacion 
- si ya se realizo -> hecha

Que debera contener el formulario al crear?
- Titulo
- Descripcion
- Nombre de la persona
- a que hora/dia/semana/mes se debe hacer

Que debera contener el formulario al modificar?
- Id -> page id
- Titulo
- Descripcion
- Nombre de la persona
- a que hora/dia/semana/mes se debe hacer
- si ya se realizo 

Back-End
1. Como no se pueden realizar peticiones desde el cliente a la API por problemas del CORS vamos a usar una api de servidor para mandar peticiones a la api y no tener problemas
2. Creamos los controladores en la api de C# AspNet
3. Para realizar peticiones a la api debemos colocar los headers 
4. GET https://api.notion.com/v1/databases/{databaseId}
Front-End
1. Crear nuevo proyecto	
2. Crear estructura de carpetas/modulos[Por ultimo vamos a dejar el shared(footer/navigation)]
3. Crear datos en la tabla
4. instalar dependencia de notion = npm i @notionhq/client de https://www.npmjs.com/package/@notionhq/client
4. Crear formulario
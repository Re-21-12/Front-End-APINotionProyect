# Angular Info Documentation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Documentacion para desarrollar el front y parte de la api
# Pasos para Elaborar mi Proyecto: Comunicación a la API de Notion usando Angular

## Herramientas Utilizadas
- **Angular**
- **Bootstrap** para el estilo CSS
- Utilización de **IA** para la creación de datos de la tabla

## Convenciones de la API de Notion
La API de Notion exige el uso de **snake case** para nombrar sus propiedades. Por ejemplo, `autor` debe ser `Autor` en minúsculas.

## Estructura de Carpetas y Comandos Angular
Las carpetas `pages` y `components` se crean como **carpetas**, no como módulos.
Comandos Angular utilizados:
- Crear nuevo proyecto: `ng new AngularAPINotion`
- Crear módulo: `ng g m nombre`
- Crear módulo en carpeta principal: `ng g m nombre --flat`
- Crear módulo con rutas: `ng g m nombre --routing`
- Crear componente en carpeta: `ng g c carpeta/nombre`
- Crear servicio: `ng g s notion-api`

## Interacción con la API de Notion
- Obtener datos: Enviar un POST a la base de datos en `databases/{databaseId}/query`
- Crear nuevos datos: Enviar un POST a `https://api.notion.com/v1/pages/` con contenido serializado usando DTO para definir tipos.
- Encabezados necesarios: Incluir la ID de la base de datos como encabezado, ya que cada fila cuenta como una hoja en la estructura de Notion.

## Detalles Importantes de la Estructura de la Página
- ID de página deseada: `object.results[0].id`
- Estructura de Objeto Importante:
  - Page ID: `id`
  - Título: `title`
  - Autor: `plain_text`
  - Descripción: `plain_text`
  - Fecha de Realización: `date.start`
  - Subida o Modificada: `properties.subida o modificada: created_time`
  - Realizada: `properties.hecha: checkbox`

## Objetivos del Proyecto
- **Hecho:** Formulario para crear tareas
- **Pendiente:** Formulario para modificar tareas
- **Hecho:** Ver tareas
- **Hecho:** Ver tareas por ID/nombre (barra de búsqueda)

## Detalles de la Tabla/Base de Datos
La tabla/de la base de datos deberá contener:
- Título
- Descripción
- Autor
- Hora de subida
- Hora/día/semana/mes de realización
- Estado de realización (hecha o pendiente)

## Detalles del Formulario de Creación
El formulario de creación deberá incluir:
- Título
- Descripción
- Nombre de la persona
- Hora/día/semana/mes de realización

## Detalles del Formulario de Modificación
El formulario de modificación deberá incluir:
- ID (Page ID)
- Título
- Descripción
- Nombre de la persona
- Hora/día/semana/mes de realización
- Estado de realización

## Back-End
1. Debido a restricciones de CORS, usamos una API de servidor para comunicarnos con la API de Notion.
2. Creamos controladores en una API en C# AspNet.
3. Se incluyen los encabezados en las peticiones a la API.
4. Realizamos una petición GET a `https://api.notion.com/v1/databases/{databaseId}`.

## Front-End
1. Creamos un nuevo proyecto Angular.
2. Establecemos la estructura de carpetas y módulos, con atención a `shared` (footer/navigation) al final.
3. Generamos datos en la tabla.
4. Instalamos la dependencia de Notion: `npm i @notionhq/client` desde [npmjs.com/package/@notionhq/client](https://www.npmjs.com/package/@notionhq/client).
5. Creamos el formulario.

##  Dudas?
- Cualquier duda puede ser consultada 

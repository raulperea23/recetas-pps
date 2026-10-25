# RecetasPps

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.19.

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

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## PARA SUBIR RECETAS, PREPARACIONES Y TRUCOS

Use admin dashboard (acceso desde el footer o en /admin)

## ENLACES A MODALES DE LA HOME

Al abrir una preparacion, salsa o truco, la home incorpora el parametro `modal`
a la URL. Puedes copiar esa URL para compartir el contenido; al visitarla se abre
el modal automaticamente, una vez cargados los datos necesarios.

- Preparacion: `/?modal=preparacion:ID_FIRESTORE`
- Truco: `/?modal=truco:ID_FIRESTORE`
- Salsa: `/?modal=salsa:ID_SALSA` (por ejemplo, `/?modal=salsa:bechamel`)

Las salsas tienen identificadores estables definidos en
[home.salsas.ts](src/app/pages/home/home.salsas.ts), independientes del nombre y
del tipo de salsa. No deben cambiarse para conservar los enlaces compartidos.
Al cerrar el modal se elimina solo `modal`, conservando los demas parametros y
el fragmento. Los botones Atras y Adelante tambien sincronizan el modal.
Los enlaces a contenido inexistente u oculto muestran un aviso y se limpian.
Los tres tipos usan el campo `id`, no el nombre ni la posicion de la tarjeta.
Sus modales incluyen el mismo boton Compartir que el detalle de receta, con
opciones para WhatsApp y copiar enlace (confirmacion durante 1,5 segundos).
El componente Compartir admite `[soloIcono]="true"`; por defecto muestra icono
y texto. En los modales se usa solo el icono, junto al titulo.
Siempre comparten el enlace directo al modal de la home, incluso si una salsa
se abre desde una receta.
Abrir o cerrar un modal conserva la posicion de lectura de la home.
La restauracion del scroll para el resto de navegaciones y anclas se gestiona en
[RouterScrollService](src/app/shared/services/router-scroll.service.ts).

## PARA SUBIR RECETAS DE FORMA MASIVA:

Add records to => scripts/recetas.json

{
"id?": "",
"nombre": "",
"origen": "",
"categoria": "",
"tipoDePlato": "",
"foto": "",
"ingredientes": [],
"elaboracion": "",
"comensales": 0,
"dificultad": "",
"tiempoPreparacion": 0,
"tiempoUnidad": "",
"destacada": false,
"fechaPublicacion": "2026-06-29"
}

Execute => node scripts/importar-recetas.mjs
Records should be displayed in the app automatically

## PARA SUBIR PREPARACIONES O TRUCOS DE FORMA MASIVA:

Add records to objects
Execute => node scripts/importar-preparaciones-trucos.mjs
Records should be displayed in the app automatically

## COLORES

en styles.css

## ICONOS

ANGULAR: https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
FLATICON: https://www.flaticon.com/free-icons/feast

# IMAGENES SIN COPYRIGHT

PEXELS: https://www.pexels.com/es-es/

# OPTIMIZACION DE IMAGENES (webp)

SQUOOSH: https://squoosh.app/

# PARA SUBIR CAMBIOS

ng build
firebase deploy

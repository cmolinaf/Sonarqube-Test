# Portal Persona Mobile

Este proyecto es una versión Mobile de Portal Persona de Grupo Avanza hecho en react-native con typescript.

[TOC]

## Prerrequisitos

- Node.js > 16
- JDK > 11
- Android Studio y Android SDK

## Dependencias base

`Axios`: Conexiones con APIs.

`react-native-fs`: Manejo de archivos.

`redux`: Manejo de estados globales.

`react-navigation`: Rutas de Navegación.

`react-native-async-storage`: Almacenamiento local.

`react-native-elements`: Librería de componentes.

`react-native-document-picker`: Selección de archivos con explorador de archivos nativo.

`react-native-file-viewer`: Previsualización de archivos.

`react-hook-form`: Manejo de Formularios.

`notifee`: Notificaciones.

`husky`: Procesado de git.

`commitlint`: Estructura de mensajes de commits.

`react-native-testing-library`: Funciones de pruebas unitarias.

## Ejecución

### Preparación del entorno

1. Primero, copie este repositorio
2. Instale las dependencias corriendo el comando `npm install`
3. Cerciórese de tener instalado entorno de emulación Android o iOS

### Ejecución de la App

1. Ejecute el comando `npm run start`
2. Ejecute comando `npm run android` o `npm run ios` segun la plataforma a utilizar

## Estructura de la carpeta

```markdown
demoMobile
├─ __mocks__ // mocks para test
├─ __tests__ // carpeta de test que recrea la estructura de carpetas del proyecto
├─ android // archivos nativos de android
├─ docs // documentación
├─ ios // archivos nativos de ios
├─ src
│	├─ @core // archivos del template. // NO MODIFICAR
│	├─ @const // declaracion de constantes usadas a lo largo del proyecto
│	├─ @libs // instancias de librerias funcionales
│	├─ assets // archivos multimedia
│	│	├─ fonts // fuentes
│	│	├─ img // imagenes
│	│	└─ colors.ts // contiene colores del entorno
│	├─ features // funcionalidades extras de redux
│	├─ navigation // direccionamiento de botones a otras pantallas
│	├─ routes // implementacion de las rutas de navegacion
│	├─ screens // pantallas de navegacion
│	├─ utils // funciones reciclables
│	├─ types // tipos de datos globales reutilizables
│	└─ views // vistas finales que seran mostradas por los screens (pantallas)
├─ .buckconfig
├─ .commitlintrc // configuracion de commitlint
├─ .editorconfig
├─ .eslint.js // configuracion del eslint
├─ .gitattributes
├─ .prettierignore
├─ .gitignore
├─ .prettierrc.ts // configuracion del prettier
├─ .watchmanconfig
├─ app.json
├─ App.tsx // inicio de la maquetacion de la app
├─ babel.config.js // configuracion de babel
├─ index.tsx
├─ jest.config.js // configuracion de jest
├─ metro.config.ts
├─ package.json
├─ Readme.md
├─ setup-jest.js // inicializacion de librerias mocks de jest
└─ tsconfig.json // configuracion de typescript
```

## Generar versión de producción

### Android

Para mayor información, consultar la guia provista para ello en [la documentación oficial de React Native](https://reactnative.dev/docs/signed-apk-android)

#### Generar llaves de autenticación

Procedimiento explicado en [la documentación](https://reactnative.dev/docs/signed-apk-android#generating-an-upload-key)

#### Configurar las variables de Gradle

1. Teniendo ya las llaves generadas, asegurarse que su ubicación sea dentro de la carpeta `android/app` en la carpeta del proyecto.

2. Editar el archivo `~/android/gradle.propierties` y reemplazar los valores `*****`, `my-key-alias` y `my-upload-key`

   ```properties
   MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
   MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
   MYAPP_UPLOAD_STORE_PASSWORD=*****
   MYAPP_UPLOAD_KEY_PASSWORD=*****
   ```

#### Generar el instalable

Aquí existen dos formas, generar un bundle (AAB) y generar un instalable (APK). 

Nota: Se recomienda exportar la versión bundle (AAB) para mandar a la Play Store.

- Generar bundle (AAB)

  1. Abrir la carpeta del proyecto en la terminal.

  2. Correr los siguientes comandos

     ```bash
     cd android
     ./gradlew bundleRelease
     ```

  3. Al finalizar el proceso conseguirás el bundle en la dirección `android/app/build/outputs/bundle/release/app-release.aab`

- Generar instalable (APK)

  1. Abrir la carpeta del proyecto en la terminal.

  2. Correr los siguientes comandos

     ```bash
     cd android
     ./gradlew assembleRelease
     ```

  3. Al finalizar el proceso conseguirás el bundle en la dirección `android/app/build/outputs/apk/release/app-universal-release.apk`

     Nota: tener en cuenta que aquí habrán varias versiones de la `apk` destinadas a dispositivos específicos, para propósitos de demostración se recomienda instalar la `app-universal-release.apk`.

### iOs

Próximamente

## Guias de estilos

Para los estilos del código, se decidió usar ESLint, así como Prettier para el formato del código.

### Commits

Para la estandarización de los commits, se hace uso de `husky` y `commitlint`. `husky` es una herramienta para 'prevenir malos `git commit` y `git push` y mas'. Esta se complementa con `commitlint` que sirve para añadir estructura a los mensajes de commit.

Los commits obedecen a la siguiente estructura:

```
<tipo>[ámbito opcional]: <descripción>

[cuerpo opcional]

[nota(s) al pie opcional(es)]
```

Para mas información consulte la documentación de [husky](https://typicode.github.io/husky/#/) y de [commitlint](https://commitlint.js.org/#/).

Se recomienda ampliamente configurar en su entorno el formateo automático del código al guardar.

# Como usar

## `alias` de importacion

Existe una configuración de `babel` y del `typescript` con una convención de rutas `alias`. estas rutas son las siguientes:

- `@/*` = `./src/*`
- `@core/*` = `./src/@core/*`
- `@const/*` = `./src/@const/*`
- `@libs/*` = `./src/@libs/*`

Estas rutas se usan de la siguiente manera:

```tsx
import Button from "@core/elements/Button/Button";
```

NOTA: Si tu editor de texto arroja error de rutas, asegurate de que tu editor este usando el parámetro `path` en el `tsconfig.json`. Esto fue probado en `vscode` y automáticamente interpreta las rutas.

## Componentes

### Formularios

Dirigirse a la sección de [Formularios](./docs/espanol/Componentes/Formularios.md).

### Elementos Reciclables

Los Elementos Reciclables son aquellos que su presencia se encuentra alrededor de todas las pantallas de la app, son componentes genéricos, adaptados a los estilos y situaciones de la App. Para mas información dirigirse a la sección de [Elementos Reciclables](/docs/espanol/Componentes/Elementos.md).

## Redux

Próximamente

## Navegación y Rutas

Dirigirse a la sección de [Navegación y Rutas](/docs/espanol/Navegacion y rutas.md).

## Pantallas (Screens)

Dirigirse a la sección de [Pantallas](/docs/espanol/Pantallas.md).

# Roadmap

## Vía CMP Primer Demo con Modulo Beneficios

### Primer Batch: Sin Orden

- [x] Finiquitar Componentes restantes para primera version CMP - Modulo Beneficios
  - [x] Botones desplegables para el menú
  - [x] Componente modal de formulario como input de formulario
  - [x] chat de observaciones como una pantalla dedicada
  - [x] Nuevo elemento de adjuntar documento de becas post generación de solicitud
  - [x] Corregir elementos entrelazados dentro de modulo `search` y `searchUser`
    - [x] añadir parámetro condicional para `multiselect`, `multiDeselect`, `select` y `noSelect`
  
- [x] Estandarizar variables de envió de formularios en JSON
  - [x] préstamo
  - [x] anticipo
  - [x] becas


### Segundo Batch: Ordenado

- [x] Separar Core de la app: Funcionalidad y componentes reutilizables, de lo actual mostrado en la app
  - [x] Renombrar carpeta `componentes` a `core`
  - [x] Restructurar carpeta `core`
  - [x] Crear `alias` en babel y `tsconfig`
  - [x] usar `alias` en las rutas de importacion
- [x] Colocar en un repositorio único el `core`
- [ ] Crear demo con lo actual existente en la app partiendo del `core`
- [ ] Crear nuevo proyecto partiendo del `core` para demo CMP

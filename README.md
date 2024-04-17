# senlleirapp

This template should help get you started developing with Vue 3 in Vite.

## Configuración para utilizar en Android

## Cordova

Trabajamos con la plataforma de [Córdova Apache](https://cordova.apache.org/)

A fecha actual para instalar córdova de forma global

```sh
npm install -g cordova
```

Algunos links:

1. [Cordova cli](https://cordova.apache.org/docs/en/12.x/guide/cli/index.html)
2. [Android](https://cordova.apache.org/docs/en/12.x/guide/platforms/android/index.html)
3. [Requirimientos para Android](https://cordova.apache.org/docs/en/12.x/guide/platforms/android/index.html#requirements-and-support)

```sh
cordova create senlleira io.cordova.senlleira SenlleiraApp
```

Añadimos la plataforma

```sh
cd senlleira
cordova platform add android
```

Resultado

<img src="./assets/cordova-platform-add.webp" with="600" alt="Android Target SDK: android-33;   Android Compile SDK: 33">

También podemos ver si reunimos los prerequisitos. con el comando <code>cordova requirements</code>

<img src="./assets/cordova-ls-requirements-cmd.webp" with="600" alt="Resultado al comprobar los requirimientos con la plataforma android">

### Posibles errores de _cordova requirements_

#### JDK

- [Instalar JDK](https://www.oracle.com/java/technologies/downloads/)

#### Gradle

En la capturar de abajo entre otras cosas vemos los errores de la falta de **Gradle**.

<img src="./assets/gradle-not-installed.webp" with="600" alt="Errores, entre ellos el de gradle">

- [Instalar Gradle](https://gradle.org/install/)

#### JAVA_HOME

Para esta variable de entorno en principio sigue el siguiente [tutorial](https://www.aprenderaprogramar.com/index.php?option=com_content&view=article&id=389:configurar-java-en-windows-variables-de-entorno-javahome-y-path-cu00610b&catid=68&Itemid=188)



### Producción en browser

1. Crear los estáticos para producción

```sh
npm run build
```
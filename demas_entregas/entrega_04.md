# Entrega 04

El ejercicio consiste en:

- Implementar un servidor web con Koa, que integre los servicios de las entregas anteriores.
- Dockerizar todos los servicios integrados.

## Entrega

La entrega consistirá de:

- Un pull request a la rama del alumno que contenga el código de la práctica.
- La demostración de la aplicación durante las clases dispuestas para seminarios tutoriales del funcionamiento del proyecto.
- Las imágenes de Docker de cada uno de los servicios que componen la aplicación, publicadas en Docker Hub.

El pull request debe hacerse antes de [`2021-05-31T18:20:00+02:00`](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).

Se admitirán preguntas, en persona o por correo electrónico, sobre la realización del trabajo hasta la clase del día [`2021-05-27`](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).

## Enunciado

Implementa, utilizando [Koa](https://github.com/koajs/koa), un servidor que cumpla los siguientes requisitos:

1. El código del servidor debe incluirse en la carpeta `controller_server` de este repositorio.
1. El servidor debe exponer tres combinaciones de verbo y ruta:
   1. `POST /game`, debe crear una partida nueva.
   1. `GET /game/:id`, debe retornar los datos de la partida correspondiente al ID.
   1. `POST /game/:id/event`, debe modificar la partida correspondiente al ID, aplicando el evento enviado.
1. El servidor debe delegar al `stats_server` el almacenamiento de los datos de las partidas.

Integra la SPA con este servidor, de tal manera que:

1. Al pulsar en el botón `new game` del menú, se cree una partida nueva (`POST /game`).
1. Al navegar a la página `/game/play`, se obtenga el estado actual de esa partida (`GET /game/:id`).
1. Una vez en la página `/game/play`, se envíen eventos para actualizar la partida (`POST /game/:id/event`).

Dockeriza los cuatro servicios de la aplicación: `web`, `controller_server`, `game_server` y `stats_server`. Publica las cuatro imágenes de Docker. El nombre de usuario de Docker Hub debe corresponder con el del correo electrónico de la Universidad, sustituyendo los puntos por ceros. Las imágenes deben publicarse con el nombre del servicio (`web`, `controller_server`, etc.) y el tag `latest`. Por ejemplo, `gerardo0munguia/controller_server:latest`.

Modifica el archivo de configuración `docker-compose.yml` para que permita levantar los cuatro servicios simultáneamente.

## Tecnologías

Para implementar el ejercicio pueden utilizarse únicamente los siguientes módulos de NPM:

- Las ya instaladas en los diferentes `package.json`.
- [node-fetch](https://www.npmjs.com/package/node-fetch).
- [body-parser](https://www.npmjs.com/package/body-parser).
- [cors](https://www.npmjs.com/package/cors).
- [nodemon](https://www.npmjs.com/package/nodemon).
- [eslint](https://www.npmjs.com/package/eslint).
- [prettier](https://www.npmjs.com/package/prettier).

## Calificación

Para que el trabajo sea calificado debe cumplir con lo dispuesto en las secciones anteriores.

La nota se calculará sumando los puntos obtenidos de las siguientes maneras:

- Cinco puntos si el ejercicio cumple con el funcionamiento básico, descrito en el enunciado.
- Dos puntos si se muestra la imagen del juego, implementada como una matriz de píxeles.
- Hasta tres puntos en función de la complejidad del proyecto.

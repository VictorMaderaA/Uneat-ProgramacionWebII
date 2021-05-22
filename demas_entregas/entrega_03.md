# Entrega 03

El ejercicio consiste en implementar un servidor web con Express, utilizando tests automatizados para el control de calidad.

## Entrega

La entrega consistirá de:

- Un pull request a la rama del alumno que contenga el código de la práctica.
- El despliegue del servidor en cualquier infraestructura.

El pull request debe hacerse antes de [`2021-05-10T18:20:00+02:00`](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).

El despliegue de la aplicación debe hacerse antes de [`2021-05-09T21:00:00+02:00`](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).

Se admitirán preguntas, en persona o por correo electrónico, sobre la realización del trabajo hasta la clase del día [`2021-05-03`](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).

## Enunciado

Implementa, utilizando Express, un servidor que cumpla los siguientes requisitos:

1. El servidor debe ser capaz de aplicar las normas del juego elegido por el alumno.
1. El servidor debe implementar una ruta por cada evento que puede suceder en el juego. Estos eventos pueden ser, por ejemplo, acciones del jugador o el tick del reloj.
1. Para cada una de esas rutas, el servidor debe aceptar como parámetros los datos del evento y el estado actual del juego. La respuesta del servidor debe contener el nuevo estado del juego tras aplicar el evento.
1. El servidor debe funcionar sin almacenar datos entre peticiones sucesivas.

Además, el proyecto debe contener, al menos:

1. Tests unitarios.
1. Tests _end to end_. Por tratarse de un proyecto que sólo consiste en un servidor HTTP, los test _end to end_ se limitarán a hacer peticiones HTTP y examinar la respuesta del servidor.

El código de este servidor debe estar en la carpeta `services/game_server`.

## Tecnologías

Para implementar el ejercicio pueden utilizarse únicamente las siguientes librerías externas:

- Las ya instaladas en el [`package.json`](services/game_server/package.json).
- [node-fetch](https://www.npmjs.com/package/node-fetch).
- [body-parser](https://www.npmjs.com/package/body-parser).
- [cors](https://www.npmjs.com/package/cors).
- [nodemon](https://www.npmjs.com/package/nodemon).
- [eslint](https://www.npmjs.com/package/eslint).
- [prettier](https://www.npmjs.com/package/prettier).

En caso de necesitar alguna otra librería externa, consulta al profesor.

Cualquier fragmento de código externo utilizado en el proyecto debe estar debidamente comentado, incluyendo un enlace al código original.

## Calificación

Para que el trabajo sea calificado debe cumplir con lo dispuesto en las secciones anteriores.

La nota se calculará sumando los puntos obtenidos de las siguientes maneras:

- Diez puntos si el ejercicio cumple con el funcionamiento básico, descrito en el enunciado.
- Menos un punto por cada bug presente en el servidor.

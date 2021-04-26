# Entrega 02

El ejercicio consiste en implementar un servidor con GQL e integrarlo con una SPA.

## Entrega

La entrega consistirá de:

- Un pull request a la rama del alumno que contenga el código de la práctica.
- El despliegue de la SPA en S3.
- El despliegue del servidor en cualquier infraestructura.

El pull request debe hacerse antes de [`21-04-19T18:20:00+02:00`](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).

El despliegue de la aplicación debe hacerse antes de [`21-04-18T21:00:00+02:00`](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).

## Enunciado

Elige un videojuego. Implementarlo no es parte de esta entrega, pero algunos elementos del ejercicio están relacionados con él. Escribe un mensaje en [el foro](https://campus.uneatlantico.es/mod/forum/discuss.php?d=23452#p49722) mencionando el juego elegido. Dos alumnos no pueden elegir el mismo videojuego. No puede elegirse el [tres en línea](https://es.wikipedia.org/wiki/Tres_en_l%C3%ADnea).

Implementa, utilizando GQL, un servidor que cumpla los siguientes requisitos:

1. El servidor debe ser capaz de gestionar datos sobre partidas de un determinado videojuego. Estos datos deben contener, al menos, el [estado](<https://en.wikipedia.org/wiki/State_(computer_science)#Program_state>) de la partida.
1. El servidor debe permitir obtener datos de las partidas de un jugador concreto.
1. El servidor debe permitir obtener datos estadísticos sobre el videojuego.
1. El servidor debe permitir almacenar los datos anteriores a través de [mutaciones](https://graphql.org/learn/queries/#mutations).
1. El servidor debe utilizar el siguiente servicio web dado por el profesor para persistir la información necesaria: [endpoint](https://0qh9zi3q9g.execute-api.eu-west-1.amazonaws.com/development), [documentación](https://github.com/gmunguia/persistence-service/).

Desarrolla la aplicación disponible en la carpeta `services/web` e intégrala con el servidor creado, de tal manera que cumpla los siguientes requisitos:

1. Debe contener una vista, `/game/stats`, con estadísticas, obtenidas del servidor.
1. Debe tener una vista, `/game/history` con la lista de partidas anteriores del usuario, obtenidas del servidor.
1. Al pulsar en una de las partidas de la lista anterior, debe redirigir al usuario a una tercera vista, `/game/play`, en la que se muestre algún dato de la partida seleccionada.
1. Mientras el usuario esté viendo los datos de la partida en la vista `/game/play`, ésta debe estar marcada como `en uso` en el servidor. Este dato debe reflejarse en la vista `/game/history`, de tal manera que no sea posible acceder a una partida que esté `en uso`.
1. Si se accede a la vista `/game/play` a través del enlace con texto `new game` en el compononte `Menu`, se deben mostrar los datos de una partida nueva. Esta partida debe aparecer en `/game/history` a partir de ese momento.

## Tecnologías

Para implementar el ejercicio pueden utilizarse únicamente las siguientes librerías externas:

- Las ya instaladas en el `package.json`.
- [graphql-yoga](https://github.com/prisma-labs/graphql-yoga).
- [uuid](https://www.npmjs.com/package/uuid).
- [node-fetch](https://www.npmjs.com/package/node-fetch).

En caso de necesitar alguna otra librería externa, consulta al profesor.

Cualquier fragmento de código externo utilizado en el proyecto debe estar debidamente comentado, incluyendo un enlace al código original.

## Calificación

Para que el trabajo sea calificado debe cumplir con lo dispuesto en las secciones anteriores.

La nota se calculará sumando los puntos obtenidos de las siguientes maneras:

- Cinco puntos si el ejercicio cumple con el funcionamiento básico, descrito en el enunciado.
- Hasta un punto y medio en función de la variedad de los datos estadísticos disponibles en el servidor.
- Hasta un punto y medio en función de la variedad de caracteristicas de GQL utilizadas (contexto, directivas, etc.).
- Hasta un punto en función de la complejidad de los datos representados en las vista `/game/stats` de la SPA.
- Hasta un punto en función del aspecto visual de la SPA.

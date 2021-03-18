# Entrega 01

El ejercicio consiste en implementar una SPA con React.

## Entrega

La práctica debe entregarse antes de [`21-03-21T21:00:00+01:00`](https://en.wikipedia.org/wiki/ISO_8601#Combined_date_and_time_representations).

La entrega consistirá de:

- Un pull request a la rama del alumno que contenga el código de la práctica.
- El despliegue de la aplicación en S3.

## Enunciado

Crea una SPA que cumpla los siguientes requisitos:

1. La página debe constar de, al menos, tres vistas:
   - Vista de registro.
   - Vista de acceso.
   - Vista principal.
1. En la vista de registro el usuario debe poder registrarse, introduciendo su nombre de usuario, nombre de pila y contraseña. Si el registro tiene éxito, el usuario debe ser redirigido a la vista de acceso.
1. En la vista de acceso el usuario debe poder introducir su nombre de usuario y contraseña. Si estos datos corresponden a un usario registrado, éste debe ser redirigido a la vista principal.
1. La vista principal es accesible sólo para usarios registrados.
1. La vista principal debe contener un botón para cerrar (e invalidar) la sesión del usuario, retornándolo a la vista de acceso.
1. La vista principal debe mostrar el nombre de pila del usuario que la visita.
1. La vista principal debe contener algún componente interactivo que represente el trabajo final hecho por el alumno en la asignatura de Programación Web I. Si el alumno no tuviera un trabajo de referencia, podría crear un componente interactivo cualquiera, consultándolo con el profesor.

## Servidor de autenticación

Las acciones relacionadas con el control de acceso deben ser administradas por un servidor web. Con este motivo, he creado un servicio de autenticación sencillo con el que el alumno puede integrar su aplicación.

La URL del servicio es `https://6fra5t373m.execute-api.eu-west-1.amazonaws.com/development/`.

La documentación del servicio está disponible [en GitHub](https://github.com/gmunguia/auth-service).

## Tecnologías

El ejercicio debe realizarse con React, React Router y Webpack. No debe utilizarse `create-react-app`. En caso de duda sobre la posibilidad de utilizar alguna librería externa, el alumno debe consultar al profesor.

## Calificación

Para que el trabajo sea calificado debe cumplir con lo dispuesto en las secciones anteriores.

La nota se calculará sumando los puntos obtenidos de las siguientes maneras:

- Cinco puntos si el ejercicio cumple con el funcionamiento básico, descrito en el enunciado.
- Un punto si la aplicación notifica al usuario los errores provinientes del servicio de autenticación con un [toaster o snackbar](https://github.com/iamhosseindhv/notistack) (no con `console.log` o `window.alert`).
- Dos puntos si la aplicación implementa algún concepto avanzado de React, como [error boundaries](https://reactjs.org/docs/error-boundaries.html) o [hooks](https://reactjs.org/docs/hooks-intro.html).
- Dos puntos si el componente interactivo de la vista principal consiste en un videojuego.

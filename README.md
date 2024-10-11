# MiAppFrontend

Esta es una aplicación frontend desarrollada con React JS. La aplicación está diseñada para proporcionar una interfaz gráfica interactiva para interactuar con la API backend desarrollada en Java Spring Boot.

## Características principales

- Desarrollada utilizando React JS
- Interfaz gráfica moderna y responsiva
- Integración con la API RESTful desarrollada en Java Spring Boot
- Autenticación y gestión de sesiones

## Tecnologías utilizadas

- React JS
- Redux (para manejar el estado)
- React Router (para navegación)
- Axios (para hacer peticiones HTTP)
- Material-UI (componentes UI)

## Funcionamiento

La aplicación utiliza React JS para crear una interfaz de usuario interactiva y responsiva. Está diseñada para funcionar como una aplicación pestaña o aplicación PWA, ofreciendo una experiencia de usuario fluida tanto en entornos desktop como móviles.

## Endpoints disponibles

La aplicación se conecta a la API RESTful desarrollada en Java Spring Boot. Algunos de los endpoints más importantes incluyen:

### Proyectos

- **Crear un nuevo proyecto**: POST `/users/{userId}/projects`
- **Obtener proyectos**: GET `/projects`
- **Obtener detalles de un proyecto**: GET `/projects/{projectId}`
- **Eliminar un proyecto**: DELETE `/projects/{projectId}`
- **Actualizar un proyecto**: PUT `/users/{userId}/projects{projectId}`

### Tareas

- **Crear una nueva tarea**: POST `/users/{userId}/projects/{projectId}/tasks`
- **Obtener tareas por proyecto**: GET `/projects/{projectId}/tasks`
- **Actualizar una tarea**: PUT `/users/{userId}/projects/{projectId}/tasks/{taskId}`

### Usuarios

- **Autenticación**: POST `/users/logins`
- **Obtener usuarios**: GET `/users`

Todos estos endpoints están integrados en la aplicación frontend para proporcionar funcionalidades completas.

## Pruebas

Puedes probar todos los endpoints haciendo clic en los botones o formularios correspondientes dentro de la aplicación. Por ejemplo:

- Para crear un nuevo proyecto: Haz clic en el botón "Crear Proyecto" en la página de proyectos
- Para obtener una lista de proyectos: Ve a la página de proyectos sin seleccionar ningún proyecto específico

## Requisitos previos

Antes de ejecutar la aplicación, asegúrate de tener instalado:

- Node.js LTS (versión recomendada)
- npm (viene con Node.js)
- Yarn (opcional pero recomendado)

## Cómo ejecutar la aplicación

1. Clona el repositorio
2. Instala las dependencias
3. Ejecuta la aplicación


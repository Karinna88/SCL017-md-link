# Markdown Links

![Logo](/images/cadenas.jpg)
## Índice

* [1. Objetivo del Proyecto](#1-Objetivo-del-Proyecto)
* [2. Especificaciones Técnicas](#2-Especificaciones-Técnicas)
* [3. Diagrama de Flujo](#3-Diagrama-de-Flujo)
* [4. Instalación](#4-Instalación)
* [5. Modo de Uso](#5-Modo-de-Uso)


***

## 1. Objetivo del Proyecto

Crear una herramienta usando `Node.js`, que lea y analice archivos en formato `Markdown`, para verificar los links que contengan y reportar algunas estadísticas.

***
## 2.Especificaciones Técnicas

| Lenguajes                  |
| -----------------          |
| JavaScript ES6             | 
| **Ejecución**              | 
| Node.js                    | 
| **Testing**                |
| Jest                       | 
| **Dependencias y módulos** |
| node-fetch                 |
| Path                       |
| File System (fs)           |



***
## 3. Diagrama de Flujo

![Diagrama](/images/diagrama.png)

***

## 4. Instalación

Para iniciar Markdown Links debes instalar:
1. instalar [Node.js](https://nodejs.org/) usando el comando
```
npm install
````

***

## 5. Modo de Uso
Para hacer uso de la librería ejecuta el siguiente comando en la terminal:
```

| Opciones          | Comando                |
| ----------------- | ----------------------- |
| Estatus           | --stats                 |
| Validar           | --validate              |
| Estatus y validar | --validate--stats       |
# RegistraTEC
## Para iniciar el ambiente de desarrollo con Docker
* Instala [Docker](https://docs.docker.com/get-docker/)
* Crea una red para los contenedores
```
docker network create registratec-network
```
* Crea la base de datos
```
docker run --name registratec-db --network registratec-network -d mongo:5
```
* Instala [VSCode](https://code.visualstudio.com/)
* Instala la extensión **Remote - Containers** en VSCode
* Clona el repositorio a tu computadora
* Abre el repositorio en VSCode
* Presiona Ctrl/Cmd + Shift + P para abrir la paleta de comandos
* Busca el comando **Remote-Containers: Reopen in Container**
* Automáticamente se creará un contenedor para el proyecto y se instalarán sus
dependencias
## Para contribuir al proyecto
Para evitar *merges* manuales es recomendable trabajar en un solo archivo a la
vez. La lógica creada se separa en su propio archivo. Los *endpoints* creados
se agregan a un *router* y luego ese router se agrega a la aplicación principal.

***Asegurate de utilizar `git pull`cada vez que vayas a hacer cambios nuevos y
cada vez que alguién avise que hizo un cambio para evitar conflictos con cambios
de otros miembros del equipo.***

**mimodulo.js**
```js
const router = require('express').Router();

// localhost:8000/mi_modulo/miendpoint_a
router.get('/miendpoint_a', (request, response) => {
    // Lógica de mi endpoint
});

// localhost:8000/mi_modulo/miendpoint_b
router.post('/miendpoint_b' (request, response) => {
    // Lógica de mi otro endpoint
});

module.export = router;
```

**app.js**
```js
const express = require('express');
const app = express()
const port = process.env.PORT || 8000;

// Esto agrega nuestro módulo nuevo a la app principal
app.use('/mimodulo', require('./mi_modulo'));

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});
```

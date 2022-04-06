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

## Prerrequisitos

- Node.js (v14 o superior)
- npm (v6 o superior)
- PostgreSQL

## Configuración Inicial

### 1. Clona el repositorio

### 2. Instala las dependencias
Para instalar las dependencias:
- cd code
- npm install

### 3. Configurar las variables de entorno
##### Cambia los valores por unos que coincidan con tu base de datos
- DB_NAME=sistema_votacion
- DB_USER=tu_usuario
- DB_PASSWORD=tu_contraseña
- DB_HOST=localhost
- DB_PORT=5432
- JWT_SECRET=secreto_super_seguro
### 4. Configura tu conexion a la base de datos
### 5. Ejecuta el servidor
- npm run dev

## Ejemplos de uso del API
### Votantes
-  Obtener todos los votantes - [GET] /voters

curl -X GET http://localhost:3000/voters

-  Crear un votante - [POST] /voters

curl -X POST http://localhost:3000/voters -H "Content-Type: application/json" -d '{"name":"Carlos López","email":"carlos@example.com"}'

- Eliminar un votante - [DELETE] /voters/:id
  
curl -X DELETE http://localhost:3000/voters/1

- Obtener un votante - [GET] /voters/:id
  
curl -X GET http://localhost:3000/voters/1


### Candidatos
- Obtener todos los candidatos - [GET] /candidates
  
curl -X GET http://localhost:3000/candidates

- Crear un candidato - [POST] /candidates
  
curl -X POST http://localhost:3000/candidates -H "Content-Type: application/json" -d '{"name":"María Gómez", "party":"Partido Independiente"}'

- Eliminar un candidato - [DELETE] /candidates/:id

curl -X DELETE http://localhost:3000/voters/1

- Obtener un candidato - [GET] /candidates/:id

curl -X GET http://localhost:3000/candidates/1

### Votos
- Emitir un voto - [POST] /votes

curl -X POST http://localhost:3000/votes -H "Content-Type: application/json" -H "Authorization: Bearer <tu_token_aqui>" -d '{"voter_id":1, "candidate_id":2}'

- Obtener estadísticas de votos - [GET] /votes/statistics

curl -X GET http://localhost:3000/votes/statistics -H "Authorization: Bearer <tu_token_aqui>"

- Obetener todos los votos [GET] /votes

curl X GET http://localhost:3000/votes -H "Authorization: Bearer <tu_token_aqui>"
________________________________________

### Capturas de las estadisticas generadas
![image](https://github.com/user-attachments/assets/2c67a319-28e6-4d3f-b18c-ec733c6b1f6e)

### Notas

*	Para los endpoints protegidos con JWT, debes incluir el token en el encabezado de la solicitud: -H "Authorization: Bearer TU_TOKEN_AQUI"
* Un votante no puede registrarse más de una vez.
* Un votante no puede ser candidato al mismo tiempo.
* Un votante solo puede emitir un voto.




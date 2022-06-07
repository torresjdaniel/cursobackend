Opción 1

Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
Verificar que todo funcione correctamente.

Comandos: 

pm2 start main.js --name="Server Cluster" -- -p 8081 -m CLUSTER
pm2 start main.js --name="Server Fork"

---------------------------------------------------------------------------------------------------------------------

Opción 2

Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

pm2 start main.js --name="Server 1" -- -p 8082
pm2 start main.js --name="Server 2" -- -p 8083
pm2 start main.js --name="Server 3" -- -p 8084
pm2 start main.js --name="Server 4" -- -p 8085

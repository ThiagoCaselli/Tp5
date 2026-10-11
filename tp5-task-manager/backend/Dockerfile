# Usamos una versión ligera de Node.js
FROM node:20

# Creamos la carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración y descargamos las librerías
COPY package*.json ./
RUN npm install

# Copiamos todo el código del backend
COPY . .

# Exponemos el puerto donde corre la API
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["npm", "start"]
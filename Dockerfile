FROM node:20-alpine

# Instala dependencias del sistema necesarias
RUN apk add --no-cache tzdata bash git

# Define el directorio de trabajo
WORKDIR /app

# Instala Nest CLI globalmente
RUN npm install -g @nestjs/cli

# Copia solo package.json y package-lock.json primero para aprovechar la cache
COPY package*.json ./

# Instala todas las dependencias (incluyendo dev)
RUN npm install

# Copia el resto del código fuente (pero en dev se montará con volumes)
COPY . .

# Expone el puerto usado por NestJS
EXPOSE 3500

# Comando por defecto: contenedor en espera (para entrar manualmente)
CMD ["tail", "-f", "/dev/null"]

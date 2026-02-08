FROM node:22-slim

WORKDIR /app

# Install basic development tools if needed
# RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y tzdata && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Instalar NestJS CLI globalmente
RUN npm install -g @nestjs/cli

# Copiar los archivos de configuración (package.json y package-lock.json)
COPY package*.json ./

# Instalar dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente al contenedor
COPY . .

# Exponer el puerto en el que corre NestJS
EXPOSE 3500

# The rest will be handled via volumes in docker-compose for live development
CMD ["tail", "-f", "/dev/null"]

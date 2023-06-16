FROM node:14-alpine
# Usa l'immagine di base di Node.js


# Imposta la directory di lavoro nel contenitore
WORKDIR /app

# Copia i file di dipendenza
COPY package*.json ./

# Installa le dipendenze
RUN npm install

RUN npm build

# Copia i file dell'applicazione
COPY . .

# Porta esposta dall'applicazione
EXPOSE 3000

# Comando per avviare l'applicazione
CMD ["npm", "run", "start"]

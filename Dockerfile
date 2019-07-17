#Dockerfile for the node app
#Base Image as node
FROM node:latest
# Creating source app directory
RUN mkdir -p /usr/src/MakeMyRecipes_app
#Setting WORDIR at new source app directory
WORKDIR /usr/src/MakeMyRecipes_app
# COPY package.json file
COPY package.json .
# INSTALL DEPENDENCIES
RUN npm install
# COPY SOURCE FILE CONTENTS
COPY . .
#EXPOSE PORT
EXPOSE 8000
# START THE CONTAINER COMMAND
CMD ["node","app.js"]


# ### STAGE 1: Build ###
# FROM node:12.7-alpine AS build
# WORKDIR /usr/src/app
# COPY package.json package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# ### STAGE 2: Run ###
# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/dist/aston-villa-app /usr/share/nginx/html


FROM node:12-alpine as buildContainer
WORKDIR /app
COPY ./package.json ./package-lock.json /app/
RUN npm install
COPY . /app
# RUN npm run build:universal
# RUN npm run generate:prerender
RUN npm run build:ssr

FROM node:8-alpine

WORKDIR /app
# Copy dependency definitions
COPY --from=buildContainer /app/package.json /app
# COPY --from=buildContainer /app/server.js /app

# Get all the code needed to run the app
COPY --from=buildContainer /app/dist /app/dist
# COPY --from=buildContainer /app/static /app/static
COPY --from=buildContainer /app/dist/ssr-angular-site/server /app/dist/ssr-angular-site/server

# Expose the port the app runs in
EXPOSE 4000

# Serve the app
CMD ["npm", "run", "server"]
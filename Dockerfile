# Используем базовый образ на основе Nodejs
FROM node:alpine as build

# Указывает work directory
WORKDIR /app
COPY . .

# Кэшируем и устанавливаем зависимости
COPY yarn.lock ./
RUN yarn config set registry # URL сервер
RUN yarn install --production

# Делаем сборку
RUN yarn build


# production environment

# Копируем собранные файлы React-приложения в папку html Nginx
COPY /app/build /usr/share/nginx/html

# Или же
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html

# То же самое - с конфигом Nginx
COPY --from=build /app/.nginx/nginx.conf /etc/nginx/sites-enabled/default

# Открываем порт 80 - по умолчанию для HTTP
EXPOSE 80

# Команда для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]
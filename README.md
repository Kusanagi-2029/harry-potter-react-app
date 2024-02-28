# Начало работы

Этот проект был сформирован [Create React App](https://github.com/facebook/create-react-app).
С добавлением в последующем инструментов через yarn-команды:

```bash
yarn add react-router-dom
yarn add axios
yarn add less
yarn add less less-loader --save-dev
yarn add css-loader less-loader --save-dev
yarn add chart.js react-chartjs-2
yarn add chart.js
yarn add eslint-plugin-prettier
yarn add prettier
yarn add --save-dev prettier
yarn add eslint-config-airbnb --dev
```

## Доступные Scripts

В директории проекта

### `yarn start`

Запускает в dev-моде
По адресу [http://localhost:3000](http://localhost:3000)

ХотРелоад при изменении компонентов.

### `yarn test`

Запускает тесты (interactive watch mode).\
См. [running tests](https://facebook.github.io/create-react-app/docs/running-tests) для инфо.

### `yarn build`

Собирает приложение в `build` folder.\
В Production лучше использовать его

См [deployment](https://facebook.github.io/create-react-app/docs/deployment) для инфо.

### `yarn eject`

**Указание**: это одностороннее действие. Если вы используете команду `eject`, вам не вернутся обратно!\*\*

Если вы недовольны инструментами построения и настройками, вы можете использовать команду `eject` в любой момент. Эта команда удалит единственную зависимость сборки из вашего проекта.

Напротив, она скопирует все конфигурационные файлы и транзитивные зависимости (Webpack, Babel, ESLint и т.д.) прямо в ваш проект, чтобы вы полностью владели ими. Все команды, кроме `eject`, будут работать, но они будут указывать на скопированные скрипты, чтобы их можно было корректировать. В этом моменте вы сами за себя.

Вам не нужно использовать команду `eject`. Условленный набор особенностей подходит для мелких и средних развертываний, и вам не должен казаться обязательным использовать данную функцию. Однако мы понимаем, что это инструмент не полезен, если вы не можете его настраивать, когда вы готовы к этому.

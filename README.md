# Начало работы

1. На главной странице при входе в приложение (.../mainPage) Наведитесь на кликабельную зону и перейдите на страницу выбора дат (.../wizardChartsPage).
2. На самой странице выбора дат (.../wizardChartsPage) вы можете увидеть самую первую круговую диаграмму типа _"Пирог"_, в котоую записаны все факультеты, без фильтра - там и маги, и люди.

# О технической реализации проекта

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

После билда нужно запускать именно его:
Установка зависимости:

```bash
yarn global add serve
```

Запуск билда:

```bash
serve -s build
```

Его можно ещё и сжать - - модулём nginx _gzip_, например, используя команду:

```bash
gzip_comp_level
```

См [deployment](https://facebook.github.io/create-react-app/docs/deployment) для инфо.

### `yarn eject`

**_НЕ ИСПОЛЬЗОВАТЬ_**

**Указание**: это одностороннее действие. Если вы используете команду `eject`, вам не вернутся обратно!\*\*

Если вы недовольны инструментами построения и настройками, вы можете использовать команду `eject` в любой момент. Эта команда удалит единственную зависимость сборки из вашего проекта.

Напротив, она скопирует все конфигурационные файлы и транзитивные зависимости (Webpack, Babel, ESLint и т.д.) прямо в ваш проект, чтобы вы полностью владели ими. Все команды, кроме `eject`, будут работать, но они будут указывать на скопированные скрипты, чтобы их можно было корректировать. В этом моменте вы сами за себя.

Вам не нужно использовать команду `eject`. Условленный набор особенностей подходит для мелких и средних развертываний, и вам не должен казаться обязательным использовать данную функцию. Однако мы понимаем, что это инструмент не полезен, если вы не можете его настраивать, когда вы готовы к этому.

## Обработка ошибок, Кэширование и ревалидация данных с сервера

Пока в данном проекте нет никакого state manager'a и инструментов отлова ошибок, кроме ErrorBoundary и React-инструментов "из коробки". Отлов ошибок осуществляется преимущественно логически.

Ошибки пока отлавливаются очень просто - прямой их обработкой.

```tsx


	/** ДЕМО отработки обработчика 500-ой */
	const fetchData = async () => {
		try {
			/** Умышленно пытаемся получить данные по некорректной ссылке */
			const data = await WisardsInfoService.getAllWisardsCorrupted();
			setButtonPressed(true);
			setDataLoaded(true);
		} catch (error) {
			setButtonPressed(false);
			setDataLoaded(false);
			console.error("Error fetching data:", error);
		}
	};
...
		<div className={classes.Buttons}>
			{!isDataLoaded && <Navigate to="/error500" replace />}
			{isButtonPressed && (
				<Navigate to="/Страница_Ошибки404-Неизвестный_путь" replace />
			)}

			<p>Примеры отрабатывающих ошибок: </p>

			<button
				className={classes.Error500}
				onClick={() => {
					fetchData();
				}}
			>
				Error500
			</button>
			<button
				className={classes.Error404}
				onClick={() => {
					setButtonPressed(!isButtonPressed);
				}}
			>
				Error404
			</button>
		</div>
```

#### Кжширование идёт с помощью хука useCallback

```tsx
// Для оптимизации размера приходящих данных и предотвращения повторных вызовов можно воспользоваться кэшированием данных. Одним из способов сделать это является сохранение полученных данных в локальном состоянии компонента и использование этого кэша при необходимости, вместо повторного запроса на сервер.
// В этом примере мы добавили проверку наличия кэша в localStorage. Если данные уже есть в кэше, они загружаются из него без повторного запроса на сервер. В противном случае данные загружаются с сервера, сохраняются в кэше и используются для отображения. Таким образом, мы избегаем лишних запросов на сервер и оптимизируем размер приходящих данных.

useEffect(() => {
	const fetchData = async () => {
		const cachedData = localStorage.getItem("characterList");
		if (cachedData) {
			setCharacterList(JSON.parse(cachedData));
		} else {
			try {
				const data = await WisardsInfoService.getAllWisards();
				setCharacterList(data);
				localStorage.setItem("characterList", JSON.stringify(data));
				setDataLoaded(true);
			} catch (error) {
				setDataLoaded(false);
				console.error("Error fetching data:", error);
			}
		}
	};

	fetchData();
}, []);
```

fetch простой с помощью Axios, wizardsInfoService.ts:

```ts
	async getAllWisards(): Promise<Character[]> {
		const response = await axios.get(appsettings.urls.getAllWisards);
		return response.data as Character[];
	},
```

Ситуацию может сильно улучшить **_React Query_**, но в данном случае он **избыточен**:

- ревалидация не подразумевается,
- библиотека имеет некоторые проблемы с XML,
- желательно использовать парно с полноценными state manager'ами наподобие Zustand | MobX и т.п.

## Nginx & Docker

### Nginx

> Nginx в качестве сервера нам нужен, чтобы отдавать пользователяю статических html-файлов, скомпилированных после билда проекта.
>
> > У Nginx перед тем же Apache есть преимущество в виде асинхронного выполнения наподобие event Lool Node'ы.

### Docker

> Docker нужен для сложного pipeline'a и инфраструктуры с автоматизацией, тем не менее:

```js
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
```

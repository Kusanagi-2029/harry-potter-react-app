# Начало работы с приложением

[Начало работы с приложением](Начало работы с приложением)
[How-to](How-to) 
[Кнопки диаграмм](Кнопки диаграмм) 
[Кнопки Демонстрации отработки ошибок при роутинге и отлове ошибок при fetch](Кнопки Демонстрации отработки ошибок при роутинге и отлове ошибок при fetch)
[О технической реализации проекта](О технической реализации проекта) 
[Git Flow](Git Flow) 
[Основной стек](Основной стек)
[State Managers](State Managers)
[Доступные Scripts](State Managers) 
[Обработка ошибок, Кэширование и ревалидация данных с сервера](Обработка ошибок, Кэширование и ревалидация данных с сервера)
[Кэширование идёт с помощью хука useEffect и localStorage](Кэширование идёт с помощью хука useEffect и localStorage) 
[Nginx & Docker](Nginx & Docker) 
[Nginx](Nginx) 
[Docker](Docker) 

## Демо
> [!TIP]
> https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/73b64965-dd4c-4865-b50d-62f83abb15a4

## How-to
1. На главной странице при входе в приложение (.../mainPage) Наведитесь на кликабельную зону и перейдите на страницу выбора дат (.../wizardChartsPage).
   ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/ba830032-c572-4667-bd8c-60e23f093a10)

2. На самой странице выбора дат (.../wizardChartsPage) вы можете увидеть самую первую круговую диаграмму типа _"Пирог"_, в котоую записаны все факультеты, без фильтра - там и маги, и люди.
**Для диаграмм была выбрана библиотека** [chart.js](https://www.chartjs.org/docs/latest/getting-started/usage.html)
 ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/beda0a6a-96fb-49d5-85cc-ab7555e85000)

3. Есть кнопки, переключающие диаграммы в зависимости от фильтрации пришедших данных:
> [!TIP]
> Приложение предупреждает пользователя о необходимости ввода обеих дат.
![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/650b3ca6-fc04-4088-9cd2-8b693a1f5cab)

I) Даты можно вводить/очищать как вручную, так и выбирая
    ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/9b0beadc-07ce-4215-9a57-0bf97b3ce7e6)

II) После установки дат **обязательно нажать на кнопку "Выбрать"**:
   ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/bc5e7bcf-1192-46df-bfb0-61de8ace1445)

III) Если нет ничего по выставленному диапазону дат - приложение расформирует canvas-диаграмму и выведет соотв-ее сообщение:
    ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/a60d2007-767d-427c-9d11-7343aa5d0909)

IV) Доли диаграммы интерактивны - их можно включать/выключать и моментально видеть обновление диаграммы:
   ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/7abbbe5c-7756-4918-9207-7a554acb76a6)

   После отключения (с возможностью включить обратно при повторном нажатии):
   ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/42444bbe-3a75-44a1-99e4-e66a6448981b)

 ## Кнопки диаграмм
 **ВСЕ** - все пользователи и полученного запроса, включая НЕмагов:
 ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/2800dc58-6c54-42a3-8416-6982820aa502)

**МАГИ** - все пользователи с параметром **wizard = true** - маги, в т.ч. БЕЗ факультетов:
![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/1d4bdac0-a8fe-4db9-b28a-fb655d638885)

**Зачисленные** - все пользователис параметром **wizard = true** и **house !== ""** - зачисленные МАГИ, их, естественно, меньше, т.к. отфильтрованы маги БЕЗ факультета:
![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/57fcf410-557c-4fd3-b730-8e77aa33f270)

 ## Кнопки Демонстрации отработки ошибок при роутинге и отлове ошибок при fetch:

**Error500** - Осуществляет fetch по заведомо неверной ссылке:
```tsx
... errorExample.tsx:
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

...wizardsInfoService.ts:

	/** Некорректный запрос для примера отработки ошибки 500 */
	async getAllWisardsCorrupted(): Promise<Character[]> {
		const response = await axios.get(appsettings.urls.getAllWisardsBroken);
		return response.data as Character[];
	},
...

...appSettings.json:
		"getAllWisardsBroken": "https://hp-api.onrender.com/фывы/testtesttestest11111111111"
...
```
 Получается следующее: 
 ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/6ec798dc-6a91-4c79-87b8-1f3bc31ef9ff)

При ошибке отображается соответствующая ошибка, РОУТИНГ отработал - страница error500:
![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/e816dc79-4231-4279-ac48-4325d15dfd38)

**Error404** - Осуществляется переход на неизвестную приложению страницу:
```tsx
... errorExample.tsx:
			{isButtonPressed && (
				<Navigate to="/Страница_Ошибки404-Неизвестный_путь" replace />
			)}

			<p>Примеры отрабатывающих ошибок: </p>

...
			<button
				className={classes.Error404}
				onClick={() => {
					setButtonPressed(!isButtonPressed);
				}}
			>
				Error404
			</button>
...


...appRoutes.tsx

			<Route path="/error404" element={<Error404 />} />
...
			{/* Здесь определяется неизвестная страница */}
			<Route path="*" element={<Error404 />} /> 

```
![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/3a08be77-fa02-4566-ac81-3171a2068dd6)

> [!IMPORTANT]
> Кроме всего прочего, страницы адаптивно отвёрстаны под разные разрешения и форматы, в т.ч. для мобильных устройств:
> ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/a46a8c64-e9f6-42b2-8584-54fa076f2d70)
> ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/d84f45f7-b2b9-4a46-b312-6ef29a3fe633)
> ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/26becaf2-97d0-46ed-9d6e-80e5545b24ea)
   
# О технической реализации проекта

## Git Flow
> [!IMPORTANT]
> Применён Git Flow:
> ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/77b725af-9cf7-4ffd-ae5d-346f4151b762)
> В описании коммитов также можно видеть основы Git Flow:
> ![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/b8570915-4000-4f4d-9962-bebee5877c0e)

## Основной стек 
> REACT 18+, TypeSript, Chart.Js (Диаграммы), Less, Axios, остальное - в самой структуре/зависимостях проекта

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
## State Managers
Было решено обойтись без State Manager'a по принципам **KISS|YAGNI**:
- В данном случае нам не особо нужно глобальное хранилище (нет необходимости прокидывать состояние через всё приложение, т.к. оно структурно несложное),
- Нет необходимости в actions и мутациях, т.к. не особо изменяется состояние (в пределах локального **useState**, даже нет необходимости в **useContext** & **useReducer**) + 1 Get-запрос. 

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

> [!CAUTION]
> **_НЕ ИСПОЛЬЗОВАТЬ_**

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

#### Кэширование идёт с помощью хука useEffect и localStorage

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

Решено это было сделать через хранение в localStorage из-за объёмного XML-ответа, который прогружался не сразу - было дублирование одного и того же запроса:
**БЕЗ localStorage:**
![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/dd5bed6e-fb77-477a-8369-8ddbc11dfa81)

**С localStorage:**
Как видно, не происходит дублирования тяжеловесного запроса, т.к. каждый раз затягивать эти данные не вполне разумно (т.к. в данном случае ревалидация данных НЕ подразумевается):
![image](https://github.com/Kusanagi-2029/harry-potter-react-app/assets/71845085/e34ff8cc-a6ba-4d19-942a-28b8cc81cee7)


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
> [!NOTE]
> Useful information that users should know, even when skimming content. Nginx в качестве сервера нам нужен, чтобы отдавать пользователяю статических html-файлов, скомпилированных после билда проекта.
> [!NOTE]
> > У Nginx перед тем же Apache есть преимущество в виде асинхронного выполнения наподобие event Loop Node'ы.

### Docker
> [!NOTE]
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

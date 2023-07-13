npm install sass
npm install @mui/material @emotion/react @emotion/styled
npm install chart.js react-chartjs-2
npm install numeral
npm i leaflet react-leaflet

Для Firebse я буду использовать свою фрилансовскую почту
Free API for covid-19 cases - https://disease.sh/v3/covid-19/all
https://disease.sh/v3/covid-19/countries
https://disease.sh/v3/covid-19/countries/${countryCode}
https://disease.sh/v3/covid-19/historical/all?lastdays=120

Сперва почистим проект. Затем делаем базовый выпадающий список при помощи MaterialUI. Фетчим из covid-19 API перечень стран по которым есть информация и отображаем внутри выпадающего списка. При нажатии на страну в списке, мы сохраняем ее ("countryInfo.iso3") в стейт - onCountryChange(). Делаем это для того, чтобы по названию текущей страны потом подгружать информацию о ней.

Затем беремся за оставшийся лейаут. Разобъем наш Home Page на левую и правую сторону и сделаем моковый вид компонентов которые там должны быть. Причем сделаем чтобы левая сторона занимала 80% екрана:
```
.app__left {
    flex: 0.8;
}
```

Изначальный фетчинг большинства инфы будет прописан в HomePageLeft.

Далее напишем логику, чтобы при клике на выбраную страну мы подтягивали ее данные из covid-19 API. Но не забываем, что дефолтное состояние - это инфа о всем мире. Поэтому при первой загрузке страницы - загружаем данные за весь мир ('Worldwide'), а не конкретной страны.

После чего, сделаем таблицу с информацией по странам (HomePageRight часть нашего лейаута). За отображение таблицы отвечает следующий HTML тег:
```
<table>
    <tbody>
        <tr>
            <td></td>
        </tr>
    </tbody>
</table>
```

Но мы хотим чтобы наша таблица с колв-ом кейсов отображалась не в алфавитном порядке, а от большего кол-ва кейсов к меньшему. Для этого создадим папку utils и в ней логику по сортировке - sortByCases(data). И будем сортировать список сразу после фетчинга данных в HomePageLeft, и сохранять в стейт уже отсортированный список.

Далее под таблицей создадим график который визуализирует нашу статистику. Компонент отвечающий за отображение графика - LineGraph.jsx. Для работы с графиком мы воспользуемся библиотеками chart.js, react-chartjs-2 и numeral (для ховер еффекта на графике). Однако в туториале использовались chart.js и react-chartjs-2 версии #2. Текущая же версия - #5. Часть кода для графика я поправил (мигрировал на новую версию), но часть старого кода все еще компилится с ошибками. Пропсом LineGraph.jsx будет принимать в себя строку, которая будет ключем в объекте для отображения нужного графика.

Для графика, сырую инфу с бекенда, нужно преобразовать в формат который будет понимать наш график. Для этого, в LineGraph.jsx, мы создадим вункцию - buildChartData.

Далее мы создадим компонент для отображения карты - Map.jsx. Для создания карты мы воспользуемся библиотекой "react-leaflet". Заметка от себя: библиотека кривовата и заморочена, лучше будет поискать альтернативу.

При базовой настройки карты, если пропустить хоть один из нижеуказанных пунктов, то карта не будет работать:
1. Для работы карты, после установки библиотеки, в компонент с картой нужно добавить следующий стиль - import "leaflet/dist/leaflet.css". 
2. Также на контейнер карты нужно добавить собственнй стиль и указать там поле "height", как для корневого стиля, так и для .leaflet-container. 
3. В <MapContainer> нужно передать следующие параметры - center={mapCenter} zoom={mapZoom}.

После чего, должен отобразиться голый макет карты.
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

Для графика, сырую инфу с бекенда, нужно преобразовать в формат который будет понимать наш график. Для этого, в LineGraph.jsx, мы создадим вункцию - buildChartData. Он пребразует данные в массив объектов, как например:
```
data: [
    {
        x: 10,
        y: 20
    }, 
    {
        x: 15,
        y: 25
    }
]
```

Далее мы создадим компонент для отображения карты - Map.jsx. Для создания карты мы воспользуемся библиотекой "react-leaflet". Заметка от себя: библиотека кривовата и заморочена, лучше будет поискать альтернативу.

При базовой настройки карты, если пропустить хоть один из нижеуказанных пунктов, то карта не будет работать:
1. Для работы карты, после установки библиотеки, в компонент с картой нужно добавить следующий стиль - import "leaflet/dist/leaflet.css". 
2. Также на контейнер карты нужно добавить собственнй стиль и указать там поле "height", как для корневого стиля, так и для .leaflet-container. 
3. В <MapContainer> нужно передать следующие параметры - center={mapCenter} zoom={mapZoom}.

После чего, должен отобразиться голый макет карты.

Теперь при нажатии на страну из выпадающего списка, ми хотим отобразить на карте выбраную страну. К нашему удобству, когда мы фетчим инфо о конкретной стране (onCountryChange), текущий covid-19 API в ответе также возвращает нам и ее координаты, которые мы с удобством может передать в нашу карту, для ее отображения (mapCenter, mapZoom).

Теперь отобразим кейсы для кажлой страны в виде кружков. Создадим утил функцию casesTypeColors, которая будет проходиться по информации за все странны, и для каждой станы будет возвращать кружок. И вызываем эту функцию в компоненте Map.jsx.

После того как мы закончили с основным функционалом, теперь немного доработаем разные части приложения.

Сперва напишем утилс prettyPrintStat. Оборачивая в него числа перед тем как передать в InfoBox.jsx, мы будем форматировать эти числа в более красивый вид.

Далее сделаем так чтобы при нажатии на карточку "Daily new cases" - отображались карта и график для всех кейсов. При нажатии на "Daily recovered" - отображались карта и график для выздоровивших кейсов. И т.д. Для этого создадим стейт - const [casesType, setCasesType] = useState('cases');. И при нажатии на картточку будем менять стейт. А casesType добавим пропсом в График и Карту.

Чтобы понимать какая карточка нажата, то добавим папраметр active. И если он равен true, то будем применять доп стили - className={`infoBox ${active && 'infoBox--selected'}`}.

P.S. leaflet react-leaflet - при изменении стейта почему то не ререндеряться. Я забил на эту ошибку.


<InfoBox 
    isRed
    active={casesType === 'cases'}
    onClick={(e) => setCasesType('cases')}
    title="Daily new cases" 
    cases={prettyPrintStat(selectedCountryData.todayCases)} 
    total={prettyPrintStat(selectedCountryData.cases)}
/>
<InfoBox 
    active={casesType === 'recovered'}
    onClick={(e) => setCasesType('recovered')}
    title="Daily recovered" 
    cases={prettyPrintStat(selectedCountryData.todayRecovered)}
    total={prettyPrintStat(selectedCountryData.recovered)}
/>

const InfoBox = ({title, cases, total, isRed, active, ...props}) => {
  return (
        <Card 
            onClick={props.onClick} //Оживляем внешний onClick
            className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} //Если карточка активна то отрисовуем доп стиль
            //Если мы повесили isRed на компонет, то теперь мы можем это проверять и отрисовывать стили
        >
            <CardContent>
                <Typography color="textSecondary" className='infoBox__title'>
                    {title}
                </Typography>
                <h2 className='infoBox__cases'>
                    {cases}
                </h2>
                <Typography color="textSecondary" className='infoBox__total'>
                    {total} - total
                </Typography>
            </CardContent>
        </Card>
    )
}

'infoBox--selected' - модификация стиля
'infoBox__selected' - назначение стиля


<Card className='rightSide'>
    <CardContent>
        <h3>Text</h3>
    </CardContent>
</Card>
.rightSide {
    height: 100%;

    & * > h3  {
        margin-top: 20px;
    }
}
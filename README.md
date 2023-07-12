npm install @mui/material @emotion/react @emotion/styled
npm install sass

Для Firebse я буду использовать свою фрилансовскую почту
Free API for covid-19 cases - https://disease.sh/v3/covid-19/countries

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

Но мы хотим чтобы таблица
utils
sortByCases(data)
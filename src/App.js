import "./styles/homePage.scss"; 
import { useEffect, useState } from "react";
import HomePageLeft from "./components/HomePageLeft";
import HomePageRight from "./components/HomePageRight";
import { sortByCases } from "./utils/sortByCases";

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountryName, setSelectedCountryName] = useState('Worldwide')
  const [selectedCountryData, setSelectedCountryData] = useState({})
  const [tableData, setTableData] = useState([])

  //Fetching list of countries
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://disease.sh/v3/covid-19/countries')
        const data = await res.json()
        const countryList = await Promise.all(data.map(country => (
          {
            name: country.country, //United States - for displaying name
            value: country.countryInfo.iso3 //USA - for fetching data
          }
        )))
        const sortedData = sortByCases(data)
        setTableData(sortedData)
        setCountries([...countryList])
      } catch(err) {
        console.log(err)
      }
    })()
  }, [])
  
  return (    
    <div className="app">
      <HomePageLeft 
        countries={countries}
        setCountries={setCountries}
        selectedCountryName={selectedCountryName}
        setSelectedCountryName={setSelectedCountryName}
        selectedCountryData={selectedCountryData}
        setSelectedCountryData={setSelectedCountryData}
      />

      <HomePageRight tableData={tableData}/>
    </div>
  );
}

export default App;

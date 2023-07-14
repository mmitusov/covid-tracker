import "../styles/homePageLeft.scss";
import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import InfoBox from "./InfoBox";
import Map from "./Map";
import { prettyPrintStat } from "../utils/prettyPrintStat";

const HomePageLeft = ({
  mapCountries,
  countries,
  selectedCountryName, 
  setSelectedCountryName, 
  selectedCountryData, 
  setSelectedCountryData,
  casesType, 
  setCasesType
}) => {
  const [mapCenter, setMapCenter] = useState([44, 10]);
  const [mapZoom, setMapZoom] = useState(2);

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://disease.sh/v3/covid-19/all`)
      const data = await res.json()
      setSelectedCountryData(data)
    })()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    const url = countryCode === "Worldwide"
      ? `https://disease.sh/v3/covid-19/all`
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    
    const res = await fetch(url)
    const data = await res.json()
    setSelectedCountryData(data)
    setSelectedCountryName(countryCode)
    setMapCenter(countryCode === "Worldwide" ? [44, 10] : [data.countryInfo.lat, data.countryInfo.long])
    setMapZoom(countryCode === "Worldwide" ? 2 : 4)
  }

  return (
    <div className="app__left">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl>
          <Select 
            // defaultValue="Worldwide" {/* Without defaultValue you'll get ERR: You have provided an out-of-range value `undefined` for the select component */}
            value={selectedCountryName}
            onChange={onCountryChange}
            className="app__dropdown"
          >
            <MenuItem value='Worldwide' key={'key'}>Worldwide</MenuItem>
            {
              countries.map((country, index) => (
                <MenuItem value={country.value} key={index}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
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
        <InfoBox
          isRed
          active={casesType === 'deaths'}
          onClick={(e) => setCasesType('deaths')}
          title="Daily deaths" 
          cases={prettyPrintStat(selectedCountryData.todayDeaths)} 
          total={prettyPrintStat(selectedCountryData.deaths)}
        />
      </div>

      <Map casesType={casesType} mapCountries={mapCountries} mapCenter={mapCenter} mapZoom={mapZoom}/>
    </div>
  )
}

export default HomePageLeft
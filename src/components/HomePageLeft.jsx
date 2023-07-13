import "../styles/homePageLeft.scss"; 
import { useEffect } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import InfoBox from "./InfoBox";
import Map from "./Map";

const HomePageLeft = ({
  countries, 
  setCountries, 
  selectedCountryName, 
  setSelectedCountryName, 
  selectedCountryData, 
  setSelectedCountryData
}) => {
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
    console.log(data)
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
        <InfoBox title="Daily new cases" cases={selectedCountryData.todayCases} total={selectedCountryData.cases}/>
        <InfoBox title="Daily recovered" cases={selectedCountryData.todayRecovered} total={selectedCountryData.recovered}/>
        <InfoBox title="Daily deaths" cases={selectedCountryData.todayDeaths} total={selectedCountryData.deaths}/>
      </div>

      <Map />
    </div>
  )
}

export default HomePageLeft
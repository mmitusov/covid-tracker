import { FormControl, MenuItem, Select } from "@mui/material";
import "./styles/header.scss"; 
import { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState('Worldwide')

  //Fetching list of countries
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('https://disease.sh/v3/covid-19/countries')
        const data = await res.json()
        const countryList = await Promise.all(data.map(country => (
          {
            name: country.country, //United States
            value: country.countryInfo.iso2 //USA
          }
        )))
        setCountries([...countryList])
      } catch(err) {
        console.log(err)
      }
    })()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value
    setSelectedCountry(countryCode)
  }
  
  return (    
    <div>
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl>
          <Select 
            // defaultValue="Worldwide" {/* Without defaultValue you'll get ERR: You have provided an out-of-range value `undefined` for the select component */}
            value={selectedCountry}
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
    </div>
  );
}

export default App;

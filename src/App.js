import { FormControl, MenuItem, Select } from "@mui/material";

function App() {
  return (
    <div>
      <h1>COVID-19 TRACKER</h1>
      <FormControl>
         <Select>
          <MenuItem value='a'>1</MenuItem>
          <MenuItem value='a'>2</MenuItem>
          <MenuItem value='a'>3</MenuItem>
          <MenuItem value='a'>4</MenuItem>
         </Select>
      </FormControl>


    </div>
  );
}

export default App;

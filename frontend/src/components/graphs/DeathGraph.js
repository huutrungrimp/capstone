import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import Dropdown from "react-dropdown";


const DeathGraph = () => {
  const [country, setCountry] = useState("Canada");

  const selectCountry = (val) => {
    console.log(val);
    setCountry(val.value);
  };

  console.log(country);

  const [graph, setGraph] = useState();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/covid19/${country.toLowerCase()}/death`)
      .then((res) => {
        const state = res.data;
        console.log(state);
        
        setGraph(state);
      });
  }, [country]);

  const options = graph === undefined ? "" : graph["countries"];
  console.log(graph)
  console.log((graph===undefined)?(''):(graph['data']))

  return (
    <div>
      <div class="row">
        <div class="col-md-3">
          <div>
            <Dropdown
              options={options}
              onChange={selectCountry}
              value={country}
              placeholder="Select an option"
            />
          </div>
        </div>
      </div>
      <h5>Daily New Death</h5>
      <BarChart
        width={500}
        height={300}
        data={graph === undefined ? "" : graph["data"]}
      >
        <XAxis 
          dataKey="index" 
        />
        <YAxis />
        <Bar dataKey="diff" fill="#b04e3a" />
      </BarChart>
      <h5>Daily Cummulative Deaths</h5>
      <BarChart
        width={500}
        height={300}
        data={graph === undefined ? "" : graph["data"]}
      >
        <XAxis dataKey="index" />
        <YAxis />
        <Bar dataKey={country.toLowerCase()} fill="#b04e3a" />
      </BarChart>
    </div>
  );
};

export default DeathGraph;

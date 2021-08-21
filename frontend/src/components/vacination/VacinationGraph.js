import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import Dropdown from "react-dropdown";
import { Container, Row, Col } from "react-bootstrap";

const VacinationGraph = () => {
  const [country, setCountry] = useState("Canada");

  const selectCountry = (val) => {
    console.log(val);
    setCountry(val.value);
  };

  console.log(country.toLowerCase());

  const [graph, setGraph] = useState();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/covid19/graphs/vacination/${country.toLowerCase()}`)
      .then((res) => {
        const state = res.data;
        console.log(state);

        setGraph(state);
      });
  }, [country]);

  const options = graph === undefined ? "" : graph["countries"];
  console.log(graph);
  console.log(graph === undefined ? "" : graph["data"]);

  return (
    <div className="container">
      <div>
        <Container>
          <Row>
            <Col sm={2}>
              <h5>Vacination</h5>
            </Col>
            <Col sm={2}>
              <Dropdown
                options={options}
                onChange={selectCountry}
                value={country}
                placeholder="Select an option"
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div>
          <Container>
            <Row>
              <Col sm={6}>
                <h5>Daily Vacinations</h5>
                <ResponsiveContainer width="95%" height={400}>
                  <BarChart
                    width={300}
                    height={300}
                    data={graph === undefined ? "" : graph["data"]}
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Bar dataKey="daily_vaccinations" fill="#b04e3a" maxBarSize={50}/>
                  </BarChart>
                </ResponsiveContainer>
              </Col>
              <Col sm={6}>
                <h5>Fully-Vacinated People (Mills)</h5>
                <ResponsiveContainer width="95%" height={400}>
                  <BarChart
                    width="50%"
                    height={300}
                    data={graph === undefined ? "" : graph["data"]}
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Bar dataKey="people_fully_vaccinated" fill="#4287f5" maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <h5>Total Number of Vacinated People</h5>
                <ResponsiveContainer width="95%" height={400}>
                  <BarChart
                    width={300}
                    height={300}
                    data={graph === undefined ? "" : graph["data"]}
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Bar dataKey="people_vaccinated" fill="#b04e3a" maxBarSize={50}/>
                  </BarChart>
                </ResponsiveContainer>
              </Col>
              <Col sm={6}>
                <h5>Total Vacinations</h5>
                <ResponsiveContainer width="95%" height={400}>
                  <BarChart
                    width="50%"
                    height={300}
                    data={graph === undefined ? "" : graph["data"]}
                    margin={{ top: 5, right: 0, left: 50, bottom: 5 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Bar dataKey="total_vaccinations" fill="#4287f5" maxBarSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </Col>
            </Row>
          </Container>
        </div>
    </div>
  );
};

export default VacinationGraph;

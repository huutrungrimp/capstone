import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { Container, Row, Col } from "react-bootstrap";

const VacinationMap = ({ vacination }) => {
  console.log(vacination);

  const singlecountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    const vacination = country.properties["total_vaccinations"];
    layer.bindPopup(countryName + " vacination: " + vacination);
  };

  const getColor = (d) => {
    return d > 1000000
      ? "#800026"
      : d > 500000
      ? "#BD0026"
      : d > 2000
      ? "#E31A1C"
      : d > 100
      ? "#FC4E2A"
      : d > 50
      ? "#FD8D3C"
      : d > 20
      ? "#FEB24C"
      : d > 10
      ? "#FED976"
      : "#FFEDA0";
  };

  const getPro = (x) => {
    return (feature) => {
      const fillColor = getColor(feature.properties[x]);
      const dict = {
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
        dateFormate: "mm/dd/yy",
      };
      dict["fillColor"] = fillColor;
      return dict;
    };
  };

  return (
    <div className="container">
      <div className="row">
        <Container>
          <Row>
            <Col sm={4}>
              <h5>Daily Vaccinations</h5>
              <MapContainer center={[13, 0]} zoom={0.5} scrollWheelZoom={false}>
                <GeoJSON
                  style={getPro("daily_vaccinations")}
                  data={vacination === undefined ? "" : vacination}
                  onEachFeature={singlecountry}
                />
              </MapContainer>
            </Col>
            <Col sm={4}>
              <h5>People Fully Vaccinated</h5>
              <MapContainer center={[13, 0]} zoom={0.5} scrollWheelZoom={false}>
                <GeoJSON
                  style={getPro("people_fully_vaccinated")}
                  data={vacination === undefined ? "" : vacination}
                  onEachFeature={singlecountry}
                />
              </MapContainer>
            </Col>
            <Col sm={4}>
              <h5>People Vaccinated</h5>
              <MapContainer center={[13, 0]} zoom={0.5} scrollWheelZoom={false}>
                <GeoJSON
                  style={getPro("people_vaccinated")}
                  data={vacination === undefined ? "" : vacination}
                  onEachFeature={singlecountry}
                />
              </MapContainer>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default VacinationMap;

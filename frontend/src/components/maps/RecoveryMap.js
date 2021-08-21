import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";
import { MapContainer } from "react-leaflet";


const RecoveryMap = ({ recovery }) => {
  console.log(recovery);

  const yesterday = () => {
    let d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  };
  console.log(yesterday())
  const date = yesterday()


  const singlecountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    const recovery = country.properties['covid'+date];
    layer.bindPopup(countryName + " recoveries: " + recovery);
  };

  function getColor(d) {
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
  }

  function style(feature) {
    return {
      fillColor: getColor(feature.properties['covid'+date]),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
      dateFormate: "mm/dd/yy",
    };
  }

  return (
    <div>      
      <div>
        <MapContainer center={[20, 0]} zoom={0.5} scrollWheelZoom={true}>
          <h5>Maps</h5>
          <GeoJSON
            style={style}
            data={recovery === undefined ? "" : recovery}
            onEachFeature={singlecountry}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default RecoveryMap;

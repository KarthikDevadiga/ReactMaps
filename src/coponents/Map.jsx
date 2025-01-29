import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import style from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/CityContex";
import { useEffect, useState } from "react";

import { useGeolocation } from "../hooks/geolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPostion";

export default function Map() {
  const { cities } = useCities();

  const [currentPosition, setCurrentPostion] = useState([40, 0]);
  const {
    isLoading,
    position: geolocationPostion,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();

  useEffect(() => {
    if (lat && lng) setCurrentPostion([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPostion)
      setCurrentPostion([geolocationPostion.lat, geolocationPostion.lng]);
  }, [geolocationPostion]);

  return (
    <div className={style.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoading ? "loading" : "use ur postion"}
      </Button>
      <MapContainer
        className={style.map}
        center={currentPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker position={city.position} key={city.id}>
            <Popup>
              <p>{`${city.emoji} ${city.country}`}</p>
            </Popup>
          </Marker>
        ))}
        <ChangeCeneter position={currentPosition} />
        <DetectClicks />
      </MapContainer>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ChangeCeneter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClicks() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

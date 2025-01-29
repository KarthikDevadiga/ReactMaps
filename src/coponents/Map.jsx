import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import style from "./Map.module.css";
export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log({ lat: lat, lng: lng });
  return (
    <div className={style.mapContainer} onClick={() => navigate("form")}>
      <p>lat = {lat}</p>
      <p>lng = {lng}</p>
      <p>parms = {id}</p>
    </div>
  );
}

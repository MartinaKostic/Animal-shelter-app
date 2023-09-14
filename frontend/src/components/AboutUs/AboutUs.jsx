import "./AboutUs.css";
import { MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Marker } from "react-leaflet";
function AboutUs() {
  const marker = [{ geocode: [43.357249, 16.950517], popUp: "Adopt Me" }];
  const customIcon = new Icon({
    iconUrl: "/pet-house.png",
    iconSize: [38, 38],
  });
  return (
    <div className="adopt">
      <h1>Adopt Me</h1>
      <div className="aboutus">
        <img className="picture " src="/public/landing.jpg" alt="Udomi" />
        <p className="p">
          Udomi Me is an animal shelter located in Baška Voda, dedicated to
          finding new homes for abandoned and abused animals. It was founded in
          2012, and the team consists of experts who are dedicated to the care
          and welfare of animals. There are dogs and cats in the asylum of all
          ages and sizes, and they are all vaccinated, spayed/neutered and ready
          for adoption. Dodomi Me works on to educate people about the
          importance of adopting animals and to organize various activities to
          increase public awareness of the problems abandoned animals.
        </p>
      </div>
      <div className="section">
        <h1>How can you find us?</h1>
        <p className="pp">
          In Baška Voda, next to Makarska. Adress: Ul. Zrinskih i Frankopana 40
        </p>
        <MapContainer center={[43.358452, 16.9478]} zoom={16}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {marker.map((m) => (
            <Marker key={m.geocode} position={m.geocode} icon={customIcon}>
              <Popup>{m.popUp}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="section">
        <h1>Contact form</h1>
        <p>Contact us!</p>
        <form className="forma">
          <div>
            <label>
              E-mail:
              <input
                className="input"
                type="text"
                name="mail"
                placeholder="Enter e-mail"
                required
              ></input>
            </label>
          </div>
          <div>
            <label>
              Text:
              <input
                className="input"
                type="text"
                name="text"
                placeholder="Enter tekst"
                required
              ></input>
            </label>
          </div>
          <button className="addmargin" type="submit">
            Send!
          </button>
        </form>
      </div>
    </div>
  );
}
export default AboutUs;

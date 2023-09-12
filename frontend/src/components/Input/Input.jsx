/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import "./Input.css";
import { useNavigate } from "react-router-dom";

function Input(props) {
  const [form, setForm] = useState({
    name: "",
    species: "",
    picture: "",
    chip: false,
    years: 0,
    description: "",
    checkup: new Date(),
    adopted: false,
  });
  const [species, setSpecies] = useState([]);
  const [isCheckedChip, setIsCheckedChip] = useState(false);
  const [isCheckedAdopted, setIsCheckedAdopted] = useState(false);
  const navigate = useNavigate();

  const sendData = (e) => {
    e.preventDefault();
    const send = formatData(form);
    console.log(send);
    axios.post("http://localhost:5000/animals", send).then((res) => {
      props.add(res.data);
      navigate("/list");
    });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/species")
      .then((rez) => setSpecies(rez.data))
      .catch((err) => console.log(err.message));
  }, []);

  function inputChange(event) {
    const { name, value } = event.target;

    if (name == "picture") {
      setForm({ ...form, [name]: event.target.files[0].name });
    } else if (name == "chip") {
      setIsCheckedChip((prevValue) => !prevValue);
      setForm({ ...form, [name]: event.target.checked });
    } else if (name == "adopted") {
      setIsCheckedAdopted((prevValue) => !prevValue);
      setForm({ ...form, [name]: event.target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function formatData(objekt) {
    return {
      name: objekt.name,
      species: objekt.species,
      chip: objekt.chip,
      description: objekt.description,
      years: Number(objekt.years),
      picture: objekt.picture,
      checkup: objekt.checkup,
      adopted: objekt.adopted,
    };
  }

  return (
    <form className="form" onSubmit={sendData}>
      <div>
        <label>
          Species:
          <select
            name="species"
            value={form.species}
            onChange={inputChange}
            required
          >
            <option value="">--Select animal species--</option>
            {species.map((species) => (
              <option key={species} value={species}>
                {species}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Name:
          <input
            className="input"
            type="text"
            name="name"
            value={form.name}
            onChange={inputChange}
            required
          ></input>
        </label>
      </div>

      <div>
        <label>
          Years:
          <input
            type="number"
            name="years"
            value={form.years}
            onChange={inputChange}
            required
          ></input>
        </label>
      </div>
      <div>
        <label>
          <span style={{ display: "block" }}>Description</span>
          <textarea
            className="input"
            type="text"
            name="description"
            value={form.description}
            onChange={inputChange}
          ></textarea>
        </label>
      </div>
      <div>
        <label>
          Picture:
          <input
            type="file"
            name="picture"
            accept="image/*"
            onChange={inputChange}
            required
          ></input>
        </label>
      </div>
      <div>
        <label>
          Check-up:
          <input
            className="input"
            type="date"
            name="checkup"
            value={form.checkup}
            onChange={inputChange}
            required
          ></input>
        </label>
      </div>
      <div className="toggle">
        <span>Chip</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            name="chip"
            checked={isCheckedChip}
            onChange={inputChange}
          ></input>
          <span className="slider round"></span>
        </label>
      </div>
      <div className="toggle">
        <span>Adopted</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            name="adopted"
            checked={isCheckedAdopted}
            onChange={inputChange}
          ></input>
          <span className="slider round"></span>
        </label>
      </div>
      <button className="add" type="submit">
        Dodaj!
      </button>
    </form>
  );
}
export default Input;

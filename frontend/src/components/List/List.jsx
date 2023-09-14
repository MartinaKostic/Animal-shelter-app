/* eslint-disable react/prop-types */
import "./List.css";
import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { BsCheckLg } from "react-icons/bs";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineChip } from "react-icons/hi";
import { useContext } from "react";
import ModeContext from "../ModeContext";
import axios from "axios";

function List({ animals, fetchNewData }) {
  const mode = useContext(ModeContext);
  const [editMode, setEditmode] = useState(false);
  const [selectedId, setSelectedid] = useState(null);
  const [form, setForm] = useState({
    name: null,
    species: null,
    picture: null,
    chip: null,
    years: null,
    description: null,
    checkup: null,
    adopted: null,
  });
  const [isCheckedChip, setIsCheckedChip] = useState(false);
  const [isCheckedAdopted, setIsCheckedAdopted] = useState(false);

  const edit = (animal) => {
    setEditmode(true);
    setSelectedid(animal.id);
    setIsCheckedAdopted(animal.udomljen);
    setIsCheckedChip(animal.cip);
  };

  async function deleteAnimal(id) {
    await axios.delete(`http://localhost:5000/animals/${id}`);
    fetchNewData();
  }

  function handleClose() {
    setEditmode(false);
  }
  //when admin updates animal
  async function handleSave(animal) {
    try {
      const data = prepareData(animal);
      await axios.put(`http://localhost:5000/animals/${selectedId}`, data);
      setEditmode(false);
      fetchNewData();
    } catch (error) {
      console.error("Error updating animal information:", error);
    }
  }
  //when user adopts on button
  async function handleAdopted(id) {
    await axios
      .patch(`http://localhost:5000/animals/${id}`, {
        adopted: true,
      })
      .then((res) => console.log(res));
    fetchNewData();
  }

  function prepareData(animal) {
    const newData = {
      name: form.name != null ? form.name : animal.name,
      species: form.species != null ? form.species : animal.species.animal_type,
      picture: form.picture != null ? form.picture : animal.picture,
      chip: form.chip != null ? form.chip : animal.chip,
      years: form.years != null ? form.years : animal.years,
      description:
        form.description != null ? form.description : animal.description,
      checkup: form.checkup != null ? form.checkup : animal.checkup,
      adopted: form.adopted != null ? form.adopted : animal.adopted,
    };
    return newData;
  }

  function inputChange(event) {
    const { name, value } = event.target;
    console.log(value);
    console.log(name);
    if (name === "picture") {
      setForm({ ...form, [name]: event.target.files[0].name });
    } else if (name === "chip") {
      setIsCheckedChip((prevValue) => !prevValue);
      setForm({ ...form, [name]: event.target.checked });
    } else if (name === "adopted") {
      setIsCheckedAdopted((prevValue) => !prevValue);
      setForm({ ...form, [name]: event.target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  return (
    <div className="list-grid">
      {animals.map((animal) => (
        <div key={animal.id} className="animal">
          {editMode && selectedId == animal.id ? (
            <div>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  defaultValue={animal.name}
                  onChange={inputChange}
                />
              </label>

              <label>
                Species
                <input
                  name="species"
                  type="text"
                  defaultValue={animal.species.animal_type}
                  onChange={inputChange}
                />
              </label>
              <label>
                Years
                <input
                  name="years"
                  type="number"
                  defaultValue={animal.years}
                  onChange={inputChange}
                />
              </label>

              <label>
                Last check-up
                <input
                  name="checkup"
                  type="date"
                  defaultValue={animal.checkup}
                  onChange={inputChange}
                />
              </label>

              <label>
                <span style={{ display: "block" }}>Description</span>
                <input
                  name="description"
                  type="text"
                  defaultValue={animal.description}
                  onChange={inputChange}
                />
              </label>

              <label style={{ display: "block" }}>
                Chiped
                <input
                  name="chip"
                  type="checkbox"
                  defaultValue={animal.chip}
                  checked={isCheckedChip}
                  onChange={inputChange}
                />
              </label>

              <label>
                Adopted
                <input
                  name="adopted"
                  type="checkbox"
                  defaultValue={animal.adopted}
                  checked={isCheckedAdopted}
                  onChange={inputChange}
                />
              </label>

              <input
                type="file"
                name="picture"
                accept="image/*"
                onChange={inputChange}
                required
              ></input>

              <div>
                <button className="botun" onClick={() => handleSave(animal)}>
                  <BsCheckLg />
                </button>
                <button className="botun" onClick={handleClose}>
                  <CgClose />
                </button>
              </div>
            </div>
          ) : (
            <>
              <img
                src={`http://localhost:5000/public/${animal.picture}`}
                alt={animal.name}
              />

              <h1>{animal.name}</h1>

              <div className="info">
                {animal.adopted ? (
                  <div style={{ marginRight: "10px" }}>
                    <BiHomeAlt />
                    <span>Adopted</span>
                  </div>
                ) : (
                  <div style={{ marginRight: "10px" }}>
                    <BiHomeAlt />
                    <span>Unadopted</span>
                  </div>
                )}
                {animal.chip ? (
                  <div>
                    <HiOutlineChip />
                    <span>Chipped</span>
                  </div>
                ) : (
                  <div>
                    <HiOutlineChip />
                    <span>Unchipped </span>
                  </div>
                )}
              </div>

              <h3>
                Species:{" "}
                <span className="details">{animal.species.animal_type}</span>
              </h3>
              <p>
                Years: <span className="details">{animal.years}</span>
              </p>
              <p>
                Description:{" "}
                <span className="details">{animal.description}</span>
              </p>
              <p>
                Last checkup:{" "}
                <span className="details">
                  {new Date(animal.checkup).toLocaleDateString()}
                </span>
              </p>

              {mode == "user" && animal.adopted == false && (
                <button onClick={() => handleAdopted(animal.id)}>Adopt</button>
              )}
              {mode == "admin" ? (
                <div>
                  <button onClick={() => edit(animal)}>Edit</button>
                  <button onClick={() => deleteAnimal(animal.id)}>
                    Delete
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default List;

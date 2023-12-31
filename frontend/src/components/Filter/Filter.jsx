import { useState } from "react";
import "./Filter.css";
/* eslint-disable react/prop-types */
function Filter({ adoptedFilter, speciesFilter }) {
  const [selectedAdopted, setSelectedAdopted] = useState(null);
  const [selectedSpecies, setselectedSpecies] = useState(null);

  const handleAdoptedFilterChange = (e) => {
    if (e.target.name == "filterU") {
      setSelectedAdopted(false);
      adoptedFilter(false);
    } else {
      setSelectedAdopted(true);
      adoptedFilter(true);
    }
  };

  const handletypeFilterChange = (e) => {
    console.log(e.target.value);
    setselectedSpecies(e.target.value);
    speciesFilter(e.target.value);
  };

  const clearadoptedFilter = () => {
    setSelectedAdopted(null);
    adoptedFilter(null);
  };

  const clearFilterSpecies = () => {
    setselectedSpecies(null);
    speciesFilter(null);
  };
  return (
    <div>
      <div className="filter">
        <label className="filterItem">
          <input
            type="radio"
            name="filterA"
            value={true}
            checked={selectedAdopted == true}
            onChange={handleAdoptedFilterChange}
          />
          Adopted
        </label>
        <label className="filterItem">
          <input
            type="radio"
            name="filterU"
            value={false}
            checked={selectedAdopted == false}
            onChange={handleAdoptedFilterChange}
          />
          Unadopted
        </label>

        <button className="botun" onClick={clearadoptedFilter}>
          Clear Adopted Filter
        </button>
      </div>

      <div className="filter">
        <label className="filterItem">
          <input
            type="radio"
            name="filter"
            value="dog"
            checked={selectedSpecies === "dog"}
            onChange={handletypeFilterChange}
          />
          Dog
        </label>
        <label className="filterItem">
          <input
            type="radio"
            name="filter"
            value="cat"
            checked={selectedSpecies === "cat"}
            onChange={handletypeFilterChange}
          />
          Cat
        </label>
        <label className="filterItem">
          <input
            type="radio"
            name="filter"
            value="rabbit"
            checked={selectedSpecies === "rabbit"}
            onChange={handletypeFilterChange}
          />
          Rabbit
        </label>
        <label className="filterItem">
          <input
            type="radio"
            name="filter"
            value="parrot"
            checked={selectedSpecies === "parrot"}
            onChange={handletypeFilterChange}
          />
          Parrot
        </label>
        <button className="botun" onClick={clearFilterSpecies}>
          Clear Species Filter
        </button>
      </div>
    </div>
  );
}
export default Filter;

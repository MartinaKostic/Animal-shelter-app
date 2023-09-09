import { useState, useEffect } from "react";
import axios from "axios";
import ModeContext from "./ModeContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./AboutUs/AboutUs";
import List from "./List/List";
import Notices from "./Notices/Notices";
import Input from "./Input/Input";
import Donations from "./Donations/Donations";
import Navbar from "./Navbar/Navbar";
import Filter from "./Filter/Filter";

function MainComponent() {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [adoptedFilter, setadoptedFilter] = useState(null);
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [mode, setMode] = useState("user");

  //dohvati sve zivotinje
  useEffect(() => {
    refetchAnimals();
  }, []);

  function refetchAnimals() {
    axios.get("http://localhost:3003/animals").then((res) => {
      setAnimals(res.data);
      setFilteredAnimals(res.data);
    });
    resetFilters();
  }

  //filtriranje:
  useEffect(() => {
    if ((adoptedFilter || adoptedFilter === false) && speciesFilter) {
      let filteredAnimals = animals.filter(
        (animal) => animal.species == speciesFilter
      );

      filteredAnimals = filteredAnimals.filter(
        (animal) => animal.adopted == adoptedFilter
      );
      setFilteredAnimals(filteredAnimals);
      return;
    }

    if (adoptedFilter || adoptedFilter === false) {
      const filteredAnimals = animals.filter(
        (animal) => animal.adopted === adoptedFilter
      );
      setFilteredAnimals(filteredAnimals);
      return;
    }

    if (speciesFilter) {
      const filteredAnimals = animals.filter(
        (animal) => animal.species == speciesFilter
      );
      setFilteredAnimals(filteredAnimals);
      return;
    }
    setFilteredAnimals(animals);
  }, [adoptedFilter, speciesFilter]);

  function changeContext() {
    setMode(mode == "user" ? "admin" : "user");
  }

  function addAnimal(animal) {
    setAnimals((state) => [...state, animal]);
    setFilteredAnimals((state) => [...state, animal]);
    resetFilters();
  }

  function resetFilters() {
    setSpeciesFilter(null);
    setadoptedFilter(null);
  }

  return (
    <div>
      <ModeContext.Provider value={mode}>
        <Router>
          <div className="App">
            <Navbar changeContext={changeContext} />
            <div className="Content">
              <Routes>
                <Route exact path="/" element={<AboutUs />} />
                <Route
                  path="/list"
                  element={
                    <div>
                      <Filter
                        adoptedFilter={setadoptedFilter}
                        speciesFilter={setSpeciesFilter}
                      ></Filter>
                      <List
                        animals={filteredAnimals}
                        fetchNewData={refetchAnimals}
                      />
                    </div>
                  }
                />
                <Route path="/input" element={<Input add={addAnimal} />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/notices" element={<Notices />} />
              </Routes>
            </div>
          </div>
        </Router>
      </ModeContext.Provider>
    </div>
  );
}
export default MainComponent;

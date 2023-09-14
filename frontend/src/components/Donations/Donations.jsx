import { useState, useEffect } from "react";
import axios from "axios";
import "./Donations.css";
import ListofDonations from "./ListofDonations";
import { useContext } from "react";
import ModeContext from "../ModeContext";

function Donacije() {
  const mode = useContext(ModeContext);
  const [openForm, setOpenForm] = useState(false);
  const [donations, setDonations] = useState([]);
  const [form, setForm] = useState({
    type: "",
    amount: "",
    description: "",
  });

  const typeofDonations = ["food", "medicine", "toys", "veterinary expenses"];

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get("http://localhost:5000/donations")
      .then((res) => setDonations(res.data))
      .catch((err) => console.log(err.message));
  }

  const sendData = (e) => {
    console.log(form.amount);
    e.preventDefault();
    const send = {
      category: mode == "admin" ? "lookingfor" : "offering",
      type: form.type,
      description: form.description,
      value: Number(form.amount),
    };
    axios.post("http://localhost:5000/donations", send).then(() => {
      fetchData();
    });
    setOpenForm(false);
    setForm({});
  };

  function inputChange(event) {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  }

  return (
    <div>
      <button className="addmargin" onClick={() => setOpenForm(true)}>
        New Donation
      </button>
      {openForm ? (
        <div>
          <form className="form" onSubmit={sendData}>
            <div>
              <label>
                Type:
                <select
                  name="type"
                  value={form.type}
                  onChange={inputChange}
                  required
                >
                  <option value="">--Select the type of donation--</option>
                  {typeofDonations.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  defaultValue={form.amount}
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
            <div className="formDonationButtons">
              <button onClick={() => setOpenForm(false)}>Cancel</button>
              <button type="submit">Add!</button>
            </div>
          </form>
        </div>
      ) : null}
      <ListofDonations
        donations={donations}
        refetch={fetchData}
      ></ListofDonations>
    </div>
  );
}
export default Donacije;

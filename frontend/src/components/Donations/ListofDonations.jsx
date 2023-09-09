/* eslint-disable react/prop-types */
import "./Donations.css";
import { useContext } from "react";
import ModeContext from "../ModeContext";
import axios from "axios";

function ListofDonations({ donations, refetch }) {
  const mode = useContext(ModeContext);

  const handleDonated = async (id) => {
    await axios.patch(`http://localhost:3003/donations/${id}`, {
      category: "donated",
    });
    refetch();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3003/donations/${id}`);
    refetch();
  };

  const handleRepeat = async (id) => {
    await axios.patch(`http://localhost:3003/donations/${id}`, {
      category: "trazi",
    });
    refetch();
  };

  return (
    <div>
      <div>
        <h3 className="title">Looking for</h3>
        {donations.length &&
          donations
            .filter((d) => d.category == "lookingfor")
            .map((donation) => (
              <div key={donation.id} className="donation">
                <p>
                  Type: <span className="details">{donation.type}</span>
                </p>
                <p>
                  Amount: <span className="detalji">{donation.value}</span>
                </p>
                <p>
                  Description:{" "}
                  <span className="detalji">{donation.description}</span>
                </p>
                {mode == "admin" ? (
                  <div>
                    <button
                      className="add"
                      onClick={() => handleDonated(donation.id)}
                    >
                      Donirano
                    </button>
                    <button
                      className="add"
                      onClick={() => handleDelete(donation.id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : (
                  <div>
                    <button
                      className="add"
                      onClick={() => handleDonated(donation.id)}
                    >
                      Donate
                    </button>
                  </div>
                )}
              </div>
            ))}
      </div>
      <div>
        <h3 className="title">Is offered</h3>
        {donations.length &&
          donations
            .filter((d) => d.category == "offering")
            .map((donation) => (
              <div key={donation.id} className="donation">
                <p>
                  Type: <span className="details">{donation.type}</span>
                </p>
                <p>
                  Amount: <span className="details">{donation.amount}</span>
                </p>
                <p>
                  Description:{" "}
                  <span className="details">{donation.description}</span>
                </p>
                {mode == "admin" ? (
                  <div>
                    <button
                      className="add"
                      onClick={() => handleDonated(donation.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="add"
                      onClick={() => handleDelete(donation.id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
      </div>
      <div>
        <h3 className="title">Donated</h3>
        {donations.length &&
          donations
            .filter((d) => d.category == "donated")
            .map((donation) => (
              <div key={donation.id} className="donation">
                <p>
                  Type: <span className="details">{donation.tip}</span>
                </p>
                <p>
                  Amount: <span className="details">{donation.vrijednost}</span>
                </p>
                <p>
                  Description: <span className="details">{donation.opis}</span>
                </p>
                {mode == "admin" ? (
                  <div>
                    <button
                      className="add"
                      onClick={() => handleRepeat(donation.id)}
                    >
                      Repeat request
                    </button>
                    <button
                      className="add"
                      onClick={() => handleDelete(donation.id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
      </div>
    </div>
  );
}
export default ListofDonations;

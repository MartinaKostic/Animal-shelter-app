/* eslint-disable react/prop-types */
import "./Donations.css";
import { useContext } from "react";
import ModeContext from "../ModeContext";
import axios from "axios";

function ListofDonations({ donations, refetch }) {
  const mode = useContext(ModeContext);

  const handleDonated = async (id) => {
    await axios.patch(`http://localhost:5000/donations/${id}`, {
      donation_category: 1,
    });
    refetch();
  };

  const handleRepeat = async (id) => {
    await axios.patch(`http://localhost:5000/donations/${id}`, {
      donation_category: 3,
    });
    refetch();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/donations/${id}`);
    refetch();
  };

  console.log(donations);
  return (
    <div>
      <div>
        <h3 className="title">Looking for</h3>
        {donations.length &&
          donations
            .filter((d) => d.donation_category.name == "lookingfor")
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
                      Donated
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
            .filter((d) => d.donation_category.name == "offering")
            .map((donation) => (
              <div key={donation.id} className="donation">
                <p>
                  Type: <span className="details">{donation.type}</span>
                </p>
                <p>
                  Amount: <span className="details">{donation.value}</span>
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
            .filter((d) => d.donation_category.name == "donated")
            .map((donation) => (
              <div key={donation.id} className="donation">
                <p>
                  Type: <span className="details">{donation.type}</span>
                </p>
                <p>
                  Amount: <span className="details">{donation.value}</span>
                </p>
                <p>
                  Description:{" "}
                  <span className="details">{donation.description}</span>
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

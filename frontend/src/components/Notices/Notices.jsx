import "./Notices.css";
import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import axios from "axios";
import { useContext } from "react";
import ModeContext from "../ModeContext";

function Notices() {
  const mode = useContext(ModeContext);
  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    text: "",
    important: false,
    date: new Date(),
  });
  const [isImportant, setIsImportant] = useState(false);
  const [notice, setNotice] = useState([]);

  function onChange(e) {
    setIsImportant((prev) => !prev);
    setForm({ ...form, [e.target.name]: e.target.checked });
  }

  useEffect(() => {
    refetchNotice();
  }, []);

  function refetchNotice() {
    axios.get("http://localhost:3003/notices").then((res) => {
      sortItems(res.data);
    });
  }

  async function deleteNotice(noticeId) {
    await axios.delete(`http://localhost:3003/notices/${noticeId}`);
    refetchNotice();
  }

  const sortItems = (notices) => {
    const sortedItems = notices.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    console.log(sortedItems);
    setNotice(sortedItems);
  };

  const sendData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3003/notices", form).then(() => {
      refetchNotice();
      setOpenForm(false);
      setForm({
        naslov: "",
        tekst: "",
        vazno: false,
        date: new Date(),
      });
    });
  };

  function inputChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <div className="section">
      <h2>Add a new notice!</h2>
      <button onClick={() => setOpenForm(true)}>New Notice</button>

      {openForm ? (
        <form className="forma" onSubmit={sendData}>
          <div>
            <label>
              Title:
              <input
                className="input"
                type="text"
                name="title"
                placeholder="Add title"
                value={form.title}
                onChange={inputChange}
                required
              ></input>
            </label>
          </div>
          <div>
            <label>
              <span style={{ display: "block" }}>Text:</span>
              <textarea
                className="input"
                type="text"
                name="text"
                value={form.text}
                onChange={inputChange}
                required
              ></textarea>
            </label>
          </div>
          {mode == "admin" ? (
            <label className="checkbox">
              Important:
              <input
                type="checkbox"
                name="important"
                checked={isImportant}
                onChange={onChange}
              ></input>
            </label>
          ) : null}

          <button className="add" type="submit">
            Post!
          </button>
        </form>
      ) : null}

      <div className="notices">
        {notice.map((notice) => (
          <div key={notice.id} className="notice">
            {notice.vazno ? <p className="important">IMPORTANT!</p> : null}
            <div className="title">
              <h2>{notice.title}</h2>
              <h3>date: {new Date(notice.date).toLocaleDateString("en-GB")}</h3>
            </div>
            <p>{notice.text}</p>
            {mode == "admin" ? (
              <button
                className="delete_bottun"
                onClick={() => deleteNotice(notice.id)}
              >
                <RiDeleteBinLine></RiDeleteBinLine>
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notices;

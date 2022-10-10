import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPopUp from "../components/AddPopUp";
import UpdatePopUp from "../components/UpdatePopUp";
import DeletePopUp from "../components/DeletePopUp";
import SearchBar from "../components/SearchBar";
import PayToggle from "../components/PayToggle";

export default function Index() {
  //setting state variables
  const [artistData, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setUpdate] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [artistEntry, setEntry] = useState("");

  //Request to grab all rows of data in the database
  const fetchDefault = async () => {
    try {
      const res = await axios.get("/api/roster");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //Request to add a new artist in the db based on user form input
  const createArtist = async (event) => {
    event.preventDefault();
    handleShow(show);
    try {
      if (event.target[0].value.trim() !== "") {
        const res = await axios.post("/api/roster", {
          artist: event.target[0].value.trim(),
          rate: event.target[1].value,
          streams: event.target[2].value,
          isPaid: false,
        });
      }
      await fetchDefault();
    } catch (err) {
      console.log(err);
    }
  };

  //Request to search for an artist in the db
  //Right now, you can refresh the screen by searching with a blank value
  //or you could do a full refresh. Implement button when there is time.
  const searchArtist = async (event) => {
    event.preventDefault();
    try {
      if (event.target[0].value.trim() === "") {
        await fetchDefault();
      } else {
        const res = await axios.get("/api/roster/:id", {
          params: { name: event.target[0].value.trim() },
        });
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //Request to update/edit the rate for an artist in the db
  const updateRate = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.put(`/api/roster/rate/${artistEntry._id}`, {
        rate: event.target[0].value,
      });
      setEntry("");
      handleUpdate();
      await fetchDefault();
    } catch (err) {
      console.log(err);
    }
  };

  //Request to delete an artist from the db
  const deleteArtist = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.delete(`api/roster/${artistEntry._id}`);
      setEntry("");
      handleDelete();
      await fetchDefault();
    } catch (err) {
      console.log(err);
    }
  };

  //Request to update the isPaid attribute for the artist in the db
  const updatePaid = async (paidStatus, id) => {
    try {
      axios.put(`/api/roster/paid/${id}`, {
        isPaid: paidStatus,
      });
      await fetchDefault();
    } catch (err) {
      console.log(err);
    }
  };

  //these are basic toggle functions to handle showing respective Modals
  const handleShow = () => {
    setShow(!show);
  };

  const handleUpdate = () => {
    setUpdate(!showUpdate);
  };

  const handleDelete = () => {
    setDelete(!showDelete);
  };

  //Initial call to fetch data
  useEffect(() => {
    fetchDefault();
  }, []);

  return (
    <section>
      <div>
        {artistData.map((artist) => (
          <Row key={artist._id}>
            <Col>
              <div>{artist.artist}</div>
            </Col>
            <Col>
              <div>{artist.rate}</div>
            </Col>
            <Col>
              <div>{artist.streams}</div>
            </Col>
            <Col>
              <div>{artist.owedAmount}</div>
            </Col>
            <Col>
              <PayToggle
                isPaid={artist.isPaid}
                toggleFunc={(newPaid) => {
                  updatePaid(newPaid, artist._id);
                }}
              />
            </Col>
            <Col>
              <Button
                onClick={() => {
                  handleUpdate();
                  setEntry(artist);
                }}
              >
                Update
              </Button>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  handleDelete();
                  setEntry(artist);
                }}
              >
                Delete
              </Button>
            </Col>
          </Row>
        ))}
      </div>
      <SearchBar searchFunc={searchArtist} resetFunc={fetchDefault} />
      <Button onClick={handleShow}>Add an artist</Button>
      <AddPopUp show={show} handler={handleShow} addFunc={createArtist} />
      <UpdatePopUp
        show={showUpdate}
        handler={handleUpdate}
        artist={artistEntry}
        onUpdate={updateRate}
      />
      <DeletePopUp
        show={showDelete}
        handler={handleDelete}
        artist={artistEntry}
        onDelete={deleteArtist}
      />
    </section>
  );
}

import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPopUp from "../components/AddPopUp";
import UpdatePopUp from "../components/UpdatePopUp";
import SearchBar from "../components/SearchBar";

export default function Index() {
  const [artistData, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setUpdate] = useState(false);
  const [artistEntry, setEntry] = useState("");

  //Request to grab all rows of data from the database
  const fetchDefault = async () => {
    const res = await axios.get("/api/roster");
    setData(res.data);
  };

  //Request to add a new artist in the db based on user form input
  const createArtist = async (event) => {
    event.preventDefault();
    handleShow(show);
    const res = await axios.post("/api/roster", {
      artist: event.target[0].value.trim(),
      rate: event.target[1].value,
      streams: event.target[2].value,
    });
    fetchDefault();
  };

  //Request to search for an artist in the db
  const searchArtist = async (event) => {
    event.preventDefault();
    console.log("searching... roger roger");
    if (event.target[0].value.trim() === "") {
      fetchDefault();
    } else {
      const res = await axios.get("/api/roster/:id", {
        params: { name: event.target[0].value.trim() },
      });
      setData(res.data);
    }
  };

  //Request to update the rate for an artist in the db
  const updateRate = async (event) => {
    event.preventDefault();
    const res = await axios.put("/api/roster/:id", {
      id: artistEntry._id,
      rate: event.target[0].value,
    });
    handleUpdate();
    setEntry("");
    fetchDefault();
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleUpdate = () => {
    setUpdate(!showUpdate);
  };

  //Initial call, and also used to refresh the page
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
              <div>{artist.streams * artist.rate}</div>
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
              <Button onClick={() => console.log("delete")}>Delete</Button>
            </Col>
          </Row>
        ))}
      </div>

      <SearchBar searchFunc={searchArtist} />
      <Button onClick={handleShow}>Add an artist</Button>
      <AddPopUp show={show} handler={handleShow} addFunc={createArtist} />
      <UpdatePopUp
        show={showUpdate}
        handler={handleUpdate}
        artist={artistEntry}
        onUpdate={updateRate}
      />
    </section>
  );
}

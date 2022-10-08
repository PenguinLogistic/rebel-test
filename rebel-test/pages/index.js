import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PopUp from "../components/PopUp";
import SearchBar from "../components/SearchBar";

export default function Index() {
  const [artistData, setData] = useState([]);
  const [show, setShow] = useState(false);

  //Request to grab all rows of data from the database
  const fetchDefault = async () => {
    const res = await axios.get("/api/roster");
    setData(res.data);
  };

  //Request to add a new artist based on user form input
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

  //Request to search for an artist
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

  const handleShow = () => {
    setShow(!show);
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
            <Col>{artist._id}</Col>
            <Col>{artist.artist}</Col>
            <Col>{artist.rate}</Col>
            <Col>{artist.streams}</Col>
            <Col>{artist.streams * artist.rate}</Col>
          </Row>
        ))}
      </div>
      <SearchBar searchFunc={searchArtist} />
      <Button onClick={handleShow}>Add an artist</Button>
      <PopUp show={show} handler={handleShow} addFunc={createArtist} />
    </section>
  );
}

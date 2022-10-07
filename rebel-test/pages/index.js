import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PopUp from "../components/PopUp";

export default function Index() {
  const [artistData, setData] = useState([]);
  const [show, setShow] = useState(false);

  //A request to grab all rows of data from the database
  const fetchDefault = async () => {
    const res = await axios.get("/api/roster");
    setData(res.data);
  };

  const createArtist = async (event) => {
    event.preventDefault();
    handleShow(show);
    const res = await axios.post("/api/roster/", {
      artist: event.target[0].value,
      rate: event.target[1].value,
      streams: event.target[2].value,
    });
    fetchDefault();
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
        {artistData.map((artist, Index) => (
          <Row key={Index}>
            <Col>{artist.artist}</Col>
            <Col>{artist.rate}</Col>
            <Col>{artist.streams}</Col>
            <Col>{artist.streams * artist.rate}</Col>
          </Row>
        ))}
      </div>
      <Button variant="primary" onClick={handleShow}>
        Add an artist
      </Button>
      <PopUp show={show} handler={handleShow} addFunc={createArtist} />
    </section>
  );
}

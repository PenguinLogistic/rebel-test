import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Index() {
  const [artistData, setData] = useState([]);

  const fetchDefault = async () => {
    const res = await axios.get("/api/roster");
    setData(res.data);
  };

  useEffect(() => {
    fetchDefault();
  }, []);

  return (
    <section>
      {artistData.map((artist, Index) => (
        <Row key={Index}>
          <Col>{artist.artist}</Col>
          <Col>{artist.rate}</Col>
          <Col>{artist.streams}</Col>
        </Row>
      ))}
    </section>
  );
}

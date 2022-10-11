import { useState, useEffect } from "react";
import { Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AddPopUp from "../components/AddPopUp";
import UpdatePopUp from "../components/UpdatePopUp";
import DeletePopUp from "../components/DeletePopUp";
import SearchBar from "../components/SearchBar";
import PayToggle from "../components/PayToggle";
import styles from "../scss/index.module.scss";

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
  //Only bug I can find is adding an artist that already exists with the same nam atm
  //need to make an alert for the responses.
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
    <section className={styles.main__card}>
      <div className={styles.inner__card} md="auto">
        <Row className={styles.header__wrapper}>
          <Col>
            <SearchBar searchFunc={searchArtist} resetFunc={fetchDefault} />
          </Col>
          <Col md="auto">
            <Button onClick={handleShow}>Add an artist</Button>
          </Col>
        </Row>
        <AddPopUp show={show} handler={handleShow} addFunc={createArtist} />
        <Table striped hover bordered className={styles.table__container}>
          <thead className={styles.tablehead__wrapper}>
            <tr className={styles.center__wrapper}>
              <th>Artist Name</th>
              <th>Rate</th>
              <th>Streams</th>
              <th>Payout</th>
              <th>Paid?</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {artistData.map((artist) => (
              <tr key={artist._id} className={styles.center__wrapper}>
                <td>{artist.artist}</td>
                <td>{artist.rate}</td>
                <td>{artist.streams.toLocaleString()}</td>
                <td>
                  {"$" +
                    artist.owedAmount.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                </td>
                <td>
                  <PayToggle
                    isPaid={artist.isPaid}
                    toggleFunc={(newPaid) => {
                      updatePaid(newPaid, artist._id);
                    }}
                  />
                </td>
                <td>
                  <Row>
                    <Col>
                      <Button
                        className={styles.update__wrapper}
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
                        className={styles.delete__wrapper}
                        onClick={() => {
                          handleDelete();
                          setEntry(artist);
                        }}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
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

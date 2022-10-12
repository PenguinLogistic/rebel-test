import { useState, useEffect } from "react";
import { Row, Col, Button, Table, Alert } from "react-bootstrap";
import Head from "next/head";
import axios from "axios";
import AddPopUp from "../components/AddPopUp";
import UpdatePopUp from "../components/UpdatePopUp";
import DeletePopUp from "../components/DeletePopUp";
import SearchBar from "../components/SearchBar";
import PayToggle from "../components/PayToggle";
import styles from "../scss/index.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Index() {
  //setting state variables
  const [artistData, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showUpdate, setUpdate] = useState(false);
  const [showDelete, setDelete] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const [artistEntry, setEntry] = useState("");
  const [variantType, setVariant] = useState("");
  const [alertMessage, setAlertMess] = useState("");

  //Request to grab all rows of data in the database
  const fetchDefault = async () => {
    try {
      const res = await axios.get("/api/roster");
      setData(res.data);
    } catch (err) {
      setAlert(true);
      setAlertMess("There was an error trying to GET ALL artists");
      setVariant("danger");
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
        setAlert(true);
        setAlertMess("An artist was created.");
        setVariant("success");
      }
      await fetchDefault();
    } catch (err) {
      setAlert(true);
      if (err.response.data.code === 11000) {
        setAlertMess("This artist already exists.");
      } else {
        setAlertMess("There was an error trying to CREATE an artist.");
      }
      setVariant("danger");
    }
  };

  //Request to search for an artist in the db
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
      setAlert(true);
      setAlertMess("There was an error trying to FIND an artist.");
      setVariant("danger");
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
      setAlert(true);
      setAlertMess("An artist was updated.");
      setVariant("success");
      await fetchDefault();
    } catch (err) {
      setAlert(true);
      setAlertMess("There was an error trying to UPDATE an artist's Rate");
      setVariant("danger");
    }
  };

  //Request to delete an artist from the db
  const deleteArtist = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.delete(`api/roster/${artistEntry._id}`);
      setEntry("");
      setAlert(true);
      setAlertMess("An artist was deleted.");
      setVariant("success");
      handleDelete();
      await fetchDefault();
    } catch (err) {
      setAlert(true);
      setAlertMess("There was an error trying to DELETE an artist");
      setVariant("danger");
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
      setAlert(true);
      setAlertMess("There was an error trying to UPDATE an artist's pay");
      setVariant("danger");
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
    <>
      <Head>
        <title>Rebel Roster</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <section className={styles.main__card}>
        <Row className={styles.alert__wrapper}>
          {showAlert && (
            <Alert
              variant={variantType}
              onClose={() => setAlert(false)}
              dismissible
            >
              <Alert.Heading>{alertMessage}</Alert.Heading>
            </Alert>
          )}
        </Row>
        <Row className={styles.header__wrapper}>
          <Col>
            <SearchBar searchFunc={searchArtist} resetFunc={fetchDefault} />
          </Col>
          <Col md="auto">
            <Button onClick={handleShow}>Add an artist</Button>
          </Col>
        </Row>
        <div className={styles.inner__card} md="auto">
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
                          <i className="bi bi-pencil-fill" />
                        </Button>
                        <Button
                          variant="danger"
                          className={styles.delete__wrapper}
                          onClick={() => {
                            handleDelete();
                            setEntry(artist);
                          }}
                        >
                          <i className="bi bi-trash-fill" />
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
    </>
  );
}

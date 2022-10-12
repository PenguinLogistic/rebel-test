import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../scss/SearchBar.module.scss";

export default function SearchBar({ searchFunc, resetFunc }) {
  return (
    <Row>
      <Form as="form" onSubmit={searchFunc}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                id="rateInput"
                type="text"
                placeholder="Search by artist name"
              />
            </Col>
            <Col className={styles.header__wrapper__submit} md="auto">
              <Button type="submit">
                <i className="bi bi-search" />
              </Button>
            </Col>
            <Col className={styles.header__wrapper__submit} md="auto">
              <Button type="reset" onClick={resetFunc}>
                <i className="bi bi-arrow-clockwise" />
              </Button>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </Row>
  );
}

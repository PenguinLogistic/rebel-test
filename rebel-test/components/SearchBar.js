import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchBar({ searchFunc }) {
  return (
    <div>
      <Form as="form" onSubmit={searchFunc}>
        <Form.Group>
          <Form.Control type="text" placeholder="Search by artist name" />
        </Form.Group>
        <Button type="submit">Search</Button>
      </Form>
    </div>
  );
}

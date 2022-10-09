import { Form, Button } from "react-bootstrap";

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

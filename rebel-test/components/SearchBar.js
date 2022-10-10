import { Form, Button } from "react-bootstrap";

export default function SearchBar({ searchFunc, resetFunc }) {
  return (
    <div>
      <Form as="form" onSubmit={searchFunc}>
        <Form.Group>
          <Form.Control
            id="rateInput"
            type="text"
            placeholder="Search by artist name, or reset by searching nothing"
          />
        </Form.Group>
        <Button type="submit">Search</Button>
        <Button type="reset" onClick={resetFunc}>
          Reset
        </Button>
      </Form>
    </div>
  );
}

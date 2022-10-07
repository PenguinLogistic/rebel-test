import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default function InputForm({ label }) {
  return (
    <Form>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control type="text" autoFocus />
      </Form.Group>
    </Form>
  );
}

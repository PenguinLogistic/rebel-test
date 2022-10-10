import { Form } from "react-bootstrap";
export default function PayToggle({ isPaid, toggleFunc }) {
  return (
    <Form>
      <Form.Check
        type="switch"
        checked={isPaid}
        value={isPaid}
        onChange={() => toggleFunc(!isPaid)}
      />
    </Form>
  );
}

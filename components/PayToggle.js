import { Form } from "react-bootstrap";
import { useState } from "react";

export default function PayToggle({ isPaid, toggleFunc }) {
  const [stateValue, setState] = useState(isPaid);
  return (
    <Form>
      <Form.Check
        type="switch"
        checked={stateValue}
        value={stateValue}
        onChange={() => {
          setState(!stateValue);
          toggleFunc(!stateValue);
        }}
      />
    </Form>
  );
}

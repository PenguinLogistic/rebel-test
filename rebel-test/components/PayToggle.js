import { Form } from "react-bootstrap";
export default function PayToggle({ isPaid, toggleFunc }) {
  return (
    <Form>
      {/* since your form is up here, onSubmit won't work the way you think //
      Forms need buttons. but since theres no button contained in this
      components tree // when you press submit on a button outside this
      component, it won't capture anything. */}
      <Form.Check
        type="switch"
        checked={isPaid} // this should only be used for default values, it doesnt track changes
        value={isPaid}
        onChange={() => toggleFunc(!isPaid)} //so this onChange event won't change your isPaid prop that you passed in. That prop should be used for read only purposes
        // so if you want to change an artists value, you have to use a state variable
        // but becareful when thinking about this logic.
        // because rn you have two diverging ways of handling updating an artist
        // you gotta focus on one way. Either the checkbox is clicked and it makes a call to your backend
        // OR you have a state variable that tracks each artist isPaid, and then pressing update triggers the BE call
      />
    </Form>
  );
}

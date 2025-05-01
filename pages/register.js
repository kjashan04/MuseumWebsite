
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Alert, Card } from "react-bootstrap";
import { registerUser } from "@/lib/authenticate";

export default function Register() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [warning, setWarning] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      setWarning("Passwords do not match.");
      return;
    }

    const success = await registerUser(userName, password, password2);
    if (success) {
      router.push("/login");
    } else {
      setWarning("Failed to register. Username may already exist.");
    }
  }

  return (
    <Card className="mt-5">
      <Card.Body>
        <h2>Register</h2>
        <p>Register for an account:</p>
        {warning && <Alert variant="danger">{warning}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>User Name:</Form.Label>
            <Form.Control
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Register</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

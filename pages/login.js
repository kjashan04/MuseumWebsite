
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Alert, Card } from "react-bootstrap";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites, getHistory } from "@/lib/userData";
import { useAtom } from "jotai";
import { favouritesAtom, searchHistoryAtom } from "@/store";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(null);
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  async function updateAtoms() {
    setFavouritesList(await getFavourites());
    setSearchHistory(await getHistory());
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await authenticateUser(userName, password);
    if (success) {
      await updateAtoms();
      router.push("/favourites");
    } else {
      setWarning("Invalid login credentials.");
    }
  }

  return (
    <Card className="mt-5">
      <Card.Body>
        <h2>Login</h2>
        <p>Enter your login credentials:</p>
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
          <Button type="submit">Login</Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

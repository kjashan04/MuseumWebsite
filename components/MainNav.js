import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container, NavbarCollapse } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "@/store";
import { addToHistory } from '../lib/userData';
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const token = readToken();
  const [searchField, setSearchField] = useState("");
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let userName = "";
  if (token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    userName = decodedToken.userName;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchField.trim() !== "") {
      let queryString = `title=true&q=${searchField}`;
      setSearchHistory(await addToHistory(`title=true&q=${searchField}`)); 
      router.push(`/artwork?${queryString}`);
      setIsExpanded(false);
    }
  };
  
  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }
  
    return (
        <>
        <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-dark">
          <Container>
            <Navbar.Brand>Jashanpreet Kaur</Navbar.Brand>

            <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} aria-controls="basic-navbar-nav"/>

              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                {token && (
                  <>
                  <Link href="/" passHref legacyBehavior>
                  <Nav.Link onClick={() => setIsExpanded(false)}>Home</Nav.Link>
                  </Link>
                  
                  <Link href="/search" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>Advanced Search</Nav.Link>
                  </Link>
                  </>
                )}
                </Nav>

            &nbsp
            {token ? (
              <>
            <Form className="d-flex" onSubmit={handleSubmit}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              />
              <Button variant="outline-light" type="submit">Search</Button>
            </Form>
            &nbsp

            <Nav>
              <NavDropdown title="User Name" id="basic-nav-dropdown" align="end">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)}>Favourites</NavDropdown.Item>
                </Link>

                <Link href="/history" passHref legacyBehavior>
                  <NavDropdown.Item onClick={() => setIsExpanded(false)}>Search History</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            </>
            ) : (
              <Nav>
                <Link href="/register" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/register"} onClick={() => setExpanded(false)}>
                Register</Nav.Link>
                </Link>
                <Link href="/login" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/login"} onClick={() => setExpanded(false)}>
                Login</Nav.Link>
                </Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <br />
        <br />
        </>
    );
  }
  
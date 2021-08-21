import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogInLink from "./LogInLink";
import LogOutLink from "./LogOutLink";
import authServices from "../../store/services/authServices";
import { useState } from 'react'

const Navbarpage = () => {

  const [username, setUsername] = useState();

  const onClick = () => {
    const user = (authServices()===undefined)?(''):(authServices().username);
    console.log(user)
    setUsername(user)
  }

  console.log(username)

  return (
    <div className="container" onClick={onClick}>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Home
            </Nav.Link>
            <NavDropdown title="Covid Cases">
              <NavDropdown.Item as={Link} to="/confirm">
                Confirmed
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/death">
                Deaths
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Vacination">
              <NavDropdown.Item as={Link} to="/vacination">
                Vacination
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/vacinationMap">
                Maps
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/recovery" style={{ color: "white" }}>
              Recovery
            </Nav.Link>
            {(username===undefined)?(''):(
              <NavDropdown title={`Stories by ${username.toUpperCase()}`}>
              <NavDropdown.Item as={Link} to={`/posts/${username}/newPost`}>
                New Posts
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/myPosts"}>
                My Posts
              </NavDropdown.Item>
            </NavDropdown>
            )}

            
          </Nav>

          <Nav>
            {authServices().username === undefined ? (
              <LogOutLink />
            ) : (
              <LogInLink />
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navbarpage;

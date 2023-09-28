import React from 'react';
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
/**
 * Returns a JSX element representing a navigation bar.
 * @returns {JSX.Element} The JSX element representing the navigation bar.
 */
function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Upload/Display</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link href="/">Home/Display</Nav.Link>
            <Nav.Link href='upload'>Upload</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
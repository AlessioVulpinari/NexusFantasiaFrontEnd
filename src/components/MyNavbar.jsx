import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"

const MyNavbar = () => {
  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand>NexusFantasia</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link>Classi</Nav.Link>
          <Nav.Link>Razze</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MyNavbar

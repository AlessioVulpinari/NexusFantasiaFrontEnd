import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { NavLink } from "react-router-dom"

const MyNavbar = () => {
  return (
    <Navbar bg='dark' data-bs-theme='dark'>
      <Container>
        <NavLink to={"/"} className='navbar-brand'>
          NexusFantasia
        </NavLink>
        <Nav className='me-auto'>
          <NavLink to='/classes' className={"nav-link"}>
            Classi
          </NavLink>
          <NavLink to='/races' className={"nav-link"}>
            Razze
          </NavLink>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default MyNavbar

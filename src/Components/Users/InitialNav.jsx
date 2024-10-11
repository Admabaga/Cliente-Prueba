import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

function InitialNav({setShowMain}) {
    const changeMain = (value)=> {
        setShowMain(value);
    }
  return (
    <section className='Nav'>
      <Navbar >
        <Container>
         <Nav.Link onClick={()=>changeMain("register")}>Registro</Nav.Link>
        </Container>
      </Navbar>
      <Navbar >
        <Container>
            <Nav.Link onClick={()=>changeMain("login")}>Inicio sesion</Nav.Link>
        </Container>
      </Navbar>
    </section>
  );
}

export default InitialNav;
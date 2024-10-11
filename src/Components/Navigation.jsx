import Accordion from 'react-bootstrap/Accordion'
import Nav from 'react-bootstrap/Nav'

export default function Navigation({setShowMain}) {

  return (
    <section className='Nav'>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Proyectos</Accordion.Header>
        <Accordion.Body>
            <Nav.Link onClick={()=>setShowMain("createProject")}>Crear</Nav.Link>
            <Nav.Link onClick={()=>setShowMain("updateProject")}>Actualizar</Nav.Link>
            <Nav.Link onClick={()=>setShowMain("getProject")}>Ver</Nav.Link>
            <Nav.Link onClick={()=>setShowMain("deleteProject")}>Eliminar</Nav.Link>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Tareas</Accordion.Header>
        <Accordion.Body>
            <Nav.Link onClick={()=>setShowMain("createTask")}>Crear</Nav.Link>
            <Nav.Link onClick={()=>setShowMain("updateTask")}>Actualizar</Nav.Link>
            <Nav.Link onClick={()=>setShowMain("getTask")}>Ver</Nav.Link>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </section>
  )
}

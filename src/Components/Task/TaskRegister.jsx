import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'

function RegisterTask() {
  const [taskName, setTaskName] = useState('')
  const [taskDescription, setTaskDescription] = useState('')
  const [user, setUser] = useState('')
  const [project, setProject] = useState('')
  const [respuestaError, setRespuestaError] = useState(false)
  const [respuesta, setRespuesta] = useState('')
  const [cargando, setCargando] = useState(false)
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [state, setState] = useState()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await axios.get('http://localhost:8080/users')
        setUsers(usersData.data);
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await axios.get('http://localhost:8080/projects')
        setProjects(projectsData.data);
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      }
    };

    fetchProjects();
  }, []);

  async function handleSubmit(event) {
  event.preventDefault()
  setCargando(true)
  try {
    const response = await axios.post(`http://localhost:8080/users/${user}/projects`, {
        taskName: taskName,
        taskDescription: taskDescription,
        taskState: state,
    });
    console.log('Datos enviados con éxito:', response.data);
    setRespuesta('Tarea guardada!');
    setRespuestaError(false)
  } catch (error) {
    console.error('Error al enviar datos:', error.response?.data || error.message)
    let exceptionMessage = '';
    if (error.response) {
      if (error.response.data && typeof error.response.data === 'object') {
        exceptionMessage = error.response.data.exceptionMessage || error.response.data.message || error.response.data.error || '';
      } else if (typeof error.response.data === 'string') {
        exceptionMessage = error.response.data.trim();
      }
    }
    setRespuesta(exceptionMessage || `Error al enviar datos: ${error.message}`)
    setRespuestaError(true)
  }finally{
    setCargando(false)
  }
}

  return (
    <>
    <section className='Formulario'>
    <FloatingLabel controlId="floatingSelect" label="Proyecto:" className='mb-3'>
          <Form.Select 
            value={project} 
            onChange={(project)=>setProject(project.target.value)} 
          >
            <option value="">Elije una opción</option>
            {projects.map((project) => (
              <option key={project.projectId} value={project.projectId}>
                {project.projectName}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Responsable de la tarea:">
          <Form.Select 
          className='mb-3'
          value={user}
          onChange={(user) => setUser(user.target.value)} >
            <option>Elije una opción</option>
            {users.map(user => (
            <option key={`${user.userId}-${user.userName}`} value={user.userId}>
                {user.userName}
            </option>
          ))}
          </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="Estado:">
          <Form.Select 
          className='mb-3'
          value={state}
          onChange={(state) => setState(state.target.value)} >
            <option>Elije una opción</option>
            <option value={"Pendiente"}>Pendiente</option>
            <option value={"En proceso"}>En proceso</option>
            <option value={"Finalizado"}>Finalizado</option>
          </Form.Select>
      </FloatingLabel>

      <Form.Floating >
        <Form.Control
          type="text"
          placeholder="name"
          value={taskName}
          onChange={(taskName)=>setTaskName(taskName.target.value)}
        />
        <label htmlFor="floatingInputCustom">Nombre:</label>
      </Form.Floating>

      <Form.Group  controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripcion:</Form.Label>
        <Form.Control as="textarea" rows={3}
        value={taskDescription}
        onChange={(taskDescription)=>setTaskDescription(taskDescription.target.value)} />
      </Form.Group>
        <br />
      <Button variant="outline-secondary" onClick={handleSubmit}>Guardar tarea</Button>{' '}
      {cargando ? (
            <div className="spinner-container">
                <Spinner animation="border" size="lg" />
            </div>
            ):(<>
      {respuesta && (
          <p className={`respuestaServer ${respuestaError ? 'error' : 'success'}`}>
            {respuesta}
          </p>
        )}</>
      )}
      </section>
    </>
  )
}

export default RegisterTask;
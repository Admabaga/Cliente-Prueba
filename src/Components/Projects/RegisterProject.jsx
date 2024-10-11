import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useState, useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'

function RegisterProject() {
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [user, setUser] = useState('')
  const [respuestaError, setRespuestaError] = useState(false)
  const [respuesta, setRespuesta] = useState('')
  const [cargando, setCargando] = useState(false)
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await axios.get('http://localhost:8080/users')
        setUsers(usersData.data);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
      }
    };

    fetchUsers();
  }, []);

  async function handleSubmit(event) {
  event.preventDefault()
  setCargando(true)
  try {
    const response = await axios.post(`http://localhost:8080/users/${user}/projects`, {
        projectName: projectName,
        projectDescription: projectDescription,
        startDate: initialDate,
        endDate: finalDate
    });
    console.log('Datos enviados con éxito:', response.data);
    setRespuesta('Proyecto guardado!');
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
      <Form.Floating >
        <Form.Control
          type="text"
          placeholder="name"
          value={projectName}
          onChange={(projectName)=>setProjectName(projectName.target.value)}
        />
        <label htmlFor="floatingInputCustom">Nombre:</label>
      </Form.Floating>

      <FloatingLabel controlId="floatingSelect" label="Responsable del proyecto:">
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

      <Form.Floating >
        <Form.Control
          id="floatingInputCustom"
          type="date"
          placeholder="dd/mm/yyyy"
          value={initialDate}
          onChange={(initialDate)=>setInitialDate(initialDate.target.value)}
        />
        <label htmlFor="floatingInputCustom">Fecha de inicio:</label>
      </Form.Floating>

      <Form.Floating >
        <Form.Control
          id="floatingInputCustom"
          type="date"
          placeholder="dd/mm/yyyy"
          value={finalDate}
          onChange={(finalDate)=>setFinalDate(finalDate.target.value)}
        />
        <label htmlFor="floatingInputCustom">Fecha de finalizacion:</label>
      </Form.Floating>

      <Form.Group  controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripcion:</Form.Label>
        <Form.Control as="textarea" rows={3}
        value={projectDescription}
        onChange={(projectDescription)=>setProjectDescription(projectDescription.target.value)} />
      </Form.Group>
        <br />
      <Button variant="outline-secondary" onClick={handleSubmit}>Guardar proyecto</Button>{' '}
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

export default RegisterProject;
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { useState } from 'react'
import { Spinner } from 'react-bootstrap'
import axios from 'axios'

function RegisterForm() {
  const [id, setid] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userRol, setUserRol] = useState('')
  const [password, setPassword] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [respuestaError, setRespuestaError] = useState(false)
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(event) {
  event.preventDefault()
  setCargando(true)
  try {
    const response = await axios.post('http://localhost:8080/users', {
      userId: id,
      userName: userName,
      userEmail: userEmail,
      userRol: userRol,
      userPassword: password
    });
    console.log('Datos enviados con éxito:', response.data);
    setRespuesta('Registro éxitoso!');
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
    <section className='formulario'>
      <Form.Floating >
        <Form.Control
          type="number"
          placeholder="12345"
          value={id}
          onChange={(id)=>setid(id.target.value)}
        />
        <label htmlFor="floatingInputCustom">Numero identificacion:</label>
      </Form.Floating>

      <Form.Floating >
        <Form.Control
          type="text"
          placeholder="name"
          value={userName}
          onChange={(userName)=>setUserName(userName.target.value)}
        />
        <label htmlFor="floatingInputCustom">Nombres:</label>
      </Form.Floating>

      <Form.Floating >
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={userEmail}
          onChange={(userEmail)=>setUserEmail(userEmail.target.value)}
        />
        <label htmlFor="floatingInputCustom">Correo electronico:</label>
      </Form.Floating>

      <FloatingLabel controlId="floatingSelect" label="Rol:">
          <Form.Select 
          className='mb-3'
          value={userRol}
          onChange={(rol) => setUserRol(rol.target.value)} >
          <option>Elije una opción</option>
          <option value={"USER"}>Usuario</option>
          <option value={"ADMIN"}>Administrador</option>
          </Form.Select>
      </FloatingLabel>

      <Form.Floating>
        <Form.Control
          type="password"
          placeholder="Password:"
          value={password}
          onChange={(userPassword)=>setPassword(userPassword.target.value)}
        />
        <label htmlFor="floatingPasswordCustom">Contraseña:</label>
      </Form.Floating>
      <Button variant="outline-secondary" onClick={handleSubmit}>Registrarse</Button>{' '}
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

export default RegisterForm;
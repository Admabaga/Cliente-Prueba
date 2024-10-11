import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Spinner } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [respuestaError, setRespuestaError] = useState(false)
  const [cargando, setCargando] = useState(false)

  async function handleSubmit(event) {
  event.preventDefault()
  setCargando(true)
  try {
    const response = await axios.post('http://localhost:8080/users/logins', {
      userEmail: email,
      userPassword: password
    })
    console.log('Datos enviados con éxito:', response.data)
    setRespuestaError(false)
    localStorage.setItem('jwtToken', response.data.jwt)
    window.location.href= '/home'
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
          type="email"
          placeholder="name"
          value={email}
          onChange={(email)=>setEmail(email.target.value)}
        />
        <label htmlFor="floatingInputCustom">Correo electronico:</label>
      </Form.Floating>

      <Form.Floating >
        <Form.Control
          type="password"
          value={password}
          onChange={(password)=>setPassword(password.target.value)}
        />
        <label htmlFor="floatingInputCustom">Contraseña:</label>
      </Form.Floating>

      <Button variant="outline-secondary" onClick={handleSubmit}>Iniciar sesion</Button>{' '}
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

export default Login;
/*
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
  const [projects, setProjects] = useState([])
  const [project, setProject] = useState()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await axios.get('http://localhost:8080/users');
        setUsers(usersData.data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await axios.get('http://localhost:8080/projects');
        setUsers(projectsData.data);
      } catch (error) {
        console.error('Error al cargar proyectos:', error);
      }
    };

    fetchProjects();
  }, []);

  async function handleSubmit(event) {
  event.preventDefault()
  setCargando(true)
  try {
    const response = await axios.post(`http://localhost:8080/users/${user}/projects/${project}`, {
        projectName: projectName,
        projectDescription: projectDescription,
        startDate: initialDate,
        endDate: finalDate
    });
    console.log('Datos enviados con éxito:', response.data);
    setRespuesta('Poyecto guardado!');
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
    <FloatingLabel controlId="floatingSelect" label="Proyecto a actualizar:">
          <Form.Select 
          className='mb-3'
          value={project}
          onChange={(project) => setProject(project.target.value)} >
            <option>Elije una opción</option>
            {projects.map(project => (
            <option key={`${project.projectId}-${project.projectName}`} value={project.projectId}>
                {project.projectId}
            </option>
          ))}
          </Form.Select>
      </FloatingLabel>

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
          <option value={1036662509}>Adrian Barrera</option>
          <option value={"ADMIN"}>Administrador</option>
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
      <Button variant="outline-secondary" onClick={handleSubmit}>Actualizar proyecto</Button>{' '}
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

export default RegisterProject;*/

import React, { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel, Spinner } from 'react-bootstrap';
import axios from 'axios';

function RegisterProject() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [user, setUser] = useState('');
  const [respuestaError, setRespuestaError] = useState(false);
  const [respuesta, setRespuesta] = useState('');
  const [cargando, setCargando] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await axios.get('http://localhost:8080/users')
        setUsers(usersData.data)
      } catch (error) {
        console.error('Error al cargar usuarios:', error)
      }
    };
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await axios.get('http://localhost:8080/projects')
        setProjects(projectsData.data)
      } catch (error) {
        console.error('Error al cargar proyectos:', error)
      }
    }
    fetchProjects()
  }, [])

  const fetchProjectDetails = async (projectId) => {
    try {
      const projectData = await axios.get(`http://localhost:8080/projects/${projectId}`)
      return projectData.data
    } catch (error) {
      console.error('Error al cargar detalles del proyecto:', error)
      return null;
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setCargando(true);

    try {
      const selectedProjectId = projects.find(project => project.projectId === project)?.projectId
      const projectDetails = await fetchProjectDetails(selectedProjectId);
      
      if (projectDetails) {
        setSelectedProject(projectDetails);
        setProjectName(projectDetails.name || '');
        setProjectDescription(projectDetails.description || '');
        setInitialDate(projectDetails.startDate || '');
        setFinalDate(projectDetails.endDate || '');
      }

      const response = await axios.post(`http://localhost:8080/users/${user}/projects`, {
        projectName: projectName,
        projectDescription: projectDescription,
        startDate: initialDate,
        endDate: finalDate
      });

      console.log('Datos enviados con éxito:', response.data);
      setRespuesta('Proyecto guardado!');
      setRespuestaError(false);
    } catch (error) {
      console.error('Error al enviar datos:', error.response?.data || error.message);
      let exceptionMessage = '';
      if (error.response) {
        if (error.response.data && typeof error.response.data === 'object') {
          exceptionMessage = error.response.data.exceptionMessage || error.response.data.message || error.response.data.error || '';
        } else if (typeof error.response.data === 'string') {
          exceptionMessage = error.response.data.trim();
        }
      }
      setRespuesta(exceptionMessage || `Error al enviar datos: ${error.message}`);
      setRespuestaError(true);
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      <FloatingLabel controlId="floatingSelect" label="Proyecto a actualizar:" className='mb-3'>
        <Form.Select value={selectedProject} onChange={(event) => {
          setSelectedProject(event.target.value);
        }}>
          <option>Elije una opción</option>
          {users.map((project) => (
            <option key={`${project.userId}-${project.projectName}`} value={project.projectId}>
              {project.projectName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <section className='Formulario' style={{ display: selectedProject ? '' : 'none' }}>
        <Form.Floating>
          <Form.Control type="text" placeholder="Nombre" value={selectedProject.projectName || ''} readOnly />
          <label htmlFor="floatingInputCustom">Nombre:</label>
        </Form.Floating>
        
        <FloatingLabel controlId="floatingSelect" label="Responsable del proyecto:" className='mb-3'>
          <Form.Select value={selectedProject.userId || ''} readOnly>
            <option>{selectedProject.user}</option>
          </Form.Select>
        </FloatingLabel>
        
        <Form.Floating>
          <Form.Control id="floatingInputCustom" type="date" placeholder="dd/mm/yyyy" value={selectedProject.startDate || ''} readOnly />
          <label htmlFor="floatingInputCustom">Fecha de inicio:</label>
        </Form.Floating>
        
        <Form.Floating>
          <Form.Control id="floatingInputCustom" type="date" placeholder="dd/mm/yyyy" value={selectedProject.endDate || ''} readOnly />
          <label htmlFor="floatingInputCustom">Fecha de finalización:</label>
        </Form.Floating>
        
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control as="textarea" rows={3} value={selectedProject.projectDescription || ''} readOnly />
        </Form.Group>
      </section>

      <Button variant="outline-secondary" onClick={handleSubmit} disabled={cargando}>
        {cargando ? (
          <div className="spinner-container">
            <Spinner animation="border" size="sm" />
          </div>
        ) : (
          'Actualizar proyecto'
        )}
      </Button>

      {respuesta && (
        <p className={`respuestaServer ${respuestaError ? 'error' : 'success'}`}>
          {respuesta}
        </p>
      )}
    </>
  );
}

export default RegisterProject;


import { useState, useEffect } from "react";
import { Form, Button, FloatingLabel, Spinner } from 'react-bootstrap';

export default function DeleteProject(){
    const [selectedProject, setSelectedProject] = useState({});
    const [projects, setProjects] = useState([]);
    const [cargando, setCargando] = useState(false)
    const [respuestaError, setRespuestaError] = useState(false)
    const [respuesta, setRespuesta] = useState('')

    useEffect(() => {
        const fetchProjects = async () => {
          try {
            const projectsData = await axios.get('/projects');
            setProjects(projectsData.data);
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
          const response = await axios.delete(`http://localhost:8080/projects/${selectedProject}`, {
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
    return(
        <section className="Formulario">
        <FloatingLabel controlId="floatingSelect" label="Proyecto a eliminar:" className='mb-3'>
        <Form.Select 
          value={selectedProject} 
          onChange={(project) => setSelectedProject(project.target.value)}
        >
          <option value="">Elije una opción</option>
          {projects.map((project) => (
            <option key={project.projectId} value={project.projectId}>
              {project.projectName}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
       <Button variant="outline-secondary" onClick={handleSubmit}>Eliminar proyecto</Button>{' '}
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
    )
}
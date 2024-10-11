import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function GetProjects() {
    const [projects, setProjects] = useState([])
    const [cargando, setCargando] = useState(true)
    const [response, setResponse] = useState('')
    const [responseError, setResponseError] = useState(false)

    

    useEffect(() => {
        getPojects()
    }, [])

    const getPojects = async () => {
        setCargando(true);
        const token = localStorage.getItem('jwt')
        try {
            const request = await axios.get('http://localhost:8080/projects', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (Array.isArray(request.data)) {
                setProjects(request.data)
            } else {
                throw new Error('Datos inválidos')
            }
        } catch (error) {
            console.error('Error:', error);
            setResponse(`Error al obtener proyectos: ${error.request?.data || error.message}`)
            setResponseError(true)
        } finally {
            setCargando(false)
        }
    };

    const handleRefresh = () => {
        setProjects([])
        setResponse('')
        setResponseError(false)
        getPojects()
    };

    return (
        <div className="container mt-5">
            {cargando ? (
                <div className="spinner-container-list">
                    <Spinner animation="border" size="lg" />
                </div>
            ) : responseError ? (
                <div className="alert alert-danger">{response}</div>
            ) : (
                <>
                    <h2>Proyectos</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Fecha de inicio</th>
                                <th>Fecha finalización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{project.projectName}</td>
                                    <td>{project.projectDescription}</td>
                                    <td>{project.startDate}</td>
                                    <td>{project.endDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {!projects.length && <p>No se encontraron proyectos.</p>}
                </>
            )}
            {response && !responseError && (
                <p className="mt-3">Respuesta del servidor: {response}</p>
            )}
            <Button variant="outline-secondary" className="refrescar" onClick={handleRefresh}>
                Refrescar
            </Button>
        </div>
    )
}

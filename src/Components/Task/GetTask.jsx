import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function GetTask() {
    const [tasks, setTask] = useState([])
    const [cargando, setCargando] = useState(true)
    const [response, setResponse] = useState('')
    const [responseError, setResponseError] = useState(false)


    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = async () => {
        setCargando(true);
        const token = localStorage.getItem('jwt')
        try {
            const request = await axios.get('http://localhost:8080/projects/252/tasks', {
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
            setResponse(`Error al obtener tareas: ${error.request?.data || error.message}`)
            setResponseError(true)
        } finally {
            setCargando(false)
        }
    };

    const handleRefresh = () => {
        setTask([])
        setResponse('')
        setResponseError(false)
        getTasks()
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
                    <h2>Tareas</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{task.taskName}</td>
                                    <td>{task.taskDescription}</td>
                                    <td>{task.taskState}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {!projects.length && <p>No se encontraron tareas.</p>}
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

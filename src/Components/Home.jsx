import { useState } from 'react'
import Navigation from './Navigation'
import RegisterProject from './Projects/RegisterProject'
import UpdateProject from './Projects/UpdateProject'
import GetProjects from './Projects/GetProjects'
import DeleteProject from './Projects/DeleteProject'
import TaskRegister from './Task/TaskRegister'
import GetTask from './Task/GetTask'
import UpdateTask from './Task/UpdateTask'

export default function Home(){
    const [showMain, setShowMain] = useState()

    return(
        <section className='Main'>
            <Navigation setShowMain={setShowMain}></Navigation>
            <section className='Formulario'>
                {showMain === "createProject" && <RegisterProject/>}
                {showMain === "updateProject" && <UpdateProject/>}
                {showMain === "getProject" && <GetProjects/>}
                {showMain === "deleteProject" && <DeleteProject/>}
                {showMain === "createTask" && <TaskRegister/>}
                {showMain === "updateTask" && <UpdateTask/>}
                {showMain === "getTask" && <GetTask/>}
            </section>
        </section>
    )
}
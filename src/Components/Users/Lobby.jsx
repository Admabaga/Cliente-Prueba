import { useState } from 'react'
import InitialNav from './InitialNav'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function Lobby(){
    const [showMain, setShowMain] = useState()

    return(
        <>
        <section className='Main'>
            <InitialNav setShowMain={setShowMain}></InitialNav>
            <section className='Formulario'>
                {showMain === "login" && <LoginForm/>}
                {showMain === "register" && <RegisterForm/>}
            </section>
            
        </section>
        </>
    )
}
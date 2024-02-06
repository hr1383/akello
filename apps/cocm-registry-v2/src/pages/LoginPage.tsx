import {SignInForm} from '@akello/react'
import { useNavigate } from 'react-router'


const LoginPage = () => {
    const navigate = useNavigate()
        
    return (
        <>
            <SignInForm onSuccess={(token: string) => {                    
                    navigate('/')
                }} onFail={(err: string) => {
                    console.log(err)                    
                }} onSignupClick={() => navigate('/signup') }/>
        </>
    )
}

export default LoginPage
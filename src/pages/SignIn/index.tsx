import './styles.css';
import Header from '../../components/Header';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

function SignIn() {
    const navigate = useNavigate();
    const { handleGetToken, handleAddToken } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try{
            if(!username || !password) {
                throw new Error ('Username e Senha são obrigatórios');
            }
            const response = await api.post('/api/v1/authentication/token/', {
                username,
                password
            });
            const { accessToken } = response.data;
            handleAddToken(accessToken);
            navigate('/main');

        }catch(error){
            console.log(error);
        }
    }

    //useEffect(()=>{
    //    const token = handleGetToken();
    //    if(token) {
    //        navigate('/main');
    //        return
    //    }
    //},[]);

    return(
        <div className='container'>
            <Header text='Bem Vindo'/>
            <div className='sign-in'>
                <form onSubmit={handleSubmit}>
                    <span>Usuário ou Email</span>
                    <input type='text' placeholder='example@example.com' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                    <span>Senha</span>
                    <input type='password' placeholder='●●●●●●●●' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <button className='btn-green'>Log in</button>
                    <span>
                        Esqueceu sua senha?
                        <Link to='ROTADEALTERARSENHA'/>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
import './styles.css';
import Header from '../../components/Header';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

function SignUp() {
    const navigate = useNavigate();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try{
            if(!first_name || !last_name || !username || !email || !password) {
                throw new Error ('Todos os dados são obrigatórios');
            }
            const response = await api.post('/api/v1/customers/', {
                email,
                first_name,
                last_name,
                password,
                username
            });
            navigate('/login');
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className='container'>
            <Header text='Criar Conta'/>
            <div className='sign-up'>
                <form onSubmit={handleSubmit}>
                    <span>Nome</span>
                    <input type='text' placeholder='Paulo' value={first_name} onChange={(e)=>setFirstName(e.target.value)} required/>
                    <span>Sobrenome</span>
                    <input type='text' placeholder='Silva' value={last_name} onChange={(e)=>setLastName(e.target.value)} required/>
                    <span>Nome de usuário</span>
                    <input type='text' placeholder='pauloSilva123' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                    <span>Email</span>
                    <input type='text' placeholder='example@example.com' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    <span>Senha</span>
                    <input type='password' placeholder='●●●●●●●●' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    <button className='btn-green'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
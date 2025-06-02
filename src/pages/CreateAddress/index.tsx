import './styles.css';
import Header from '../../components/Header';
import api from '../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

function CreateAddress() {
    const navigate = useNavigate();
    const {handleGetToken} = useAuth()
    const [customer_id, setCustomerId] = useState<number | null>(null)
    const [neighborhood, setNeighborhood] = useState('');
    const [number, setNumber] = useState('');
    const [street_address, setStreetAddress] = useState('');
    const [zip_code, setZipCode] = useState('');
    const [complement, setComplement] = useState('');

    const access = handleGetToken();

    useEffect(()=> {
        async function fetchCustomer() {
            try{
                const response = await api.get('/api/v1/customers/', {
                    headers: {
                        Authorization: `Bearer ${access}`,
                    }
                });
                if (response.data && response.data.length > 0) {
                    setCustomerId(response.data[0].id);
                }else{
                    throw new Error ('Usuário não encontrado');
                }
            }catch (error){
                console.error('Erro ao buscar cliente', error);
            }
        }
        fetchCustomer()
    }, [access]);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try{
            if(!neighborhood || !number || !street_address || !zip_code || !complement) {
                throw new Error ('Todos os dados são obrigatórios');
            }
            const parsedNumber = parseInt(number, 10);
            if (isNaN(parsedNumber) || parsedNumber <= 0) {
                throw new Error('O número deve ser um inteiro positivo');
            }
            const response = await api.post('/api/v1/address/', {
                customer_id,
                neighborhood,
                number: parsedNumber,
                street_address,
                zip_code,
                complement
            }, {
                headers: {Authorization: `Bearer ${access}`}
            });
            navigate('/Main');
        }catch(error){
            console.log(error);
        }
    }

    return(
        <div className='container'>
            <Header text='Cadastrar Endereço'/>
            <div className='address'>
                <form onSubmit={handleSubmit}>
                    <span>CEP</span>
                    <input type='text' placeholder='00000-000' value={zip_code} onChange={(e)=>setZipCode(e.target.value)} required/>
                    <span>Endereço</span>
                    <input type='text' placeholder='Rua...' value={street_address} onChange={(e)=>setStreetAddress(e.target.value)} required/>
                    <span>Numero</span>
                    <input type='text' placeholder='125' value={number} onChange={(e)=>setNumber(e.target.value)} required/>
                    <span>Bairro</span>
                    <input type='text' placeholder='' value={neighborhood} onChange={(e)=>setNeighborhood(e.target.value)} required/>
                    <span>Complemento</span>
                    <input type='text' placeholder='apt...' value={complement} onChange={(e)=>setComplement(e.target.value)} required/>
                    <button className='btn-green'>Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default CreateAddress;
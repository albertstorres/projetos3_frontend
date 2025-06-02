import api from './api';
import { useState } from 'react';

async function FetchCustomer(access: string) {
    const [customer_id, setCustomerId] = useState<number | null>(null)
            
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
    return customer_id;
}

export default FetchCustomer;
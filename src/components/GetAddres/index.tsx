import './styles.css';
import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import Logo from '../../assets/GetAddressIcon/getAddress.svg';

type AddressProps = {
    id: string;
    street_address: string;
    number: number;
    neighborhood: string;
    zip_code: string;
    complement?: string;
}

type Props = {
    customer_id: number;
    value: string;
    onChange: (id: string) => void;
}

function GetAddress({ customer_id, value, onChange }: Props) {
    const { handleGetToken } = useAuth();
    const [address, setAddress] = useState<AddressProps[]>([]);
    const access = handleGetToken();

    useEffect(() => {
        async function fetchAddress() {
            try {
                const response = await api.get('/api/v1/address/', {
                    headers: { Authorization: `Bearer ${access}` },
                });
                setAddress(response.data || []);
            } catch (error) {
                console.error('Erro ao buscar os endereços', error);
            }
        }

        if (customer_id) fetchAddress();
    }, [customer_id, access]);

    return (
        <div className='get-address'>
            <img src={Logo} alt='logo' className='get-address-logo' />
            <div className='text-container'>
                <label htmlFor="address" className="label">Qual o Endereço?</label>
                <select
                    id='address'
                    className='select'
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value=''>Selecione</option>
                    {address.map((addr) => (
                        <option key={addr.id} value={addr.id}>
                            {addr.street_address}, {addr.number} - {addr.neighborhood}
                            {addr.complement ? ` (${addr.complement})` : ''}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default GetAddress;
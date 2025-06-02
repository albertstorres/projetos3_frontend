import './styles.css';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';

type HeaderProps = {
    text: string;
};

type BalanceProps = {
    balance: number;
};

type UserProps = {
    first_name: string;
    last_name: string;
    email: string;
};

function getBalance(token: string): Promise<BalanceProps> {
    return api.get('/api/v1/balance/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(response => response.data);
}

function getUser(token: string): Promise<UserProps[]> {
    return api.get('/api/v1/customers/', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then(response => response.data);
}

function HeaderMain({ text }: HeaderProps) {
    const { handleGetToken } = useAuth();
    const token = handleGetToken();

    const [balance, setBalance] = useState<number | null>(null);
    const [loadingBalance, setLoadingBalance] = useState(true);

    const [userName, setUserName] = useState<string | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        if (token) {
            getBalance(token)
                .then(data => setBalance(data.balance))
                .catch(err => console.error('Erro ao buscar saldo:', err))
                .finally(() => setLoadingBalance(false));

            getUser(token)
                .then(data => {
                    if (data.length > 0 && data[0].first_name) {
                        setUserName(data[0].first_name);
                    }
                })
                .catch(err => console.error('Erro ao buscar usuário:', err))
                .finally(() => setLoadingUser(false));
        }
    }, [token]);

    return (
        <header className='header'>
            <span className='saldo'>
                {loadingBalance
                    ? 'Carregando saldo...'
                    : balance !== null
                    ? `Brencoin: ₿RC ${(balance / 100).toFixed(2)}`
                    : 'Saldo indisponível'}
            </span>
            <span className='texto'>
                {loadingUser
                    ? 'Carregando saudação...'
                    : userName
                    ? `Olá ${userName}, que bom te ver de novo!`
                    : text
                }
            </span>
        </header>
    );
}

export default HeaderMain;
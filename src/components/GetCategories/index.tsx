import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import Logo from '../../assets/GetCategorieIcon/getCategorie.svg';

import './styles.css';

type CategoryProps = {
    id: number;
    description: string;
    price: number;
    bonus: number;
}

type Props = {
    value: number;
    onChange: (id: number) => void;
}

function GetCategorie({ value, onChange }: Props) {
    const { handleGetToken } = useAuth();
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const access = handleGetToken();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await api.get('/api/v1/categories', {
                    headers: { Authorization: `Bearer ${access}` },
                });
                setCategories(response.data || []);
            } catch (error) {
                console.error('Erro ao buscar categorias', error);
            }
        }
        fetchCategories();
    }, [access]);

    return (
        <div className="get-categorie">
            <img src={Logo} alt="logo" className="get-categorie-logo" />
            <div className="text-container">
                <label htmlFor="categorie" className="label">Qual Categoria?</label>
                <select
                    id="categorie"
                    className="select"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                >
                    <option value="">Selecione</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.description} - ₿RC {(cat.price / 100)} - {(cat.bonus / 100)}%
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default GetCategorie;
import './styles.css';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import GetAddress from '../../components/GetAddres';
import GetCategorie from '../../components/GetCategories';
import WeigthIcon from '../../assets/WeigthIcon/weigthIcon.svg';

function CreateCollect() {
  const { handleGetToken } = useAuth();
  const navigate = useNavigate();
  const access = handleGetToken();
  const [address_id, setAddressId] = useState('');
  const [categorie_id, setCategorieId] = useState<number>(0);
  const [customer_id, setCustomerId] = useState<number>(0);
  const [weight, setWeight] = useState('');

  useEffect(() => {
    async function fetchCustomer() {
      try {
        const response = await api.get('/api/v1/customers/', {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });
        if (response.data && response.data.length > 0) {
          setCustomerId(response.data[0].id);
        } else {
          throw new Error('Usuário não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar cliente', error);
      }
    }
    fetchCustomer();
  }, [access]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      if (!address_id || !categorie_id || !customer_id || !weight) {
        throw new Error('Todos os dados são obrigatórios');
      }
      const parsedWeight = parseInt(weight, 10);
      if (isNaN(parsedWeight) || parsedWeight <= 0) {
        throw new Error('O número deve ser positivo');
      }

      await api.post(
        '/api/v1/collects/',
        {
          address_id,
          categorie_id,
          customer_id,
          weight: parsedWeight,
        },
        {
          headers: { Authorization: `Bearer ${access}` },
        }
      );

      navigate('/Main');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <Header text="Cadastrar Solicitação de Coleta" />
      <form onSubmit={handleSubmit}>
        <div className="create-collect">
          <div className="create-collect-card-categorie">
            <GetCategorie value={categorie_id} onChange={setCategorieId} />
          </div>

          <div className="create-collect-card-address">
            <GetAddress
              customer_id={customer_id}
              value={address_id}
              onChange={setAddressId}
            />
          </div>

          <div className="create-collect-card-weight">
            <img src={WeigthIcon} alt="Peso" className="get-weight-logo" />
            <div className="text-container">
              <label htmlFor="weight" className="label">
                Qual o Peso?
              </label>
              <input
                id="weight"
                type="text"
                className="input-weight"
                placeholder="Digite Aqui"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
          </div>

          <button className="btn-green">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CreateCollect;
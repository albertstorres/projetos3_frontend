import './styles.css';
import HeaderMain from '../../components/HeaderMain';
import MainCard from '../../components/MainCard';
import Addres from '../../assets/MainIcons/address.svg';
import Balance from '../../assets/MainIcons/balance.svg';
import Collect from '../../assets/MainIcons/collect.svg';
import CollectTraking from '../../assets/MainIcons/collectTracking.svg';
import ExcludeCollect from '../../assets/MainIcons/excludeCollect.svg';
import Store from '../../assets/MainIcons/store.svg';
import { useNavigate } from 'react-router-dom';


function Main() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <HeaderMain text='Olá, que bom te Verde Novo'/>
      <div className='main'>
        <div className='main-card'>
            <MainCard card = {{icon: Collect, name: 'Cadastro Solicitação'}} 
              onClick={()=> navigate('/createCollect')}
            />
        </div>
        <div className='main-card'>
            <MainCard card = {{icon: CollectTraking, name: 'Acompanhar Solicitação'}} />
        </div>
        <div className='main-card'>
            <MainCard card = {{icon: Balance, name: 'Extrato'}} />
        </div>
        <div className='main-card'>
            <MainCard card = {{icon: ExcludeCollect, name: 'Excluir Solicitação'}} />
        </div>
        <div className='main-card'>
            <MainCard card = {{icon: Store, name: 'Loja'}} />
        </div>
        <div className='main-card'>
            <MainCard card = {{icon: Addres, name: 'Cadastro Endereço'}} 
              onClick={()=> navigate('/createAddress')}
            />
        </div>
      </div>  
    </div>
  );
}

export default Main;    
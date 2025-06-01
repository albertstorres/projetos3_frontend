import './styles.css';
import Logo from '../../assets/logo.svg';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    
    function goSignIn() {
        navigate('/login');
    }

    function goSignUp() {
        navigate('/signup');
    }

    return(
        <div className='container'>
            <div className='home'>
                <img src={Logo} alt='logo' className='home-logo'/>
                <span className='home-span'>Olá, que bom te Verde Novo!</span>
                <button className='btn-green' onClick={goSignIn}>Log in</button>
                <button className='btn-gray' onClick={goSignUp}>Cadastar</button>
            </div>
        </div>
    );
}

export default Home;
import './styles.css';

type HeaderProps = {
    text: string;
};

function Header({text}:HeaderProps) {
    return(
        <header className='header'>
            <span className='bem-vindo'>{text}</span>
        </header>
    );
}

export default Header;
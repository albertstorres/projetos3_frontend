import './styles.css';

type Props = {
    card: {
        icon: string;
        name: string;
    }
    onClick?:()=> void;
}

function MainCard({ card, onClick }:Props) {
    return(
        <div onClick={onClick}>
            <img src={card.icon} alt='icon' className='icon' />
            <h1>{card.name}</h1>
        </div>
    );
}

export default MainCard;
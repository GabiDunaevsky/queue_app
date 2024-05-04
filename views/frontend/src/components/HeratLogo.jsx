import heartLogo from '../assets/images/Logos/heartLogo.png';

export default function HeartLogo(props){
    return(
        <img src={heartLogo} alt="" width={props.width} height={props.height}/>
    )
}
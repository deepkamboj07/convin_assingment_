import classes from './button.module.css';
import { useSelector } from 'react-redux';
const PrimaryButton=({onClick,title,color})=>{
    const theme=useSelector(state=>state.theme.theme);
    let clss=classes.Button;
    if(theme==='light')
    {
        clss=clss+' '+classes.lightChange;
    }
    return(
        <button onClick={onClick} className={clss} style={{backgroundColor:color?color:''}}>
            {title}
        </button>
    )
}
export default PrimaryButton;
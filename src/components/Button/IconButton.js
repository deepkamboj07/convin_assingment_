import classes from './button.module.css';
import { useSelector } from 'react-redux';
const IconButton=({onClick,title,Icon,color})=>{
    const theme=useSelector(state=>state.theme.theme);
    let clss=classes.iButton;
    if(theme==='light')
    {
        clss=clss+' '+classes.lightChange;
    }
    return(
        <button onClick={onClick} className={clss} style={{backgroundColor:color?color:''}}>
            <span><Icon size={18} color={color?'black':''}/></span>{title}
        </button>
    )
}
export default IconButton;

import classes from './sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectAction } from '../../store/selectRedux';

const BucketItems=({title})=>{
    const dispatch=useDispatch();
    const select=useSelector(state=>state.select.select);
    let clas =classes.butn;
    if(select===title)
    {
        clas=clas+' '+classes.active;
    }

    const onCli=()=>{
        dispatch(selectAction.setSelect(title));
    }

    return(
        <button onClick={onCli} className={clas}>
            {title}
        </button>
    )
}

export default BucketItems;
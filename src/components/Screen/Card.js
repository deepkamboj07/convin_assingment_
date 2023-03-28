import classes from './screen.module.css';
import mp3 from '../../assets/mp3.png';
import mp4 from '../../assets/mp4.jpg';
import {FaEdit} from '@react-icons/all-files/fa/FaEdit'
import IconButton from '../Button/IconButton';
import { useDispatch } from 'react-redux';
import { deleteAction } from '../../store/selectedDelete';
import CardInput from './CardInput';
import { useState } from 'react';
import DisplayModel from './DisplayModel';
import { listAction } from '../../store/listRedux';
const Card=({name,url,edit,index,selected,title,selectIndex})=>{
    const check=new RegExp(/(?:((?:https|http):\/\/)|(?:\/)).+(?:.mp4)/gm);
    const dispatch=useDispatch();
    const [openEdit,setEditOpen]=useState(false);
    const [display, setDisplay]=useState(false);
    let img=mp3;
    if(check.test(url))
    {
        img=mp4;
    }
    const editHandler=()=>{
        setEditOpen(true);
    }

    const openDisplay=()=>{
        setDisplay(true);
        dispatch(listAction.addHistory({url,name}));
    }

    const onCheckChange=(event)=>{
        if(event.target.checked)
        {
            dispatch(deleteAction.setSelect({title:title,index}));
        }
        else
        {
            dispatch(deleteAction.removeSelect({title:title,index}));
        }
    }
    return(
        <div className={classes.card} title={name}>
            {edit && <IconButton title={edit} Icon={FaEdit} color='white' onClick={editHandler}/>}
            <div onClick={()=>{(!edit && !selected) && openDisplay()}} className={(edit || selected)?classes.cardView:''} style={{overflow:'hidden', display:'flex', flex:1,flexDirection:'column'}}>
                <div className={classes.img}>
                    <img src={img} alt='check'/>
                </div>
                <div className={classes.name}>
                    <h4>{name}</h4>
                </div>
            </div>
            {selected && <input type='checkbox' className={classes.check} value={index} onChange={onCheckChange}/>}

            {openEdit && <CardInput namee={name} urll={url} index={selectIndex} open={openEdit} setOpen={setEditOpen} edit={true} title={title} idedit={index}/>}
            {display && <DisplayModel open={display} setOpen={setDisplay} name={name} url={url}/>}
        </div>
    )
}

export default Card;
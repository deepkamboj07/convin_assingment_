import {Modal } from 'antd';
import { useState } from 'react';
import classes from './model.module.css';
import {toast} from 'react-toastify'
import { listAction } from '../../store/listRedux';
import { useSelector, useDispatch } from 'react-redux';
const TitleInputModel=({open,setOpen})=>{
    const lists=useSelector(state=> state.lists.lists);
    const dispatch=useDispatch();
    const [name,setName]=useState('');
    const nameHandler=(event)=>{
        setName(event.target.value);
    }
    const submit=()=>{
        if(name.length===0)
        {
            toast.warn('Title can not be empty');
            return;
        }
        let flag=true;
        lists.forEach(list=> {
            if(list.title===name.trim())
            {
                toast.error('Title already exist');
                flag=false;
                return;
            }
        });

        if(flag)
        {
            dispatch(listAction.addList(name.trim()));
            toast.success('Bucket Created');
            setName('');
            setOpen(false);
        }
    }
    return(
            <div className={classes.model}>
                <Modal
                title="Add Title"
                centered
                style={{zIndex:999999}}
                bodyStyle={{margin:'5px'}}
                open={open}
                onOk={submit}
                onCancel={() => setOpen(false)}
            >
                    <input value={name} className={classes.input} type='text' onChange={nameHandler}/>
                </Modal>
            </div>
    )
}

export default TitleInputModel;
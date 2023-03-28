import classes from './screen.module.css';
import {Modal } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { listAction } from '../../store/listRedux';
const CardInput=({open,setOpen,index,edit,namee,urll,title, idedit})=>{
    const [name,setName]=useState(edit?namee:'');
    const [url,setUrl]=useState(edit?urll:'');
    const [selectBucket, setSelectBucket]=useState(title);
    const dispatch=useDispatch();
    const nameHandler=(event)=>{
        setName(event.target.value);
    }
    const urlHandler=(event)=>{
        setUrl(event.target.value);
    }
    const lists=useSelector(state=>state.lists.lists);

    const dropdownHandler=(event)=>{
        setSelectBucket(event.target.value);
    }

    const renderDropDown=()=>{
        return(
            lists.map((list,indx)=>{
                return(
                    <option key={indx} value={list.title}>{list.title}</option>
                )
            })
        )
    }
    const submit=()=>{
        if(name.length===0)
        {
            toast.warn('enter the name of card');
            return;
        }
        if(url.length===0)
        {
            toast.warn('enter the url of mp3/mp4 content');
            return;
        }
        const check=new RegExp(/(?:((?:https|http):\/\/)|(?:\/)).+(?:.mp3|mp4)/gm);
        if(!check.test(url))
        {
            toast.warn('enter valid mp3/mp4 url');
            return;
        }

        dispatch(listAction.addContents({name:name.trim(),url:url.trim(),index}));
        setName('');
        setUrl('');
        toast.success('Card add sucessfully');
        setOpen(false);
    }

    const update=()=>{
        if(name.length===0)
        {
            toast.warn('enter the name of card');
            return;
        }
        if(url.length===0)
        {
            toast.warn('enter the url of mp3/mp4 content');
            return;
        }
        const check=new RegExp(/(?:((?:https|http):\/\/)|(?:\/)).+(?:.mp3|mp4)/gm);
        if(!check.test(url))
        {
            toast.warn('enter valid mp3/mp4 url');
            return;
        }

        if(title===selectBucket)
        {
            //content update
            dispatch(listAction.updateBucketContent({name:name.trim(),url:url.trim(),index,editIndex:idedit}))
            toast.success('Content Updated');
            setOpen(false);
        }
        else
        {
            //bucket update
            dispatch(listAction.updateBucket({name:name.trim(),url:url.trim(),index,editIndex:idedit,title:selectBucket}));
            toast.success('Bucket Changed');
            setOpen(false);
        }

    }
    return(
        <Modal
                title={edit?"Update Card Content":"Add Content Card"}
                centered
                style={{zIndex:999999}}
                bodyStyle={{margin:'5px'}}
                open={open}
                onOk={edit?update:submit}
                onCancel={() => setOpen(false)}
            >
             <div className={classes.form}>
                <div><label>Name</label><br/>
                <input  className={classes.input} type='text' onChange={nameHandler} value={name}/></div>
                <div><label>Mp3/Mp4 Link</label><br/>
                    <input  className={classes.input} type='url' onChange={urlHandler} value={url}/></div>
                {
                    edit &&
                   <div>
                    <label>Change Basket</label><br/>
                    <div className={classes.select}><select defaultValue={selectBucket} onChange={dropdownHandler}>
                            {renderDropDown()}
                        </select></div>
                   </div>
                }
             </div>
        </Modal>
    )
}

export default CardInput;
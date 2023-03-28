import classes from './sidebar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import PrimaryButton from '../Button/PrimaryButton';
import IconButton from '../Button/IconButton';
import { BiSun } from "@react-icons/all-files/bi/BiSun";
import {HiMoon} from "@react-icons/all-files/hi/HiMoon"
import {themAction} from '../../store/themeRedux'
import {MdCancel} from '@react-icons/all-files/md/MdCancel'
import TitleInputModel from '../Modle/TittleInputModel';
import { useState } from 'react';
import BucketItems from './BucketItems';
import { selectAction } from '../../store/selectRedux';

const Sidebar=({mobile, sideHandler, isSelect})=>{
    const theme=useSelector(state=>state.theme.theme);
    const [openInput,setOpenInput]=useState(false);
    let themeClss=(theme==='dark')?classes.dark_container:classes.light_container;
    if(mobile && mobile===true)
    {
        themeClss=themeClss+' '+classes.mobile;
    }
    const dispatch=useDispatch();
    const lists=useSelector(state=> state.lists.lists);

    const histoaryClick=()=>{
        dispatch(selectAction.setSelect('history'));
    }

    const changeTheme=()=>{
        if(theme==='light')
        {
            dispatch(themAction.applyDark());
        }
        else
        {
            dispatch(themAction.applyLight());
        }
    }

    const addListHandler=()=>{
        setOpenInput(!openInput);
    }


    return(
        <div className={themeClss}>
            {isSelect && <div className={classes.noSelect}></div>}
            {
                mobile===true &&
                <div className={classes.cross} onClick={sideHandler}>
                    <MdCancel size={24} color={theme==='light'?'black':'white'}/>
                </div>
            }
            <div className={classes.addList}>
                <PrimaryButton title='Add Bucket' onClick={addListHandler}/>
            </div>
            <div className={classes.ItemLists}>
                {
                    lists.length===0 && <p>No bucket present 😔</p>
                }
                {
                    lists.length >0 &&
                    lists.map((item,index)=>{
                        return(
                            <BucketItems key={index} title={item.title}/>
                        )
                    })
                }
            </div>
            <div className={classes.bottomOption}>
                <PrimaryButton title={'History'} onClick={()=>{histoaryClick()}}/>
                <IconButton onClick={changeTheme} Icon={(theme==='dark')?BiSun:HiMoon} title={(theme==='dark')?'Light Mode':'Dark Mode'}/>
            </div>

            {openInput && <TitleInputModel open={openInput} setOpen={setOpenInput}/>}
        </div>
    )
}
export default Sidebar;
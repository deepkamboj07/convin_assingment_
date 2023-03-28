import './mainLight.css';
import './mainDark.css';
import {useSelector} from 'react-redux'
import Sidebar from '../components/Sidebar/Sidebar';
import {AiOutlineMenu} from '@react-icons/all-files/ai/AiOutlineMenu'
import { useState } from 'react';
import Screen from '../components/Screen/Screen';
import Alert from '../components/Alert/Alert';
const Main=()=>{

    const theme=useSelector(state=>state.theme.theme);
    const themeClass=(theme==='dark')?'dark':'light';
    const [openside,setOpen]=useState(false);
    const [selected,setSelected]=useState(false);
    const sideHandler=()=>{
        setOpen(!openside);
    }
    return(
        <div className={themeClass}>
            <div className='menu_class' onClick={sideHandler}>
                <AiOutlineMenu size={24} color={theme==='dark'?'white':'black'}/>
            </div>
            {openside && <Sidebar mobile={true} sideHandler={sideHandler} isSelect={selected}/>}
            <Sidebar isSelect={selected}/>
            <div className='screen'>
                <Screen setSelect={setSelected}/>
            </div>
            <Alert/>
        </div>
    )
}

export default Main;
import classes from './screen.module.css';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../Button/PrimaryButton';
import { useState,useEffect } from 'react';
import CardInput from './CardInput';
import Card from './Card';
import {BiDotsVertical} from '@react-icons/all-files/bi/BiDotsVertical'
import {Dropdown} from 'antd';
import { deleteAction } from '../../store/selectedDelete';
import { listAction } from '../../store/listRedux';
import { toast } from 'react-toastify';
import HistoryItem from './HistoryItem';
const Screen=({setSelect})=>{
    const theme=useSelector(state=>state.theme.theme);
    const selected=useSelector(state=>state.select.select);
    const dispatch=useDispatch();
    const lists=useSelector(state=>state.lists.lists);
    const historyList=useSelector(state=>state.lists.history);

    const[contents, setContents]=useState([]);
    const[selectIndex,setIndex]=useState(-1);
    const[open,setOpen]=useState(false);
    const [selectAll,setSelectAll]=useState(false);
    const [edit,setEdit]=useState(false);

    const removeSelect=()=>{
        setSelectAll(false);
        dispatch(deleteAction.remove());
        setSelect(false);
    }
    const openSelect=()=>{
        setSelectAll(true);
        setEdit(false)
        setSelect(true);
    }

    const items = [
        {
          key: '1',
          label: (
            <span onClick={()=>{(selectAll)?removeSelect():openSelect()}}>{(selectAll)?'Cancel select':'Select all'}</span>
          ),
        },
        {
          key: '2',
          label: (
              <span onClick={()=>{setEdit(!edit); removeSelect()}}>{(edit)?'Cancel Edit':'Edit Cards'}</span>
          ),
        }
      ];

    useEffect(()=>{
        lists.forEach((list,index) => {
            if(list?.title===selected)
            {
                setContents(list?.contents);
                setIndex(index);
            }
        });
    },[selected,lists]);

    let themeClss=(theme==='dark')?classes.dark_container:classes.light_container;


    const inputHandler=()=>{
        setOpen(true);
    }

    const deleteList=useSelector(state=>state.delete.selectedItems);
    const deleteHandler=()=>{
        dispatch(listAction.deleteContents(deleteList));
        toast.success('Item deleted successfully')
        removeSelect();
    }

    return(
        <div className={themeClss}>
            {
                selected==='' &&
                <div className={classes.noItem}>
                    <p>Open Bucket to add content</p>
                </div>
            }
            {
                (selected!=='' && selected!=='history')&&
                (
                    <>
                        <div className={classes.addButton}>
                            <PrimaryButton title={selectAll?'Delete Selected':`Add Content in ${selected}`} onClick={(selectAll)?deleteHandler:inputHandler} color={selectAll?'#C70000':null}/>
                            {
                                contents.length>0 &&
                                <Dropdown
                                menu={{
                                items,
                                }}
                                placement="bottom"
                            >
                                <button className={classes.options}><BiDotsVertical size={24}/></button>
                            </Dropdown>
                            }
                        </div>
                        {
                            (contents.length===0)?(
                                <div className={classes.noItem}>
                                    <p>No Content in {selected}</p>
                                </div>
                            ):
                            (
                                <div className={classes.contentLists}>
                                   {
                                    contents.map((content,index)=>{
                                        return(
                                            <Card key={index} name={content.name} url={content.url} edit={edit} index={index} selected={selectAll} title={selected} selectIndex={selectIndex}/>
                                        )
                                    })
                                   }
                                </div>
                            )
                        }
                    </>
                )
            }

            {
                selected==='history' &&
                (
                    <>
                    <div className={classes.addButton}>
                        <h2 className={classes.heading}>History</h2>
                    </div>
                    <div className={classes.history}>
                        {
                            historyList.length===0?
                            (
                                <div className={classes.noItem}>
                                    <p>No Item Played Yet.</p>
                                </div>
                            ):
                            (
                                historyList.map((history,index)=>{
                                    return(
                                        <HistoryItem key={index} name={history.title} url={history.url} time={history.time}/>
                                    )
                                })
                            )
                        }
                    </div>
                    </>
                )
            }

            {open && <CardInput open={open} setOpen={setOpen} index={selectIndex}/>}
        </div>
    )
}
export default Screen;
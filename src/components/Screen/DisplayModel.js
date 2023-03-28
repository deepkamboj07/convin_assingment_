import { Modal } from "antd";
import classes from './screen.module.css';
const DisplayModel=({open,setOpen,name,url})=>{
    const check=new RegExp(/(?:((?:https|http):\/\/)|(?:\/)).+(?:.mp3)/gm);
    const isMp3=check.test(url);
    return(
        <Modal
        title={name}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
      {
        isMp3?
        <audio className={classes.audio} src={url} controls/>:
        <video className={classes.video} src={url} controls/>
      }

    
      </Modal>

    )
}

export default DisplayModel;
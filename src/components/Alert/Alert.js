import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
const Alert=()=>{
    const theme=useSelector(state=>state.theme.theme);
    return(
        <ToastContainer
                position="top-right"
                autoClose={3000}
                theme={theme}
            />
    )
}
export default Alert;
import classes from './screen.module.css';
const HistoryItem=({name,url,time})=>{
    return(
        <div className={classes.historyItem}>
            <div className={classes.detail}>
                <div>
                    <h3>{name}</h3>
                </div>
                <div>
                    <label>Url Played : </label>
                    <a href={url} target='_blank' rel="noopener noreferrer">{'url of '+name}</a>
                </div>
            </div>
            <div className={classes.time}>
                <label>{time}</label>
            </div>
        </div>
    )
}
export default HistoryItem;
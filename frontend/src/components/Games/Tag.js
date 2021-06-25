const Tag = (props) => {
    return ( 
        <p onClick={(e) => props.filterGamesEvent(props.genre)} className={props.classTag}>{props.genre}</p>
     );
}
 
export default Tag;
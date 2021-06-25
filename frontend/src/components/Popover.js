import React from 'react';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  popover: {
  },
  paper: {
    width:'240px',
    height:'auto',
    maxHeight:'350px',
    minHeight:'10rem',
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    justifyContent:'center',
    borderRadius:'15px',
    color:'#089f8a',
    backgroundColor:'#061320',
    margin:'-2rem -8rem'
  },
}));

export default function MouseOverPopover({favouritesList, props}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <p aria-owns={open ? 'mouse-over-popover' : undefined} aria-haspopup="true" onClick={handleClick}>
           <li className='popoverDropdown'>Wishlist</li>
      </p>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleClick}
      >
        {favouritesList.length 
        ? favouritesList.map(product => {
         if (product.gameId) {
          return  <NavLink key={product._id} to={`/game/${product.gameId._id}`}>
                      <div  className="divPopover">
                          <div className="commentProfileImg" style={{backgroundImage: `url('${product.gameId.imageBanner}')`}}/>
                          <p>{product.gameId.title}</p>
                      </div>
                  </NavLink>
         } else{
          return  <NavLink key={product._id} to={`/hardware`}>
                      <div  className="divPopover">
                          <div className="commentProfileImg" style={{backgroundImage: `url('${product.productId.imageBanner}')`}}/>
                          <p>{product.productId.productName}</p>
                      </div>
                  </NavLink>
         }
            
        })
        :<div className='divNoGamesInList'>
            <div className='NoGamesInList'>
            <p>You don't have any product added yet!</p>
            <NavLink to='/games'><span className='spanLink'>Go to Game Store!</span></NavLink>
            <NavLink to='/hardware'><span className='spanLink'>Go to Hardware Store!</span></NavLink>
            </div>
        </div> }
      </Popover>
    </div>
  );
}
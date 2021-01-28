import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips({nome, setAction}) {
  const classes = useStyles();

  const handleDelete = () => {
      setAction("delete")
  };

  const handleClick = () => {
     setAction("click")
  };

  return (
    <div className={classes.root}>
      
      <Chip  label={nome} onClick={handleClick} onDelete={handleDelete} color="primary" />
    
    </div>
  );
}

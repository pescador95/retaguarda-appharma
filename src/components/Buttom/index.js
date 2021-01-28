import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {CategoriaIcone} from './styled'

export default function AlertDialog({setEscolha}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("Clicou em não")
    setEscolha('não')
    setOpen(false);
  };

  const handleDelete = () => {
    console.log("Clicou em sim")
    setEscolha('sim')
    setOpen(false);
  };

  return (
    <div>
      <CategoriaIcone  onClick={handleClickOpen} src={"/assets/trash.png"} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Apagar categoria?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você tem certeza que deseja apagar a categoria? Todas as sub-categroias  também serão apagadas caso existam.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="primary">
            Sim
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

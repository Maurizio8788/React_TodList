import MomentUtils from '@date-io/moment'
import { Backdrop, Button, Fade, Grid, makeStyles, Modal, TextField, TextFieldProps } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState, useCallback } from 'react'
import SaveIcon from '@material-ui/icons/Save';
import { useForm } from 'react-hook-form'
import { IFormModel } from './FormModel.model'

const useStyle = makeStyles({
    paper: {
        backgroundColor: "#fff",
        border: '2px solid #000',
        boxShadow: "3px 3px 3px 1px #d1d1d1",
        padding: '20px',
      },
      button: {
        margin: '5px',
      },
      modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }
})



export const Form = React.forwardRef(( {todoItem, open, onCloseModal, onUpdate }:any, ref ) => {

    let classes = useStyle();

    const [selectedDate, setSelectedDate] = useState<Date>(
        new Date(todoItem.giorno),
    );

    /**
     * @type any
     * Reponse State
     */
    
    const [response, setResponse] = useState<any>(null);

    const {register, handleSubmit, setValue} = useForm<IFormModel>({mode:'onBlur'});
    const updateData = useCallback( async (dati:IFormModel) => {
      let data = {
        id:todoItem.id,
        titolo:dati.titolo,
        categoria:dati.categoria,
        giorno:dati.giorno,
        attivi:todoItem.attivi
    }
    let updateTask = await axios({
      method:"PUT",
      url:"http://localhost:94/api/TodoList/UpdateTask",
      data
    })

    onUpdate();
    setResponse(updateTask);
    }, [])
  
    useEffect(() => {
      
    }, [response]);

    
    
      ///Modale
    
      const close = () => {
          onCloseModal()
      }

      const handleDataChange = (data:any) => {
            setSelectedDate(data)
      }
      
      
 
    return (
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        ref={ref}
      >
        <Fade in={open}>
        <form  autoComplete="off" noValidate className={classes.paper} onSubmit={handleSubmit(updateData)}>
        <h2 id="transition-modal-title">MODIFICA DEL TASK</h2>
        <Grid container direction="column"  spacing={3}>
          <Grid item>
            <TextField 
                required
                inputRef={register}
                label="Task"
                name="titolo"
                defaultValue={todoItem.titolo} 
                />
          </Grid>
          <Grid item>
            <TextField 
                required 
                label="Categoria"
                inputRef={register}
                name="categoria"
                defaultValue={todoItem.categoria}
                />
          </Grid>
          <Grid item>    
            <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
            <KeyboardDatePicker
          margin="normal"
          inputRef={register}
          name="giorno"
          id="date-picker-dialog"
          label="Giorno"
          format="YYYY/MM/DD"
          value={selectedDate}
          onChange={handleDataChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }} />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              startIcon={<SaveIcon />}
              onClick={close}
              type='submit'
            >
              Save
            </Button>
          </Grid>
        </Grid> {/* Container Grid */}
      </form>
      </Fade>
    </Modal>

    )
})

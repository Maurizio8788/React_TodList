import React, { useCallback, useEffect, useState, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import imgLight from "../../assets/images/bg-desktop-light.jpg";
import imgDark from "../../assets/images/bg-desktop-dark.jpg";
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import AddIcon from '@material-ui/icons/Add';


import './Header.scss'
import { Backdrop, Button, createStyles, Fab, Icon, OutlinedInputProps, Theme } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import { useForm } from 'react-hook-form'
import { IFormModel } from '../TodoList/TodoListItem/Form/FormModel.model';
import axios from 'axios';
import { GetAllContext } from "../../shared/context/GetAll-todo-context";
import { useDebouncedCallback } from 'use-debounce/lib';
import useDarkMode from "use-dark-mode";


const useInputStyle = makeStyles( (theme:Theme) => 
createStyles({
    root:{
        backgroundColor:"white",
        borderRadius:'5px',
    }
}));

const InputCustom = (props:TextFieldProps) => {
    const classes = useInputStyle();
    return (
        <TextField InputProps={{classes, disableUnderline:false} as Partial<OutlinedInputProps>} {...props}/>
    )
}

let setImageBg:boolean=false;


function Header() {
    let classes = useStyles();

    const [open, setOpen] = useState(false);
    const {register, handleSubmit} = useForm<IFormModel>();
    const [response, setResponse] = useState<any>(null);
    const [searchText, setSearchText] = useState<string>();
    const getAllContext = useContext(GetAllContext);
    const [selectedDate, setSelectedDate] = React.useState<Date>(
        new Date(),
      );
    const darkMode = useDarkMode(false)

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
     setOpen(false);
    };

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    };

    const newTodoItem = useCallback(
     async (dati:IFormModel) => {

        const data = {
            titolo:dati.titolo,
            giorno:dati.giorno,
            categoria:dati.categoria,
            attivi:true
        }
            let newItem = await axios({ 
                method:"POST",
                url:'http://localhost:94/api/Todolist/AddNewTask',
                data
             });

             setResponse(newItem);
             getAllContext.getAll();
        },
        []
    )

    const handleSearch = useDebouncedCallback(
        async (e:string) => {

            if(e !== ""){

                const data = {
                    titolo:e
                }
                let search = await axios({
                    method:"POST",
                    url:"http://localhost:94/api/Todolist/SearchTask",
                    data
                })
                setSearchText(e);
                setResponse(search.statusText);
                getAllContext.tasks(search.data);

            }else{
                getAllContext.getAll();
            }
           
        },
        800
    )

    useEffect( () => {}, [response]);

    const IconModeToggle = () => { 
        if(darkMode.value == false) {
            setImageBg = false;
          return (
          <div className="header__icon" onClick={darkMode.enable}>
            <Brightness3Icon className={classes.icon}/>
          </div>
        )
        } else{
            setImageBg = true;
          return ( <div className="header__icon" onClick={darkMode.disable}>
            <Brightness5Icon className={classes.icon}/>
          </div>)
        };
    }
    return (
        <header className={classes.header}>
            <Container maxWidth="sm" className={classes.container}>
                <Grid container spacing={3} justify="center">
                    <Grid item xs={6} zeroMinWidth>
                        <h1 className="header__title">TODO</h1>
                    </Grid>
                    <Grid item xs={6} zeroMinWidth>
                       {IconModeToggle()}
                    </Grid>
                </Grid>
                <form autoComplete='off'> 
                <Grid container justify="space-between" spacing={1}>
                    <Grid item xs={11}>
                      <InputCustom  className={classes.input} name='titolo' onChange={ (e) => { handleSearch.callback(e.target.value) }} fullWidth label="Ricerca un task" variant="filled" />
                    </Grid>
                    <Grid item xs={1}>
                      <Fab color="primary" aria-label="add" onClick={handleOpen}>
                        <AddIcon />
                      </Fab>
                    </Grid>
                </Grid>
                </form>
            </Container>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                    <form autoComplete="off" className={classes.paper} onSubmit={handleSubmit(newTodoItem)}>
                        <h2>ADD NEW TASK</h2>
                        <Grid container direction="column" spacing={3}>
                            <Grid item>                               
                                <TextField inputRef={register} name="titolo" label="Task" />
                            </Grid>
                            <Grid item>                               
                                <TextField inputRef={register} name="categoria" label="categoria" />
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
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }} 
                                />
                            </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item>
                                <Button 
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    type="submit"
                                    onClick={handleClose}
                                    endIcon={ <Icon>send</Icon> }
                                >
                                    Invia
                                    </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Fade>
            </Modal>

        </header>
    )
}

console.log(setImageBg);

const imgBg = (setImageBg)?imgDark:imgLight;

const useStyles = makeStyles({
    header:{
        backgroundImage:`url(${ imgBg })`,
        backgroundPosition:"center center",
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        width: "100%",
        height: "300px",
        paddingTop:"3em"
    },
    container:{ height:'100%'},
    input:{
        backgroundColor:"#fff",
        borderRadius:'5px',
        width:"100%"
    },
    icon:{
        color:'#fff',
        fontSize:'2rem',
        transform:'scaleX(-1)'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        backgroundColor: "#fff",
        border: '2px solid #000',
        padding: "20px",
      },
});





export default Header


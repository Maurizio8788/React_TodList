import React, { Fragment, useEffect, useState } from 'react'
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ClearIcon from "@material-ui/icons/Clear";
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import CheckboxCustom from '../../../shared/Checkbox/CheckboxCustom';
import moment from 'moment';
import './TodoListItem.scss';
import axios from 'axios';
import { Form } from './Form/Form';
import { ITodoList } from '../../../shared/todolist.model';
import Draggable from 'react-draggable';



const useStyle = makeStyles({
    radio: {
      "&:hover": "transparent",
    },
    todolist:{
        transform:'translateY(-107px)',
        boxShadow: "5px 5px 20px #d1d1d1"
    },
    todoListItem:{
      backgroundColor:"#fff",
      borderBottom:"1px solid silver"
      
      
    }
  });

function TodoListItem(props:{todo:ITodoList, handler:any, update:any}) {
  
  const {todo} = props;
  const {handler, update}:any = props;
  
/**
 * @type any
 * Reponse State
 */
const [response, setResponse] = useState<any>(null);

/**
* 
* @type boolean
* Open /Close modal Toggle
*
*/
      
 const [open, setOpen] = useState<boolean>(false);

/**
 * @var classes 
 * @type function
 */

const classes= useStyle();
/**
 * @var data
 * @type Moment/Date
 */
const data = moment(todo.giorno).format("DD/MM/YY");


useEffect(() => {
     
      
}, [response]);

const deleteTask = async (id:number) => {
  const data = {
    id
  }

  let deleteRequest = await axios({
    method:'DELETE',
    url:'http://localhost:94/api/TodoList/DeleteTask',
    data
  });
  handler();
  setResponse(deleteRequest);
}

const handleClose = () => {
  setOpen(false);
};

const handleOpen = () => {
  setOpen(true);
};

const mouseDrag = (e:MouseEvent) => {
  console.log(e);
  
}

const ref = React.createRef();

    return (    
      <Fragment>
        <Draggable
                  axis="y"
                  handle=".handle"
                 >
            <div className="handle">
            <ListItem className={classes.todoListItem} >
                <ListItemAvatar>
                    <CheckboxCustom todo={todo} />
                </ListItemAvatar>
                <ListItemText primary={todo.titolo} secondary={data} />
                <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="modify" onClick={handleOpen}>
                    <CreateIcon />
                </IconButton>
                <IconButton onClick={() => deleteTask(todo.id) } edge="end" aria-label="delete">
                    <ClearIcon />
                </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            </div>
         </Draggable>
            <Form ref={ref} todoItem={todo} open={open} onCloseModal={handleClose} onUpdate={update} />
      </Fragment>
    )
}

export default TodoListItem

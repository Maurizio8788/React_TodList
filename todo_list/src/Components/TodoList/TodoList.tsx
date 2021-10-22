import React, { useCallback, useEffect, useState, useContext } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import './TodoList.scss';
import axios from "axios";
import TodoListItem from "./TodoListItem/TodoListItem";
import { GetAllContext } from "../../shared/context/GetAll-todo-context";
import { ITodoList } from "../../shared/todolist.model";



const useStyle = makeStyles({
  radio: {
    "&:hover": "transparent",
  },
  todolist:{
      transform:'translateY(-107px)',
      
  },
  todoListItem:{
    backgroundColor:"#fff"
  }
});


function TodoList() {

  const classes = useStyle();
  const  getAllContext = useContext(GetAllContext);
  const [response, setResponse] = useState<any>(null);

  const  deleteTask = () => {  getAllContext.getAll(); };
  const updateTask = () => { getAllContext.getAll(); }

  const filter =  useCallback( async (value:boolean) => {

    const data ={
      attivi:value
    }

    const filterActiveComplete = await axios({
      method:'POST',
      url:'http://localhost:94/api/TodoList/SearchTask',
      data
    });

    getAllContext.tasks(filterActiveComplete.data);
    setResponse(filterActiveComplete.statusText);
  }, [] );

  const deleteCompleted = useCallback(
    async () => {
      
      const deleteAllCompleted = await axios({
        method:"DELETE",
        url:"http://localhost:94/api/TodoList/DeleteCompleted"
      });

      console.log(deleteAllCompleted);
    
      setResponse(deleteAllCompleted.data);
      updateTask();

    }, []
  ); 

  useEffect( () => { getAllContext.getAll(); }, [] );
  useEffect(() => {}, [response]);

  const taskMap = getAllContext.task.map( (item:ITodoList ) => {
    return (
     
        <TodoListItem key={item.id} todo={item} handler={ deleteTask } update={ updateTask }/>
     
    )
  } );
 
  
  return (
    <Container maxWidth="sm">
            <List
            className={classes.todolist}
            >
                {taskMap}
                <ListItem className="todoList__nav">         
                        <p>5 mins left</p>
                        <div className="todoList__nav--controllers">
                            <p><a onClick={ () => { getAllContext.getAll() } }>All</a></p>
                            <p><a onClick={ () => { filter(true) } } >Active</a></p>
                            <p><a onClick={ () => { filter(false) } }>Completed</a></p>
                        </div>
                        <p><a onClick={ () => deleteCompleted() }>Clear Completed</a></p>
                </ListItem>
            </List>
      </Container>
  );
}


export default TodoList;

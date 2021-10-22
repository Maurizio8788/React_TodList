import axios from 'axios';
import React, { createContext, useCallback, useState } from 'react';
import { ITodoList } from '../todolist.model';

export const GetAllContext = createContext<any>({
    task:[],
    tasks: () =>{},
    getAll: () =>{}
});

const GetAllProvider = (props:any) => {

    const [ task, setTask] = useState([]);

    const handlerTask = (value:any) => {
        setTask(value)
        console.log(task);
        
    }

    const GetAll = useCallback( async () => {
        const todolist:any= await axios( 'http://localhost:94/api/TodoList/GetAll' );
         setTask(todolist.data);
      }, []);

    return (
        <GetAllContext.Provider value={{task, tasks:handlerTask, getAll:GetAll}}>
            {props.children}
        </GetAllContext.Provider>
    )
}

export default GetAllProvider


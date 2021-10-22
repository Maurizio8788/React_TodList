import React, { useCallback, useEffect, useState } from 'react'

import {makeStyles } from '@material-ui/core';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import axios from 'axios';
import { ITodoList } from '../todolist.model';




const styleCheck = makeStyles({
    root:{
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: "50%",
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(206,217,224,.5)',
      },
    },
    checkedIcon: {
      backgroundColor: '#137cbd',
      backgroundImage: 'linear-gradient(180deg,hsl(192, 100%, 67%), hsl(280, 87%, 65%))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
          "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
          " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
          "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#106ba3',
      },
    },
});

function CheckboxCustom( props:{todo:ITodoList} ) {

  const classes = styleCheck();
  
    const [completed, setCompleted] = useState<boolean>(false);
    const [response, setResponse] = useState<any>(null);
    const [checked, setChecked] = useState(props.todo.attivi);

    let activeTask = () => {
      setCompleted( c => !c );
      
      UpdateActiveTask(completed);

    }
    
    useEffect(() => {}, [response]);
    
    let UpdateActiveTask = useCallback( async (value:boolean) => {
   
     
      let data = {
        ...props.todo,
        id:props.todo.id,
        attivi:value
      }
      setChecked(value);

      let updateStatus = await axios({
         method:'PUT',
         url:'http://localhost:94/api/TodoList/UpdateTask', 
         data
      });

      setResponse(updateStatus);
    }, []);

    const iconClass = (props.todo.attivi) ? classes.icon : classes.checkedIcon;
    console.log(iconClass);
    
    return (

    <Checkbox
    disableRipple
    color="default"
    checked={checked === false}
    className={classes.root}
    checkedIcon={<span className={ clsx(  classes.icon, classes.checkedIcon ) }/>}
    icon={<span className={classes.icon} />}
    onChange={ () => activeTask() }
    {...props} />
    
    
    )
   
}

export default CheckboxCustom

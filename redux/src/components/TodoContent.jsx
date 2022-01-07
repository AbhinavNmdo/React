import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../redux/todoSlice'

const TodoContent = ({id, title}) => {
    const onClick = (e)=>{
        e.preventDefault();
        dispatch(deleteTodo({id:id}))
    }
    const dispatch = useDispatch();
    return (
        <div>
            <h3>{title}</h3>
            <button onClick={onClick} className="btn btn-danger">Delete</button>
        </div>
    )
}

export default TodoContent

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTodosAsync } from '../redux/todoSlice'
import TodoContent from './TodoContent'

const TodoItems = () => {
    const todos = useSelector((state) => state.todos)
    const dispatch = useDispatch()
    console.log(todos)
    useEffect(() => {
        dispatch(getTodosAsync())
    }, [dispatch])
    return (
        <>
            <div className="container bg-white">
                {todos.map((todo) => {
                    return (
                        <TodoContent id={todo.id} title={todo.firstname}/>
                    )
                })}
            </div>
        </>
    )
}

export default TodoItems

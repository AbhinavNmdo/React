import {configureStore} from '@reduxjs/toolkit';
import todoReducers from './todoSlice'

export default configureStore({
    reducer: {
        todos: todoReducers
    }
})
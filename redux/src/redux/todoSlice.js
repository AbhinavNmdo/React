import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getTodosAsync = createAsyncThunk(
    'todos/getTodsAsync', 
    async ()=>{
        const res = await fetch('https://deltainvesting.herokuapp.com/api/review');
        if(res.ok){
            const todos = await res.json();
            return {todos}
        }
    }
)

const todoSlice = createSlice({
    name: 'todo',
    initialState: [],
    reducers: {
        addTodos: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                complete: false
            };
            state.push(newTodo);
        },
        deleteTodo: (state, action) => {
            return state.filter((todo) => todo.id !== action.payload.id);
        }
    },
    extraReducers: {
        [getTodosAsync.fulfilled]: (state, action)=>{
            return action.payload.todos.review
        }
    }
});

export const { addTodos, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
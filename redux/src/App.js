import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodos } from './redux/todoSlice';
import TodoItems from './components/TodoItems';


function App() {
  const [value, setValue] = useState('');

  const handleOnChange = (e)=>{
    setValue({...value, [e.target.name]: e.target.value})
  };

  const dispatch = useDispatch();

  const handleOnSubmit = (e)=>{
    e.preventDefault();
    dispatch(
      addTodos({
        title: value
      })
    )
  };


  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <form onSubmit={handleOnSubmit} className="h-100 d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
          <input onChange={handleOnChange} type="text" name="title" className="form-control m-3 w-100" />
          <button type="submit" className="btn btn-primary m-3">Submit</button>
        </form>
        <TodoItems/>
      </div>
    </>
  );
}

export default App;

import './App.css';
import { useEffect, useState } from "react"
import image from './Vector.png'

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null ) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleChange(e){
    e.preventDefault()
    if(newItem === "") return;
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        {id:crypto.randomUUID(),title: newItem, completed: false}
      ]
    })
    setNewItem("")
  }

  function checkTodo(id,completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if(todo.id === id){
          return{...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodos(id){
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }



  return (
    <div className="whitebox">
      <div className='categories'>
        <ul>
          <li style={{color: "#EA5959"}}>All</li>
          <li>Groceries</li>
          <li>College</li>
          <li>Payments</li>
        </ul>
      </div>
      <div className='tasks'>
        <form className='form' onSubmit={handleChange}>
        <label className='h2'>All Tasks</label>
        <input
        value={newItem}
        onChange={e => {
          setNewItem(e.target.value)
        }}
        className='inpt'
        type='text' 
        placeholder='Add a new task insdie ‘All’ category'></input>
        </form>
        {todos.map(todo => {
        return(
          <div className='pr' key={todo.id}>
            <div style={{display:'flex', width:'410px'}}>
          <li key={todo.id} className='li'>
            <label>
              <input
               className='chbox'
               type='checkbox' 
               checked ={todo.completed}
               onChange={e => {checkTodo(todo.id, e.target.checked)}} />
              <h style={todo.completed?{textDecoration:"line-through"}:null}>{todo.title}</h>
            </label>
          </li>
          <div className='category'>{newItem === "" ? 'Uncategorized' : null}</div>
          </div>
          <div>
          <button onClick={() => deleteTodos(todo.id)} className='btn'>
            <img className='delete' src={image} />
          </button>
          </div>
          </div>
        )
      })}
      </div>
    </div>
  );
}

export default App;
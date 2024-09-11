import React, {useEffect, useRef, useState} from 'react'
import todo_icon from '../assets/todo_icon.png'
import TodoItems from '../Components/TodoItems'

const Todo = () => {

    const [todolist, setTodList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem('todos')):[])

    const inputref = useRef();

    const add = ()=>{
        const inputText = inputref.current.value.trim();
        if(inputText === ""){
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }

        setTodList((prev)=>[...prev,newTodo])
        inputref.current.value = "";
    }

    const deleteTodo = (id)=>{
        setTodList((prvTodos)=>{
            return prvTodos.filter(todo=>todo.id !== id)
        })
    }

    const toggle = (id)=>{
        setTodList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo,isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todolist))
    },[todolist])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

        {/* ---------------title------------- */}
        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <h1 className='text-3xl font-semibold'>To-Do List</h1>
        </div>

        {/* ---------------input box------------- */}

        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputref} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder::text-scale-600' type='text' placeholder='Add Task'/>
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>Add +</button>
        </div>

         {/* ---------------Todo-List------------- */}
         <div>
            {todolist.map((item,index)=>{
                return <TodoItems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle}/>
            })}
         </div>

    </div>
  )
}

export default Todo
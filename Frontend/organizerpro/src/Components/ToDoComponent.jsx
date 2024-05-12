import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/AuthService';
import styled from 'styled-components';
import { MdDelete } from "react-icons/md"
import { FaEdit } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { addToDo, deleteTodo, getAllTodos, getTodoById, toggleCompleted, updateTodo } from '../services/ToDoService';
import { Modal, Button, ListGroup } from 'react-bootstrap'
import { Alert } from 'react-bootstrap';

const ToDoComponent = ({ catid, catName }) => {

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [todoUpdate, setTodoUpdate] = useState({});
    const[showAlert,setShowAlert] = useState(false);
    

    useEffect(() => {
        getTodos()
    }, [catid])


    const getTodos = () => {
        getAllTodos(catid).then(response => {
            console.log(response.data);
            setTodos(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    function handelAddTodo() {
        if (!todo.trim()) {
            console.log('Todo description cannot be empty.');
            setShowAlert(true);
            return;
        }
        const toDo = { description: todo, completed: false, categoryId: catid };
        addToDo(toDo).then(response => {
            console.log(response.data);
            getTodos();
            setTodo('');
        }).catch(error => {
            console.log(error);
        })
    }

    function handelDelte(id) {
        deleteTodo(id).then(response => {
            console.log(response.data);
            getTodos();
        }).catch(error)
    }

    const openModal = (id) => {
        getTodoById(id).then(reponse => {
            console.log(reponse.data);
            setTodoUpdate({...reponse.data,categoryId:catid});
            
        }).catch(error => {
            console.log(error);
        })
        setShowModal(true);
        console.log("to update todo"+todoUpdate.description+ todoUpdate.completed+ todoUpdate.id + todoUpdate.categoryId);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const updateTheTodo = () => {
        updateTodo(todoUpdate.id,todoUpdate).then(response=>{
            console.log(response.data);
            getTodos();
            closeModal();
           
        }).catch(error=>{
            console.log(error);
        })      

    }

    const changeCompleted=(id)=>{
        toggleCompleted(id).then(response=>{
            console.log(response.data);
            console.log('toggled sucess');
            getTodos();
        }).catch(error=>{
            console.log(error)
        })
        
    }





    return (
        <ToDoStyled>
            <div className="todo-container">
                <h1 className='heading'>{catName}</h1>
                <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Todo description cannot be empty.
              </Alert>   

                <ul>
                    {todos.length <= 0 ? 'No todos, add something!' : 
                        todos.map(todo => {
                            return (
                                <li key={todo.id}>
                                    <div className="sub">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={todo.completed} onClick={()=>changeCompleted(todo.id)} />
                                        <span>{todo.description}</span>
                                    </div>
                                    <div className="items">
                                        <FaEdit className='editIcon' onClick={() => openModal(todo.id)} />
                                        <MdDelete className='deleteIcon' onClick={() => handelDelte(todo.id)} />
                                    </div>
                                </li>
                            )
                        })

                    }



                </ul>

                <div className="addtodo">
                    <div className="addbar">
                        <input type="text" placeholder='Add a Todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
                        <IoAddCircleSharp className='addIcon' onClick={handelAddTodo} />
                    </div>
                </div>


            </div>


            {/* Modal */}
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <textarea
                    className="description-input"
                        type="text"
                        value={todoUpdate.description}
                        onChange={(e) => setTodoUpdate({ ...todoUpdate, description: e.target.value })}
                        style={{ width: '100%', minHeight: '100px' ,outline:'none',border:'none'}} 
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={updateTheTodo}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>



        </ToDoStyled>
    )
}

const ToDoStyled = styled.div`
  
   margin-top: 10px;
   width:80%;
   height: 94vh;
   display: flex;
   align-items: center;
   flex-direction: column;
   border: 3px solid #0c0b0b;
   background-color: rgb(240, 240, 240);
   flex:0.8;
   border-radius: 32px;

   .todo-container{
    flex:1;
    position: relative;
   
    /* padding: 10px; */
    width: 90%;
   }

    
     ul{
        display: flex;
        overflow-y: auto; 
        margin-bottom: 10px;
        align-items: center;
        flex-direction: column;
        /* background-color: black; */
        padding: 0;
        height:590px; 
        width: 100%;
        position: absolute;
        margin-top: 5px;
        gap:3px;



        li{
        width: 100%;
        min-height: 50px;  
        display: flex;
        flex-direction: row;
        align-items: center;
        border-radius: 8px;
        padding: 10px;
        justify-content: space-between;
        border: 3px solid #0c0b0b;
        cursor: pointer;
      
        
        
        }
     }    
     

   .sub{
      display: flex;
    
      align-items: center;
      
      
      input{
        font-size: 25px;
        border-radius: 50%;
        margin-bottom: 5px;
        background-color:  #09d009;
        outline: none;
        border: none;
        margin-left: 5px;
        
      }
      span{
         margin-left: 20px;
         font-size: 20px;
      }
       
   }
 
   .sub input:checked + span {
    text-decoration: line-through;
}
   
   .items{

     display: flex;
     gap: 15px;
     font-size: 26px;

   }

   .editIcon{
      color: #1bd61bbc;
      &:hover{
        color:  #1bd61b;
      }
   }
   .deleteIcon{
    color: #1bd61bc2;
      &:hover{
        color: #1bd61b;
        
      }
   }

   .addtodo{
 
    margin-top:600px;
    width:100%;
    position: sticky;
    padding: 10px;
    bottom: 0;

    

   }
   
  .addbar {
    display: flex;
    align-items: center;
    border-radius: 8px;
    border: 3px solid #0c0b0b;

    input{
       margin-left: 17px;
       width: 85%;
       height: 50px;
       border: none;
       outline: none;
       background-color: rgb(240, 240, 240);
       
     
    }

  }
  .addIcon{
    font-size: 50px;
    color: #1bd61bc2;
    margin-left: 70px;
    
    &:hover{
        color: #1bd61b;
    }
  }
  .description-input {
    width: 300px;
    height: 100%px;
     /* Adjust the height as needed */
     outline: none;
   
}

   
`

export default ToDoComponent
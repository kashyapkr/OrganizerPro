import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAllCategories, getLoggedInUser, logout } from '../services/AuthService';
import avatar from '../img/todoavatar.png'
import signout from '../img/signout.png'
import add from '../img/add.png'
import { MdDelete } from "react-icons/md"
import { createCategory, deleteCategory } from '../services/ToDoService';
import { IoAddCircleSharp } from "react-icons/io5";

const NavigationComponent = ({ onSelectCategory }) => {

    

    const navigate = useNavigate();

    const user = getLoggedInUser();

    const [categories, setCategories] = useState([]);

    const[active,setActive] = useState(null);
    
    const[categ,setCateg] = useState('');


    useEffect(() => {
        getCategories()
  
      }, [])
      
    const getCategories=async ()=>{
        try {
            const response = await getAllCategories();
            setCategories(response.data);
            const tasksCategory = response.data.find(category => category.name.toLowerCase() === 'tasks');
            if (tasksCategory && !active) {
                setActive(tasksCategory); 
                onSelectCategory(tasksCategory); 
            }
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    function handelLogout() {
        logout();
        navigate('/');
        console.log("navigating to login")
    }
    
    function handelCategoryClick(cat){
        setActive(cat);
        onSelectCategory(cat);
        
    }

    function handelAddCaregory(){
        console.log('inside adding category')
        const categoryObj = { categoryName: categ };
        createCategory(categoryObj).then((response)=>{
            console.log(response.data);
            console.log('Category is created')
            getCategories();
            setCateg('');
        }).catch(error=>console.log(error))
    }


    function handelDelte(id){
        deleteCategory(id).then(response=>{
            console.log(response.data);
            getCategories();
            window.location.reload();

        }).catch(error=>{
            console.log(error);
        })
    }


    return (
        <NavStyled>
            <div className="user-container">
                <img src={avatar} alt="profile pic" />
                <div className="text">
                    <h2>{user}</h2>
                </div>
            </div>
            <ul className="menu-items">
                {
                    categories.map(cat => {
                        return (
                            <li key={cat.id}
                                onClick={()=>handelCategoryClick(cat)}
                                className={active===cat? 'selected':''}

                            >
                                <span>{cat.name}</span>
                                <MdDelete className='deleteIcon' onClick={() => handelDelte(cat.id)} />

                            </li>

                        )

                    })}
            </ul>
            <div>

            </div>
            <div className="category-btn">
                <input type="text"  placeholder="New Category" onChange={e=>setCateg(e.target.value)} value={categ}/>
                   <button onClick={handelAddCaregory}><IoAddCircleSharp className='add-icon'/></button> 
            </div>
            <div className='bottom-div'>
                <li onClick={(e) => handelLogout(e)}>
                    <img src={signout} /> <span>Sign Out</span>
                </li>
            </div>

        </NavStyled>
    )
}

const NavStyled = styled.div`
    padding: 2rem 1.5rem;
    width: 300px;
    flex:0.2;
    margin-top: 10px;
    height: 94vh;
    background: rgb(240, 240, 240);
    border: 3px solid #0c0b0b;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* margin: 6px; */
    gap: 2rem;

    .user-container{
        height: 140px;
        display: flex;
        align-items: center;
        gap: 1rem;
       
       
        img{
            width: 80px;
            height: 60px;
            border-radius: 50%;
            object-fit: fit;
            background: #fcf6f9;
            border: 2px solid #191717;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: #000000;
        }
        p{
            color: rgba(6, 6, 8, 0.6);
        }

    }
     .menu-items{
        
        height: 800px;
        width:100%;
        display: flex;
        margin-top: 30px;
        align-items: center;
        display: flex;
        flex-direction: column;
        font-size: 17px;
        font-weight: bold;
        overflow-x: hidden;
        /* background-color: black; */
        overflow-y: auto;
       
        
        li{
            display: flex;
            align-items: center;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
            min-height: 40px;
            gap: 30px;
            /* padding: 6px; */
            justify-content: center;
            margin-left: 20px;
            /* background-color: #0c0b0b75; */
            border: 10px black;
            margin:.2rem 0;
            transition: all .4s ease-in-out;
            color: rgb(19, 19, 19);
            margin-right: 30px;
            position: relative;
            border-radius: 13px;
            overflow: hidden;
            transition: all 0.4s ease-in-out;
          


            &:hover{
                background-color: #4a4c4a8b;
                border: 2px solid black;
            }
            span{
                margin-left: 50px;
                font-size: large;
            }
            &.selected{
                background-color: #1bd61b;
                border: 2px solid black;
            }
          
            
        }

     }
   
     
    
     .category-btn{
        display: flex;
        align-items: center;
        border-radius: 8px;
        border: 3px solid #0c0b0b;
        width: 200px;
       
        

        input{
           
           margin-left:10px ;
            outline: none;
            border: none;
            width: 85%;
            height: 100%;
            background-color: rgb(240, 240, 240);


        }
        button{
            border: none;
            padding: 0;
            margin: 0;
            width: 40px;
            height: 70px;
           
        }
       }

     .bottom-div{
    
        cursor: pointer;
        display: flex;
        flex-direction: row;
        height:70px ;
        opacity: 1;
        transition: opacity 0.1s ease-in-out;
        /* background-color: blue; */
        
        
       li{
            font-size: 1rem;
            height: 70px;
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: center;
            /* background-color: #222260; */

            img{
                margin-top: 4px;
                width: 40px;
                height: 25px;
                opacity: 60%;
                transition: opacity 0.1s ease-in-out;
                
            }
           
            span{
                margin-top: 6px;
                opacity: 60%;
                transition: opacity 0.1s ease-in-out;

            }
            &:hover{
                img,span {
                    opacity: 1;
                
                }
            
       }
            
        }

       &:hover{
        opacity: 1;
        color:#040407fa ;
       }

        
    }
    .deleteIcon{
        margin-right: 10px;
        margin-left: auto;
    }
     
 .add-icon{
    font-size: 30px;
    color: #1bd61bdb;

    &:hover{
        color: #1bd61b;
    }

 }

    

`

export default NavigationComponent
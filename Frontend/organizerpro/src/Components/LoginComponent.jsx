
import React, { useEffect,useRef, useState } from 'react'
import styled from 'styled-components'
import logo from '../img/logo.png'
import {init} from 'ityped'
import { useNavigate } from 'react-router-dom'
import { loginApi, saveLoginUser, storeToken } from '../services/AuthService'

const LoginComponent = () => {

    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('')

    const[errormsg,setErrormsg] = useState('');

    const navigator = useNavigate();

    const textRef = useRef();

 useEffect(()=>{
    init(textRef.current,{
       showCursor:false,
       backDelay:3000,
       backSpeed:30,
       strings:['“By Failing to prepare, you are preparing to fail.” – Benjamin Franklin','“Give me six hours to chop down a tree and I will spend the first four sharpening the axe.” – Abraham Lincoln','“It takes as much energy to wish as it does to plan.” – Eleanor Roosevelt'],
    });
 },[]);

 async function handleLogin(e){

    e.preventDefault();

    const loginDto = {username,password};

    await loginApi(loginDto).then((response)=>{
        console.log(response.data)

        const token = 'Basic '+window.btoa(username + ":" + password);
        storeToken(token);
        saveLoginUser(username);

        navigator('/todo')
    }).catch(error=>{
        console.error(error)
        setErrormsg('Wrong credentials!Try again')
    })

 }

  return (
    <LoginStyled>
            <div className="icon">
                <img src={logo}/>

            </div>
            <div className='quote'>
            <h3>
                <span ref={textRef}></span>
            </h3>
            </div>
            

         
            
            <div className="login-container">
                    {errormsg && <p className='error'>{errormsg}</p>}

                <form>
                    <div className="form-group">
                        <label className='control-label' >Username:</label>
                        <input className={`form-control ${errormsg ? 'is-invalid' :''}`} placeholder="Enter username"type="text" id="username" value={username} onChange={(e)=>setUsername(e.target.value)} required />

                    </div>

                    <div className="form-group">
                        <label className='control-label'>Password:</label>
                        <input className={`form-control ${errormsg ? 'is-invalid' :''}`} placeholder='Enter password' type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />

                    </div>
                    <button className='btn btn-danger' onClick={(e)=>handleLogin(e)}> Submit</button>
                    <div className="user">
                        <a href="/register">
                        <span >New User? Register Here!</span>
                        </a>
                        
                    </div>
                </form>
            </div>
        </LoginStyled>
  )
}
const LoginStyled = styled.div`

  .quote{

    height: 70px;
    width: 500px;
    text-align: center;
    margin-bottom: 10px;
    font-family: "Dancing Script", cursive;
   font-optical-sizing: auto;
   font-weight: 500;
   font-size: 14px;
   font-style: italic;
  }
    padding: 2rem 1.5rem;
    width: 99%;
    height: 98vh;
    background: white;
    border: 5px solid #0a0909; /* Adjust border using viewport height units */
    overflow-y: hidden;
    border-radius: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
    gap: 2vh;

    .icon{
       height: 250px;
        width: 300px;
        
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden; 

        @media screen and (max-width:515px){
            height:120px;
            width:120px;
        }
      

        img{
            height: 100%;  


        }
    }

    .login-container{
        height: 50%;
        width: 50%;
        margin-top: -25px;
        /* background-color: gray; */
        display: flex;
        flex-direction: column;
        align-items: center;
        .error{
        color: #d40909;
        margin-top: 30px;
        font-weight: 500;
        /* margin-top: 15px; */
        font-size:0.9rem;
        /* margin-bottom: -30px; */
             @media screen and (max-width:515px ){
            font-size: 0%.5rem;
            font-weight: 400;
            margin-top: 10px;

            
            

        }
        input{
            font-size: 16px;
        }

    }

        form{
            padding: 3%;
            flex-direction: column;
            display: flex;
            /* justify-content: center; */
            align-items: center;
            gap: 0.5rem;
            button{
                background: #1bd61bc6;
                width: 80px;
                height: 30px;
                font-size: 15px;
                font-weight: 400;
                border-radius: 8px;
                border-color: #0a0909;
                display: flex;
                align-items: center;
                justify-content: center;
                color: black;

                &:hover{
                    background-color: #1bd61b;
                    color: white;
                }
                @media screen and (max-width:515px ) {
                    width: 60px;
                    height: 30px;
                    font-size: 12px;
                    
                }
            }
            .form-group{
                display:flex;
                flex-direction: row;
                padding: 20px;

                .control-label{
                    font-weight: 800;
                    font-size: 1.3rem;
                    color: #010105;
                    font-family: "Sedan SC", serif;
                    font-weight: 400;
                    font-style: normal;
                    
                    @media screen and (max-width:515px ) {
                        font-size: 0.8rem;
                        font-weight: 500;
                        
                    }
                }
                .form-control{
                    margin-left: 10px;
                    width: 200px;
                    font-size: 0.7rem;
                    @media screen and (max-width:515px ){
                        width: 120px;
                    }
                }
               

            }
           
             span{
                font-size: 15px;
                font-weight: 500;
                font-style: italic;
                color: #010105;
                @media screen and (max-width:515px){
                    font-size:12px;
                }
             }   
        }

    }

    
`

export default LoginComponent
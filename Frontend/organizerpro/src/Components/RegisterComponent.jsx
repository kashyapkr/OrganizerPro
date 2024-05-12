import React, { useState } from 'react'
import styled from 'styled-components'
import { registerApi } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const RegisterComponent = () => {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState({ name: '', username: '', password: '' });

    function validateError() {
        let valid = true;
        if (name.trim() === "") {
            setError(prevError => ({ ...prevError, name: "Name is mandatory" }))
            valid = false;
        }
        else {
            setError(prevError => ({ ...prevError, name: "" }))
        }
        if (username.trim() === "") {
            setError(prevError => ({ ...prevError, username: "Username is mandatory" }))
            valid = false;
        }
        else {
            setError(prevError => ({ ...prevError, username: "" }))
        }
        if (password.trim() === "") {
            setError(prevError => ({ ...prevError, password: "Enter password!" }))
            valid = false;
        }
        else {
            setError(prevError => ({ ...prevError, password: "" }))
        }
        return valid;
    }
    const navigator = useNavigate();

    function handelRegister(e) {
        e.preventDefault();

        const register = { name, username, password };
        console.log(validateError())
        if (validateError()) {
            console.log('inside validate error')
            registerApi(register).then(response => {
                alert("Registered Successfully")
                navigator('/');
                console.log("success")
                console.log(response.data);


            }).catch(error => {
                console.error(error)
                alert("User Already exists");
            })
        }

    }




    return (
        <RegisterStyled>
            <h2>Welcome User</h2>

            <div className="register-container">
                <form>
                    <div className="form-group">
                        <label className='control-label' >Name:</label>
                        <div className="input-container">
                            <input className={`form-control s ${error.name ? 'is-invalid' : ''}`} placeholder='Enter name' type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                            {error.name && <div className='invalid-feedback'>{error.name}</div>}
                        </div>

                    </div>

                    <div className="form-group">

                        <label className='control-label'>Username:</label>
                        <div className="input-container">
                            <input className={`form-control ${error.username ? 'is-invalid' : ''}`} type="text" id="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            {error.username && <div className='invalid-feedback'>{error.username}</div>}
                        </div>

                    </div>

                    <div className="form-group">
                        <label className='control-label' >Password:</label>
                        <div className="input-container">
                            <input className={`form-control ${error.password ? 'is-invalid' : ''}`} type="password" id="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                            {error.password && <div className='invalid-feedback'>{error.password}</div>}

                        </div>


                    </div>
                    <button className='btn' onClick={(e) => handelRegister(e)}> Submit</button>
                    <br></br>
                    <div className="user">
                        <a href="/">
                            <span >Already Registered? Login Here</span>
                        </a>

                    </div>
                </form>
            </div>

        </RegisterStyled>
    )
}
const RegisterStyled = styled.div`
    padding: 2rem 1.5rem;
    width: 99%;
    height: 100vh;
    height: 98vh;
    background: white;
    border: 5px solid #060606; /* Adjust border using viewport height units */
    overflow-y: hidden;
    border-radius: 1vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 8px auto;
    gap: 2vh;
    
    gap: 2rem;
    .invalid-feedback{
                    text-align: center;
                    font-weight: 500;
            }

    h2{
        font-size: 1.9rem;
        font-weight: 800;
        font-family: "Sedan SC", serif;
        font-style: normal;
    }

    .register-container{
        display: flex;
        flex-direction: column;
        height: 80%;
        width: 50%;
        overflow-x: hidden;
        /* background-color: black; */


        form{
            padding: 10%;
            flex-direction: column;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow-x: hidden;
           

        .form-group{
            display:flex;
            flex-direction: row;
            padding: 20px;

            
                   

            .control-label{
                font-weight:700;
                color: #000000;
                font-size: 1.2rem;
                font-family: "Sedan SC", serif;
                font-weight: 400;
                font-style: normal;

                
            }
            .form-control{
                    margin-left: 10px;
                    width: 200px;
                    font-size: 0.8rem;
                }
            .form-control.s{
                margin-left: 33px;
                
            } 
              
        }
        span{   
           
                font-size: 15px;
                text-decoration: none;
                color: #000000;
             } 
        

    }
    
}
.btn{
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



}

    
`

export default RegisterComponent
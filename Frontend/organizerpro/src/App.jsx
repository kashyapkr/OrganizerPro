import { useState } from 'react'
import LoginComponent from './Components/LoginComponent'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import RegisterComponent from './Components/RegisterComponent'
import ToDoComponent from './Components/ToDoComponent'
import NavigationComponent from './Components/NavigationComponent'
import { MainLayout } from './Styles/MainLayout'

function App() {

  const [catid, setCatid] = useState(null);
  const[catName,setCatName]=useState('');
  

  function handelSelectCategory(cat) {
    console.log('function called')
    setCatid(cat.id);
    setCatName(cat.name);
    console.log('selected catid' + cat.id)
    console.log('cat name is'+ cat.name)
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginComponent />}></Route>
          <Route path='/register' element={<RegisterComponent />}></Route>
          <Route path='/todo' element={
            <MainLayout>
              <NavigationComponent onSelectCategory={handelSelectCategory} />
              <ToDoComponent catid={catid} catName={catName}/>
            </MainLayout>



          }></Route>
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Blog from './components/Blog'
import Home from './components/Home'
import Login from './components/Login'
import Create from './components/Create'
import MyPages from './components/MyPages'
// import Login from './components/login'

function App() {

    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login isLogIn={true} />}/>
            <Route path='/signup' element={<Login/>}/>
            <Route path='/read/:id' element={<Blog />}/>
            <Route path='/create' element={<Create />}/>
            <Route path='/edit/:id' element={<Create edit={true} />}/>
            <Route path='/my' element={<MyPages/>} />
        </Routes>
    )
}

export default App

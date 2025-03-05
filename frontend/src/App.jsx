import './App.css'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './layout/Dashboard'
import Auth from './layout/Auth'
import { PrivateRoutes } from './context/PrivateRoutes'
import { AuthProvider } from './context/AuthProvider'
import Auditorios from './pages/Auditorios'
import Reservas from './pages/Reservas'
import { Conferencista } from './pages/Conferencista'
function App() {
  return (

   <BrowserRouter>
   <AuthProvider>
      <Routes>
        <Route index element = {<Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Auth/>}/>
       <Route path = '/dashboard/*' element ={
        <PrivateRoutes>
          <Dashboard />
        </PrivateRoutes>
       }>
              <Route path='conferencistas' element={<Conferencista/>}/>
              <Route path='auditorios' element={<Auditorios/>}/>
              <Route path='reservas' element={<Reservas/>}/>
              </Route>
          </Routes>
    </AuthProvider>
    </BrowserRouter>
    )
}

export default App

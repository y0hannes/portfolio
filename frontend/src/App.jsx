import { Route, Routes } from 'react-router-dom'
import Public from "./pages/Public"
import Admin from './pages/Admin'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Public />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </div >
  )
}

export default App
import { Route, Routes } from 'react-router-dom'
import Public from "./pages/Public"
import Admin from './pages/Admin'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Public />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div >
  )
}

export default App
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AdminLayout } from './components/layout/AdminLayout';

// Placeholder Pages
const Home = () => (
  <div className='pt-32 pb-20 text-center'>
    <h1 className='text-4xl text-white'>Loading...</h1>
  </div>
);
const Login = () => <div className='text-white'>Login Page</div>;
const Dashboard = () => <div className='text-white'>Dashboard</div>;
const Messages = () => <div className='text-white'>Messages</div>;
const Projects = () => <div className='text-white'>Projects</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* Admin Routes */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Navigate to='/admin/dashboard' replace />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='messages' element={<Messages />} />
          <Route path='projects' element={<Projects />} />
        </Route>

        {/* Admin Login (Standalone) */}
        <Route path='/admin/login' element={<Login />} />

        {/* Catch all */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

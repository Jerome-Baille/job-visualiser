import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Layout from './components/Layout';
import Home from './components/Home';
import './App.scss';
import Auth from './components/Auth/Auth';
import Create from './components/Create';
import Detail from './components/Home/Detail';
import Dashboard from './components/Dashboard';
import Page404 from './components/Page404';
import JobBoards from './components/JobBoards';
import Profile from './components/Profile';
import HowToUse from './components/How-to-use';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />} path="/" exact>
          <Route index element={<Navigate to ="/dashboard" />} />
          <Route path="Create" element={<Create />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="List" element={<Home />} />
          <Route path="Job-boards" element={<JobBoards />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="How-to-use" element={<HowToUse />} />
          <Route path="/job/:id" element={<Detail />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Route>
      <Route path="/" element={<Layout />}>
        <Route path="auth" element={<Auth />} />
      </Route>
    </Routes>
  );
}

export default App;

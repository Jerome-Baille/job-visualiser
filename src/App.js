import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import './App.scss';
import Create from './components/Create';
import Detail from './components/Home/Detail';
import Statistics from './components/Statistics';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Page404 from './components/Page404';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Create"    element={<Create />} />
        <Route path="Stats"     element={<Statistics />} />
        <Route path="/job/:id"  element={<Detail />} />
        <Route path="login"     element={<Login />} />
        <Route path="register"  element={<Register />} />
        <Route path="logout"    element={<Logout />} />
        <Route path="*"         element={<Page404/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;

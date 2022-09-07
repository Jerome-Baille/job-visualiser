import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import './App.scss';
import Auth from './components/Auth';
import Create from './components/Create';
import Detail from './components/Home/Detail';
import Statistics from './components/Statistics';
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
        <Route path="auth"      element={<Auth />} />
        <Route path="*"         element={<Page404/>} />
      </Route>
    </Routes>
    </>
  );
}

export default App;

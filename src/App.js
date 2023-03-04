import { Routes, Route } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Layout from './components/Layout';
import Home from './components/Home';
import './App.scss';
import Auth from './components/Auth';
import Create from './components/Create';
import Detail from './components/Home/Detail';
import Statistics from './components/Statistics';
import Page404 from './components/Page404';
import JobBoards from './components/JobBoards';

function App() {
  return (
    <>
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />} path="/" exact>
          <Route index element={<Home />} />
          <Route path="Create"      element={<Create />} />
          <Route path="Stats"       element={<Statistics />} />
          <Route path="Job-boards"  element={<JobBoards />} />
          <Route path="/job/:id"    element={<Detail />} />
          <Route path="*"           element={<Page404/>} />
        </Route>
      </Route>
      <Route path="/" element={<Layout/>}>
        <Route path="auth"        element={<Auth />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GenerateSpec from './pages/GenerateSpec';
import RoadmapsIndex from './pages/roadmaps/RoadmapsIndex';
import BackendBeginner from './pages/roadmaps/BackendBeginner';
import Community from './pages/Community';
import Recommendations from './pages/Recommendations';
import Courses from './pages/Courses';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="spec" element={<GenerateSpec />} />
          <Route path="roadmaps" element={<RoadmapsIndex />} />
          <Route path="roadmaps/backend-beginner" element={<BackendBeginner />} />
          <Route path="community" element={<Community />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="courses" element={<Courses />} />
          <Route path="jobs" element={<Jobs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

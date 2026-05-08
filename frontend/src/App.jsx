import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GenerateSpec from './pages/GenerateSpec';
import RoadmapsIndex from './pages/roadmaps/RoadmapsIndex';
import BackendBeginner from './pages/roadmaps/BackendBeginner';
import Community from './pages/Community';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="spec" element={<GenerateSpec />} />
          <Route path="roadmaps" element={<RoadmapsIndex />} />
          <Route path="roadmaps/backend-beginner" element={<BackendBeginner />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

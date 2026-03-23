import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import Edit from './pages/Edit'
import Layout from './layout/Layout'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/write" element={<CreatePost />} />
          <Route path="/detail/:id" element={<PostDetail />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { Routes, Route } from "react-router-dom"
import HomePage from "../view/pages/HomePage"
import ProjectPage from "../view/pages/ProjectPage"
import ProjectDetail from "../view/pages/ProjectDetail"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/projects" element={<ProjectPage/>}/>
        <Route path="/project-detail/:id" element={<ProjectDetail/>}/>
    </Routes>
  )
}

export default AppRoutes

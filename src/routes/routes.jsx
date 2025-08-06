import { Routes, Route } from "react-router-dom"
import HomePage from "../view/pages/HomePage"
import ProjectPage from "../view/pages/ProjectPage"

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/projects" element={<ProjectPage/>}/>
    </Routes>
  )
}

export default AppRoutes

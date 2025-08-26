import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../view/pages/HomePage"));
const ProjectPage = lazy(() => import("../view/pages/ProjectPage"));
const ProjectDetail = lazy(() => import("../view/pages/ProjectDetail"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="w-12 h-12 border-4 border-black border-dashed rounded-full animate-spin"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/project-detail/:id" element={<ProjectDetail />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;

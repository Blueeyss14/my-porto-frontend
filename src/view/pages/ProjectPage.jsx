import { useEffect } from "react";
import { useProjectStore } from "../../state/projectStore";

const ProjectPage = () => {
  const { projects, fetchProject } = useProjectStore();

   useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return (
    <div className="flex flex-wrap">
      {/* <div className="w-[50%] bg-blue-500 p-4 text-white">Div 1</div>
      <div className="w-[50%] bg-green-500 p-4 text-white">Div 2</div>
      <div className="w-[50%] bg-red-500 p-4 text-white">Div 3</div> */}
      {projects.map((project) => (
        <div key={project.id} className=" w-[50%] h-100 px-2.5 pb-5 overflow-hidden">
          <div className="w-full h-full bg-red-400"></div>
        </div>
      ))}
    </div>
  );
};

export default ProjectPage;

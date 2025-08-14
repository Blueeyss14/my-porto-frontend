import { useEffect } from "react";
import { useProjectStore } from "../../state/projectStore";

const ProjectPage = () => {
  const { projects, fetchProject } = useProjectStore();

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return (
    <div className="flex flex-wrap font-custom">
      {/* <div className="w-[50%] bg-blue-500 p-4 text-white">Div 1</div>
      <div className="w-[50%] bg-green-500 p-4 text-white">Div 2</div>
      <div className="w-[50%] bg-red-500 p-4 text-white">Div 3</div> */}
      {projects.map((project) => (
        <div key={project.id} className=" w-1/2 h-150 p-4 overflow-hidden">
          <div className="w-full h-full flex flex-col items-center rounded-2xl overflow-hidden shadow-black/30 shadow-[0_0_10px_black]">
            <div className="w-full h-[60%]">
              <img
                src={project.image_url[0]}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[90%] mt-8 flex flex-col">
              <h1 className="font-semibold text-[1.2rem] mb-3 line-clamp-1">
                {project.title}
              </h1>
            </div>
            <div className="w-[90%]">
              <h1 className="text-justify line-clamp-3">{project.description}</h1>
            </div>
            <div className=" w-full flex-1 flex justify-end items-end pb-5 pr-5">
              <div className="bg-amber-300 px-5 py-2 rounded-[10px] cursor-pointer flex items-center">
                <h1 className="mr-2">See</h1>
                <img src="assets/icons/next.png" className="w-4 h-4 img-shadow-white-on-hover" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectPage;

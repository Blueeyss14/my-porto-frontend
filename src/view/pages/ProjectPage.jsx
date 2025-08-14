import { useEffect } from "react";
import { useProjectStore } from "../../state/projectStore";

const ProjectPage = () => {
  const { projects, fetchProject } = useProjectStore();

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return (
    <div className="flex flex-wrap font-custom bg-homeBg3">
      {/* <div className="w-[50%] bg-blue-500 p-4 text-white">Div 1</div>
      <div className="w-[50%] bg-green-500 p-4 text-white">Div 2</div>
      <div className="w-[50%] bg-red-500 p-4 text-white">Div 3</div> */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="w-1/3 [@media(max-width:1400px)]:w-1/2 [@media(max-width:870px)]:w-full h-150 p-4 overflow-hidden"
        >
          <div className="w-full h-full flex flex-col items-center rounded-2xl overflow-hidden shadow-black/5 shadow-[05px_5px_10px_black] bg-homeBg border-t-4 border-r-4 border-l-3 border-white/80">
            <div className="w-full h-[50%] relative">
              <img
                src={project.image_url[0]}
                alt={project.title}
                className="absolute w-full h-full object-cover"
              />
              <div className="bg-white/25 w-full h-full absolute"></div>
            </div>
            <div className="w-[90%] mt-8 flex flex-col text-fontProject">
              <h1 className="font-semibold mb-1 line-clamp-1 text-[1.1rem]">{project.title}</h1>
              <h3 className="mb-3 line-clamp-1 text-[0.9rem] ">
                {project.title}
              </h3>
            </div>
            <div className="w-[90%]">
              <h1 className="text-justify line-clamp-3 text-[0.8rem] leading-6 text-fontProject">
                {project.description}
              </h1>
              {project.description !== '' && (
                <div className="w-full h-[1px] rounded-full bg-divider/50 mt-3"></div>
              )}
            </div>
            {/* BUTTON - SEE */}
            <div className=" w-full flex-1 flex justify-end items-end pb-5 pr-5">
              <div className="bg-fontProject px-3 py-2 rounded-[10px] cursor-pointer flex items-center justify-center">
                <h1 className="mr-2 text-[0.9rem] text-homeBg2">See</h1>
                <img
                  src="assets/icons/next.png"
                  className="w-3.5 h-3.5 img-white"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectPage;

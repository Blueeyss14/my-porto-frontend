import { useEffect } from "react";
import { useProjectStore } from "../../state/projectStore";
import MediaPlayer from "../shared/components/MediaPlayer";
import { useNavigate } from "react-router-dom";
const ProjectPage = () => {
  const { projects, fetchProject } = useProjectStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return (
    <div className="w-full h-full">
      {/* <MediaPlayer className=""/> */}
      <MediaPlayer
        src="assets/images/background.png"
        className="w-full h-full object-cover fixed -z-99 overflow-hidden"
      ></MediaPlayer>
      <div className="fixed w-full h-full inset-0 -z-99 border-0 overflow-hidden backdrop-blur-[60px] bg-black/15"></div>
      <div className="w-full h-full overflow-y-auto ">
        <div className="w-full flex flex-wrap font-customn overflow-hidden">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="w-1/3 [@media(max-width:1400px)]:w-1/2 [@media(max-width:870px)]:w-full h-150 p-4 overflow-hidden"
            >
              <div className="w-full h-full flex flex-col items-center rounded-2xl overflow-hidden shadow-white/5 shadow-[05px_5px_15px_black] backdrop-blur-[60px] bg-homeBg/10 border-2 border-white/10 p-5">
                <div className="w-full h-[50%] relative border-2 border-white/10 rounded-[10px] overflow-hidden">
                  {project.thumbnail[index] && (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="absolute w-full h-full object-cover hover:scale-150 transition-all duration-500 hover:rotate-3"
                    />
                  )}

                  <div className="bg-white/40 w-full h-full absolute pointer-events-none"></div>
                </div>
                <div className="w-[100%] mt-8 flex flex-col text-homeBg">
                  <h1 className="font-semibold mb-1 line-clamp-1 text-[1.1rem]">
                    {project.title}
                  </h1>
                  <h3 className="mb-5 line-clamp-1 text-[0.9rem] ">
                    {project.title}
                  </h3>
                </div>
                <div className="w-[100%]">
                  <h1 className="text-justify line-clamp-2 text-[0.8rem] leading-6 text-homeBg2">
                    {project.description}
                  </h1>
                  {/* DIVIDER */}
                  {project.description !== "" && (
                    <div className="w-full h-[1px] rounded-full bg-homeBg2/50 my-3"></div>
                  )}
                  {/* tag */}
                  <div className="w-full flex overflow-x-auto scrollbar-hide scroll-smooth">
                    {project.tags.slice(0, 5).map((tag) => (
                      <div className="py-3 px-2 border-2 text-homeBg2 text-[0.8rem] border-white/50 w-fit rounded-full cursor-pointer mr-3">
                        <h2 className="leading-0">{tag}</h2>
                      </div>
                    ))}
                  </div>
                </div>
                {/* BUTTON - SEE */}
                <div className=" w-full flex-1 flex justify-end items-end">
                  <div
                    onClick={() => navigate(`/project-detail/${project.id}`)}
                    className="bg-white/5 backdrop-blur-[20px] px-3 transition-all duration-50 py-2 rounded-[10px] cursor-pointer flex items-center justify-center border-r-2 border-t-2 border-homeBg/20 hover:border-0 shadow-white/8 shadow-[2px_2px_15px_black]"
                  >
                    <h1 className="mr-3 text-[0.9rem] text-homeBg2">See</h1>
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
      </div>
    </div>
  );
};

export default ProjectPage;

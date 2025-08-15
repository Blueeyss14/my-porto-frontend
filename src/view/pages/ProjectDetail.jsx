import { useParams } from "react-router-dom";
import { useProjectStore } from "../../state/projectStore";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, fetchProject } = useProjectStore();
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (!projects || projects.length === 0) fetchProject();
  }, [fetchProject, projects]);

  useEffect(() => {
    if (projects && projects.length > 0) {
      const p = projects.find((proj) => proj.id.toString() === id);
      setProject(p);
    }
  }, [projects, id]);

  if (!project) return <div className="text-black p-5">Loading...</div>;

  return (
    <div className="w-screen relative">
      <div className="absolute w-full bg-amber-300 h-[300px]"></div>
      <div className="absolute w-[500px] bg-red-300/20 h-[400px] transform translate-y-25">
      </div>
    </div>
  );

  //   return (
  //     <div className="w-full h-full p-5 text-black flex flex-col items-center px-10">
  //       <div className="w-full h-full rounded-2xl overflow-hidden">
  //       <img src={project.thumbnail} alt="" />

  //       </div>
  //       {project.image_url.map((img) => (
  //         <img
  //           src={img}
  //           alt={project.title}
  //           className="w-full max-w-lg h-auto mb-5 rounded-lg object-cover"
  //         />
  //       ))}

  //       <h1 className="text-3xl font-bold">{project.title}</h1>
  //       <h1 className="whitespace-pre-line text-justify">{project.description}</h1>
  //     </div>
  //   );
  // };
};
export default ProjectDetail;

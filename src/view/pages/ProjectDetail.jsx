import { useParams } from "react-router-dom";
import { useProjectStore } from "../../state/projectStore";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, fetchProject } = useProjectStore();
  const [project, setProject] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

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

  const heightScreen = 30;
  const heightScreenDouble = heightScreen * 2;

  const mdHeightScreen = 20;
  const mdHeightScreenDouble = mdHeightScreen * 2;

  function clickThumbnail() {
    setIsClicked((click) => !click);
  }

  function clickImage(index) {
    setSelectedImageIndex(index);
    setIsImageModalOpen(true);
  }

  function closeImageModal() {
    setIsImageModalOpen(false);
  }

  function nextImage() {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === project.image_url.length - 1 ? 0 : prevIndex + 1
    );
  }

  function prevImage() {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? project.image_url.length - 1 : prevIndex - 1
    );
  }

  return (
    <div className="relative font-custom bg-homeBg">
      <div className="absolute w-full">
        <div
          className={`absolute w-full bg-amber-100 h-[${heightScreen}vh] [@media(max-width:600px)]:h-[${mdHeightScreen}vh]`}
        ></div>
        <div
          className={`absolute w-full flex items-center justify-center h-[${heightScreenDouble}vh] [@media(max-width:600px)]:h-[${mdHeightScreenDouble}vh]`}
        >
          {/* THUMBNAIL */}
          <div className="w-[90%] h-[70%] [@media(max-width:550px)]:h-[50%]">
            <div className="bg-gray-200 w-[600px] [@media(max-width:850px)]:w-[70%] h-full rounded-4xl [@media(max-width:600px)]:rounded-2xl overflow-hidden">
              <img
                onClick={clickThumbnail}
                src={project.thumbnail}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className={`w-full overflow-hidden h-[${heightScreenDouble}vh] [@media(max-width:600px)]:h-[${mdHeightScreenDouble}vh]`}
        ></div>
        {/* IMAGES */}

        <div className="w-full flex justify-center">
          <div className="w-[90%]">
            <div className="h-[25vh] [@media(max-width:450px)]:h-[20vh] flex items-center overflow-x-scroll .scrollbar-hide">
              {project.image_url.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={project.title}
                  className="h-full object-contain rounded-[10px] mx-2 cursor-pointer"
                  onClick={() => clickImage(index)}
                />
              ))}
            </div>
            <h1 className="font-bold text-[5rem] mt-5">{project.title}</h1>
            <h2 className="font-semibold text-[1.5rem]">Telyu Sigma</h2>
            <div className="flex overflow-x-auto.scrollbar-hide">
              {project.tags.map((tag) => (
                <div className="border-2 py-1 px-3 rounded-full mr-2 my-2">
                  <h1 className="leading-5 text-[0.9rem]">{tag}</h1>
                </div>
              ))}
            </div>
            <h2 className="whitespace-pre-line leading-8 text-justify mt-5">
              {project.description}
            </h2>
          </div>
        </div>
      </div>
      {isClicked && (
        <div
          onClick={clickThumbnail}
          className="fixed w-full h-screen backdrop-blur-[20px] bg-black/50 overflow-hidden py-20"
        >
          <img
            src={project.thumbnail}
            className="h-full w-full object-contain rounded-2xl"
          />
        </div>
      )}
      {/* IMAGE MODAL */}
      {isImageModalOpen && (
        <Images
          closeImageModal={closeImageModal}
          prevImage={prevImage}
          nextImage={nextImage}
          project={project}
          selectedImageIndex={selectedImageIndex}
        />
      )}
    </div>
  );
};

export default ProjectDetail;

function Images({
  closeImageModal,
  prevImage,
  nextImage,
  project,
  selectedImageIndex,
}) {
  return (
    <div
      onClick={closeImageModal}
      className="fixed inset-0 w-full h-screen backdrop-blur-[20px] bg-black/50 overflow-hidden flex items-center justify-center z-50"
    >
      <div className="relative w-full h-full flex items-center justify-center px-20 py-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 text-white text-xl font-bold transition-all duration-200 z-10"
        >
          &#8249;
        </button>

        <img
          src={project.image_url[selectedImageIndex]}
          className="max-h-full max-w-full object-contain rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full px-4 py-2 text-white text-xl font-bold transition-all duration-200 z-10"
        >
          &#8250;
        </button>

        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-white/20 rounded-full px-4 py-2">
          <span className="text-white text-sm">
            {selectedImageIndex + 1} / {project.image_url.length}
          </span>
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div className="w-full h-full p-5 text-black flex flex-col items-center px-10">
//       <div className="w-full h-full rounded-2xl overflow-hidden">
//       <img src={project.thumbnail} alt="" />

//       </div>
// {project.image_url.map((img) => (
//   <img
//     src={img}
//     alt={project.title}
//     className="w-full max-w-lg h-auto mb-5 rounded-lg object-cover"
//   />
// ))}

//       <h1 className="text-3xl font-bold">{project.title}</h1>
//       <h1 className="whitespace-pre-line text-justify">{project.description}</h1>
//     </div>
//   );
// };

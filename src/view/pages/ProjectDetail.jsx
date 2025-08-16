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
        {/* BANNER */}
        <div
          className={`absolute w-full bg-gray-400 h-[30vh] [@media(max-width:600px)]:h-[20vh]`}
        >
          <img src={project.thumbnail} className="absolute w-full h-full object-cover" />
          <div className="absolute w-full h-full bg-black/50 backdrop-blur-[10px]"></div>
        </div>
        <div
          className={`absolute w-full flex items-center justify-center h-[60vh] [@media(max-width:600px)]:h-[40vh]`}
        >
          {/* THUMBNAIL */}
          <div className="w-[90%] h-[70%] [@media(max-width:550px)]:h-[45%]">
            <div className="bg-gray-200 w-[600px] [@media(max-width:850px)]:w-[70%] h-full cursor-pointer rounded-4xl [@media(max-width:600px)]:rounded-2xl overflow-hidden border-x-2 border-t-2 border-homeBg2 shadow-black/30 shadow-[2px_2px_20px_black]">
              <img
                onClick={clickThumbnail}
                src={project.thumbnail}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className={`w-full overflow-hidden h-[60vh] [@media(max-width:600px)]:h-[40vh]`}
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
      {/* THUMBNAIL */}
      {isClicked && (
        <div
          onClick={clickThumbnail}
          className="fixed w-full h-full backdrop-blur-[20px] bg-black/50 overflow-hidden py-20"
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
      className="fixed inset-0 w-full h-full backdrop-blur-[20px] bg-black/60 overflow-hidden flex items-center justify-center z-50 py-5"
    >
      <div className="relative w-full h-full flex items-center justify-center ">
        {/* CLOSE */}
        <div
          className="absolute w-10 h-10 bg-black/40 rounded-full right-2 top-2 transform -translate-y-1/2 flex justify-center items-center p-3 cursor-pointer"
          onClick={closeImageModal}
        >
          <img
            src="/assets/icons/close.png"
            className="w-full h-full object-contain img-white"
          />
        </div>
        {/* PREV BUTTON */}
        <div
          className="absolute w-15 h-15 [@media(max-width:700px)]:w-9 [@media(max-width:700px)]:h-9 bg-black/40 rounded-full left-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center p-5 [@media(max-width:700px)]:p-2.5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            prevImage();
          }}
        >
          <img
            src="/assets/icons/ios_arrow.png"
            className="w-full h-full object-contain rotate-180 img-white"
          />
        </div>

        {/* IMAGES */}
        <img
          src={project.image_url[selectedImageIndex]}
          className="max-h-full max-w-full object-contain rounded-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        {/* NEXT BUTTON */}
        <div
          className="absolute w-15 h-15 [@media(max-width:700px)]:w-9 [@media(max-width:700px)]:h-9 bg-black/40 rounded-full right-2 top-1/2 transform -translate-y-1/2 flex justify-center items-center p-5 [@media(max-width:700px)]:p-2.5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            nextImage();
          }}
        >
          <img
            src="/assets/icons/ios_arrow.png"
            className="w-full h-full object-contain img-white"
          />
        </div>
        {/*  */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black/50 rounded-full px-4 py-2">
          <span className="text-white text-sm">
            {selectedImageIndex + 1} / {project.image_url.length}
          </span>
        </div>
      </div>
    </div>
  );
}

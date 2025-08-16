import { useNavigate, useParams } from "react-router-dom";
import { useProjectStore } from "../../state/projectStore";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
  const { id } = useParams();
  const { projects, fetchProject } = useProjectStore();
  const [project, setProject] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!projects || projects.length === 0) fetchProject();
  }, [fetchProject, projects]);

  useEffect(() => {
    if (projects && projects.length > 0) {
      const p = projects.find((proj) => proj.id.toString() === id);
      setProject(p);
    }
  }, [projects, id]);

  if (!project) return;

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
          <img
            src={project.thumbnail}
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute w-full h-full bg-black/50 backdrop-blur-[10px]"></div>
          {/* HOME */}
          <div
            onClick={() => navigate("/", { replace: true })}
            className="absolute bg-black/30 p-2.5 m-5 w-fit h-fit rounded-full cursor-pointer z-99"
          >
            <img src="/assets/icons/home.png" className="w-6 h-6 img-white" />
          </div>
        </div>
        <div
          className={`absolute w-full flex items-center justify-center h-[60vh] [@media(max-width:600px)]:h-[40vh]`}
        >
          {/* THUMBNAIL */}
          <div className="w-[90%] h-[70%] [@media(max-width:600px)]:h-[45%]">
            <div className="bg-gray-200 w-[600px] [@media(max-width:850px)]:w-[70%] h-full cursor-pointer rounded-4xl [@media(max-width:600px)]:rounded-2xl overflow-hidden border-x-2 border-t-2 border-homeBg">

              <img
                onClick={clickThumbnail}
                src={project.thumbnail}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className={`w-full overflow-hidden h-[60vh] [@media(max-width:600px)]:h-[35vh]`}
        ></div>
        {/* IMAGES */}

        <div className="w-full flex justify-center">
          <div className="w-[90%]">
            {project.image_url.some((url) => url) && (
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
            )}

            <h1 className="font-bold text-[3.5rem] mt-5 [@media(max-width:700px)]:text-[2.5rem]">
              {project.title}
            </h1>
            <h2 className="font-medium text-[1.5rem] mb-5 [@media(max-width:700px)]:text-[1.2rem]">
              {project.subtitle}
            </h2>
            <div className="flex flex-wrap overflow-x-auto.scrollbar-hide max-w-[50%] [@media(max-width:1100px)]:max-w-full">
              {project.tags.map((tag) => (
                <div className="border-2 px-3 rounded-full mr-3 my-1">
                  <h1 className="leading-7 text-[0.8rem]">{tag}</h1>
                </div>
              ))}
            </div>
            {project.description && (
              <div>
                <h2 className="font-bold text-[2rem] mt-10 mb-3 [@media(max-width:700px)]:text-[1.5rem]">
                  Description
                </h2>
                <h2 className="whitespace-pre-line leading-8 text-justify w-[60%] [@media(max-width:1200px)]:w-[90%] [@media(max-width:900px)]:w-full">
                  {project.description}
                </h2>
              </div>
            )}
            {/* CONTRUBUTING */}
            {project.contributing &&
              project.contributing.some((dev) => dev.name && dev.link) && (
                <div>
                  <h2 className="font-bold text-[2rem] mt-10 mb-3 [@media(max-width:700px)]:text-[1.5rem]">
                    Contributing
                  </h2>
                  <table className="w-[60%] [@media(max-width:1200px)]:w-[90%] [@media(max-width:900px)]:w-full border-black table-fixed">
                    <thead>
                      <tr>
                        <th className="px-2 py-2 border border-black text-left w-1/2">
                          Name
                        </th>
                        <th className="px-2 py-2 border border-black text-left w-1/2">
                          Link
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.contributing.map((dev) => (
                        <tr>
                          <td className="px-2 py-2 border border-black w-1/2 whitespace-normal break-words text-justify ">
                            {dev.name}
                          </td>
                          <td className="px-2 py-2 border border-black w-1/2 whitespace-normal break-words text-justify ">
                            <a
                              href={dev.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline"
                            >
                              {dev.link}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            {/* RESOURCES */}
            {project.resources &&
              project.resources.some((dev) => dev.name && dev.link) && (
                <div>
                  <h2 className="font-bold text-[2rem] mt-10 mb-3 [@media(max-width:700px)]:text-[1.5rem]">
                    Resources
                  </h2>
                  {project.resources.map((resource) => (
                    <ul className="list-disc pl-4 ml-4">
                      <li>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {resource.name}
                        </a>
                      </li>
                    </ul>
                  ))}
                </div>
              )}
            {/* WHITE SPACE */}
            <div className="w-full h-20"></div>
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
      className="fixed inset-0 w-full h-full backdrop-blur-[20px] bg-black/60 overflow-hidden flex items-center justify-center z-50 p-5"
    >
      <div className="relative w-full h-full flex items-center justify-center ">
        {/* CLOSE */}
        <div
          className="absolute w-10 h-10 bg-black/40 rounded-full right-0 top-2 transform -translate-y-1/2 flex justify-center items-center p-3 cursor-pointer"
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

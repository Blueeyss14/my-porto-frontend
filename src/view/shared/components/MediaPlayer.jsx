const MediaPlayer = ({ src, className = "", autoPlay = true }) => {
  const ext = src.split(".").pop().toLowerCase();

  if (["png", "jpg", "jpeg", "webp"].includes(ext)) {
    return <img src={src} alt="media" className={className} />;
  } else if (["mp4", "webm"].includes(ext)) {
    return (
      <video
        src={src}
        autoPlay={autoPlay}
        loop
        muted
        playsInline
        preload="auto"
        className={className}
      />
    );
  } else {
    return <p>Unsupported format</p>;
  }
};

export default MediaPlayer;

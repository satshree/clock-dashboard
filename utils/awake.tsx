import React, { useEffect, useRef } from "react";

export default function Awake() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = () => {
        video
          .play()
          .then((v: any) => {
            console.log("Silent video playing to keep the screen awake.");
            console.log(v);
          })
          .catch((e: any) => {
            console.error("ERROR", e);
            alert("Your display might turn off. Adjust your device's settings");
          });
      };

      // Attempt to play on interaction too (for autoplay policy)
      document.addEventListener("click", playVideo, { once: true });
      playVideo();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src="/silent.mp4" // Replace with your video path or base64 URI
      muted
      loop
      playsInline
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        opacity: 0,
        zIndex: -1,
      }}
    />
  );
}

import videoMp4 from "../assets/background.mp4"; // MP4 video
import videoWebm from "../assets/background.webm"; // WebM video

/**
 * Background component to display a looping background video.
 * @returns {JSX.Element} The rendered background video component.
 */
export default function Background() {
    return (
        <div className="video-container">
            <video autoPlay loop muted playsInline className="background-video">
                <source src={videoWebm} type="video/webm" />
                <source src={videoMp4} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

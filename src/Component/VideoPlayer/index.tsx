import React from 'react';
import styled from 'styled-components';


interface VideoPlayerProps {
  src: string; 
  width?: string; 
  height?: string; 
  controls?: boolean; 
  autoPlay?: boolean; 
  loop?: boolean; 
  muted?: boolean; 
}


const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  width,
  height,
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
}) => {
  return (
    <StyledVideo
      src={src}
      width={width}
      height={height}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
    />
  );
};

const StyledVideo = styled.video<VideoPlayerProps>`
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || 'auto'};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  outline: none;
  background-color: black;
`;

export default VideoPlayer;

import React, { useState } from "react";
import Sound from "react-sound";
import TetrisTheme from "../TetrisTheme.mp3";
import { StyledSoundButton, StyledSoundDiv } from "./styles/StyledSoundButton";

const PlaySound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <StyledSoundDiv>
      <StyledSoundButton onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? <li><i className="fas fa-volume-up"></i> Play Music</li> : <li><i className="fas fa-volume-mute"></i> Stop Music</li>}</StyledSoundButton>
      <Sound
        url={TetrisTheme}
        playStatus={
          isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
        }
        playFromPosition={300}
        loop={true}
      />
    </StyledSoundDiv>
  )
}

export default React.memo(PlaySound);
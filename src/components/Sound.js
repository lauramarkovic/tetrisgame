import React, { useState } from "react";
import Sound from "react-sound";
import TetrisTheme from "../TetrisTheme.mp3";
import { StyledSoundButton } from "./styles/StyledSoundButton";

const PlaySound = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div>
      <StyledSoundButton onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? 'Play Music' : 'Stop Music'}</StyledSoundButton>
      <Sound
        url={TetrisTheme}
        playStatus={
          isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
        }
        playFromPosition={300}
      />
    </div>
  )
}

export default React.memo(PlaySound);
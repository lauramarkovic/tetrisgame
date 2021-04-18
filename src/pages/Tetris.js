import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Fade from '@material-ui/core/Fade';

//Utility
import { createStage, checkCollision } from "../util/gameHelpers";
import { FETCH_RECORDS_QUERY, FETCH_USER_RECORDS_QUERY } from "../util/graphql";

//User Context
import { AuthContext } from "../context/auth";

//Custom Hooks
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

// Components
import Stage from "../components/Stage";
import Display from "../components/Display";
import StartButton from "../components/StartButton";

//Styled Components
import { StyledTetrisWrapper, StyledTetris, StyledAlert } from "./styles/StyledTetris";

const Tetris = () => {
  const { user } = useContext(AuthContext);
  const [flash, setFlash] = useState(null);

  let username;
  if (!user) {
    username = null;
  } else {
    username = user.username;
  }

  const [createRecord] = useMutation(CREATE_RECORD, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_RECORDS_QUERY
      });

      if (result.data.createRecord.score > data.getRecords[0].score) {
        setFlash(true);

        setTimeout(() => {
          setFlash(null);
        }, 5000);
      };

      proxy.writeQuery({
        query: FETCH_RECORDS_QUERY,
        data: {
          getRecords: [result.data.createRecord, ...data.getRecords].sort((a, b) => (a.score > b.score) ? -1 : 1).slice(0, 10)
        }
      });

      const { getUserRecords } = proxy.readQuery({
        query: FETCH_USER_RECORDS_QUERY,
        variables: { username }
      });

      proxy.writeQuery({
        query: FETCH_USER_RECORDS_QUERY,
        data: {
          getUserRecords: [result.data.createRecord, ...getUserRecords].sort((a, b) => (a.score > b.score) ? -1 : 1)
        },
        variables: { username }
      });
    }
  });

  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(
    rowsCleared
  );

  const movePlayer = dir => {
    if (!checkCollision(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0 })
    }
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }

  const drop = () => {
    // Increase level when player has cleared 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      // Also increase speed
      setDropTime(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log('GAME OVER!!!');
        setGameOver(true);
        setDropTime(null);
        if (user) {
          createRecord({ variables: { score, level } });
        }
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer();
      } else if (keyCode === 38) {
        playerRotate(stage, 1);
      }
    }
  }

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      {
        flash
          ? (
            <Fade in={flash} timeout={{ enter: 300, exit: 1000 }}>
              <StyledAlert severity="success">
                Congratulations, you've beaten the highest score! :)
              </StyledAlert>
            </Fade>)
          : null
      }
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <div>
              <Display gameOver={gameOver} text="Game Over" />
              <Display text={`Overall Score: ${score}`} />
              <Display text={`Level Reached: ${level}`} />
            </div>
          ) : (
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </div>
            )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
};

const CREATE_RECORD = gql`
  mutation createRecord($score: Int! $level: Int!) {
    createRecord(score: $score level: $level) {
      id 
      score 
      level
      username 
      createdAt
    }
  }
`;

export default Tetris;
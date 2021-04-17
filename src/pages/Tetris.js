import React, { useContext, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

//Utility
import { createStage, checkCollision } from "../util/gameHelpers";
import { FETCH_RECORDS_QUERY } from "../util/graphql";

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
import { StyledTetrisWrapper, StyledTetris } from "./styles/StyledTetris";

const Tetris = () => {
  const { user } = useContext(AuthContext);

  const [createRecord] = useMutation(CREATE_RECORD, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_RECORDS_QUERY
      });

      proxy.writeQuery({
        query: FETCH_RECORDS_QUERY,
        data: {
          getRecords: [result.data.createRecord, ...data.getRecords].sort((a, b) => (a.score > b.score) ? -1 : 1).slice(0, 10)
        }
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

  console.log('re-render');

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
          console.log(score, level);
          createRecord({ variables: { score, level } });
        }
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        console.log("interval on");
        setDropTime(1000 / (level + 1) + 200);
      }
    }
  }

  const dropPlayer = () => {
    console.log("interval off");
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
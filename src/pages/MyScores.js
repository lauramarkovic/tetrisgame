import React, { useContext } from 'react';
import { useQuery } from "@apollo/client";
import moment from "moment";

import Spinner from "../components/Spinner";

import { FETCH_USER_RECORDS_QUERY } from "../util/graphql";
import { StyledTableTitle, StyledTableWrapper, StyledTable, StyledTableHeader, StyledTableBody, StyledTableRow, StyledTableRank, StyledTableElement, StyledNoScores } from "./styles/StyledLeaderBoard";

//User Context
import { AuthContext } from "../context/auth";

const MyScores = () => {
  const { user } = useContext(AuthContext);
  let username;
  if (!user) {
    username = null;
  } else {
    username = user.username;
  }
  const { loading, data } = useQuery(FETCH_USER_RECORDS_QUERY, {
    variables: { username }
  });

  if (loading) return <Spinner />;
  if (!data) return <Spinner />;

  return (
    <StyledTableWrapper>
      <StyledTableTitle>My Scores</StyledTableTitle>
      <StyledTable>
        <StyledTableHeader>
          <StyledTableRow>
            <StyledTableRank>Top</StyledTableRank>
            <StyledTableElement>Score</StyledTableElement>
            <StyledTableElement>Level</StyledTableElement>
            <StyledTableElement>Achieved</StyledTableElement>
          </StyledTableRow>
        </StyledTableHeader>
        <StyledTableBody>
          {
            data.getUserRecords.length === 0 && (
              <StyledNoScores style={{ color: "#fff" }}>You have not achieved any scores yet! :)</StyledNoScores>
            )
          }
          {data.getUserRecords && data.getUserRecords.map((record, idx) => (
            <StyledTableRow key={record.id}>
              <StyledTableRank style={{ color: "#C4421A" }}>{idx + 1}</StyledTableRank>
              <StyledTableElement>{record.score}</StyledTableElement>
              <StyledTableElement>{record.level}</StyledTableElement>
              <StyledTableElement>{moment(record.createdAt).fromNow(true)} ago</StyledTableElement>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableWrapper>
  )
};

export default MyScores;

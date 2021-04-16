import React, { useContext } from 'react';
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";

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

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No data...</p>;

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

const FETCH_USER_RECORDS_QUERY = gql`
  query getUserRecords($username: String!) {
    getUserRecords(username: $username) {
      id 
      score 
      level 
      createdAt
    }
  }
`;

export default MyScores;

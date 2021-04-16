import React from 'react';
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";

import { StyledTableTitle, StyledTableWrapper, StyledTable, StyledTableHeader, StyledTableBody, StyledTableRow, StyledTableElement, StyledTableRank } from "./styles/StyledLeaderBoard";

const LeaderBoard = () => {
  const { loading, data } = useQuery(FETCH_RECORDS_QUERY);

  if (loading) return <p>Loading...</p>;

  return (
    <StyledTableWrapper>
      <StyledTableTitle>Leaderboard</StyledTableTitle>
      <StyledTable>
        <StyledTableHeader>
          <StyledTableRow>
            <StyledTableRank>Rank</StyledTableRank>
            <StyledTableElement>Player</StyledTableElement>
            <StyledTableElement>Score</StyledTableElement>
            <StyledTableElement>Achieved</StyledTableElement>
          </StyledTableRow>
        </StyledTableHeader>
        <StyledTableBody>
          {data.getRecords && data.getRecords.map((record, idx) => (
            <StyledTableRow key={record.id}>
              <StyledTableRank style={{ color: "#C4421A" }}>{idx + 1}</StyledTableRank>
              <StyledTableElement>{record.username}</StyledTableElement>
              <StyledTableElement>{record.score}</StyledTableElement>
              <StyledTableElement>{moment(record.createdAt).fromNow(true)} ago</StyledTableElement>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableWrapper>
  )
};

const FETCH_RECORDS_QUERY = gql`
  {
    getRecords {
      id 
      score 
      level 
      username 
      createdAt
    }
  }
`;

export default LeaderBoard;

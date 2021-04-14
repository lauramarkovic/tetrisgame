import React from 'react';
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

const LeaderBoard = () => {
  const { loading, data } = useQuery(FETCH_RECORDS_QUERY);

  if (data) {
    console.log(data);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Leaderboard</h1>
      <table>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Score</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Jill</td>
          <td>1129</td>
        </tr>
      </table>
    </div>
  )
};

const FETCH_RECORDS_QUERY = gql`
  {
    getRecords {
      id score level username createdAt
    }
  }
`;

export default LeaderBoard;

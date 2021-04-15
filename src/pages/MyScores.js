import React, { useContext } from 'react';
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";

//User Context
import { AuthContext } from "../context/auth";

const MyScores = () => {
  const { user } = useContext(AuthContext);
  const username = user.username;
  const { loading, data } = useQuery(FETCH_USER_RECORDS_QUERY, {
    variables: { username }
  });

  if (data) {
    console.log(data);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>My Scores</h1>
      <div>
        <div>
          <p></p>
          <p>Score</p>
          <p>Level</p>
          <p>Achieved</p>
        </div>
        {data.getUserRecords && data.getUserRecords.map((record, idx) => (
          <div key={record.id}>
            <p>{idx + 1}</p>
            <p>{record.score}</p>
            <p>{record.level}</p>
            <p>{moment(record.createdAt).fromNow(true)} ago</p>
          </div>
        ))}
      </div>
    </div>
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

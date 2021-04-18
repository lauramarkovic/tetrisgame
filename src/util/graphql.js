import gql from "graphql-tag";

export const FETCH_RECORDS_QUERY = gql`
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

export const FETCH_USER_RECORDS_QUERY = gql`
  query getUserRecords($username: String!) {
    getUserRecords(username: $username) {
      id 
      score 
      level 
      createdAt
    }
  }
`;
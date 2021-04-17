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
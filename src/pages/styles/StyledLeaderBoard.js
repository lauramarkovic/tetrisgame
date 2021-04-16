import styled from "styled-components";

export const StyledTableTitle = styled.h1`
  margin: 60px auto 20px;
  font-size: 30px;
  letter-spacing: 1.2rem;
  color: #C4421A;
`;

export const StyledTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

export const StyledTable = styled.div`
  margin: 20px auto;
  border: 2px solid #333;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  font-size: 16px;
  overflow: hidden;
`;

export const StyledTableHeader = styled.div`
  color: #000;
  background-color: rgba(0, 128, 128, 0.85);
  overflow: hidden;
  letter-spacing: 5px;
  font-weight: bold;
`;

export const StyledTableBody = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledTableRow = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: thin solid #333;
`;

export const StyledTableElement = styled.p`
  padding: 12px 15px;
  width: 300px;
  text-align: center;
  border-right: thin solid #333;

  &:last-of-type {
    border-right: none;
  }
`;

export const StyledTableRank = styled.p`
  padding: 12px 15px;
  width: 60px;
  text-align: center;
  border-right: thin solid #333;
`;

export const StyledNoScores = styled.p`
  width: 100%;
  text-align: center;
  padding: 40px;
`;
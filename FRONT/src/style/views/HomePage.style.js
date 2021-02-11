import styled from "styled-components";


export const HomeContainer = styled.div`
    display:flex;
    flex-direction: row;
`;

export const GameContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: space-between;
    width: 300px;
    height: 300px;
`;

export const ScoreBoard = styled.div`
    display:flex;
    flex-direction:column;
`;

export const ButtonList = styled.div`
    display:flex;
    flex-direction: row;
`;

export const Button = styled.button`
    cursor:pointer;
    &:disabled{
        cursor:not-allowed;
    }
`;

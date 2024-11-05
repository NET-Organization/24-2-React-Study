import React from "react";
import styled from "styled-components";


export const Home = styled.div`
    text-align: center;
    min-height: 100vh;
    background: ${({theme}) => theme.colors.colorBg};
 
`;

export const NavigationBar = styled.div`
    background: ${({theme}) => theme.colors.colorBg};
    height: 100px;
    width: 100%;
    margin-top: -40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const DataComponent = (props) => {
    const data = props.data;
    const types = data.type;

    return <PokemonBox>
      <p>{data["title"]}</p>
      <img src = {data["sprite"]}/>
      <p>{types.map(type => (<span>{type} </span>))}</p>
    </PokemonBox>;
  };

export const PokemonBox = styled.div`

    width: 21vw;
    border: 1px solid;
    border-radius: 15px;
    border-color: ${({theme}) => theme.colors.colorBorder};
    box-shadow: ${({theme}) => theme.colors.colorShadow};
    background: ${({theme}) => theme.colors.colorMain};
    color: ${({theme}) => theme.colors.colorMainFont};

`;




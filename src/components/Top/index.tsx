import styled from "styled-components";

export function Top() {
  return (
    <Style>
      <p>this is font test</p>
      <Background>
      <p>test test testßßsaß</p>
      </Background>
    </Style>
  );
}

const Style = styled.div`
  font-size: 1.5rem;
  text-align: center;
  background-color: #fff;
  color: #333;
  margin:0;
`;

const Background = styled.div`
background: #333;
color: #fff;
`;

import styled from "styled-components";

export function Top() {
  return (
    <Style>
      <h1>this is font test</h1>
      <img src="/kanamaru_half.png" alt="kanamaru" />
    </Style>
  );
}

const Style = styled.div`
  font-size: 1.5rem;
  text-align: center;
  background-color: #d4bcd4;
  color: #333;
  font-family: "Mv Boli", "Noteworthy", "Party LET";
`;

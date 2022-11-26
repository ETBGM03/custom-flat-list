import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const ImageItem = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 10px;
  resize-mode: cover;
  margin-bottom: 7px;
`;

export const TextItem = styled.Text<{fontSize?: number}>`
  font-size: ${({fontSize}) => (fontSize ? fontSize : 12)}px;
  color: black;
`;

//custom-flatlist

export const ViewRenderItem = styled.View``;

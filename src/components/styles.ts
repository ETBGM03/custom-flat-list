import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
`;

export const ImageItem = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  resize-mode: cover;
`;

export const TextItem = styled.Text<{fontSize?: number}>`
  font-size: ${({fontSize}) => (fontSize ? fontSize : 12)}px;
  color: black;
`;

//custom-flatlist

export const ViewRenderItem = styled.View``;

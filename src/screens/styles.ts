import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';

//home
export const SafeAreHome = styled.SafeAreaView`
  flex: 1;
`;

export const LoaderIndicator = styled(ActivityIndicator).attrs({
  color: 'green',
  size: 'large',
})`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;'
  height: 40px;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
`;

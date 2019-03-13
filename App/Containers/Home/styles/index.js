import styled from 'styled-components/native';
import Colors from '../../../Theme/Colors';

export const TextItem = styled.Text`
  font-size: 14px;
  color: ${Colors.text};  
  padding-left: 5px;  
`;

export const ViewCards = styled.View`
  display: flex;
  flex-direction:row;
  flex-wrap:wrap;
  justify-content:center;
  
`;

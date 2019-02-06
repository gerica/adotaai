import styled from 'styled-components/native';
import Colors from '../../../Theme/Colors';

export const ContainerPerfil = styled.View`  
    display: flex;  
    flex:1;
    background-color: ${Colors.background}
`;

export const Info = styled.View`      
    /* margin-top: 10%;     */
    /* margin-left: 5px; */
    /* margin-right: 5px; */
    padding-left: 10px;
    /* border: 1px;  */
    /* background-color: ${Colors.white} */
`;

export const ContainerPetCadastro = styled.View`      
    display: flex;  
    flex:1;
    padding-left: 20px;
    justify-content: ${'center'};
    /* align-items: ${'center'};     */
    padding-right: 20px;
    background-color: ${Colors.background}
`;

export const TextPerfil = styled.Text`
    line-height: 30px;
    font-weight: bold;
`;

export const TextItem = styled.Text`
  font-size: 14px;
  color: ${Colors.text};  
  padding-left: 5px;  
`;


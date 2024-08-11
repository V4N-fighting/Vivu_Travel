import styled from 'styled-components';



export const Wrapper = styled.div`
  max-width: 1250px;
  width: 1250px;
  margin: 0 auto;
`
export const ContentPadding = styled.div`
  padding: 0 15px;
`

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
`

export const FlexBoxBetween = styled(FlexBox)`
    justify-content: space-between;
`

export const FlexBoxAround = styled(FlexBox)`
    justify-content: space-around;
`

export const FlexBoxEvenly = styled(FlexBox)`
    justify-content: space-evenly;
`



export const FontBody = styled.p`
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`;

export const Title = styled(FontBody)<{small?: boolean, medium?: boolean, white?: boolean}>`
  font-size: ${ props => 
    props.small ? '16px' :
    props.medium ? '24px' : '54px'
  };
  color: ${ props => 
    props.white ? '#ffffff' : '#1C1C1C'
  };
  font-weight: 700;
  text-transform: none;
  line-height: 1.4;
  margin: 0 0 15px 0;
  user-select: none
`;

export const SubTitle = styled(FontBody)<{small?: boolean}>`
  color: #FF681A;
  font-size: ${ props => 
    props.small ? '20px' : '24px'
  };
  font-weight: 700;
  user-select: none;
`;

export const Text = styled(FontBody)`
  max-width: 521px; 
  margin-bottom: 24px;
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 18px 0;
  color: #505050;
  line-height: 1.625;
`

export const Button = styled.button<{blue?: boolean; orange?: boolean, white?: boolean, uppercase?: boolean}>`
  background-color: ${props => 
    props.blue ? '#37D4D9' :
    props.orange ? '#FF681A' :
    props.white ? '#ffffff' : 'black'};
  color: ${props => 
    props.blue || props.orange ? '#ffffff' : 
    props.white ? '#FF681A' : '#ffffff'};
  text-decoration: none;
  text-transform: ${props => props.uppercase ? 'uppercase' : 'normal'};
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  outline: 0;
  font-family: font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  border-radius: 10px;
  border: none;
  vertical-align: middle;
  display: inline-block;
  padding: 15px 30px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
  -webkit-transition:0.3s all ease;
  transition:0.3s ease all;
  &:hover {
    color:#FFF;
  }
  &:focus {
    color:#FFF;
  }
  &::before {
     -webkit-transition:0.5s all ease;
    transition:0.5s all ease;
    position:absolute;
    top:0;
    left:50%;
    right:50%;
    bottom:0;
    opacity:0;
    content:'';
    background-color:#37D4D9;
    z-index:-2;
  }
  &:hover {
    &::before {
      -webkit-transition:0.5s all ease;
      transition:0.5s all ease;
      left:0;
      right:0;
      opacity:1;
    }
  }
  &:focus {
    &::before {
      transition:0.5s all ease;
      left:0;
      right:0;
      opacity:1;
    }
  }
`










import styled from 'styled-components';



export const Wrapper = styled.div`
  max-width: 100%;
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












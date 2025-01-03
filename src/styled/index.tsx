import styled from 'styled-components';



export const Wrapper = styled.div`
  max-width: 100%;
  width: 1250px;
  margin: 0 auto;
`

export const WrapperPadding = styled.div`
  padding: 100px 0;
`

export const ContentPadding = styled.div`
  padding: 0 15px;
`

export const Margin_15 = styled.div`
  margin: 0 -15px;
`

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
`
export const FlexBoxStretch = styled.div`
  display: flex;
  align-items: stretch;
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

export const Title = styled(FontBody)<{small?: boolean, medium?: boolean, big?: boolean, white?: boolean, margin?: string}>`
  font-size: ${ props => 
    props.small ? '16px' :
    props.big ? '50px' :
    props.medium ? '24px' : '54px'
  };
  color: ${ props => 
    props.white ? '#ffffff' : '#1C1C1C'
  };
  font-weight: 700;
  text-transform: none;
  line-height: 1.4;
  margin: ${props => props.margin ? props.margin : '0 0 15px 0'};
  user-select: none;
`;

export const SubTitle = styled(FontBody)<{small?: boolean, white?: boolean, blue?: boolean}>`
  
  color: ${ props => 
    props.white ? '#ffffff' : 
    props.blue ? '#37D4D9' : 
    '#FF681A'
  };
  font-size: ${ props => 
    props.small ? '20px' : '24px'
  };
  font-weight: 700;
  user-select: none;
`;

export const Text = styled(FontBody)<{white?: boolean, small?: boolean}>`
  max-width: 521px; 
  /* width: 100%; */
  margin-bottom: 24px;
  font-size: ${ props => 
    props.small ? '16px' : '18px'
  };
  font-weight: 400;
  margin: 0 0 18px 0;
  color: ${ props => 
    props.white ? '#ffffff' : '#505050'
  };
  line-height: 1.625;
`

// Grid system
export const Grid = styled.div`
  width: 100%;
  display: block;
  padding: 0;
`
export const GridWide = styled.div`
  width: 100%;
  display: block;
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
`
export const GridRow = styled.div<{ margin?: string }>`
  display: flex;
  flex-wrap: wrap;
  
  --grid-margin: ${({ margin }) => margin || "4px"};
  
  margin-left: calc(-1 * var(--grid-margin));
  margin-right: calc(-1 * var(--grid-margin));
`;

export const GridCol = styled.div`
  padding-left: var(--grid-margin);
  padding-right: var(--grid-margin);
`;
export const GridCol_1 = styled(GridCol)`
  flex: 0 0 8.33333%;
  max-width: 8.33333%;
`
export const GridCol_2 = styled(GridCol)`
  flex: 0 0 16.66667%;
  max-width: 16.66667%;
`
export const GridCol_2_4 = styled(GridCol)`
  flex: 0 0 20%;
  max-width: 20%;
`
export const GridCol_3 = styled(GridCol)`
  flex: 0 0 25%;
  max-width: 25%;
`
export const GridCol_4 = styled(GridCol)`
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
`
export const GridCol_5 = styled(GridCol)`
  flex: 0 0 41.66667%;
  max-width: 41.66667%;
`
export const GridCol_6 = styled(GridCol)`
  flex: 0 0 50%;
  max-width: 50%;
`
export const GridCol_7 = styled(GridCol)`
  flex: 0 0 58.33333%;
  max-width: 58.33333%;
`
export const GridCol_8 = styled(GridCol)`
  flex: 0 0 66.66667%;
  max-width: 66.66667%;
`
export const GridCol_9 = styled(GridCol)`
  flex: 0 0 75%;
  max-width: 75%;
`
export const GridCol_10 = styled(GridCol)`
  flex: 0 0 75%;
  max-width: 75%;
`
export const GridCol_11 = styled(GridCol)`
  flex: 0 0 91.66667%;
  max-width: 91.66667%;
`
export const GridCol_12 = styled(GridCol)`
  flex: 0 0 100%;
  max-width: 100%;
`













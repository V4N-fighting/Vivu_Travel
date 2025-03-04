import React, { useState } from 'react';
import styled from 'styled-components';
import { faList, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from '../DropdownMenu';
import { Grid, GridCol, GridRow, Icon } from '../../../styled';
import TourCardDetail from '../../../Component/TourCardDetail';
import { usePagination } from '../../../Hooks/usePagination';
import Pagination from '../../../Component/Pagination';

const listContentDefault = [
  <TourCardDetail 
    key='1'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"}
    price={"1300,000đ"}
    textDensity={'1-3 người'}
    textLevel={'Trung bình'}
    horizontal={true} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}  />,
  <TourCardDetail 
    key='2'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"}
    price={"300,000đ"}
    textDensity={'1-3 người'}
    textLevel={'Trung bình'}
    horizontal={false} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}  />,
  <TourCardDetail 
    key='3'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"}
    price={"300,000đ"}
    textDensity={'1-3 người'}
    textLevel={'Trung bình'}
    horizontal={false} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}  />,
  <TourCardDetail 
    key='4'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"}
    price={"300,000đ"}
    textDensity={'1-3 người'}
    textLevel={'Trung bình'}
    horizontal={false} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}  />,
  <TourCardDetail 
    key='5'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"}
    price={"300,000đ"}
    textDensity={'1-3 người'}
    textLevel={'Trung bình'}
    horizontal={false} textDescr={'Lương Ngọc Văn đẹp trai thì thôi luôn nhé, miễn bàn miễn bàn miễn bàn miễn bàn'}  />,
];

enum ModeShow {
  List,
  Menu
}


const Content: React.FC = () => {
  const [modeShow, setModeShow] =  useState(ModeShow.List)
  const {
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    getCurrentPage
  } =  usePagination(4,listContentDefault.length)

  const listContent = listContentDefault.slice(indexOfFirstItem,indexOfLastItem)


  const handleShowMenu = () => {
    setModeShow(ModeShow.Menu)
  }

  const handleShowList = () => {
    setModeShow(ModeShow.List)
    
  }

  return (
    <Wrapper>
        <Header>
            <Arrange><DropdownMenu /></Arrange>
            <Layout>
                <Icon icon={faList} onClick={handleShowList} color={modeShow === ModeShow.List ? 'orange' : ''}/>
                <Icon icon={faGripVertical} onClick={handleShowMenu} color={modeShow === ModeShow.Menu  ? 'orange' : ''} />
            </Layout>
        </Header>
        <Contain>
        <Grid>
                <GridRow margin='10px'>
                {listContent.map((card, index) => {
                  return modeShow === ModeShow.Menu ? (
                    <GridCol col={6} key={index}>
                      {React.cloneElement(card, { horizontal: false })}
                    </GridCol>
                  ) : (
                    <GridCol col={12} key={index}>
                      {React.cloneElement(card, { horizontal: true })}
                    </GridCol>
                  );
                })}
                </GridRow>
              </Grid>
          
          <Pagination 
            totalPage={totalPages}
            onChange={(value : number)=> {getCurrentPage(value)}}
            itemsPerPage={modeShow === ModeShow.List ? 4 : 2} 
            scrollToTop={750}
          />
        </Contain>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0 20px;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Arrange= styled.div`
  padding : 0 10px;
  border-right: 1px solid #888888;
`


const Layout = styled.div`
  padding : 0 10px;
`

const Contain = styled.div`
    padding: 20px 0;
`

export default Content;

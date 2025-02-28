import React, { useState } from 'react';
import styled from 'styled-components';
import { faList, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from '../DropdownMenu';
import { Grid, GridCol, GridRow, Icon } from '../../../styled';
import Pagination from './../../../Component/Pagination/index';
import TourCardDetail from '../../../Component/TourCardDetail';

const listContent = [
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


const Content: React.FC = () => {

  const [listShow, setListShow] = useState<boolean>(true)
  const [menuShow, setMenuShow] = useState<boolean>(false)

  const handleShowMenu = () => {
    setListShow(false);
    setMenuShow(true);
  }

  const handleShowList = () => {
    setListShow(true);
    setMenuShow(false);
  }

  return (
    <Wrapper>
        <Header>
            <Arrange><DropdownMenu /></Arrange>
            <Layout>
                <Icon icon={faList} onClick={handleShowList} color={listShow ? 'orange' : ''}/>
                <Icon icon={faGripVertical} onClick={handleShowMenu} color={menuShow ? 'orange' : ''} />
            </Layout>
        </Header>
        <Contain>
          <Pagination 
            items={listContent} 
            itemsPerPage={listShow ? 4 : 2} 
            scrollToTop={750}
            renderItems={(curItems) => (
              <Grid>
                <GridRow margin='10px'>
                {curItems.map((card, index) => {
                  return menuShow ? (
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
          )} />
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

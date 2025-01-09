import React, { useState } from 'react';
import styled from 'styled-components';
import { faList, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownMenu from '../DropdownMenu';
import Card from '../../../Component/Card';
import { Grid, GridCol_12, GridCol_6, GridRow } from '../../../styled';
import Pagination from './../../../Component/Pagination/index';

const listContent = [
  <Card 
    key='1'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"} 
    price={"300,000đ"} 
    textDensity={'1-3 người'} 
    textLevel={'Trung bình'} 
    horizontal={false} 
  />,
  <Card 
    key='2'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"} 
    price={"300,000đ"} 
    textDensity={'1-3 người'} 
    textLevel={'Trung bình'} 
    horizontal={false} 
  />,
  <Card 
    key='3'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"} 
    price={"300,000đ"} 
    textDensity={'1-3 người'} 
    textLevel={'Trung bình'} 
    horizontal={false} 
  />,
  <Card 
    key='4'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"} 
    price={"300,000đ"} 
    textDensity={'1-3 người'} 
    textLevel={'Trung bình'} 
    horizontal={false} 
  />,
  <Card 
    key='5'
    url={"./images/4-900x490.jpg"}
    title={"Maldives: The Travel and Experience of the Lifetime"}
    textLocation={"Colombo, England, France"}
    textTime={"8 Ngày - 6 Đêm"} 
    price={"300,000đ"} 
    textDensity={'1-3 người'} 
    textLevel={'Trung bình'} 
    horizontal={false} 
  />,
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
                    <GridCol_6 key={index}>
                      {React.cloneElement(card, { horizontal: false })}
                    </GridCol_6>
                  ) : (
                    <GridCol_12 key={index}>
                      {React.cloneElement(card, { horizontal: true })}
                    </GridCol_12>
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
  /* padding: 0 10px; */
`

const Arrange= styled.div`
  padding : 0 10px;
  border-right: 1px solid #888888;
`


const Layout = styled.div`
  padding : 0 10px;
`

const Icon = styled(FontAwesomeIcon)`
    margin: 0 5px;
    font-size: 14px;
    padding: 0 5px;
    cursor: pointer;

    &:hover {
      color: var(--primary-color);
    }
`
const Contain = styled.div`
    padding: 20px 0;
`

export default Content;

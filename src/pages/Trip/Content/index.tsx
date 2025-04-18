import React, { useState } from 'react';
import styled from 'styled-components';
import DropdownMenu from '../DropdownMenu';
import { Grid, GridCol, GridRow } from '../../../styled';
import TourCardDetail from '../../../Component/TourCardDetail';
import { usePagination } from '../../../Hooks/usePagination';
import Pagination from '../../../Component/Pagination';
import Icons from '../../../Component/BaseComponent/Icons';
import { useTour } from '../../../service/tourService';



enum ModeShow {
  List,
  Menu
}

interface ContentProps {
  destinationIDs: string[];
  activityIDs: string[];
  typeIDs: string[]
}


const Content: React.FC<ContentProps> = ({destinationIDs, activityIDs, typeIDs}) => {
  const [modeShow, setModeShow] =  useState(ModeShow.List)

  console.log(typeIDs)

  const { data: tours, loading: tourLoading, error: tourError } = useTour({
    destinationIDs: destinationIDs,
    activityIDs: activityIDs,
    typeIDs: typeIDs,
  });

  const listContentDefault = tours ? tours.map((item, index) => {
    return (
      <TourCardDetail 
        valueID={item.id}
        key={index}
        url={"./images/4-900x490.jpg"}
        title={item.name}
        textLocation={item.countryName}
        textTime={item.duration}
        price={item.price.adult}
        textDensity={item.maxPeople}
        textLevel={item.adventureLevel}
        horizontal={true}
        textDescr={item.description} type={item.tourTypeName}      />
    )}) : [];

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

  // Xử lý trạng thái tải hoặc lỗi
  if (tourLoading) return <p>Đang tải dữ liệu...</p>;
  if (tourError) return <p>Lỗi: {tourError}</p>;
  if (!tours || tours.length === 0) return <p>Không có dữ liệu.</p>;

  return (
    <Wrapper>
        <Header>
            <Arrange><DropdownMenu /></Arrange>
            <Layout>
                <Icons.ListIcon onClick={handleShowList} color={modeShow === ModeShow.List ? 'orange' : ''}/>
                <Icons.GripverticalIcon onClick={handleShowMenu} color={modeShow === ModeShow.Menu  ? 'orange' : ''} />
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

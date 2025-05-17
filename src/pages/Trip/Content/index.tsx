import React, { useEffect, useState } from 'react';
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
  typeIDs: string[];
  price: [number, number] | undefined;
  time: [number, number] | undefined;
}


const Content: React.FC<ContentProps> = ({destinationIDs, activityIDs, typeIDs, price, time, }) => {
  const [modeShow, setModeShow] =  useState(ModeShow.List)
  const [fakeLoading, setFakeLoading] = useState(true);


  const { data: tours, loading: tourLoading, error: tourError } = useTour({
    destinationIDs: destinationIDs,
    activityIDs: activityIDs,
    typeIDs: typeIDs,
    priceRange: price,
    durationRange: time
  } );

  useEffect(() => {
    if (!tourLoading) {
      const timeout = setTimeout(() => {
        setFakeLoading(false);
      }, 1000); // 0.5s

      return () => clearTimeout(timeout);
    } else {
      setFakeLoading(true);
    }
  }, [tourLoading]);

  const listContentDefault = tours ? tours.map((item, index) => {
    return (
      <TourCardDetail 
        valueID={item.id}
        key={index}
        url={item.image}
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
  if (tourLoading || fakeLoading) return <p>Đang tải dữ liệu...</p>;

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

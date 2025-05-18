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


  const { data: tours, loading: tourLoading, error: tourError } = useTour({
    destinationIDs: destinationIDs,
    activityIDs: activityIDs,
    typeIDs: typeIDs,
    priceRange: price,
    durationRange: time
  } );

  const itemsPerPage = modeShow === ModeShow.List ? 4 : 2;

  const {
    indexOfFirstItem,
    indexOfLastItem,
    totalPages,
    getCurrentPage
  } =  usePagination(itemsPerPage, tours?.length || 0);

  const toggleMode = (mode: ModeShow) => setModeShow(mode);

  // Xử lý trạng thái tải hoặc lỗi
  if (tourLoading) return <p>Đang tải dữ liệu...</p>;

  if (tourError) return <p>Lỗi: {tourError}</p>;
  if (!tours || tours.length === 0) return <p>Không có dữ liệu.</p>;

  return (
    <Wrapper>
        <Header>
            <Arrange><DropdownMenu /></Arrange>
            <Layout>
                <Icons.ListIcon onClick={() => toggleMode(ModeShow.List)} color={modeShow === ModeShow.List ? 'orange' : ''}/>
                <Icons.GripverticalIcon onClick={() => toggleMode(ModeShow.Menu)} color={modeShow === ModeShow.Menu  ? 'orange' : ''} />
            </Layout>
        </Header>
        <Contain>
        <Grid>
                <GridRow margin='10px'>
                  {tours
                    .slice(indexOfFirstItem, indexOfLastItem)
                    .map((item, index) => (
                      <GridCol col={modeShow === ModeShow.Menu ? 6 : 12} key={index}>
                        <TourCardDetail 
                          valueID={item.id}
                          url={item.image}
                          title={item.name}
                          textLocation={item.countryName}
                          textTime={item.duration}
                          price={item.price.adult}
                          textDensity={item.maxPeople}
                          textLevel={item.adventureLevel}
                          horizontal={modeShow === ModeShow.List}
                          textDescr={item.description}
                          type={item.tourTypeName}
                          nextTour={item.departureDate}
                        />
                      </GridCol>
                  ))}
                </GridRow>

              </Grid>
          
          <Pagination 
            totalPage={totalPages}
            onChange={(value : number)=> {getCurrentPage(value)}}
            itemsPerPage={itemsPerPage} 
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

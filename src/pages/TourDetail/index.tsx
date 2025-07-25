import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridRow, GridCol} from "../../styled";
import Contain from "./Contain";
import Sidebar from "./Sidebar";
import { useRef, useState } from "react";
import MOdel from "./Modal";
import { useLocation, useParams } from "react-router-dom";
import { useTour } from "../../service/tourService";
import ListCard from "../Home/ListCard";

interface TourDetailProps {}

const TourDetail: React.FC<TourDetailProps> = () => {

    const [showModal, setShowModal] = useState<boolean>(false)
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tourId = searchParams.get('tourId');

    const { tours, isLoading, isError } = useTour({id: tourId});
   
    const formRef = useRef<HTMLFormElement | null>(null);

    const handleScrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    }

    const handleHideModal = () => {
        setShowModal(false);
    }

    if (isLoading) {
        return <>Đang tải dữ liệu</>
    }

    if (isError ) {
        return <>Lỗi dữ liệu</>
    }

    return (
        <>
            <Banner
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
                pageName={"Tour_detail"}
                thisPage={"/Tour_detail"}
            />
            <TourPage>
                <Grid>
                    <GridRow>
                        <GridCol col={8}>
                            <Contain data={tours?.[0]} formRef={formRef} />
                        </GridCol>
                        <GridCol col={4}>
                            <Sidebar data={tours?.[0]} handleScrollToForm={handleScrollToForm} showModel={handleShowModal} />
                        </GridCol>
                    </GridRow>
                </Grid>
                            
                {showModal && <MOdel data={tours?.[0]} hideModal={handleHideModal}/>}
            </TourPage>
            <ListCard />
        </>
    );
};

const TourPage = styled.div`
    display: flex;
    max-width: 1250px;
    width: 100%;
    margin: 0 auto;
    padding: 100px 0 0;
`;

export default TourDetail;

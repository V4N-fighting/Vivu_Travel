import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridRow, GridCol} from "../../styled";
import Contain from "./Contain";
import Sidebar from "./Sidebar";
import { useRef, useState } from "react";
import MOdel from "./Modal";
import { useParams } from "react-router-dom";
import { useTour } from "../../service/tourService";
import ListCard from "../Home/ListCard";

interface TourDetailProps {}

const TourDetail: React.FC<TourDetailProps> = () => {
    const { id } = useParams()

    const { data, loading, error } = useTour({id: id});
    console.log("get được dadtaa: ", data)
   
    const formRef = useRef<HTMLFormElement | null>(null);

    const [showModal, setShowModal] = useState<boolean>(false)

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
                            <Contain data={data} formRef={formRef} />
                        </GridCol>
                        <GridCol col={4}>
                            <Sidebar data={data} handleScrollToForm={handleScrollToForm} showModel={handleShowModal} />
                        </GridCol>
                    </GridRow>
                </Grid>
                            
                {showModal && <MOdel data={data} hideModal={handleHideModal}/>}
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

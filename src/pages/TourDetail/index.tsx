import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridRow, GridCol_8, GridCol_4 } from "../../styled";
import Contain from "./Contain";
import Sidebar from "./Sidebar";
import { useRef, useState } from "react";
import MOdel from "./Modal";

interface TourDetailProps {}

const TourDetail: React.FC<TourDetailProps> = () => {
   
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
                        <GridCol_8>
                            <Contain formRef={formRef} />
                        </GridCol_8>
                        <GridCol_4>
                            <Sidebar handleScrollToForm={handleScrollToForm} showModel={handleShowModal} />
                        </GridCol_4>
                    </GridRow>
                </Grid>
                            
                {showModal && <MOdel hideModal={handleHideModal}/>}
            </TourPage>

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

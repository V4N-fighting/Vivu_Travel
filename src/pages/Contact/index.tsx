import styled from "styled-components";
import Banner from "../../Component/Banner";
import Card from "./Card";


function Contact() {
    return ( 
        <ContactPage>
            <Banner 
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"} 
                pageName={"Contact"} 
                thisPage={"/Contact"}
            />
            <Card />
        </ContactPage>
    );
}

const ContactPage = styled.div`
`

export default Contact;
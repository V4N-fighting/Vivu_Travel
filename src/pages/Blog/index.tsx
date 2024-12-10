
import styled from "styled-components";
import Banner from "../../Component/Banner";

function Blog() {
    return ( 
        <BlogPage>
            <Banner 
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"} 
                pageName={"Blog"} 
                thisPage={"/Blog"}
            />
        </BlogPage>
    );
}

const BlogPage = styled.div`
`

export default Blog;
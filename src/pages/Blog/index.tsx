import styled from "styled-components";
import Banner from "../../Component/Banner";
import NewsCard from "../../Component/NewsCard";
import Sidebar from "./Sidebar";
import Pagination from "../../Component/Pagination";

interface NewsData {
    id: number;
    url: string;
    title: string;
    textLocation: string;
    textTime: string;
    label: string;
    view: string;
}

function Blog() {
    const newsData: NewsData[] = [
        { id: 1, url: "./images/4-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "12 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 2, url: "./images/5-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 3, url: "./images/6-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 4, url: "./images/4-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "12 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 5, url: "./images/5-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 6, url: "./images/6-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
    
        { id: 7, url: "./images/4-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "12 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 8, url: "./images/5-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 9, url: "./images/6-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 10, url: "./images/4-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "12 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 11, url: "./images/5-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
        { id: 12, url: "./images/6-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textLocation: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
    
    ];

    return (
        <>
            <Banner
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
                pageName={"Blog"}
                thisPage={"/Blog"}
            />
            <BlogPage>
                <Contain>
                    <Pagination 
                        items={newsData} 
                        itemsPerPage={4} 
                        renderItems={(curItem) => (
                            <Content>
                                {curItem.map((news) => (
                                    <Col key={news.id}>
                                        <NewsCard
                                            url={news.url}
                                            title={news.title}
                                            textLocation={news.textLocation}
                                            textTime={news.textTime}
                                            label={news.label}
                                            view={news.view}
                                        />
                                    </Col>
                                ))}
                            </Content>
                        )} 
                    />
                </Contain>
                <Sidebar />
            </BlogPage>
            
        </>
    );
}

const BlogPage = styled.div`
    display: flex;
    max-width: 1250px;
    width: 100%;
    margin: 0 auto;
    padding: 100px 0;
`;

const Contain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    padding: 0 10px;
    /* margin: 0 10px; */
`

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Col = styled.div`
    /* flex: 0 50%; */
    width: 50%;
    padding: 0 15px 30px;
`;




export default Blog;

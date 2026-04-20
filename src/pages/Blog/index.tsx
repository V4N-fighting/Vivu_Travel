import styled from "styled-components";
import Banner from "../../Component/Banner";
import NewsCard from "../../Component/NewsCard";
import Sidebar from "./Sidebar";
import { usePagination } from "../../Hooks/usePagination";
import Pagination from "../../Component/Pagination";

interface NewsData {
    id: number;
    url: string;
    title: string;
    textDescr: string;
    textTime: string;
    label: string;
    view: string;
}

const newsData: NewsData[] = [
    { id: 1, url: "./images/4-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "12 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 2, url: "./images/5-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 3, url: "./images/6-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 4, url: "./images/4-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "12 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 5, url: "./images/5-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 6, url: "./images/6-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },

    { id: 7, url: "./images/4-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "12 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 8, url: "./images/5-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 9, url: "./images/6-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 10, url: "./images/4-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "12 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 11, url: "./images/5-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },
    { id: 12, url: "./images/6-1-900x490.jpg", title: "Maldives: The Travel and Experience of the Lifetime", textDescr: "a ad ad asasdsaad f sa fas fa fas g à sa á fsa f sà sa fa sf à á f ag asg a ga sg ", textTime: "2 tháng Năm, 2024", label: "Universe", view: "12323" },

];

const ITEM_PER_PAGE = 4;

function Blog() {
    const {
        indexOfFirstItem,
        indexOfLastItem,
        totalPages,
        getCurrentPage
      } =  usePagination(ITEM_PER_PAGE,newsData.length)
    
      const listContent = newsData.slice(indexOfFirstItem,indexOfLastItem)

    return (
        <>
            <Banner
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
                pageName={"Blog"}
                thisPage={"/Blog"}
            />
            <BlogPage>
                <Contain>
                    
                    <Content>
                        {listContent.map((item, index) => {
                            return <Col key={index}>
                                        <NewsCard
                                            url={item.url}
                                            title={item.title}
                                            textDescr={item.textDescr}
                                            textTime={item.textTime}
                                            label={item.label}
                                            view={item.view}
                                        />
                            </Col>
                        })}
                        <Pagination 
                            itemsPerPage={ITEM_PER_PAGE} 
                            totalPage={totalPages} 
                            onChange={(value : number)=> {getCurrentPage(value)}} 
                        />
                    </Content>
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
    width: 50%;
    padding: 0 15px 30px;
`;




export default Blog;

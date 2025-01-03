import styled from "styled-components";
import { MouseEvent, useState } from "react";
import Banner from "../../Component/Banner";
import NewsCard from "../../Component/NewsCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Title } from "../../styled";
import BlogItem from "../../Component/BlogItem";

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

    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 4;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = newsData.slice(startIndex, startIndex + itemsPerPage);

    const totalPages = Math.ceil(newsData.length / itemsPerPage);

    const handlePageChange = (newPage: number, e: MouseEvent) => {
        console.log(e)
        setCurrentPage(newPage);
        window.scrollTo({ top: 600, behavior: 'smooth' });
    };

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
                        {paginatedNews.map((news) => (
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
                    <Pagination>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PageButton
                                key={index}
                                active={index + 1 === currentPage}
                                onClick={(e) => handlePageChange(index + 1, e)}
                            >
                                {index + 1}
                            </PageButton>
                        ))}
                    </Pagination>
                </Contain>
                <SideBar>
                    <SearchBox>
                        {/* <Title medium>Tìm kiếm</Title> */}
                        <Icon icon={faMagnifyingGlass} />
                        <SearchInput placeholder="Tìm kiếm bài viết" />
                    </SearchBox>
                    <TypeBox>
                        <Title small>Chọn loại bài viết</Title>
                        <TypeItem>
                            <input type="checkbox" />
                            <span>Vũ trụ</span>
                        </TypeItem>
                        <TypeItem>
                            <input type="checkbox" />
                            <span>Xàm xí</span>
                        </TypeItem>
                        <TypeItem>
                            <input type="checkbox" />
                            <span>Tào lao</span>
                        </TypeItem>
                    </TypeBox>
                    <OrtherBlog>
                        <Title small>Các bài viết khác</Title>
                        <ListBlog>
                            <BlogItem
                                imgUrl="./images/insta6.jpg"
                                timeText="12 Tháng Mười Hai 2024"
                                blogTitle="10 Sun Hats For Beach Days, Long"
                            />
                            <BlogItem
                                imgUrl="./images/insta5.jpg"
                                timeText="12 Tháng Mười Hai 2024"
                                blogTitle="10 Sun Hats For Beach Days, Long"
                            />
                            <BlogItem
                                imgUrl="./images/insta4.jpg"
                                timeText="12 Tháng Mười Hai 2024"
                                blogTitle="10 Sun Hats For Beach Days, Long"
                            />
                            <BlogItem
                                imgUrl="./images/insta3.jpg"
                                timeText="12 Tháng Mười Hai 2024"
                                blogTitle="10 Sun Hats For Beach Days, Long"
                            />
                        </ListBlog>
                    </OrtherBlog>
                </SideBar>
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

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;

`;

const PageButton = styled.button<PageButtonProps>`
    margin: 0 5px;
    padding: 8px 16px;
    border: none;
    background-color: ${({ active }) => (active ? "#37D4D9" : "#f0f0f0")};
    color: ${({ active }) => (active ? "#fff" : "#000")};
    cursor: pointer;

    &:hover {
        background-color: #37D4D9;
        color: #fff;
    }
`;

interface PageButtonProps {
    active: boolean;
}

const SideBar = styled.div`
    width: 30%;
    padding:  0 10px 10px;
    /* margin: 0 10px; */
`;

const SearchBox = styled.div`
    padding: 20px 30px;
    display: flex;
    align-items: center;
    border-radius: 20px;
    border: 1px solid red;
    margin: 0 0 30px;
`
const SearchInput = styled.input`
    width: 100%;
    font-size: 14px;
    color: #777777;
    border: none;
    outline-color: none;
    padding: 10px 8px;

    &:focus {
        outline: none;
        border: none;
    }
`

const Icon = styled(FontAwesomeIcon)`
    margin-right: 5px;
    font-size: 18px;
`

const TypeBox = styled.div`
    padding: 20px 30px;
    border-radius: 20px;
    border: 1px solid red;
    margin: 0 0 30px;
`
const TypeItem = styled.div`
    padding: 10px 0 10px 10px;

    & input {
        font-size: 14px;
    }

    & span {
        font-size: 14px;
        color: black;
        margin-left: 20px;
    }
`

const OrtherBlog = styled.div`
    padding: 20px 30px;
    border-radius: 20px;
    border: 1px solid red;
    margin: 0 0 15px;
`
const ListBlog = styled.div`
    margin-top: 23px;
`;

export default Blog;

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import BlogItem from "../../../Component/BlogItem";
import { Title } from "../../../styled";



interface SidebarProps {
}

const Sidebar: React.FC<SidebarProps> = () => {
    return ( 
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
     );
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

export default Sidebar;
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import BlogItem from "../../../Component/BlogItem";
import { Icon, Title } from "../../../styled";
import Icons from "../../../Component/BaseComponent/Icons";



interface SidebarProps {
}

const types = ['Vũ trụ', 'Xàm xí', 'Tào lao'];

const blogs = [
    {
        img: "./images/insta6.jpg",
        time: "12 Tháng Mười Hai 2024",
        title: "10 Sun Hats For Beach Days, Long"
    },
    {
        img: "./images/insta5.jpg",
        time: "12 Tháng Mười Hai 2024",
        title: "10 Sun Hats For Beach Days, Long"
    },
    {
        img: "./images/insta4.jpg",
        time: "12 Tháng Mười Hai 2024",
        title: "10 Sun Hats For Beach Days, Long"
    },
    {
        img: "./images/insta3.jpg",
        time: "12 Tháng Mười Hai 2024",
        title: "10 Sun Hats For Beach Days, Long"
    },
]


const Sidebar: React.FC<SidebarProps> = () => {
    return ( 
        <SideBar>
            <SearchBox>
                <Icons.SearchIcon />
                <SearchInput placeholder="Tìm kiếm bài viết" />
            </SearchBox>
            <TypeBox>
                <Title small>Chọn loại bài viết</Title>
                {types.map((type, index) => {
                    return <TypeItem key={index}>
                                <input type="checkbox" />
                                <span>{type}</span>
                            </TypeItem>
                })}
            </TypeBox>
            <OrtherBlog>
                <Title small>Các bài viết khác</Title>
                <ListBlog>
                    {blogs.map((blog, index) => {
                        return <BlogItem
                                    key={index}
                                    imgUrl={blog.img}
                                    timeText={blog.time}
                                    blogTitle={blog.title}
                                />
                    })}
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
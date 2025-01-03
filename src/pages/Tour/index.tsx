import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol_4, GridRow } from "../../styled";
import { useState } from "react";
import TourCard from "../../Component/TourCard";

// Dữ liệu mẫu
const tours = [
  { id: 1, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Boating" },
  { id: 2, url: "./images/destinations-1-1.jpg", label: "(5 Trips)", name: "City Tour" },
  { id: 3, url: "./images/destinations-1-1.jpg", label: "(3 Trips)", name: "Cycling" },
  { id: 4, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "Hiking" },
  { id: 5, url: "./images/destinations-1-1.jpg", label: "(1 Trip)", name: "Jungle Safari" },
  { id: 6, url: "./images/destinations-1-1.jpg", label: "(6 Trips)", name: "Peak Climbing" },
  { id: 7, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Rafting" },
  { id: 8, url: "./images/destinations-1-1.jpg", label: "(4 Trips)", name: "Skiing" },
  { id: 9, url: "./images/destinations-1-1.jpg", label: "(2 Trips)", name: "Trekking" },
];



function Tour() {
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 9; // Số lượng thẻ trên mỗi trang

  // Tính toán dữ liệu hiển thị cho trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTours = tours.slice(indexOfFirstItem, indexOfLastItem);

  // Tổng số trang

  const totalPages = Math.ceil(tours.length / itemsPerPage);

  

  // Thay đổi trang khi người dùng nhấn vào nút phân trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 650, behavior: 'smooth' });
  };

  return (
    <>
      <Banner
        background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
        pageName={"Các loại tour"}
        thisPage={"/Các loại tour"}
      />
      <Container>
        <Grid>
          <GridRow margin="20px">
            {currentTours.map((tour, index) => (
              <GridCol_4 key={index}>
                <TourCard
                  url={tour.url}
                  label={tour.label}
                  name={tour.name}
                />
              </GridCol_4>
            ))}
          </GridRow>
        </Grid>
        {/* Phân trang dạng số */}
        {totalPages > 1 && <Pagination>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </Pagination>}
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 100px 0;
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Pagination = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 8px;

  button {
    padding: 8px 12px;
    background-color: #f1f1f1;
    border: 1px solid #ddd;
    cursor: pointer;
    border-radius: 4px;
    transition: 0.3s;

    &:hover {
      background-color: #007bff;
      color: #fff;
    }

    &.active {
      background-color: #007bff;
      color: #fff;
      font-weight: bold;
    }
  }
`;

export default Tour;

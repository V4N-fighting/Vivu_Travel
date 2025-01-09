import styled from "styled-components";
import { useState } from "react";

interface PaginationProps<T> {
  items: T[]; 
  itemsPerPage: number; 
  renderItems: (items: T[]) => JSX.Element; 
  scrollToTop?: number; 
}

function Pagination<T>({
  items,
  itemsPerPage,
  renderItems,
  scrollToTop = 0, // Mặc định cuộn lên đầu trang
}: PaginationProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (scrollToTop) {
      window.scrollTo({ top: scrollToTop, behavior: "smooth" });
    }
  };

  return (
    <Container>
      {renderItems(currentItems)}
      {totalPages > 1 && (
        <PaginationWrapper>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? "active" : ""}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </PaginationWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PaginationWrapper = styled.div`
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

export default Pagination;

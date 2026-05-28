
import { useState } from "react";

export const usePagination = (itemsPerPage: number, lengthOfItems: number) => {
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const totalPages = Math.ceil(lengthOfItems / itemsPerPage);

    const getCurrentPage = (value: number) => {
        setCurrentPage(value)
    }
  
    return {
        indexOfFirstItem,
        indexOfLastItem,
        totalPages,
        currentPage, 
        getCurrentPage
    }
}
  
  
  
  
  
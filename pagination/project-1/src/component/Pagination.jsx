import { useState } from "react";

const Pagination = ({
  totalItems,
  productLimit,
  navigationLimit,
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  let totalPage = Math.ceil(totalItems / productLimit);

  const nextPage = () => {
    currentPage < totalPage
      ? setCurrentPage((prevState) => prevState + 1)
      : setCurrentPage(totalPage);
  };

  const prevPage = () => {
    currentPage > 1
      ? setCurrentPage((prevState) => prevState - 1)
      : setCurrentPage(1);
  };

  const goto = (pageNo) => {
    setCurrentPage(pageNo);
  };

  let startPage = (currentPage - 1) * productLimit;
  if (startPage < 0) {
    startPage = 0;
  }

  let endPage = startPage + productLimit;
  if (endPage > totalItems) {
    endPage = totalItems;
  }

  let startNavItem = currentPage - Math.floor(navigationLimit / 2);
  if (startNavItem < 1) startNavItem = 1;

  if (startNavItem + navigationLimit > totalPage) {
    startNavItem = totalPage - navigationLimit + 1;
  }

  const navItem = Array.from(
    { length: navigationLimit },
    (_, index) => startNavItem + index
  );

  return children({
    currentPage,
    nextPage,
    prevPage,
    goto,
    startPage,
    endPage,
    navItem,
  });
};

export default Pagination;

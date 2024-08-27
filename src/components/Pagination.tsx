import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageRange = 2;

  const generatePaginationItems = () => {
    const items: React.ReactNode[] = [];

    if (totalPages <= 5) {
      for (let page = 1; page <= totalPages; page++) {
        items.push(
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`mx-1 px-4 py-2 border rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-black'
            }`}
          >
            {page}
          </button>
        );
      }
      return items;
    }
    const pagesBeforeCurrent = Math.max(currentPage - pageRange, 1);
    const pagesAfterCurrent = Math.min(currentPage + pageRange, totalPages);

    if (pagesBeforeCurrent > 1) {
      items.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={`mx-1 px-4 py-2 border rounded ${
            currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          1
        </button>
      );
      if (pagesBeforeCurrent > 2) {
        items.push(
          <span key="ellipsis-start" className="mx-1 px-4 py-2 border rounded text-black">
            ...
          </span>
        );
      }
    }
    for (let page = pagesBeforeCurrent; page <= pagesAfterCurrent; page++) {
      items.push(
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`mx-1 px-4 py-2 border rounded ${
            currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          {page}
        </button>
      );
    }
    if (pagesAfterCurrent < totalPages) {
      if (pagesAfterCurrent < totalPages - 1) {
        items.push(
          <span key="ellipsis-end" className="mx-1 px-4 py-2 border rounded text-black">
            ...
          </span>
        );
      }
      items.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`mx-1 px-4 py-2 border rounded ${
            currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return items;
  };

  return (
    <div className="flex justify-center mt-4 mb-8">
      {generatePaginationItems()}
    </div>
  );
};

export default Pagination;

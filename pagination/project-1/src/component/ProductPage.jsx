import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

const ProductPage = ({ fetchData }) => {
  const { total, products = [] } = fetchData;
  const PRODUCT_LIMIT = 10;
  const NAVIGATION_LIMIT = 5;

  return (
    <Pagination
      totalItems={total}
      productLimit={PRODUCT_LIMIT}
      navigationLimit={NAVIGATION_LIMIT}
    >
      {({
        currentPage,
        startPage,
        endPage,
        goto,
        nextPage,
        prevPage,
        navItem,
      }) => {
        return (
          <>
            <div className="flex card-wrapper">
              {products.slice(startPage, endPage).map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
            <div className="flex nav-item-wrapper">
              <button onClick={prevPage} className="nav-items">
                {"<"}
              </button>
              {navItem.map((nav) => (
                <button
                  className={`nav-items ${nav === currentPage ? "active" : ""}`}
                  onClick={() => {
                    goto(nav);
                  }}
                  key={nav}
                >
                  {nav}
                </button>
              ))}
              <button onClick={nextPage} className="nav-items">
                {">"}
              </button>
            </div>
          </>
        );
      }}
    </Pagination>
  );
};

export default ProductPage;

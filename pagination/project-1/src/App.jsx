import { useEffect, useState } from "react";
import ProductPage from "./component/ProductPage.jsx";

function App() {
  const [products, setProducts] = useState({});

  console.log(products);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/products?limit=500"
        );
        if (!response.ok) {
          throw new Error("faild to fetch data");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(`somting went wrong ${error.message}`);
      }
    };

    fetchData();
  }, []);

  if (products.products?.length < 0) {
    return <div>No Product Found</div>;
  } else {
    return <ProductPage fetchData={products} />;
  }
}

export default App;

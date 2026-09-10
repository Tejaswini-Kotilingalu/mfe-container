import React, { Suspense } from "react";

const ProductList = React.lazy(() => import("products/ProductList"));
const Cart = React.lazy(() => import("cart/Cart"));

function App() {
  return (
    <div>
      <h1>Micro Frontend App</h1>

      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
        <Cart />
      </Suspense>
    </div>
  );
}

export default App;
import React, { useState } from "react";
import Navigation from "./Navigation/Navigation";
import Product from "./Products/Product";
import Recommended from "./Recommended/Recommended";
import Sidebar from "./Sidebar/Sidebar";
import "./index.css";
//Database
import products from "./db/data.jsx";
import Card from "./Component/Card";
const App = () => {
  const [selectedCategory, setselectedCategory] = useState(null);
  //input filter
  const [query, setquery] = useState("");
  const handleInputChange = (event) => {
    setquery(event.target.value);
  };
  const filteredItems = products.filter(
    (p) => p.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1
  );

  //radio filter
  const handleChange = (event) => {
    setselectedCategory(event.target.value);
  };
  //button filter
  const handleClick = (event) => {
    setselectedCategory(event.target.value);
  };
  function filteredData(products, selected, query) {
    let filteredProducts = products;
    //filtering input items
    if (query) {
      filteredProducts = filteredItems;
    }
    //selected filtering
    if (selected) {
      filteredProducts = filteredProducts.filter(
        ({ category, color, company, newPrice, title }) =>
          category === selected ||
          color === selected ||
          company === selected ||
          newPrice === selected ||
          title === selected
      );
    }
    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }
  const result = filteredData(products, selectedCategory, query);
  return (
    <div>
      <Sidebar handleChange={handleChange} />
      <Navigation query={query} handleInputChange={handleInputChange} />
      <Recommended handleClick={handleClick} />
      <Product result={result} />
    </div>
  );
};

export default App;

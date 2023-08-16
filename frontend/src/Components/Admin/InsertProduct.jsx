import React, { useState } from "react";
import "./AdminCSS/InsertProduct.css"; //css
import Dropzone from "react-dropzone";

export default function InsertProduct() {
  const [productDetails, setProductDetails] = useState({
    productName: "",
    productPrice: "",
    productDetails: "",
    productCategory: "",
  });
  function handleInput(e) {
    let name = e.target.name,
      value = e.target.value;
    setProductDetails({ ...productDetails, [name]: value });
  }
  // function handleSelect(e){
  //   setProductDetails(productDetails.productCategory: e.target.value)
  // }
  return (
    <div className="addProduct">
      <h1>Add product</h1>

      <div className="form">
        <div className="details">
          <label>
            <h4> Product Name</h4>
            <input
              value={productDetails.productName}
              onChange={handleInput}
              name="productName"
              type="text"
              placeholder="Enter product name..."
            />
          </label>
          <label>
            <h4> Product Price</h4>
            <input
              value={productDetails.productPrice}
              onChange={handleInput}
              name="productPrice"
              type="text"
              placeholder="Enter product price..."
            />
          </label>
          <label>
            <h4>Product Description</h4>
            <input
              value={productDetails.productDetails}
              onChange={handleInput}
              name="productDetails"
              className="description"
              type="text"
              placeholder="Enter product description..."
            />
          </label>
        </div>
        <div className="insert_category">
          <h4>Select Category</h4>
          <select
            name="productCategory"
            onChange={handleInput}
            value={productDetails.productCategory}
          >
            <option value="">Select</option>
            <option value="pc">PC</option>
            <option value="tv">TV</option>
            <option value="headset">HeadSet</option>
            <option value="smartwatch">Smart Watch</option>
            <option value="laptop">Laptop</option>
            <option value="earphone">Earphone</option>
            <option value="accessories">Accessories</option>
            <option value="keyboard">Keyboard</option>
            <option value="mouse">Mouse</option>
            <option value="gameconsole">Game Console</option>
            <option value="speaker">Speaker</option>
            <option value="display">Display</option>
          </select>
        </div>
        <div className="image">
          <label>
            <h4>Product Image</h4>
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <h3 className="drag-drop">
                      <p> Drop Image Here...</p>
                      <small
                        style={{
                          borderBottom: "1px solid blue",
                          color: "blue",
                        }}
                      >
                        Click to Select
                      </small>
                    </h3>
                  </div>
                </section>
              )}
            </Dropzone>
          </label>
        </div>
        <button>Add product</button>
      </div>
    </div>
  );
}

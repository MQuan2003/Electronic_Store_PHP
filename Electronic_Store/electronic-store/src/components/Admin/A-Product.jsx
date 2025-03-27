import React, { useState } from "react";
import styles from "../../css/Admin/A-Product.module.css";

const products = [
  { id: 1, name: "Men Grey Hoodie", category: "Hoodies", inventory: "96 in stock", color: "Black", price: "$49.90", rating: "5.0 (32 Votes)", image: "grey-hoodie.png", checked: true },
  { id: 2, name: "Women Striped T-Shirt", category: "T-Shirt", inventory: "56 in stock", color: "White", price: "$34.90", rating: "4.8 (24 Votes)", image: "striped-tshirt.png", checked: true },
  { id: 3, name: "Women White T-Shirt", category: "T-Shirt", inventory: "78 in stock", color: "White", price: "$40.90", rating: "5.0 (54 Votes)", image: "white-tshirt.png", checked: true },
  { id: 4, name: "Men White T-Shirt", category: "T-Shirt", inventory: "32 in stock", color: "White", price: "$49.90", rating: "4.5 (31 Votes)", image: "men-white-tshirt.png", checked: false },
  { id: 5, name: "Women Red T-Shirt", category: "T-Shirt", inventory: "32 in stock", color: "White", price: "$34.90", rating: "4.9 (22 Votes)", image: "red-tshirt.png", checked: true },
  { id: 6, name: "Women White T-Shirt", category: "T-Shirt", inventory: "Out of Stock", color: "White", price: "$40.90", rating: "5.0 (54 Votes)", image: "white-tshirt.png", checked: false },
  { id: 7, name: "Men White T-Shirt", category: "T-Shirt", inventory: "Out of Stock", color: "White", price: "$49.90", rating: "4.5 (31 Votes)", image: "men-white-tshirt.png", checked: false },
  { id: 8, name: "Women Red T-Shirt", category: "T-Shirt", inventory: "Out of Stock", color: "White", price: "$34.90", rating: "4.9 (22 Votes)", image: "red-tshirt.png", checked: false }
];
const ProductTable = ({ onAdd, onEdit }) => {
  
  return (
    <div className={styles.productTable}>
      <div className={styles.tableHeader}>
        <h2>Products</h2>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Inventory</th>
            <th>Color</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div>
                  <p>{product.name}</p>
                  <span>{product.category}</span>
                </div>
              </td>
              <td className={product.inventory.includes("Out of Stock") ? styles.outOfStock : ""}>{product.inventory}</td>
              <td>{product.color}</td>
              <td>{product.price}</td>
              <td>{product.rating}</td>
              <td>
                <button onClick={() => onAdd()}>Add</button> | 
                <button onClick={() => onEdit(product)}>Edit</button> | 
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;




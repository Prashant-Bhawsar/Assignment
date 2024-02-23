import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FunctionAddProduct } from "../Redux/Action";
import "./css/ProductForm.css";
const initialProduct = {
  name: "",
  category: "",
  description: "",
  expiryDate: "",
  costPrice: "",
  sellPrice: "",
  discountPercentage: "",
  discountedSellPrice: "0", // Initial value for the calculated field
  finalPrice: "0", // Initial value for the calculated field
};
const AddProduct = () => {
  const [product, setProduct] = useState(initialProduct);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate the form
    const isValid = validateForm();

    // If the form is valid, submit the data
    if (isValid) {
      dispatch(FunctionAddProduct(product));
    }

    navigate("/product");
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!product.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!product.category) {
      newErrors.category = "Category is required";
    }

    if (!product.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!product.expiryDate) {
      newErrors.expiryDate = "Expiry Date is required";
    }

    if (!product.costPrice) {
      newErrors.costPrice = "Cost Price is required";
    }

    if (!product.sellPrice) {
      newErrors.sellPrice = "Sell Price is required";
    }

    if (!product.discountPercentage) {
      newErrors.discountPercentage = "Discount Percentage is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors, indicating the form is valid
    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    const calculatePrices = () => {
      const costPrice = parseFloat(product.costPrice);
      const sellPrice = parseFloat(product.sellPrice);
      const discountPercentage = parseFloat(product.discountPercentage);

      const discountedSellPrice =
        sellPrice - (sellPrice * discountPercentage) / 100;
      const finalPrice = costPrice - (costPrice * discountPercentage) / 100;

      setProduct((prevProduct) => ({
        ...prevProduct,
        discountedSellPrice: discountedSellPrice.toFixed(2),
        finalPrice: finalPrice.toFixed(2),
      }));
    };

    calculatePrices();
  }, [product.costPrice, product.sellPrice, product.discountPercentage]);

  return (
    <>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        {/* Category */}
        <label>
          Category:
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Groceries">Groceries</option>
            <option value="Tech">Technology</option>
            <option value="Clothing">Clothing</option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </label>

        {/* Description */}
        <label>
          Description:
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </label>

        {/* Expiry Date */}
        <label>
          Expiry Date:
          <input
            type="date"
            name="expiryDate"
            value={product.expiryDate}
            onChange={handleChange}
            required
          />
          {errors.expiryDate && (
            <span className="error">{errors.expiryDate}</span>
          )}
        </label>

        {/* Cost Price */}
        <label>
          Cost Price:
          <input
            type="number"
            name="costPrice"
            value={product.costPrice}
            onChange={handleChange}
            required
          />
          {errors.costPrice && (
            <span className="error">{errors.costPrice}</span>
          )}
        </label>

        {/* Sell Price */}
        <label>
          Sell Price:
          <input
            type="number"
            name="sellPrice"
            value={product.sellPrice}
            onChange={handleChange}
            required
          />
          {errors.sellPrice && (
            <span className="error">{errors.sellPrice}</span>
          )}
        </label>

        {/* Discount Percentage */}
        <label>
          Discount(%):
          <input
            type="number"
            name="discountPercentage"
            value={product.discountPercentage}
            onChange={handleChange}
            required
          />
          {errors.discountPercentage && (
            <span className="error">{errors.discountPercentage}</span>
          )}
        </label>

        {/* Discounted Sell Price */}
        <label>
          Discounted Sell Price:
          <input
            type="number"
            name="discountedSellPrice"
            value={product.discountedSellPrice}
            readOnly
          />
        </label>

        {/* Final Price */}
        <label>
          Final Price:
          <input
            type="number"
            name="finalPrice"
            value={product.finalPrice}
            readOnly
          />
        </label>

        <button type="submit">Submit</button>
      </form>

      <Link className="my-3 btn btn-danger" to={"/product"}>
        Back
      </Link>
    </>
  );
};

export default AddProduct;

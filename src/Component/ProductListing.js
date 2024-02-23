import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchProductList, Removeproduct } from "../Redux/Action";

const ProductListing = (props) => {
  const [products, setProducts] = useState(props.product.productlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  console.log(props.product.productlist);
  useEffect(() => {
    props.loadproduct();
  }, []);
  useEffect(() => {
    setProducts(props.product.productlist);
  }, [props.product.productlist]);
  const handledelete = (code) => {
    if (window.confirm("Do you want to remove?")) {
      props.removeproduct(code);
      props.loadproduct();
      toast.success("Product removed successfully.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (product) => !selectedCategory || product.category === selectedCategory
    )
    .sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  return props.product.loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : props.product.errmessage ? (
    <div>
      <h2>{props.product.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Search by Name:</label>
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Filter by Category:</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <label className="form-label">Sort by Name:</label>
            <button className="btn btn-success" onClick={handleSortToggle}>
              {`Order ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <Link to={"/product/add"} className="btn btn-success">
            Add Product [+]
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Id</td>
                <td>Name</td>
                <td>Category</td>
                <td>Description</td>
                <td>Expiry Date</td>
                <td>Cost Price</td>
                <td>Sell Price</td>
                <td>Discount</td>
                <td>Discounted Sell Price</td>
                <td>Final Price</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredProducts &&
                filteredProducts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>{item.expiryDate}</td>
                    <td>{item.costPrice}</td>
                    <td>{item.sellPrice}</td>
                    <td>{item.discountPercentage}%</td>
                    <td>{item.discountedSellPrice}</td>
                    <td>{item.finalPrice}</td>
                    <td>
                      <Link
                        to={"/product/edit/" + item.id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>{" "}
                      |
                      <button
                        onClick={() => {
                          handledelete(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loadproduct: () => dispatch(FetchProductList()),
    removeproduct: (code) => dispatch(Removeproduct(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);

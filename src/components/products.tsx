import axios from "axios";

const api_url = "http://localhost:8080/api/products/"

const Products = () => {
    axios.get(api_url);
}
export default Products;
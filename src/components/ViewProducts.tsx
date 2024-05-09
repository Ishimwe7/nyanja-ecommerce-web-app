import '../CSS/viewProducts.css'
import React, { useEffect, useState } from 'react';

const ViewProducts: React.FC = () => {

    const api_url = 'http://localhost:8080/api/products';
    // const [products, setProducts] = useState([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const response = await fetch(api_url + '/allProducts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                const data = await response.json();
                if (data != null) {
                    setProducts(data);
                }
                else {
                    console.log('No data found')
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        loadProducts();
    }, []);

    return <div id="view-products">
        <h1>All products in the stock</h1>
        <div className="products-list">
            {products.map(product => (
                <div key={product.id} className="product">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Category: {product.category}</p>
                    <div className='productBtns'>
                        <button className='editBtn'>Edit</button>
                        <button className='deleteBtn'>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
}
export default ViewProducts;

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
}
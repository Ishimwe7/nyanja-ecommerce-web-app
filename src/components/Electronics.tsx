import '../CSS/categoryStyles.css'
import React, { useEffect, useState } from 'react';
// import Header from './header';
// import Footer from './footer';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    imagePath:string
}

const ElectronicsProducts: React.FC = () => {

    const api_url = 'http://localhost:8080/api/products';
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




    // Group products by category
    const electronicsProducts = products.filter(product => product.category === 'Electronics');


    return (
            <div id="category-products">
                <h1>Electronics Store</h1>
                {electronicsProducts.length === 0 && <p className='no-products'>No Products in Electronics Store</p>}
                <div className="products-list">
                    {electronicsProducts.map(product => (
                        <div key={product.id} className="product">
                                {product.imagePath && (
                        <img className='product-img' src={`http://localhost:8080/products/images/${product.imagePath}`} alt={product.imagePath} />
                    )}
                            <h4>{product.name}</h4>
                            <p>{product.description}</p>
                            <p>Price: {product.price} $</p>
                            <p>Quantity: {product.quantity} items</p>
                            <button id='addCart'>Add Cart</button>
                        </div>
                    ))}
                </div>
            </div>
    );
}

export default ElectronicsProducts;
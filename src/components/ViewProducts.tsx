import '../CSS/viewProducts.css'
import React, { useEffect, useState } from 'react';


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string
}

// const ViewProducts: React.FC = () => {

//     const api_url = 'http://localhost:8080/api/products';
//     // const [products, setProducts] = useState([]);
//     const [products, setProducts] = useState<Product[]>([]);

//     useEffect(() => {
//         const loadProducts = async () => {
//             try {
//                 const response = await fetch(api_url + '/allProducts', {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                 });
//                 const data = await response.json();
//                 if (data != null) {
//                     setProducts(data);
//                 }
//                 else {
//                     console.log('No data found')
//                 }
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         };
//         loadProducts();
//     }, []);

//     const handleDeleteBtnClick = async (productId: number) => {
//         // Perform asynchronous operations here
//         await deleteProduct(productId);
//     };

//     const deleteProduct = async (productId: number) => {
//         try {
//             const response = await fetch(api_url + '/deleteProduct/' + productId, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//             });
//             // const data = await response.json();
//             if (response.ok) {
//                 alert("Product Deleted Successfully ")
//                 const updatedProducts = products.filter(product => product.id !== productId);
//                 // Update the state
//                 setProducts(updatedProducts);
//             }
//             else {
//                 console.log('Product deletion failed')
//             }
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     };

//     return <div id="view-products">
//         <h1>All products in the stock</h1>
//         <div className="products-list">
//             {products.map(product => (
//                 <div key={product.id} className="product">
//                     <h4>{product.name}</h4>
//                     <p>{product.description}</p>
//                     <p>Price: {product.price} $</p>
//                     <p>Quantity: {product.quantity} items</p>
//                     <p>Category: {product.category}</p>
//                     <div className='productBtns'>
//                         <button className='editBtn'>Edit</button>
//                         <button className='deleteBtn' onClick={() => handleDeleteBtnClick(product.id)}>Delete</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div >
// }
// export default ViewProducts;

// interface Product {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     quantity: number;
//     category: string;
// }
const ViewProducts: React.FC = () => {

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

    const handleDeleteBtnClick = async (productId: number) => {
        // Perform asynchronous operations here
        await deleteProduct(productId);
    };

    const deleteProduct = async (productId: number) => {
        try {
            const response = await fetch(api_url + '/deleteProduct/' + productId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                alert("Product Deleted Successfully ")
                const updatedProducts = products.filter(product => product.id !== productId);
                // Update the state
                setProducts(updatedProducts);
            }
            else {
                console.log('Product deletion failed')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Group products by category
    const groupedProducts: { [key: string]: Product[] } = {};
    products.forEach(product => {
        if (!groupedProducts[product.category]) {
            groupedProducts[product.category] = [];
        }
        groupedProducts[product.category].push(product);
    });


    return (
        <div id="view-products">
            <h1>All products in the stock</h1>
            {products.length === 0 && <p className='no-products'>No Products in the stock</p>}
            {/* Render products by category */}
            {Object.keys(groupedProducts).map(category => (
                <div key={category}>
                    <h2 className='categoryHeading'>{category}</h2>
                    <div className="products-list">
                        {groupedProducts[category].map(product => (
                            <div key={product.id} className="product">
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                <p>Price: {product.price} $</p>
                                <p>Quantity: {product.quantity} items</p>
                                <p>Category: {product.category}</p>
                                <div className='productBtns'>
                                    <button className='editBtn'>Edit</button>
                                    <button className='deleteBtn' onClick={() => handleDeleteBtnClick(product.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ViewProducts;
import '../CSS/viewProducts.css'
import React, { useEffect, useState } from 'react';


interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    imagePath: string;
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

    const api_url = 'http://localhost:8080/api/public/products';
    const api_url_private = 'http://localhost:8080/api/private/products';
    const [products, setProducts] = useState<Product[]>([]);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
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
            const response = await fetch(api_url_private + '/deleteProduct/' + productId, {
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

    // const updateProduct = async (productId: number) => {
    //     try {
    //         const response = await fetch(api_url_private + '/editProduct/' + productId, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(currentProduct)
    //         });
    //         if (response.ok) {
    //             alert("Product updated Successfully ")
    //             const updatedProducts = products.filter(product => product.id !== productId);
    //             // Update the state
    //             setProducts(updatedProducts);
    //         }
    //         else {
    //             console.log('Updating product failed')
    //         }
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // };

    const handleEditBtnClick = (product: Product) => {
        setCurrentProduct(product);
        setIsEditFormVisible(true);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCurrentProduct(prevProduct => (prevProduct ? { ...prevProduct, [name]: value } : null));
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (currentProduct) {
            try {
                const response = await fetch(api_url_private + '/editProduct/' + currentProduct.id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(currentProduct)
                });
                if (response.ok) {
                    alert("Product Updated Successfully");
                    setProducts(prevProducts => prevProducts.map(product => product.id === currentProduct.id ? currentProduct : product));
                    setIsEditFormVisible(false);
                } else {
                    console.log('Product update failed');
                }
            } catch (error) {
                console.error('Error:', error);
            }
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
                <div className='products-category' key={category}>
                    <h2 className='categoryHeading'>{category}</h2>
                 <table className="products-table">
                        <thead>
                            <tr>
                               <th>Name</th>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {groupedProducts[category].map(product => (
                                <tr key={product.id}>
                                    <td>{product.name}</td>
                                    <td>
                                        {product.imagePath && (
                                            <img className='product-img' src={product.imagePath} alt='Product Image' />
                                        )}
                                    </td>
                                    <td>{product.description}</td>
                                    <td>{product.price} $</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                    <div className='productBtns'>
                                    <button className='editBtn'  onClick={() => handleEditBtnClick(product)}>Edit</button>
                                    <button className='deleteBtn' onClick={() => handleDeleteBtnClick(product.id)}>Delete</button>
                                    </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
            {isEditFormVisible && currentProduct && (
                <div className='edit-form'>
                    <h2>Edit Product</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={currentProduct.name}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={currentProduct.description}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={currentProduct.price}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={currentProduct.quantity}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Category:</label>
                            <input
                                type="text"
                                name="category"
                                value={currentProduct.category}
                                onChange={handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Image Url:</label>
                            <input
                                type="text"
                                name="imagePath"
                                value={currentProduct.imagePath}
                                onChange={handleFormChange}
                            />
                        </div>
                        <button className='save-update' type="submit">Save</button>
                        <button className='cancel-update' type="button" onClick={() => setIsEditFormVisible(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ViewProducts;
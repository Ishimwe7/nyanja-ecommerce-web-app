import '../CSS/addProduct.css'
import { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';

const AddProduct = () => {

    const api_url = 'http://localhost:8080/api/private/products';
    // const cloudinary_url ='https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload';
    // const upload_preset = 'YOUR_UPLOAD_PRESET';

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        quantity: 0,
        category: '',
        product_image: undefined as File | undefined
    });
    const [add_response, setResponse] = useState('');
    const [add_error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData({
            ...formData,
            product_image: file
        });
    };
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('price', formData.price.toString());
            formDataToSend.append('quantity', formData.quantity.toString());
            formDataToSend.append('category', formData.category);
            formDataToSend.append('product_image', formData.product_image || '');

            const response = await fetch(api_url + '/newProduct', {
                method: 'POST',
                body: formDataToSend
            });
            console.log(formData)
            const data = await response.text();
            if (data !== "Product Added Successfully !") {
                setResponse('');
                setError(data);
            }
            else {
                setError('');
                setFormData({
                    name: '',
                    description: '',
                    price: 0,
                    quantity: 0,
                    category: '',
                    product_image: undefined
                });
                setResponse(data);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred');
        }
    };



    return <div id="add-product">
        <h2>Add product</h2>
        <div id='add-product-form'>
            <p><span>*</span> Required</p>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='row'>
                    <label htmlFor="name">Name <span>*</span></label>
                    <input type="text" name='name' id='name' value={formData.name} onChange={handleChange} placeholder='Enter product name' required />
                </div>
                <div className='row'>
                    <label htmlFor="description">Description <span>*</span></label>
                    <textarea maxLength={200} name='description' id='description' value={formData.description} onChange={handleChange} placeholder="Don't exceed 200 characters" required />
                </div>
                <div className='row'>
                    <label htmlFor="price">Price <span>*</span></label>
                    <input type="number" name='price' id='price' value={formData.price} onChange={handleChange} placeholder='Enter product price in Dollars($)' required />
                </div>
                <div className='row'>
                    <label htmlFor="quantity">Quantity <span>*</span></label>
                    <input type="number" name='quantity' id='quantity' value={formData.quantity} onChange={handleChange} placeholder='Enter product quantity' required />
                </div>
                <div className='row'>
                    <label htmlFor="category">Product Category <span>*</span></label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} required>
                        <option value='' disabled >Please select product category</option>
                        <option value="Food & Beverages">Food & Beverages</option>
                        <option value="Shoes">Shoes</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Jewelleries">Jewelleries</option>
                    </select>
                </div>
                <div className='row'>
                    <label htmlFor="product_image">Product Image:</label>
                    <input type="file" accept='image/*' name='product_image' id='product_image' onChange={handleFileChange} placeholder='Enter product quantity' required />
                </div>
                <p className='response' id='success'>{add_response}</p>
                <p className='response' id='error'>{add_error}</p>
                <button type='submit'>Add Product</button>
            </form>
        </div>
    </div>
}
export default AddProduct;
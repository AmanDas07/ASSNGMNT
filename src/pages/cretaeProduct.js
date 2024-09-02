import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewItemForm.css';
import { Layout } from '../Components/Layout';

const NewItemForm = () => {
    const [formData, setFormData] = useState({
        nameOfSupplier: '',
        productInfo: '',
        category: '',
        quantity: '',
        timeline: '',
        location: '',
        requiredFor: '',
        productImage: null,
    });

    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategoriesAndLocations = async () => {
            try {
                const { data } = await axios.get('http://localhost:8080/api/get-categories');
                setCategories(data.data);
                const location = await axios.get('http://localhost:8080/api/get-locations');
                setLocations(location.data.locationResponse);
            } catch (error) {
                console.error('Error fetching categories or locations:', error);
            }
        };
        const print = async () => {
            console.log(categories);
            console.log(locations);
        }
        fetchCategoriesAndLocations();
        print();
    }, []);



    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'productImage') {
            setFormData({
                ...formData,
                productImage: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nameOfSupplier, productInfo, category, quantity, timeline, location, requiredFor, productImage } = formData;

        if (!nameOfSupplier || !productInfo || !category || !quantity || !timeline || !location || !requiredFor) {
            alert('Please fill out all fields');
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();
            data.append('nameOfSupplier', nameOfSupplier);
            data.append('productInfo', productInfo);
            data.append('category', category);
            data.append('quantity', quantity);
            data.append('timeline', timeline);
            data.append('location', location);
            data.append('requiredFor', requiredFor);
            data.append('productImage', productImage);

            const response = await axios.post('API_ENDPOINT_FOR_SUBMITTING_FORM', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                alert('Product saved successfully!');
                setFormData({
                    nameOfSupplier: '',
                    productInfo: '',
                    category: '',
                    quantity: '',
                    timeline: '',
                    location: '',
                    requiredFor: '',
                    productImage: null,
                });
            } else {
                alert('Failed to save product.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mt-4 new-item-form" >
                <h2 className="mb-4 text-center form-title">New Item Form</h2>
                <form onSubmit={handleSubmit} className="custom-form">
                    <div className="mb-3">
                        <label htmlFor="nameOfSupplier" className="form-label">Name of Supplier</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nameOfSupplier"
                            name="nameOfSupplier"
                            value={formData.nameOfSupplier}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productInfo" className="form-label">Product Information</label>
                        <input
                            type="text"
                            className="form-control"
                            id="productInfo"
                            name="productInfo"
                            value={formData.productInfo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            className="form-select"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Category</option>
                            {categories.map((cat) => (
                                <option>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="timeline" className="form-label">Timeline</label>
                        <input
                            type="date"
                            className="form-control"
                            id="timeline"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <select
                            className="form-select"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Location</option>
                            {locations.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="requiredFor" className="form-label">Required For</label>
                        <input
                            type="text"
                            className="form-control"
                            id="requiredFor"
                            name="requiredFor"
                            value={formData.requiredFor}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productImage" className="form-label">Product Image</label>
                        <input
                            type="file"
                            className="form-control"
                            id="productImage"
                            name="productImage"
                            accept="image/*"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block submit-btn" disabled={loading}>
                        {loading ? 'Saving...' : 'Submit'}
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default NewItemForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout } from '../Components/Layout';
import './Homepage.css';

const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('API_ENDPOINT_FOR_CATEGORIES');
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('API_ENDPOINT_FOR_PRODUCTS');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchCategories();
        fetchProducts();
    }, []);

    const handleSearch = () => {
        // Implement search functionality here
    };

    return (
        <Layout>
            <div className="homepage-container">
                <div className="sticky-search-bar">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search for products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="btn btn-primary search-button" onClick={handleSearch}>Search</button>
                </div>

                <div className="category-buttons-container">
                    {categories.map((category) => (
                        <button key={category.id} className="category-button">
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="products-container">
                    {products.map((product) => (
                        <div className="product-card" key={product.id}>
                            <img src={`data:image/jpeg;base64,${product.photo}`} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h5>{product.name}</h5>
                                <p>{product.description}</p>
                                <span className="product-price">${product.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Homepage;

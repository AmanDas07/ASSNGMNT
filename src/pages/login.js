import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Layout } from '../Components/Layout.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/authContext.js';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [state, setState] = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`http://localhost:8080/api/login`, {
                email,
                password,
            });
            setState({
                user: data.user,
                token: data.token,
            });
            window.localStorage.setItem("auth", JSON.stringify(data));
            toast.success("User Logged in Successfully");
            setLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.response.data);
            setLoading(false);
        }
    };

    return (
        <Layout title={"Login"} color={"#764ba2"}>
            <div className="container">
                <div className="row d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
                    <div className="col-md-6">
                        <div className="card shadow-lg border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                            <div className="card-header" style={{
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                color: '#fff',
                                textAlign: 'center',
                                padding: '20px',
                                fontSize: '1.5rem',
                                fontWeight: 'bold'
                            }}>
                                Login
                            </div>
                            <div className="card-body p-5">
                                <form onSubmit={handleSubmit}>
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                        theme="light"
                                    />
                                    <div className="mb-4">
                                        <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required
                                            style={{ padding: '12px', fontSize: '1rem', borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="exampleInputPassword1"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            required
                                            style={{ padding: '12px', fontSize: '1rem', borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={{
                                                width: "100%",
                                                backgroundColor: "#764ba2",
                                                borderColor: "#764ba2",
                                                fontSize: "1.1rem",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                transition: "background-color 0.3s ease"
                                            }}
                                            disabled={!password || !email}
                                        >
                                            {loading ? (
                                                <>
                                                    <span>Loading&nbsp;</span>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                </>
                                            ) : (
                                                "Login"
                                            )}
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <NavLink to="/register" className="text-primary" style={{ textDecoration: 'none', color: '#667eea' }}>
                                            New User? Click here...
                                        </NavLink>
                                        <NavLink to="/forgot-password" className="text-danger" style={{ textDecoration: 'none' }}>
                                            Forgot Password?
                                        </NavLink>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;

import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserContext } from '../context/authContext.js';
import { Layout } from '../Components/Layout.js';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [answernum, setAnswernum] = useState("1");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [state, setState] = useUserContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(`http://localhost:8080/api/register`, {
                name,
                email,
                password,
                answer,
                answernum
            });
            toast.success("User Registered Successfully");
            setLoading(false);
            navigate("/login");
        } catch (error) {
            toast.error(error.response.data);
            setLoading(false);
        }
    };

    if (state) { navigate("/"); }

    return (
        <Layout title={"Register"} color={"#764ba2"}>
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
                                Register
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
                                        <label htmlFor="exampleInputName" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleInputName"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                            required
                                            style={{ padding: '12px', fontSize: '1rem', borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="exampleInputEmail1"
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}
                                            required
                                            style={{ padding: '12px', fontSize: '1rem', borderRadius: '8px' }}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
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
                                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                borderColor: "#ff7e5f",
                                                fontSize: "1.1rem",
                                                padding: "12px",
                                                borderRadius: "8px",
                                                transition: "background-color 0.3s ease"
                                            }}
                                            disabled={!name || !password || !email}
                                        >
                                            {loading ? (
                                                <>
                                                    <span>Loading&nbsp;</span>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                </>
                                            ) : (
                                                "Register"
                                            )}
                                        </button>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center" >
                                        <NavLink to="/login" className="text-primary" >
                                            Already Registered? Click here...
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

export default Register;

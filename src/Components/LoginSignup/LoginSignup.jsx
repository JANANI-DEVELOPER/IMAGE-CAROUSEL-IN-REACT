import React, { useState } from 'react';
import axios from 'axios';
import './LoginSignup.css';
import user_icon from 'E:/signinup/src/Components/Assets/person.png';
import email_icon from 'E:/signinup/src/Components/Assets/email.png';
import password_icon from 'E:/signinup/src/Components/Assets/password.png';

const LoginSignup = () => {
    const [action, setAction] = useState("Sign Up");
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Start loading

        if (action === 'Sign Up') {
            try {
                const response = await axios.post('http://localhost:5000/signup', {
                    username,
                    email,
                    password,
                });
                alert(response.data.message);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
                alert(errorMessage);
                console.error("Error signing up", error);
            } finally {
                setLoading(false); // Reset loading
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5000/login', {
                    email,
                    password,
                });
                alert(response.data.message);
            } catch (error) {
                const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
                alert(errorMessage);
                console.error("Error logging in", error);
            } finally {
                setLoading(false); // Reset loading
            }
        }
    };

    return (
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>

            <form className="inputs" onSubmit={handleSubmit}>
                {action === "Sign Up" && (
                    <div className="input">
                        <img src={user_icon} alt="User Icon" />
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                )}
                <div className="input">
                    <img src={email_icon} alt="Email Icon" />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input">
                    <img src={password_icon} alt="Password Icon" />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {action === "Sign Up" ? <div></div> : <div className="forgot-password">Lost Password? <span>Click Here!</span></div>}
                <div className="submit-container">
                    <button className={loading ? "submit loading" : "submit"} type="submit" disabled={loading}>
                        {loading ? "Loading..." : (action === "Sign Up" ? "Sign up" : "Login")}
                    </button>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction(action === "Sign Up" ? "Login" : "Sign Up")}>
                        {action === "Sign Up" ? "Login" : "Sign up"}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginSignup;

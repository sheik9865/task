import React from "react";
import { Link } from "react-router-dom";

const ErrorComponent = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                width="200px"
                height="200px"
                fill="#000"
            >
                <circle cx="32" cy="32" r="30" fill="#f3f4f5" />
                <text
                    x="50%"
                    y="50%"
                    fontSize="20"
                    textAnchor="middle"
                    fill="#000"
                    fontWeight="bold"
                >
                    404
                </text>
                <text
                    x="50%"
                    y="60%"
                    fontSize="12"
                    textAnchor="middle"
                    fill="#555"
                >
                </text>
            </svg>
            <h2>Oops! Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/" style={{ textDecoration: "none", color: "#007BFF" }}>
                Go Back to Home
            </Link>
        </div>
    );
};

export default ErrorComponent;

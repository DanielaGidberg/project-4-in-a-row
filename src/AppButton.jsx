import React from "react";

function AppButton({ text, onClick, disabled = false, type = "button" }) {
    const buttonStyle = {
        marginTop: "16px",
        padding: "10px 14px",
        border: "none",
        borderRadius: "10px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: "700",
        backgroundColor: disabled ? "#cfcfcf" : "#222",
        color: "white",
        opacity: disabled ? 0.6 : 1,
    };

    return (
        <button
            type={type}
            style={buttonStyle}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
}

export default AppButton;

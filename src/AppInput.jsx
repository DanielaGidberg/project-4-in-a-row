import React from "react";

function AppInput({
                      label,
                      type = "text",
                      value,
                      defaultValue,
                      onChange,
                      placeholder,
                      min,
                      max,
                  }) {
    const wrapperStyle = { marginTop: "12px" };

    const labelStyle = {
        display: "block",
        fontWeight: "600",
        marginBottom: "6px",
    };

    const inputStyle = {
        display: "block",
        width: "220px",
        padding: "8px 10px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
    };

    return (
        <div style={wrapperStyle}>
            <label style={labelStyle}>
                {label}
                <input
                    style={inputStyle}
                    type={type}
                    value={value}
                    defaultValue={defaultValue}
                    onChange={onChange}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                />
            </label>
        </div>
    );
}

export default AppInput;

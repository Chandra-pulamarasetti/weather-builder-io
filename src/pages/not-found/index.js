import Link from "next/link";
import React from "react";

function index() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div>
        <h1>Something Went wrong.</h1>
      </div>
      <div style={{ display: "block" }}>
        <Link href={"/weather"}>
          <button
            style={{
              textDecoration: "none",
              padding: "8px",
              cursor: "pointer",
            }}
          >
            Try with different ZipCode
          </button>
        </Link>
      </div>
    </div>
  );
}

export default index;

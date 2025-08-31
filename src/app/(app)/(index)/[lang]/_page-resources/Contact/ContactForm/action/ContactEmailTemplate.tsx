import React, { ComponentPropsWithoutRef } from "react";

export default function ContactEmailTemplate(props: { from: string; message: string; name: string } & ComponentPropsWithoutRef<"div">) {
  return (
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div
          style={{
            width: "100%",
            maxWidth: "564px",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            backgroundColor: "#111827",
            paddingBottom: "4rem",
            color: "#f3f4f6",
          }}
        >
          <center style={{ borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", backgroundColor: "#374151", padding: "1.5rem 1.5rem" }}>NAIM CODESEDA</center>
          <div style={{ marginTop: "2rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", ...props.style }}>
            <p style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "0.5rem" }}>Hello, Naim.</p>
            <p style={{ marginBottom: "1rem" }}>A user has contacted you using the contact form your website.</p>
            <p>
              Name: <strong>{props.name}</strong>{" "}
            </p>
            <p>
              Email: <strong>{props.from}</strong>
            </p>
            <p>
              Message: <strong>{props.message}</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

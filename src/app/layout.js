import "./globals.css";

export const metadata = {
  title: "EHR Demo",
  description: "EHR Demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}

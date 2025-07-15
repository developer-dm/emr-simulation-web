import "./globals.css";

export const metadata = {
  title: "EMR Simulation",
  description: "EMR Simulation",
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

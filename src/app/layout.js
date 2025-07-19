import "./globals.css";

export const metadata = {
  title: "EHR Research Project",
  description: "EHR Demo",
  icons: {
    icon: "/favicon.png",
  },
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

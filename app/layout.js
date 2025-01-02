import Header from "@/component/header/Header";
import "./globals.css";

export const metadata = {
  title: "Foods and Foodies",
  description: "Delicious meals, finding and sharing community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}

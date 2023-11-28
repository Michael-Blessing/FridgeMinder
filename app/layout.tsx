import AuthProvider from "./context/authProvider";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "FridgeMinder",
  description: "Mind your Fridge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="flex justify-center items-start p-6 min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}

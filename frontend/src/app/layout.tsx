export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/auth">Login</a>
          <a href="/inventory">Inventory</a>
          <a href="/projects">Projects</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}

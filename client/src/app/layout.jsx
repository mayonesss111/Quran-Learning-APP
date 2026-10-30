import './globals.css';

export const metadata = {
  title: 'Al-Qur\'an Digital App',
  description: 'Aplikasi Pembelajaran Al-Qur\'an Digital Full-Stack',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
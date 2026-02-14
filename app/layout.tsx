import './globals.css';

export const metadata = {
  title: 'LaunchAI Sovereign',
  description: 'Sovereign War Room for 30-Day Revenue',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

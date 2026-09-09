import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function PublicLayout({ children }) {
  return (
    <div className="relative isolate min-h-screen flex flex-col">
      <div className="site-ambient" aria-hidden="true">
        <span className="site-ambient-glow site-ambient-glow-one" />
        <span className="site-ambient-glow site-ambient-glow-two" />
      </div>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import FeaturedArtisans from '../components/home/FeaturedArtisans';

const Home = () => {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <Hero />
                <FeaturedArtisans />
            </main>
            {/* Simple Footer Placeholder */}
            <footer className="bg-slate-900 text-slate-400 py-12 text-center">
                <p>&copy; 2026 Artisan Platform Tadla. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;

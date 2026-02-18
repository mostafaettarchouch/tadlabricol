import { motion } from 'framer-motion';
import { Search, Menu, X, Hammer, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Hammer className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent">
                            TadlaBricol
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-slate-600 hover:text-primary font-medium transition-colors">Home</Link>
                        <Link to="/artisans" className="text-slate-600 hover:text-primary font-medium transition-colors">Find Artisans</Link>
                        <Link to="/about" className="text-slate-600 hover:text-primary font-medium transition-colors">About Us</Link>

                        <div className="flex items-center gap-4 ml-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <span className="text-slate-700 font-semibold hidden md:inline">Hello, {user.name}</span>
                                    {localStorage.getItem('role') === 'artisan' && (
                                        <Link to="/dashboard" className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-full hover:bg-slate-800 transition-colors text-sm">
                                            My Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-full hover:bg-slate-50 transition-colors text-sm"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-primary font-semibold hover:bg-primary/5 rounded-full transition-colors">
                                        Log In
                                    </Link>
                                    <Link to="/register" className="px-5 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-orange-700 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5">
                                        Join Now
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 hover:text-primary transition-colors">
                            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white border-b border-slate-100 absolute w-full"
                >
                    <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
                        <Link to="/" className="block px-3 py-3 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg font-medium">Home</Link>
                        <Link to="/artisans" className="block px-3 py-3 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg font-medium">Find Artisans</Link>
                        <Link to="/about" className="block px-3 py-3 text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg font-medium">About Us</Link>
                        <div className="pt-4 flex flex-col gap-3">
                            {user ? (
                                <>
                                    <div className="px-3 py-2 text-slate-800 font-bold">Signed in as {user.name}</div>
                                    <button onClick={handleLogout} className="w-full text-center px-4 py-3 border border-slate-200 text-red-600 font-semibold rounded-xl">Log Out</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="w-full text-center px-4 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl">Log In</Link>
                                    <Link to="/register" className="w-full text-center px-4 py-3 bg-primary text-white font-semibold rounded-xl shadow-lg shadow-primary/30">Join Now</Link>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;

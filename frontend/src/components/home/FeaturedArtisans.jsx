import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedArtisans = () => {
    const [artisans, setArtisans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtisans = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/artisans');
                setArtisans(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch artisans:", err);
                setError("Could not load artisans.");
                setLoading(false);
            }
        };

        fetchArtisans();
    }, []);

    if (loading) return <div className="text-center py-20">Loading artisans...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Top Rated Artisans</h2>
                        <p className="text-slate-600 max-w-xl">Discover the most trusted professionals in your area, vetted by the community.</p>
                    </div>
                    <button className="hidden md:block text-primary font-semibold hover:text-orange-700 transition-colors">
                        View All Artisans &rarr;
                    </button>
                </div>

                {artisans.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">
                        No artisans found. Be the first to join!
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {artisans.map((artisan, index) => (
                            <motion.div
                                key={artisan.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
                            >
                                <div className="relative h-48 overflow-hidden rounded-t-2xl bg-slate-200">
                                    {/* Placeholder image for now since we don't have uploads yet */}
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-300 uppercase">
                                        {artisan.user?.name?.charAt(0) || 'A'}
                                    </div>

                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold shadow-sm">
                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                        <span>{artisan.rating || 'New'}</span>
                                        <span className="text-slate-400">({artisan.reviews_count || 0})</span>
                                    </div>
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${artisan.available ? 'bg-green-500/90 text-white' : 'bg-slate-500/90 text-white'}`}>
                                        {artisan.available ? 'Available' : 'Busy'}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{artisan.user?.name}</h3>
                                            <p className="text-primary font-medium">{artisan.profession}</p>
                                        </div>
                                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                                            <Heart className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {artisan.city}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            Response: ~1h
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <span className="font-bold text-slate-900">
                                            {artisan.min_price && artisan.max_price
                                                ? `${artisan.min_price} - ${artisan.max_price} DH`
                                                : 'Price on Request'}
                                        </span>
                                        <Link to={`/artisan/${artisan.id}`} className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                                            View Profile
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedArtisans;

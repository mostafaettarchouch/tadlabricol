import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Clock } from 'lucide-react';

const FeaturedArtisans = () => {
    // Mock data - eventually fetch from API
    const artisans = [
        {
            id: 1,
            name: "Ahmed Benali",
            profession: "Plumber",
            rating: 4.8,
            reviews: 124,
            city: "Tadla",
            image: "https://images.unsplash.com/photo-1581578731117-104f2a114886?q=80&w=1000&auto=format&fit=crop",
            available: true,
            price: "50-200 DH"
        },
        {
            id: 2,
            name: "Fatima Zahra",
            profession: "Electrician",
            rating: 4.9,
            reviews: 89,
            city: "Tadla",
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop",
            available: true,
            price: "100-500 DH"
        },
        {
            id: 3,
            name: "Youssef Idrissi",
            profession: "Carpenter",
            rating: 4.7,
            reviews: 56,
            city: "Tadla",
            image: "https://images.unsplash.com/photo-1603796846097-b369c3a37333?q=80&w=1000&auto=format&fit=crop",
            available: false,
            price: "200+ DH"
        }
    ];

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
                            <div className="relative h-48 overflow-hidden rounded-t-2xl">
                                <img
                                    src={artisan.image}
                                    alt={artisan.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-semibold shadow-sm">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    <span>{artisan.rating}</span>
                                    <span className="text-slate-400">({artisan.reviews})</span>
                                </div>
                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${artisan.available ? 'bg-green-500/90 text-white' : 'bg-slate-500/90 text-white'}`}>
                                    {artisan.available ? 'Available' : 'Busy'}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{artisan.name}</h3>
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
                                    <span className="font-bold text-slate-900">{artisan.price}</span>
                                    <button className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedArtisans;

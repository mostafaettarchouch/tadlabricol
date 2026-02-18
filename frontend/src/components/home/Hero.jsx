import { motion } from 'framer-motion';
import { Search, MapPin, Star, Wrench, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const Hero = () => {
    const professions = ["Plumber", "Electrician", "Carpenter", "Painter", "Mechanic", "Welder", "Gardener", "Other"];
    const [profession, setProfession] = useState("");

    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-50">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-x-1/4 -translate-y-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20">
                            #1 Artisan Platform in Tadla
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight">
                            Find the Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-600">Artisan</span> for Your Needs
                        </h1>
                        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Connect with verified local professionals in Tadla City. Fast, reliable, and trusted by your community.
                        </p>
                    </motion.div>

                    {/* Search Component */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white p-2 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 max-w-3xl mx-auto flex flex-col md:flex-row gap-2"
                    >
                        <div className="flex-1 relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Wrench className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <select
                                className="w-full pl-11 pr-4 py-4 bg-transparent border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-slate-700 font-medium appearance-none cursor-pointer hover:bg-slate-50 transition-colors outline-none"
                                value={profession}
                                onChange={(e) => setProfession(e.target.value)}
                            >
                                <option value="" disabled>Select a Service</option>
                                {professions.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        <div className="w-px bg-slate-100 hidden md:block"></div>

                        <div className="flex-[1.5] relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="What are you looking for? (e.g., sink repair)"
                                className="w-full pl-11 pr-4 py-4 bg-transparent border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-slate-700 placeholder:text-slate-400 font-medium outline-none"
                            />
                        </div>

                        <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all flex items-center justify-center gap-2">
                            Search <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Hero;

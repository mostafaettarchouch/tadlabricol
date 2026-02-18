import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import { User, MapPin, DollarSign, Briefcase, Plus, Trash, CheckCircle, XCircle } from 'lucide-react';

const ArtisanDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        profession: '',
        description: '',
        city: '',
        phone: '',
        min_price: '',
        max_price: '',
        available: true
    });

    const [newService, setNewService] = useState({
        title: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8000/api/artisan/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { user, profile, services } = response.data;
            setProfile({ ...user, ...profile }); // Merge user and profile data
            setServices(services);

            // Populate form
            setFormData({
                profession: profile.profession || '',
                description: profile.description || '',
                city: profile.city || '',
                phone: user.phone || '',
                min_price: profile.min_price || '',
                max_price: profile.max_price || '',
                available: profile.available === 1 || profile.available === true
            });

            setLoading(false);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Failed to load profile. Please try logging in again.");
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/artisan/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Profile updated successfully!");
            setIsEditing(false);
            fetchProfile(); // Refresh data
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Failed to update profile.");
        }
    };

    const handleAddService = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:8000/api/artisan/services', newService, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Service added!");
            setNewService({ title: '', description: '', price: '' });
            fetchProfile();
        } catch (err) {
            console.error("Error adding service:", err);
            alert("Failed to add service.");
        }
    };

    if (loading) return <div className="text-center py-20">Loading dashboard...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Sidebar: Profile Overview */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                                    {profile.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{profile.name}</h2>
                                    <p className="text-primary font-medium">{profile.profession}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <MapPin className="w-5 h-5 text-slate-400" />
                                    <span>{profile.city}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <DollarSign className="w-5 h-5 text-slate-400" />
                                    <span>{profile.min_price} - {profile.max_price} DH</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    {formData.available ? (
                                        <span className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                                            <CheckCircle className="w-4 h-4" /> Available for Work
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 text-red-600 font-medium bg-red-50 px-3 py-1 rounded-full">
                                            <XCircle className="w-4 h-4" /> Currently Busy
                                        </span>
                                    )}
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="w-full mt-6 py-2 border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                            >
                                {isEditing ? "Cancel Editing" : "Edit Profile"}
                            </button>
                        </div>

                        {/* Edit Profile Form */}
                        {isEditing && (
                            <form onSubmit={handleProfileUpdate} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mt-6 space-y-4 animate-in fade-in slide-in-from-top-4">
                                <h3 className="font-bold text-lg mb-4">Update Details</h3>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">Description / Bio</label>
                                    <textarea
                                        className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20"
                                        rows="3"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">Min Price (DH)</label>
                                        <input
                                            type="number"
                                            className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20"
                                            value={formData.min_price}
                                            onChange={e => setFormData({ ...formData, min_price: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-slate-700">Max Price (DH)</label>
                                        <input
                                            type="number"
                                            className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20"
                                            value={formData.max_price}
                                            onChange={e => setFormData({ ...formData, max_price: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-700">Phone</label>
                                    <input
                                        type="tel"
                                        className="w-full p-3 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-primary/20"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="available"
                                        checked={formData.available}
                                        onChange={e => setFormData({ ...formData, available: e.target.checked })}
                                        className="w-5 h-5 text-primary rounded focus:ring-primary"
                                    />
                                    <label htmlFor="available" className="font-medium text-slate-700">I am currently available</label>
                                </div>

                                <button type="submit" className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-orange-700 transition-colors">
                                    Save Changes
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right Content: Services & Posts */}
                    <div className="lg:w-2/3 space-y-8">

                        {/* Add Service Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Briefcase className="w-6 h-6 text-primary" /> Manage Services
                            </h3>

                            <form onSubmit={handleAddService} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200/50">
                                <div className="md:col-span-12">
                                    <input
                                        type="text"
                                        placeholder="Service Title (e.g. Broken Pipe Repair)"
                                        className="w-full p-3 bg-white rounded-lg border-none focus:ring-2 focus:ring-primary/20"
                                        required
                                        value={newService.title}
                                        onChange={e => setNewService({ ...newService, title: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-8">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        className="w-full p-3 bg-white rounded-lg border-none focus:ring-2 focus:ring-primary/20"
                                        required
                                        value={newService.description}
                                        onChange={e => setNewService({ ...newService, description: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-4">
                                    <input
                                        type="number"
                                        placeholder="Price (DH)"
                                        className="w-full p-3 bg-white rounded-lg border-none focus:ring-2 focus:ring-primary/20"
                                        required
                                        value={newService.price}
                                        onChange={e => setNewService({ ...newService, price: e.target.value })}
                                    />
                                </div>
                                <div className="md:col-span-12">
                                    <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                        <Plus className="w-5 h-5" /> Add Service
                                    </button>
                                </div>
                            </form>

                            {/* Services List */}
                            <div className="space-y-4">
                                {services.length === 0 ? (
                                    <p className="text-slate-500 text-center py-4">No services added yet.</p>
                                ) : (
                                    services.map(service => (
                                        <div key={service.id} className="flex justify-between items-start p-4 border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                                            <div>
                                                <h4 className="font-bold text-slate-900">{service.title}</h4>
                                                <p className="text-slate-600 text-sm">{service.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="font-bold text-primary block">{service.price} DH</span>
                                                <button className="text-red-500 text-xs mt-2 hover:underline">Remove</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanDashboard;

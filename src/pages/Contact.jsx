import React from 'react';

const Contact = () => {
    return (
        <div className="container py-20 min-h-[60vh]">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-2 text-center">Contact Us</h2>
                <p className="text-gray-500 text-center mb-8">Have questions? We'd love to hear from you.</p>

                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                        <input type="text" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input type="email" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" placeholder="john@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea className="w-full h-32 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none" placeholder="How can we help you?"></textarea>
                    </div>
                    <button className="w-full bg-primary text-white py-3 rounded-lg font-bold shadow-md hover:bg-red-600 transition-colors">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;

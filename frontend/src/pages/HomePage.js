import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getAuthToken } from '../utils/auth'; // Import utility to get the auth token

const HomePage = () => {
    // State to store the user's profile information
    const [profile, setProfile] = useState(null);
    // State to manage loading status
    const [loading, setLoading] = useState(true);
    // State to manage error status
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the user's profile information on component mount
        const fetchProfile = async () => {
            try {
                // Get the authentication token from localStorage
                const token = getAuthToken();
                
                // If no token is found, redirect to login page or handle accordingly
                if (!token) {
                    throw new Error('No token found');
                }
                
                // Make an API request to fetch the user's profile information
                const response = await axios.get('/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Attach the token to the request headers
                    }
                });
                
                // Update the profile state with the fetched data
                setProfile(response.data);
            } catch (err) {
                // Set the error state if an error occurs
                setError(err.message || 'Failed to fetch profile');
            } finally {
                // Set loading to false regardless of success or failure
                setLoading(false);
            }
        };

        // Call the function to fetch the profile
        fetchProfile();
    }, []); // Empty dependency array means this effect runs once on mount

    // If the component is still loading, display a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // If there was an error fetching the profile, display the error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Render the user's profile information
    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            {profile ? (
                <div>
                    <h2>Profile Information</h2>
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    {/* Add other profile details as needed */}
                </div>
            ) : (
                <div>No profile information available.</div>
            )}
        </div>
    );
};

export default HomePage;

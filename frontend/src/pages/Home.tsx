///////////////////////
// Main Page Component
///////////////////////
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/Form';
import LoadingSpinner from '../components/LoadingSpinner';
import dummyData from '../data/dummyData';

const Home = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleFormSubmit = async (formData) => {
        setIsSubmitted(true);

        try {
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Form data successfully sent: ', result);

                // Simulate loading and generating ads
                setTimeout(() => {
                    navigate('/results', { state: { generatedAds: dummyData } });
                }, 9000);
            } else {
                console.error('Failed to send form data', response.statusText);
                setIsSubmitted(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setIsSubmitted(false);
        }
    };

    return (
        <div className='w-full min-h-screen bg-gray-300'>
            <div className='flex items-center justify-center pt-8 md:pt-12 pb-6 px-2'>
                {isSubmitted ? (
                    <LoadingSpinner />
                ) : (
                    <Form onSubmit={handleFormSubmit} />
                )}
            </div>
        </div>
    );
};

export default Home;

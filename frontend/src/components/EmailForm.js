import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const EmailForm = () => {
    // State to manage the email subject
    const [subject, setSubject] = useState('');
    // State to manage the email body
    const [body, setBody] = useState('');
    // State to manage the selected mailing list
    const [mailingList, setMailingList] = useState('');
    // State to manage error messages
    const [error, setError] = useState(null);
    // State to manage success messages
    const [success, setSuccess] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            // Make a POST request to send the email
            const response = await axios.post('/api/send-email', {
                subject,
                body,
                mailingList
            });
            
            // On success, update the success state and clear the form
            setSuccess('Email sent successfully!');
            setSubject('');
            setBody('');
            setMailingList('');
        } catch (err) {
            // On error, update the error state with the error message
            setError(err.response?.data?.error || 'Failed to send email');
        }
    };

    return (
        <div>
            <h2>Send Email</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="subject">Subject:</label>
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="mailingList">Mailing List:</label>
                    <input
                        type="text"
                        id="mailingList"
                        value={mailingList}
                        onChange={(e) => setMailingList(e.target.value)}
                    />
                </div>
                <button type="submit">Send Email</button>
            </form>
            {success && <p>{success}</p>} {/* Display success message if present */}
            {error && <p>{error}</p>}       {/* Display error message if present */}
        </div>
    );
};

export default EmailForm;

import React, { useState } from 'react';

const EmailPage = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [scheduledAt, setScheduledAt] = useState('');
    const [recipients, setRecipients] = useState([]);

    const handleSendEmail = async () => {
        try {
            const response = await fetch('/api/emails/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ subject, body, scheduled_at: scheduledAt, recipients })
            });

            const result = await response.json();
            if (response.ok) {
                alert('Email scheduled successfully');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    return (
        <div className="container">
            <h1>Schedule Email</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSendEmail(); }}>
                <div className="form-group">
                    <label>Subject:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Body:</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Scheduled At:</label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Recipients (comma-separated emails):</label>
                    <input
                        type="text"
                        className="form-control"
                        value={recipients.join(', ')}
                        onChange={(e) => setRecipients(e.target.value.split(',').map(email => email.trim()))}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Send Email</button>
            </form>
        </div>
    );
};

export default EmailPage;

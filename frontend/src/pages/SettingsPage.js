import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
    const [smtpSettings, setSmtpSettings] = useState({});
    const [maxEmailsPerHour, setMaxEmailsPerHour] = useState(100);

    useEffect(() => {
        // Fetch existing settings
        fetch('/api/settings', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setSmtpSettings(data.smtpSettings);
                setMaxEmailsPerHour(data.maxEmailsPerHour);
            })
            .catch(error => console.error('Error fetching settings:', error));
    }, []);

    const handleSaveSettings = async () => {
        try {
            const response = await fetch('/api/settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ smtpSettings, maxEmailsPerHour })
            });

            const result = await response.json();
            if (response.ok) {
                alert('Settings saved successfully');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    return (
        <div className="container">
            <h1>Settings</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveSettings(); }}>
                <div className="form-group">
                    <label>SMTP Server:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={smtpSettings.server || ''}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, server: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>SMTP Port:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={smtpSettings.port || ''}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, port: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>SMTP User:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={smtpSettings.user || ''}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, user: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>SMTP Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={smtpSettings.password || ''}
                        onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Max Emails Per Hour:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={maxEmailsPerHour}
                        onChange={(e) => setMaxEmailsPerHour(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Settings</button>
            </form>
        </div>
    );
};

export default SettingsPage;

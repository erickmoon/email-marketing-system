import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import EmailPage from './pages/EmailPage';
import SettingsPage from './pages/SettingsPage';
import { AuthProvider } from './context/AuthContext'; // Context for authentication
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/emails" component={EmailPage} />
                    <Route path="/settings" component={SettingsPage} />
                    <Route path="/" component={HomePage} exact />
                </Switch>
            </Router>
        </AuthProvider>
    );
}

export default App;

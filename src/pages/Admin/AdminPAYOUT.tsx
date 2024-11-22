import React, { useState } from 'react';
import axios from 'axios';

const PayoutForm = () => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const parsedAmount = parseFloat(amount);

    // Check if the parsedAmount is a valid number
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        setError('Please enter a valid amount.');
        return;
    }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            // Replace with your API endpoint
            const response = await axios.post('/admin/initiate-payout', { providerId: '66fb76ae5bbcfaf18ddb7ad1', amount });
            setMessage(`Payout initiated. Payout ID: ${response.data.payoutId}`);
        } catch (err) {
            setError('Failed to initiate payout. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="payout-form">
            <h2>Request Payout</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="amount">Amount (USD):</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        min="1"
                    />
                </div>

                <button type="submit" disabled={loading}>Initiate Payout</button>

                {loading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default PayoutForm;

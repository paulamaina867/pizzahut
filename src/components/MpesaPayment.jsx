import React, { useState } from 'react';

const MpesaPayment = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();

    // Input validation
    if (!phone || !amount) {
      setMessage('⚠️ Please fill in both fields.');
      return;
    }

    if (!/^2547\d{8}$/.test(phone)) {
      setMessage('⚠️ Phone must be in the format 2547XXXXXXXX.');
      return;
    }

    if (Number(amount) <= 0) {
      setMessage('⚠️ Enter a valid amount.');
      return;
    }

    setLoading(true);
    setMessage('');

    console.log("Processing payment...");

    // Simulating the M-Pesa payment process
    setTimeout(() => {
      console.log("Payment simulated...");
      setLoading(false);

      // Simulate success message like M-Pesa would send via SMS
      setMessage(
        `✅ Payment request sent to ${phone}. Please check your phone and enter your M-Pesa PIN to complete the payment of KES ${amount}.`
      );
    }, 2000); // Simulate 2 seconds of payment processing
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>💸 M-Pesa Payment</h2>
        <form onSubmit={handlePayment}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone Number (2547XXXXXXXX):</label>
            <input
              type="tel"
              value={phone}
              placeholder="e.g. 254712345678"
              onChange={(e) => setPhone(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amount (KES):</label>
            <input
              type="number"
              value={amount}
              placeholder="e.g. 500"
              onChange={(e) => setAmount(e.target.value)}
              style={styles.input}
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Processing...' : 'Pay with M-Pesa'}
          </button>
        </form>

        {loading && <p style={styles.loading}>🔄 Processing payment...</p>}

        {/* Show the message */}
        {message && (
          <div style={styles.promptBox}>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Inline CSS styles with Background Image
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: 'url("pizza18.webp")', // Add your pizza-themed image URL here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    padding: '20px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '26px',
    color: '#e74c3c',  // Vibrant red color
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    fontWeight: '700',
    marginBottom: '8px',
    display: 'block',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '14px',
    fontSize: '18px',
    borderRadius: '10px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box',
    transition: 'border 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '18px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
  loading: {
    marginTop: '15px',
    textAlign: 'center',
    color: '#007bff',
    fontStyle: 'italic',
  },
  promptBox: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e0ffe0',
    border: '1px solid #28a745',
    borderRadius: '10px',
    color: '#155724',
    textAlign: 'center',
    fontWeight: 'bold',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
};

export default MpesaPayment;

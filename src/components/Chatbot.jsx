import React, { useState, useRef, useEffect } from 'react';

const PizzaAdventureChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "🍕 Welcome to PizzaLand! Would you like to explore our Menu, Toppings, Combos, or place an Order?" },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const pairs = [
  [/(hi|hello|hey)/i, [
    "Hi there! I'm your Pizza Assistant. Want to explore our special pizza categories or make a payment?"
  ]],
  [/(.*)menu(.*)/i, [
    "Here's our menu categorized just for you! 🍽️\n👉 Type 'kids pizza', 'adult pizza', or 'healthy pizza' to explore."
  ]],

  // 🍕 Category Responses (based on your project)
  [/\b(kids|children|kid-friendly|kids pizza)\b/i, [
    "👶 Our Kids Pizzas are small and mild in flavor—perfect for children! Try our Cheesy Mini or Sweet Corn Delight!"
  ]],
  [/\b(adult|adults|adult pizza)\b/i, [
    "🧑 Our Adult Pizzas are bold and satisfying! Try Pepperoni Inferno or BBQ Blast!"
  ]],
  [/\b(healthy|health-conscious|low calorie|diet|fit|light)\b/i, [
    "🥗 Our Health-Conscious Pizzas are made with fresh, light ingredients. Try Veggie Fit or Gluten-Free Margherita!"
  ]],

  // Payment
  [/(.*)payment(.*)|mpesa/i, [
    "To buy a pizza, click 'Buy Now' and follow the M-Pesa payment instructions."
  ]],

  // Order (no delivery or cart system yet)
  [/(.*)order(.*)/i, [
    "You can click 'Buy Now' on your preferred pizza and complete the payment directly via M-Pesa. No cart or delivery yet!"
  ]],

  // General fallback
  [/(.*)/, [
    "Sorry, I didn’t understand that. You can ask for 'kids pizza', 'adult pizza', or 'healthy pizza'."
  ]]
];


  const getBotResponse = (input) => {
    for (let [pattern, responses] of pairs) {
      if (pattern.test(input)) {
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    return "Hmm... something went wrong.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    let botMessage;

    if (input.toLowerCase() === 'quit') {
      botMessage = { sender: 'bot', text: "Thanks for chatting! Have a cheesy day! 🧀" };
    } else {
      const response = getBotResponse(input);
      botMessage = { sender: 'bot', text: response };
    }

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatbot-wrapper py-5" style={{ backgroundColor: '#fff8f0', minHeight: '100vh' }}>
      <div className="container d-flex flex-column align-items-center">
        <div className="card shadow-lg rounded-4 w-100" style={{ maxWidth: '800px', minHeight: '600px' }}>
          <div className="card-header text-white bg-danger text-center rounded-top-4">
            <h4 className="mb-0">🍕 Pizza Adventure Bot</h4>
          </div>
          <div
            className="card-body bg-light overflow-auto px-4"
            style={{ height: '450px', scrollBehavior: 'smooth' }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`d-flex my-2 ${msg.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                <div
                  className={`p-3 px-4 rounded-4 shadow-sm ${
                    msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white text-dark'
                  }`}
                  style={{ fontSize: '1rem', maxWidth: '85%' }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form onSubmit={handleSubmit} className="card-footer d-flex gap-3 p-4 bg-white rounded-bottom-4">
            <input
              type="text"
              className="form-control shadow-sm rounded-pill px-4"
              style={{ fontSize: '1rem' }}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-danger rounded-pill px-4" type="submit" style={{ fontSize: '1rem' }}>
              Send
            </button>
          </form>
        </div>

        {/* 🍕 Pizza video at the bottom */}
        <video
          src="videos/pizza.mp4"
          autoPlay
          muted
          loop
          className="w-100 mt-4 shadow rounded-4"
          style={{ maxHeight: '300px', objectFit: 'cover' }}
        ></video>
      </div>
    </div>
  );
};

export default PizzaAdventureChatBot;

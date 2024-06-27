import React, { createContext, useContext, useState } from 'react';

const FeedbackContext = createContext();

export const useFeedback = () => useContext(FeedbackContext);

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(null);

  const showFeedback = (message) => {
    setFeedback(message);
    setTimeout(() => setFeedback(null), 2000); // Clear the feedback after 3 seconds
  };

  return (
    <FeedbackContext.Provider  value={{ feedback, showFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

import React from 'react';

const TweetButton = ({ tweetText, solAddress }) => {
  const handleTweet = () => {
    const fullTweetText = `${tweetText}\n\n${solAddress}`; // Concatenate tweet text, two lines space, and SOL address

    const encodedTweetText = encodeURIComponent(fullTweetText); // Encode the tweet text

    // Construct the Twitter Web Intent URL
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodedTweetText}`;

    // Open the Twitter compose window in a new tab
    window.open(tweetUrl, '_blank');
  };

  return (
    <button onClick={handleTweet} className="font-custom bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 animate-text text-white font-bold py-3 px-5 rounded-xl text-3xl md:text-4xl">
      JOIN
    </button>
  );
};

export default TweetButton;
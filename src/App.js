import React, { useState, useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { ThemeProvider } from 'styled-components';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import original from 'react95/dist/themes/original';
import Globe from './globe';

// Fetch crypto prices with error handling
const fetchCryptoPrices = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana,bitcoin,ethereum&vs_currencies=usd'
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return {
      solana: data.solana.usd,
      bitcoin: data.bitcoin.usd,
      ethereum: data.ethereum.usd,
    };
  } catch (error) {
    console.error('Failed to fetch crypto prices:', error);
    return { solana: 0, bitcoin: 0, ethereum: 0 }; // Default values to prevent app crash
  }
};

const QuantumTradingWidget = () => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Initializing Quantum AI...");
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalysisComplete(true);
          setStatusMessage("+ 150 SOL");
          return 100;
        }
        return prev + Math.floor(Math.random() * 20);
      });

      if (!analysisComplete) {
        const messages = [
          "Analyzing historical data...",
          "Running quantum predictions...",
          "Evaluating risk factors...",
          "Scanning global market trends...",
          "Simulating market scenarios..."
        ];
        setStatusMessage(messages[Math.floor(Math.random() * messages.length)]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [analysisComplete]);

  return (
    <Window className="h-min">
      <WindowHeader className="font-custom text-xs">
        <span>Quantum Trading AI</span>
      </WindowHeader>
      <WindowContent className="bg-gray-800 p-6 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Quantum Trading AI</h2>
        <p className="text-lg text-blue-300">{statusMessage}</p>
        {!analysisComplete && (
          <div className="mt-4">
            <CircularProgress value={progress} color="text-cyan-500" />
          </div>
        )}
      </WindowContent>
    </Window>
  );
};

const MarketSentimentAnalysis = () => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Gathering sentiment data...");
  const [analysisComplete, setAnalysisComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalysisComplete(true);
          setStatusMessage("Sentiment: Bullish");
          return 100;
        }
        return prev + Math.floor(Math.random() * 20);
      });

      if (!analysisComplete) {
        const messages = [
          "Analyzing Twitter data...",
          "Scanning Reddit for mentions...",
          "Tracking influencer sentiment...",
          "Assessing news articles...",
          "Checking forum activity..."
        ];
        setStatusMessage(messages[Math.floor(Math.random() * messages.length)]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [analysisComplete]);

  return (
    <Window className="h-min">
      <WindowHeader className="font-custom text-xs">
        <span>Market Sentiment Analysis</span>
      </WindowHeader>
      <WindowContent className="bg-gray-800 p-6 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-semibold mb-4 text-yellow-300">Market Sentiment Analysis</h2>
        <p className="text-lg text-yellow-300">{statusMessage}</p>
        {!analysisComplete && (
          <div className="mt-4">
            <CircularProgress value={progress} color="text-yellow-500" />
          </div>
        )}
      </WindowContent>
    </Window>
  );
};

const TradingSimulator = () => {
  const [price, setPrice] = useState(150);
  const [priceHistory, setPriceHistory] = useState([{
    time: Math.floor(Date.now() / 1000),
    open: 150,
    high: 150,
    low: 150,
    close: 150,
  }]);
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: chartContainerRef.current.clientHeight,
        layout: {
          backgroundColor: '#ffffff',
          textColor: '#000000',
        },
        grid: {
          vertLines: {
            color: '#e1e1e1',
          },
          horzLines: {
            color: '#e1e1e1',
          },
        },
        priceScale: {
          borderColor: '#cccccc',
        },
        timeScale: {
          borderColor: '#cccccc',
        },
      });

      const candlestickSeries = chart.addCandlestickSeries({
        upColor: '#4caf50',
        downColor: '#f44336',
        borderDownColor: '#f44336',
        borderUpColor: '#4caf50',
        wickDownColor: '#f44336',
        wickUpColor: '#4caf50',
      });

      chartRef.current = candlestickSeries;

      return () => chart.remove();
    }
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const sortedHistory = [...priceHistory].sort((a, b) => a.time - b.time);
      chartRef.current.setData(sortedHistory);
    }
  }, [priceHistory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(prevPrice => {
        const change = (Math.random() - 0.5) * 2;
        const newPrice = Math.max(0, prevPrice + change);
        const lastEntry = priceHistory[priceHistory.length - 1];
        const newTime = lastEntry.time + 60; // Increment time by 60 seconds
        const newEntry = {
          time: newTime,
          open: lastEntry.close,
          high: Math.max(lastEntry.close, newPrice),
          low: Math.min(lastEntry.close, newPrice),
          close: newPrice,
        };
        setPriceHistory(prev => {
          // Remove duplicate timestamps
          const updatedHistory = [
            ...prev.filter(entry => entry.time < newTime),
            newEntry
          ].sort((a, b) => a.time - b.time); // Ensure the array is sorted
          return updatedHistory;
        });
        return newPrice;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [priceHistory]);

  const handleBuy = () => {
    setPrice(prev => prev * 1.05);
  };

  const handleSell = () => {
    setPrice(prev => prev * 0.95);
  };

  return (
    <Window className="w-full max-w-lg p-4">
      <WindowHeader className="font-custom text-xs">
        <span>Trading Terminal</span>
      </WindowHeader>
      <WindowContent className="bg-gray-800 p-4 flex flex-col items-center">
        <div className="mb-4">
          <span className="text-xl font-semibold text-white">Price: ${price.toFixed(2)}</span>
        </div>
        <div className="flex space-x-4 mb-4">
          <Button 
            onClick={handleBuy} 
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Buy
          </Button>
          <Button 
            onClick={handleSell} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sell
          </Button>
        </div>
        <div ref={chartContainerRef} className="w-full h-[170px] md:h-[200px]"></div> {/* Adjusted height */}
      </WindowContent>
    </Window>
  );
};

const CircularProgress = ({ value, color }) => (
  <div className="relative w-20 h-20">
    <svg className="w-full h-full" viewBox="0 0 100 100">
      <circle
        className="text-gray-700"
        strokeWidth="10"
        stroke="currentColor"
        fill="transparent"
        r="45"
        cx="50"
        cy="50"
      />
      <circle
        className={color}
        strokeWidth="10"
        strokeDasharray={`${value * 2.83} 283`}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r="45"
        cx="50"
        cy="50"
      />
    </svg>
    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-blue-400">
      {value}%
    </span>
  </div>
);

const TweetButton = ({ tweetText, twitter }) => {
  const handleTweet = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&via=${twitter}`;
    window.open(url, '_blank');
  };

  return (
    <Button onClick={handleTweet} className="px-4 py-2 font-bold">
      ACTIVATE SHILL
    </Button>
  );
};

export default function UltraFuturisticDashboard() {
  const [time, setTime] = useState(new Date());
  const [cryptoPrices, setCryptoPrices] = useState({ solana: 0, bitcoin: 0, ethereum: 0 });
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const fetchPrices = async () => {
      const prices = await fetchCryptoPrices();
      setCryptoPrices(prices);
    };
    fetchPrices();
    const priceInterval = setInterval(fetchPrices, 30000);

    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timer);
      clearInterval(priceInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <div className='w-screen bg-blue-900 text-[10px] py-0.5 text-cyan-400 text-center font-semibold'>CA: updating...</div>
      <ThemeProvider theme={original}>
        <div className="min-h-screen bg-black text-cyan-400 p-8 font-mono relative overflow-hidden">
          <Globe />
          <img src="eng.png" className='absolute bottom-0 right-[7.5%] w-[70%] md:w-[35%]'></img>
          <div className='absolute top-5 right-5 flex items-center z-[50]'>
            <a href="https://x.com/" className='transition ease-in-out duration-150'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12 md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#00aaff" viewBox="0 0 50 50">
                <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
              </svg>
            </a>
            <a href="https://t.me/" className='transition ease-in-out duration-150'>
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12  md:hover:scale-105 transition ease-in-out duration-150 cursor-pointer' fill="#00aaff" viewBox="0 0 50 50">
                <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
              </svg>
            </a>
          </div>
          <div className="relative z-10">
            <header className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                  HQ
                </h1>
                <p className="text-xl text-blue-600">Stellar Cycle: {time.toLocaleTimeString()}</p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isSmallScreen ? (
                <Window>
                  <WindowHeader className="font-custom text-xs">
                    <span>Solana Price</span>
                  </WindowHeader>
                  <WindowContent className="bg-gray-800 p-6">
                    <p className="text-xl text-blue-300">${cryptoPrices.solana.toFixed(2)}</p>
                  </WindowContent>
                </Window>
              ) : (
                <>
                  <Window>
                    <WindowHeader className="font-custom text-xs">
                      <span>Solana Price</span>
                    </WindowHeader>
                    <WindowContent className="bg-gray-800 p-6">
                      <p className="text-xl text-blue-300">${cryptoPrices.solana.toFixed(2)}</p>
                    </WindowContent>
                  </Window>

                  <Window>
                    <WindowHeader className="font-custom text-xs">
                      <span>Bitcoin Price</span>
                    </WindowHeader>
                    <WindowContent className="bg-gray-800 p-6">
                      <p className="text-xl text-blue-300">${cryptoPrices.bitcoin.toFixed(2)}</p>
                    </WindowContent>
                  </Window>

                  <Window>
                    <WindowHeader className="font-custom text-xs">
                      <span>Ethereum Price</span>
                    </WindowHeader>
                    <WindowContent className="bg-gray-800 p-6">
                      <p className="text-xl text-blue-300">${cryptoPrices.ethereum.toFixed(2)}</p>
                    </WindowContent>
                  </Window>
                </>
              )}
              
              <QuantumTradingWidget />
              <TradingSimulator />
              <MarketSentimentAnalysis />
              
              {/* Add TweetButton here */}
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center items-center">
                <TweetButton tweetText="Joining the Engineers" twitter="@twitter" />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
"use client";

import React, { useState } from "react";

interface NewsCardProps {
  article: {
    title: string;
    description: string;
    url: string;
    urlToImage?: string;
    publishedAt: string;
    published_date?: string;
    published_time?: string;
    source: {
      name: string;
      id?: string;
    };
    sentiment?: {
      Polarity: string;
      Subjectivity: string;
    };
    content?: string;
    author?: string;
  };
}


const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const [biasData, setBiasData] = useState<{
    summary: string;
    info: Array<{ title: string; url: string }>;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle card click to open article in new tab
  const handleCardClick = () => {
    const articleSlug = encodeURIComponent(JSON.stringify(article));
    window.open(`/article/${articleSlug}`, '_blank');
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const checkBias = async () => {
    setLoading(true);
    setError(null);
    setBiasData(null);
  
    try {
      const response = await fetch("http://localhost:5000/checkb", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          article_url: article.url, // sending the article URL as expected by Flask
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Bias check failed");
      }
  
      // Extract bias info from the first article in the articles array
      const biasArticle = data.articles[0];
  
      setBiasData({
        summary: biasArticle.description, // Use description as summary
        info: biasArticle.info || [],       // Use info array for related sources
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  // onClick={handleCardClick}
  return (
    <div  className="block bg-gray-900 border-2 border-[#050A30] rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 min-h-[500px] flex flex-col">
      {/* Image Section */}
      {article.urlToImage && (
        <div className="flex-shrink-0">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-[250px] object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      {/* Content Section */}
      <div  className="p-4 flex flex-col flex-1 overflow-hidden">
        <div onClick={handleCardClick} className="flex-1 overflow-y-auto">
          <h2 className="text-xl font-bold mb-2 text-white hover:text-blue-400 transition-colors">
            {article.title}
          </h2>
          
          {article.description && (
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              {article.description}
            </p>
          )}

          {article.content && (
            <p className="text-gray-400 text-xs mb-4 line-clamp-4">
              {article.content}
            </p>
          )}
        </div>

        {/* Metadata Footer */}
        <div className="mt-2 pt-2">
          <div className="pb-7">
            {article.sentiment && (
              <div className="flex justify-between text-xs mt-0">
                <span className="text-green-400">Sentiment: {article.sentiment.Polarity}</span>
                <span className="text-purple-400">{article.sentiment.Subjectivity}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-400 py-2 mb-2 border-t border-gray-700">
            <div className="space-y-1">
              <div className="font-medium block flex items-center space-x-2">
                <p>{article.source?.name || "Unknown Source"}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LINK</a>
              </div>
              {article.author && (
                <span className="text-gray-500 block text-xs">By {article.author}</span>
              )}
            </div>

            <time dateTime={article.published_date || article.publishedAt}>
              {formatDate(article.published_date || article.publishedAt)}
            </time>
          </div>
          
          {/* Check Bias Button */}
          <div className="flex justify-end">
          <button
             onClick={checkBias}
              className="w-32 mt-2 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
              disabled={loading}
              >
              {loading ? "Checking..." : "Check Bias"}
          </button>
        </div>

          
        
{biasData && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-gray-800 text-white p-6 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Bias Analysis Report</h3>
      
      {/* Summary Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-cyan-400 mb-2">Summary</h4>
        <p className="text-sm text-gray-300">{biasData.summary}</p>
      </div>

      {/* Sources Section */}
      <div className="mb-6">
        <h4 className="font-semibold text-cyan-400 mb-2">Related Sources</h4>
        <div className="space-y-2">
          {biasData.info.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <span className="text-sm text-cyan-300">{item.title}</span>
              <span className="block text-xs text-gray-400 mt-1">{item.url}</span>
            </a>
          ))}
        </div>
      </div>

      <button
        onClick={() => setBiasData(null)}
        className="mt-4 px-4 py-2 text-sm font-semibold bg-red-500 rounded-lg hover:bg-red-600 transition"
      >
        Close Report
      </button>
    </div>
  </div>
)}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-3 bg-red-900/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
        </div>
      </div>
  </div>
)};

export default NewsCard;

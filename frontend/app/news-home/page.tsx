"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input2 } from "../../components/ui/input2";
import { Footer } from "../../components/ui/footer";
import MainNav from "../main-nav/main-nav";
import TopNav from "../top-nav/top-nav";
import ThemeSwitcher from "../../components/ui/theme-switcher";
import NewsPaperImage from "../../components/ui/NewsPaper.png";
import NewsCard from "../../components/ui/NewsCard";

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [articles, setArticles] = useState([]); // State for fetched news articles
  const router = useRouter();
  const [topNews, setTopNews] = useState([]); // New state for top news

  
  useEffect(() => {
    fetch("http://localhost:5000/top") // Fetch top news from Flask API
      .then((response) => response.json())
      .then((data) => {
        if (!data.top_headlines || !data.top_headlines.articles || data.top_headlines.articles.length === 0) {
          console.error("No top headlines found");
          setTopNews([]); 
        } else {
          setTopNews(data.top_headlines.articles); // ✅ Correctly extract articles
        }
      })
      .catch((error) => console.error("Error fetching top news:", error));
  }, []);
  
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      fetch("http://localhost:5000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: storedEmail }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.articles || !data.articles.articles || data.articles.articles.length === 0) {
            console.error("No articles found:", data.error || "Empty response");
            setArticles([]); // Ensure articles is an empty array
          } else {
            setArticles(data.articles.articles); // ✅ Extract correct articles array
          }
        })
        .catch((error) => console.error("Error fetching articles:", error));
    }
  }, []);
  
  // Handle search input changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Search function to call Flask backend and redirect
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  //console.log(articles);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <TopNav />
      <header className="border-b border-cyan-500/20 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a href="http://localhost:3000/">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-500 transition-all duration-300 pb-2">
                  InsightPlus
                </h1>
              </a>
              <img
                src={NewsPaperImage.src}
                alt="NewsPaper Logo"
                className="w-21 h-16 rounded-full border-2 border-cyan-500/30  hover:border-cyan-400 transform transition-all duration-300 hover:scale-105"
              />
            </div>

            <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="relative w-[360px]">
                <Input2
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search news..."
                  className="bg-gray-800/60 backdrop-blur-sm border border-cyan-500/30 pl-6 pr-12 text-cyan-100 placeholder-cyan-400/60 shadow-lg shadow-cyan-500/10 focus:shadow-cyan-500/30 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 rounded-xl hover:border-cyan-400/50 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="absolute right-12 top-1/2 -translate-y-1/2 p-1.5 bg-cyan-500/20 rounded-lg hover:bg-cyan-400/30 transition-colors duration-200"
                >
                  <Search className="h-5 w-5 text-cyan-400" />
                </button>
              </form>
              {/* <ThemeSwitcher /> */}
            </div>
          </div>
          <MainNav />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Top News Section */}
        <section className="w-full backdrop-blur-lg bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 rounded-2xl p-8 shadow-2xl shadow-cyan-500/10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent mb-4 pb-2 animate-text-shimmer">
              Breaking News
              <span className="ml-4 text-cyan-400/50">|</span>
              <span className="ml-2 text-lg font-normal text-cyan-300/80">Global Search</span>
            </h1>
            <p className="text-cyan-300/80 text-lg">
              Stay informed with the latest headlines from around the world
            </p>
          </div>
          {topNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topNews.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-cyan-400/80 text-xl animate-pulse">
                Loading top stories...
              </p>
            </div>
          )}
        </section>

        {/* Category-Wise News Section */}
        <section className="space-y-12">
          <h2 className="text-3xl font-bold text-cyan-400 mb-8">
            Your Personalized News
          </h2>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 space-y-4">
              <p className="text-cyan-400/80 text-xl animate-pulse">
                Loading your news...
              </p>
              <button
                onClick={() => router.push('/preferences')}
                className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-all duration-300"
              >
                Update Preferences
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer  />
    </div>
  );
}

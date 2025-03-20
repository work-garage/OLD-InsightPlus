"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TopNav from "../top-nav/top-nav";
import NewsCard from "../../components/ui/NewsCard";
import {Footer} from "@/components/ui/footer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch("http://localhost:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.articles?.articles || data.articles.articles.length === 0) {
            console.error("No articles found:", data.error || "Empty response");
            setSearchResults([]);
          } else {
            setSearchResults(data.articles.articles);
          }
        })
        .catch((error) => console.error("Error fetching search results:", error));
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0e1729] to-gray-900 animate-gradient-x">
      <TopNav />
      <header className="border-b border-cyan-500/20 backdrop-blur-xl bg-gradient-to-b from-slate-900/80 to-slate-900/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Search Results
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 space-y-20">
        <section className="w-full backdrop-blur-2xl bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-purple-500/5 border-2 border-cyan-500/20 rounded-3xl p-10 shadow-2xl shadow-cyan-500/20">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent mb-4 pb-2 animate-text-shimmer">
              Results for "{query}"
              <span className="ml-4 text-cyan-400/50">|</span>
              <span className="ml-2 text-lg font-normal text-cyan-300/80">Global Search</span>
            </h1>
            <p className="text-cyan-300/80 text-xl font-light tracking-wide">
              Exploring the web for relevant news and articles
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {searchResults.map((article, index) => (
                <NewsCard 
                  key={index} 
                  article={article}
                  
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-6 bg-slate-900/30 rounded-3xl border border-dashed border-cyan-500/30">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-cyan-500/20 rounded w-3/4 mx-auto" />
                <div className="h-32 bg-cyan-500/20 rounded-xl w-full" />
              </div>
              <p className="text-cyan-400/80 text-xl animate-pulse">
                Finding results for your search
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
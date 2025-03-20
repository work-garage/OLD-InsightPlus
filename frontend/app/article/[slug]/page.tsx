"use client";

import { useParams } from "next/navigation";
import TopNav from "@/app/top-nav/top-nav";
import { Footer } from "@/components/ui/footer";


export default function ArticlePage() {
  const params = useParams();
  const articleSlug = params?.slug as string;
  
  // Parse the article data from slug
  const articleData = articleSlug ? 
    JSON.parse(decodeURIComponent(articleSlug)) : 
    null;

  if (!articleData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0e1729] to-gray-900">
        <TopNav />
        <div className="container mx-auto px-4 py-12 text-center text-cyan-400">
          Loading article...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0e1729] to-gray-900 animate-gradient-x">
      <TopNav />
      
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <article className="backdrop-blur-2xl bg-gradient-to-br from-cyan-500/15 to-blue-600/10 border-2 border-cyan-500/20 rounded-3xl p-8 shadow-2xl shadow-cyan-500/20">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent mb-4 pb-2">
              {articleData.title}
            </h1>
            <div className="flex items-center justify-between text-cyan-300/80">
              <div>
                <span className="font-medium">{articleData.source?.name}</span>
                {articleData.author && (
                  <span className="ml-4">by {articleData.author}</span>
                )}
              </div>
              <time dateTime={articleData.publishedAt}>
                {new Date(articleData.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })}
            </time>
            </div>
          </header>

          {/* Article Image */}
          {articleData.urlToImage && (
            <img
              src={articleData.urlToImage}
              alt={articleData.title}
              className="w-full h-96 object-cover rounded-xl mb-8"
            />
          )}

          {/* Article Content =======================         
          <div className="prose prose-invert max-w-none text-gray-300 font-light text-lg leading-relaxed">
            {articleData.content && (
              <div dangerouslySetInnerHTML={{ __html: articleData.content }} />
            )}
            
            {!articleData.content && articleData.description && (
              <p className="text-xl">{articleData.description}</p>
            )}                                                                changed this form below, for formatting to paragraghs*/}

          <div className="prose prose-invert max-w-none text-gray-300 font-light text-lg leading-relaxed">
            {articleData.content && (
              <div dangerouslySetInnerHTML={{ 
                __html: articleData.content.replace(/\n/g, '<br />') 
            }} />
          )}
  
          {!articleData.content && articleData.description && (
            <p className="text-xl">{articleData.description}</p>
          )}


            {/* Sentiment Analysis */}
            {articleData.sentiment && (
              <div className="mt-8 p-4 bg-slate-900/30 rounded-xl">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">Sentiment Analysis</h3>
                <div className="flex justify-between">
                  <div>
                    <span className="text-green-400">Polarity: </span>
                    {articleData.sentiment.Polarity}
                  </div>
                  <div>
                    <span className="text-purple-400">Subjectivity: </span>
                    {articleData.sentiment.Subjectivity}
                  </div>
                </div>
              </div>
            )}

            {/* Original Source Link */}
            <div className="mt-8 text-center">
              <a
                href={articleData.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-400/20"
              >
                Read Official Article at {articleData.source?.name}
              </a>
            </div>
          </div>
        </article>
        {/* Comment Section */}
        <section className="mt-16 backdrop-blur-2xl bg-gradient-to-br from-cyan-500/15 to-blue-600/10 border-2 border-cyan-500/20 rounded-3xl p-8 shadow-2xl shadow-cyan-500/20">
          <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent mb-6">
            Discussion (2)
          </h2>

          {/* Comment List */}
          <div className="space-y-6 mb-12">
            {/* Comment 1 */}
            <div className="group backdrop-blur-lg bg-slate-900/30 rounded-xl p-6 transition-all duration-300 hover:bg-slate-900/50">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-400 font-medium">JD</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-cyan-300">John Doe</h3>
                    <span className="text-sm text-cyan-400/60">2 hours ago</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Really insightful article! The sentiment analysis feature is particularly 
                    interesting. Would love to see more technical details about how it's implemented.
                  </p>
                </div>
              </div>
            </div>

            {/* Comment 2 */}
            <div className="group backdrop-blur-lg bg-slate-900/30 rounded-xl p-6 transition-all duration-300 hover:bg-slate-900/50">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-400 font-medium">SA</span>
                  </div>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-cyan-300">Sarah Alpha</h3>
                    <span className="text-sm text-cyan-400/60">5 hours ago</span>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Great read! The visual design of this article page is stunning. 
                    The gradient backgrounds and blur effects create a really immersive experience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Comment Form */}
          <div className="backdrop-blur-lg bg-slate-900/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-cyan-300 mb-6">Leave a Comment</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/50"
              />
              <textarea
                placeholder="Write your comment..."
                rows={4}
                className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-gray-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-400/20"
              >
                Post Comment
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
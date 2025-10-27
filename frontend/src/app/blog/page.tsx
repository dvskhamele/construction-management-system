'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import UserLayout from '../../components/UserLayout'

export default function BlogPage() {
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: '',
    search: ''
  })

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Mock blog posts data
    const mockPosts = [
      {
        id: 1,
        title: "10 Strategies to Reduce Construction Waste and Improve Sustainability",
        excerpt: "Learn how implementing proper waste management protocols can reduce costs by up to 30% while maintaining project timelines.",
        category: "Sustainability",
        author: "Rajesh Sharma",
        date: "2025-01-15",
        readTime: "8 min",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        tags: ["waste management", "sustainability", "efficiency"]
      },
      {
        id: 2,
        title: "The Future of Legal Compliance in Construction: What Contractors Need to Know",
        excerpt: "Navigate the evolving landscape of construction regulations and ensure your projects remain compliant with current and upcoming laws.",
        category: "Legal",
        author: "Priya Patel",
        date: "2025-01-10",
        readTime: "12 min",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        tags: ["compliance", "legal", "regulations"]
      },
      {
        id: 3,
        title: "How Digital Transformation is Revolutionizing Construction Project Management",
        excerpt: "Discover the tools and technologies that are reshaping how construction projects are planned, executed, and managed.",
        category: "Technology",
        author: "Amit Kumar",
        date: "2025-01-05",
        readTime: "10 min",
        image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        tags: ["technology", "digital transformation", "project management"]
      },
      {
        id: 4,
        title: "Material Cost Optimization: Strategies for Managing Fluctuating Prices",
        excerpt: "Learn how to protect your profit margins against volatile material costs with smart procurement and inventory strategies.",
        category: "Finance",
        author: "Sunita Mehta",
        date: "2024-12-28",
        readTime: "7 min",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        tags: ["cost optimization", "procurement", "finance"]
      },
      {
        id: 5,
        title: "Safety First: Implementing a Zero-Incident Culture on Construction Sites",
        excerpt: "Building a safety-first culture that protects workers and reduces costly delays and legal issues.",
        category: "Safety",
        author: "Vikram Singh",
        date: "2024-12-20",
        readTime: "9 min",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        tags: ["safety", "culture", "risk management"]
      },
      {
        id: 6,
        title: "The Rise of Green Building: Opportunities for Construction Contractors",
        excerpt: "Explore the growing market for sustainable construction and how to position your business for green building projects.",
        category: "Sustainability",
        author: "Arjun Desai",
        date: "2024-12-15",
        readTime: "11 min",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        tags: ["green building", "sustainability", "market opportunities"]
      }
    ]

    // Simulate API loading
    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 500)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const filteredPosts = posts.filter(post => {
    const matchesCategory = !filters.category || post.category === filters.category
    const matchesSearch = !filters.search || 
      post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(filters.search.toLowerCase()) ||
      post.tags.some((tag: string) => tag.toLowerCase().includes(filters.search.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))]

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
            BuildMate Blog
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Industry insights, best practices, and expert advice for construction professionals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
              />
            </div>
            <div>
              <select
                className="w-full md:w-48 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value === 'All' ? '' : e.target.value})}
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-teal-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors duration-300">
                    <Link href={`/blog/${post.id}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-slate-600 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag: string, index: number) => (
                      <span key={index} className="bg-slate-100 text-slate-700 text-xs font-medium px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="inline-flex items-center text-teal-600 font-medium hover:text-teal-800 transition-colors duration-300"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="mb-6 text-teal-100">
              Subscribe to our newsletter for the latest industry insights and best practices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-300"
              />
              <button className="bg-white text-teal-600 font-semibold px-6 py-3 rounded-lg hover:bg-slate-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  )
}
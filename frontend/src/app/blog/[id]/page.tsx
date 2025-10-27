'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import UserLayout from '../../../components/UserLayout'

export default function BlogPostDetail({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<any>(null)
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Mock blog post data
    const mockPost = {
      id: 1,
      title: "10 Strategies to Reduce Construction Waste and Improve Sustainability",
      excerpt: "Learn how implementing proper waste management protocols can reduce costs by up to 30% while maintaining project timelines.",
      content: `
        <p>In today's environmentally conscious world, construction waste management isn't just a regulatory requirement—it's a business imperative. With construction waste accounting for nearly 40% of global solid waste, smart contractors are discovering that waste reduction strategies can simultaneously boost profitability and reduce environmental impact.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">The Cost of Construction Waste</h2>
        <p>Construction waste costs the industry billions annually. Beyond the immediate material costs, waste represents missed opportunities for value recovery, disposal fees, and regulatory compliance expenses. A typical construction project generates 1.3 tons of waste per square foot, making waste management a critical component of project profitability.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">10 Proven Strategies for Waste Reduction</h2>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">1. Design for Deconstruction</h3>
        <p>Planning for material reuse from the initial design phase can reduce waste by up to 50%. This approach involves selecting materials and construction methods that facilitate future disassembly and material recovery.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">2. Implement Just-in-Time Delivery</h3>
        <p>Coordinating material deliveries with the construction schedule minimizes on-site storage and reduces the risk of weather damage or theft. This approach can reduce waste by 15-20% while improving cash flow.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">3. Establish Material Recovery Programs</h3>
        <p>Creating systems for sorting and recovering materials on-site can divert up to 75% of waste from landfills. Partner with recycling companies to monetize recovered materials.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">4. Leverage Technology for Precise Material Estimation</h3>
        <p>Advanced project management software can reduce material over-ordering by 10-15% through precise calculations and real-time tracking of material usage.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">5. Standardize Material Specifications</h3>
        <p>Using standard sizes and materials across projects reduces cutting waste and allows for better purchasing economies.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">6. Train Workers on Waste Prevention</h3>
        <p>Worker education programs can reduce waste by 10-20% by preventing common errors that generate unnecessary materials discard.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">7. Implement Digital Takeoff Tools</h3>
        <p>Digital quantity takeoff tools provide more accurate material calculations than manual methods, reducing over-ordering and waste.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">8. Use Prefabrication and Modular Construction</h3>
        <p>Off-site construction methods produce 65% less waste than traditional on-site methods, as materials are cut in controlled environments with minimal error.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">9. Establish On-Site Sorting Systems</h3>
        <p>Dedicated areas for different waste types enable efficient recycling and reduce contamination between material streams.</p>
        
        <h3 class="text-xl font-semibold mt-6 mb-3">10. Monitor and Measure Continuously</h3>
        <p>Tracking waste generation by project phase enables identification of problem areas and continuous improvement of waste reduction efforts.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Technology Solutions for Waste Management</h2>
        <p>Modern construction management software can track waste generation and recovery in real-time. These systems provide dashboards showing waste per square foot, recovery rates, and cost impacts, enabling data-driven waste reduction strategies.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Measuring Success</h2>
        <p>Track waste metrics including waste per square foot, recovery rate, and disposal costs. Industry leaders achieve recovery rates of 80% or higher while reducing overall disposal costs by 30-50%.</p>
        
        <p>Implementing these strategies requires initial investment in planning and training, but the returns in cost savings and environmental compliance make them essential for modern construction operations. The contractors who embrace comprehensive waste management today will be the industry leaders of tomorrow.</p>
      `,
      category: "Sustainability",
      author: "Rajesh Sharma",
      authorBio: "Rajesh Sharma is a construction waste management specialist with 15 years of experience helping contractors reduce costs and improve sustainability. He has worked with over 200 construction firms across India.",
      date: "2025-01-15",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      tags: ["waste management", "sustainability", "efficiency", "cost reduction"],
      seoTitle: "10 Strategies to Reduce Construction Waste and Improve Sustainability",
      seoDescription: "Learn how implementing proper waste management protocols can reduce costs by up to 30% while maintaining project timelines.",
      canonicalUrl: `https://constructioncrm.vercel.app/blog/${params.id}`
    }

    // Mock related posts
    const mockRelatedPosts = [
      {
        id: 2,
        title: "The Future of Legal Compliance in Construction",
        category: "Legal",
        date: "2025-01-10",
        readTime: "12 min"
      },
      {
        id: 3,
        title: "How Digital Transformation is Revolutionizing Construction Project Management",
        category: "Technology",
        date: "2025-01-05",
        readTime: "10 min"
      },
      {
        id: 4,
        title: "Material Cost Optimization: Strategies for Managing Fluctuating Prices",
        category: "Finance",
        date: "2024-12-28",
        readTime: "7 min"
      }
    ]

    // Simulate API loading
    setTimeout(() => {
      setPost(mockPost)
      setRelatedPosts(mockRelatedPosts)
      setLoading(false)
    }, 500)
  }, [params.id])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  if (loading) {
    return (
      <UserLayout user={user} onLogout={handleLogout}>
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        </div>
      </UserLayout>
    )
  }

  if (!post) {
    return (
      <UserLayout user={user} onLogout={handleLogout}>
        <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚫</div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Blog Post Not Found</h1>
            <p className="text-slate-600 mb-6">The article you're looking for doesn't exist or has been moved.</p>
            <Link href="/blog" className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-300">
              Browse All Articles
            </Link>
          </div>
        </div>
      </UserLayout>
    )
  }

  // SEO Meta Tags
  // <title>{post.seoTitle} | BuildMate Construction Blog</title>
  // <meta name="description" content={post.seoDescription} />
  // <meta name="keywords" content={post.tags.join(', ')} />
  // <meta name="author" content={post.author} />
  // <link rel="canonical" href={post.canonicalUrl} />

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Article Header */}
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="relative h-80 md:h-96">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-teal-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-slate-500 text-sm">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="text-slate-500 text-sm">
                {post.readTime} read
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center mb-8 pb-6 border-b border-slate-200">
              <div className="bg-slate-200 border-2 border-dashed rounded-xl w-12 h-12" />
              <div className="ml-4">
                <div className="font-bold text-slate-900">{post.author}</div>
                <div className="text-slate-600 text-sm">{post.authorBio}</div>
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string, index: number) => (
                  <span key={index} className="bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
        
        {/* Author Bio Section */}
        <div className="bg-slate-50 rounded-2xl p-8 mt-12">
          <div className="flex items-start">
            <div className="bg-slate-200 border-2 border-dashed rounded-xl w-16 h-16" />
            <div className="ml-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{post.author}</h3>
              <p className="text-slate-600">{post.authorBio}</p>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-sm text-teal-600 font-medium mb-2">{relatedPost.category}</div>
                <h3 className="font-bold text-slate-900 mb-2 line-clamp-2">
                  <Link href={`/blog/${relatedPost.id}`} className="hover:text-teal-600 transition-colors duration-300">
                    {relatedPost.title}
                  </Link>
                </h3>
                <div className="flex text-sm text-slate-500 mt-4">
                  <span>{new Date(relatedPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span className="mx-2">•</span>
                  <span>{relatedPost.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-teal-600 to-teal-800 rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="mb-6 text-teal-100">
              Subscribe to our newsletter for more industry insights and best practices
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
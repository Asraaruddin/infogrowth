'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Clock, User, Tag, ChevronRight, Search, Filter, ThumbsUp, MessageCircle, Share2, Bookmark, ArrowRight, TrendingUp, Users, Globe, Zap, Eye, Heart, BookOpen, Award, BarChart, CheckCircle, X } from 'lucide-react';

// Define the BlogPost type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  role: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  trending: boolean;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Digital Transformation in 2024',
    excerpt: 'Explore how AI, machine learning, and cloud computing are reshaping business operations and creating new opportunities for growth and innovation.',
    content: `Digital transformation is no longer a choice but a necessity for businesses looking to thrive in the modern economy. As we move into 2024, several key trends are emerging that will shape the future of how businesses operate and compete.

**Key Trends to Watch:**

1. **AI-Powered Automation**
   Businesses are increasingly adopting AI to automate repetitive tasks, analyze customer data, and make predictive decisions. This not only improves efficiency but also enables more personalized customer experiences.

2. **Hybrid Cloud Solutions**
   Organizations are moving towards hybrid cloud environments that offer the flexibility of public cloud with the security of private infrastructure. This approach allows for better data management and cost optimization.

3. **Edge Computing**
   With the growth of IoT devices, edge computing is becoming crucial for processing data closer to its source, reducing latency and improving real-time decision making.

4. **Cybersecurity Mesh**
   As cyber threats evolve, a cybersecurity mesh architecture provides more flexible and scalable security that can protect distributed assets.

**Impact on Business Operations:**

- **Enhanced Customer Experience:** Digital tools enable more personalized and responsive customer service
- **Improved Efficiency:** Automation reduces manual work and minimizes errors
- **Data-Driven Decisions:** Real-time analytics provide actionable insights
- **Remote Work Enablement:** Cloud-based tools support distributed teams

**Real-Time Application at Infogrowth:**

At Infogrowth, we've implemented real-time monitoring systems that track customer engagement metrics, server performance, and market trends. Our AI algorithms analyze this data continuously to provide actionable insights within seconds. For example, our system can detect a potential service disruption and trigger automatic scaling or notify our engineering team before customers are affected.

**Real-Time Blog Features:**
- Live traffic analytics showing current readers
- Real-time comment updates without page refresh
- Live polls and interactive elements
- Instant notifications for new comments
- Dynamic content updates based on user behavior`,
    author: 'Sarah Johnson',
    role: 'Chief Technology Officer',
    date: '2024-01-15',
    readTime: '8 min read',
    category: 'Technology',
    tags: ['Digital Transformation', 'AI', 'Cloud Computing', 'Innovation'],
    views: 12458,
    likes: 892,
    comments: 143,
    featured: true,
    trending: true,
    image: '/blogs.avif'
  },
  {
    id: 3,
    title: 'Data-Driven Decision Making: From Insights to Action',
    excerpt: 'How modern businesses are leveraging analytics and BI tools to transform raw data into strategic business decisions.',
    content: `In today's data-rich environment, the ability to quickly turn insights into action is a key competitive advantage. This post explores how organizations can build data-driven cultures and implement effective decision-making processes.

**Building a Data-Driven Culture:**

1. **Data Accessibility**
   Ensure that relevant data is accessible to decision-makers across the organization. This includes:
   - Self-service BI tools
   - Clear data governance policies
   - Training on data literacy

2. **Real-Time Analytics**
   Move beyond batch processing to real-time analytics that provide immediate insights. Key areas include:
   - Live dashboards for operational metrics
   - Real-time customer behavior tracking
   - Instant anomaly detection

3. **Predictive Analytics**
   Use machine learning models to forecast trends and identify opportunities before they become apparent.

**Real-Time Dashboard at Infogrowth:**

Our real-time dashboard provides:
- **Live Sales Data:** Current revenue, conversion rates, and top products
- **Customer Engagement:** Active users, session durations, feature usage
- **System Performance:** API response times, error rates, infrastructure health
- **Market Trends:** Competitor activity, social media mentions, industry news

**Case Study: Optimizing Customer Support**

By implementing real-time analytics, we reduced our average response time by 40%. The system identifies trending issues and automatically routes them to specialized agents, while also providing agents with relevant customer history and suggested solutions.

**Interactive Elements in This Blog:**
- Live data visualization that updates every 30 seconds
- Interactive charts that readers can filter and explore
- Real-time poll showing reader opinions on data tools
- Comment section with instant notifications`,
    author: 'Priya Sharma',
    role: 'Head of Data Analytics',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'Analytics',
    tags: ['Data Analytics', 'BI', 'Decision Making', 'Metrics'],
    views: 7561,
    likes: 512,
    comments: 67,
    featured: false,
    trending: false,
    image: '/blogs.avif'
  },
  {
    id: 4,
    title: 'Modern UI/UX Trends for Enterprise Applications',
    excerpt: 'Discover the latest design patterns and user experience principles that are transforming enterprise software interfaces.',
    content: `Enterprise applications have traditionally prioritized functionality over user experience, but this is changing rapidly. Modern users expect enterprise software to be as intuitive and engaging as consumer applications.

**Key UI/UX Trends for 2024:**

1. **Dark Mode Everywhere**
   With growing preference for dark interfaces, especially for developers and late-night workers, providing a seamless dark mode experience is essential.

2. **AI-Powered Personalization**
   Interfaces that adapt to individual user preferences and work patterns, suggesting relevant actions and streamlining workflows.

3. **Voice and Gesture Controls**
   Hands-free interaction is becoming more important, especially in industrial and healthcare settings.

4. **Real-Time Collaboration Features**
   Built-in chat, co-editing, and presence indicators that enable seamless teamwork within applications.

**Real-Time Design System at Infogrowth:**

Our design system includes:
- **Live Component Library:** Developers can see real-time updates to components as designers make changes
- **Usage Analytics:** Track which components are used most and identify pain points
- **Accessibility Scanner:** Real-time accessibility checking during development
- **Performance Monitoring:** Track render times and optimize accordingly

**Interactive Prototyping:**

We use real-time prototyping tools that allow stakeholders to interact with designs and provide immediate feedback. Changes are reflected instantly across all prototypes, enabling rapid iteration.

**This Blog's Real-Time Features:**
- Live preview of design components that readers can interact with
- Real-time user testing results showing interface effectiveness
- Dynamic examples that respond to reader input
- Live comment section with threaded discussions`,
    author: 'David Park',
    role: 'Lead UX Designer',
    date: '2024-01-08',
    readTime: '6 min read',
    category: 'Design',
    tags: ['UI/UX', 'Design Systems', 'User Experience', 'Enterprise'],
    views: 6234,
    likes: 421,
    comments: 54,
    featured: false,
    trending: false,
    image: '/blogs2.avif'
  },
  {
    id: 5,
    title: 'DevOps Best Practices for Continuous Delivery',
    excerpt: 'Streamline your development pipeline with proven DevOps practices that ensure reliable and frequent deployments.',
    content: `Continuous Delivery is the backbone of modern software development, enabling teams to release updates quickly and reliably. This post covers the essential practices that make CD pipelines effective.

**Essential DevOps Practices:**

1. **Infrastructure as Code (IaC)**
   Manage your infrastructure using code, enabling version control, repeatability, and automation of environment setup.

2. **Automated Testing**
   Implement comprehensive test automation at every level: unit, integration, and end-to-end testing.

3. **Continuous Monitoring**
   Monitor applications and infrastructure in production to detect and resolve issues quickly.

4. **Blue-Green Deployments**
   Reduce deployment risk by maintaining two identical production environments and switching traffic between them.

**Real-Time Pipeline at Infogrowth:**

Our CI/CD pipeline features:
- **Live Build Status:** Real-time visibility into build, test, and deployment stages
- **Automated Rollbacks:** Automatic rollback when metrics indicate issues
- **Performance Testing:** Real-time performance comparison between versions
- **Security Scanning:** Continuous security assessment during the pipeline

**Metrics We Track in Real-Time:**
- Build success rates and failure reasons
- Test coverage and pass percentages
- Deployment frequency and lead time
- Mean time to recovery (MTTR)

**Interactive Elements:**
- Live pipeline visualization showing current builds
- Real-time metrics dashboard
- Interactive deployment timeline
- Live chat with our DevOps team (during business hours)`,
    author: 'Alex Rodriguez',
    role: 'DevOps Architect',
    date: '2024-01-05',
    readTime: '9 min read',
    category: 'DevOps',
    tags: ['DevOps', 'CI/CD', 'Automation', 'Deployment'],
    views: 8912,
    likes: 589,
    comments: 78,
    featured: false,
    trending: false,
    image: '/blogs.avif'
  },
  {
    id: 6,
    title: 'Customer Success in the Age of SaaS',
    excerpt: 'How to build and maintain strong customer relationships in subscription-based business models.',
    content: `In the SaaS world, customer success is the new sales. Retaining customers and expanding relationships requires a proactive approach to understanding and addressing customer needs.

**Key Strategies for SaaS Customer Success:**

1. **Proactive Onboarding**
   Guide customers through initial setup and help them achieve their first wins quickly.

2. **Health Scoring**
   Develop metrics that indicate customer satisfaction and likelihood of renewal.

3. **Regular Business Reviews**
   Schedule periodic reviews to discuss progress, challenges, and future plans.

4. **Community Building**
   Create spaces for customers to connect, share best practices, and provide feedback.

**Real-Time Customer Success at Infogrowth:**

Our customer success platform provides:
- **Live Usage Analytics:** See how customers are using our products in real-time
- **Health Scores:** Automated calculation of customer health based on multiple factors
- **Alert System:** Notifications when customers show signs of risk
- **Success Planning:** Collaborative tools for setting and tracking goals

**This Blog's Real-Time Integration:**
- Live customer satisfaction scores from our platform
- Real-time case study updates showing customer results
- Interactive success metrics that readers can explore
- Live Q&A section with our customer success team`,
    author: 'Lisa Wang',
    role: 'Director of Customer Success',
    date: '2024-01-03',
    readTime: '5 min read',
    category: 'Business',
    tags: ['Customer Success', 'SaaS', 'Retention', 'Growth'],
    views: 5342,
    likes: 345,
    comments: 42,
    featured: false,
    trending: false,
    image: '/blogs2.avif'
  }
];

const categories = [
  { name: 'All', count: blogPosts.length, icon: Globe },
  { name: 'Technology', count: 2, icon: Zap },
  { name: 'Engineering', count: 2, icon: Award },
  { name: 'Analytics', count: 1, icon: BarChart },
  { name: 'Design', count: 1, icon: CheckCircle },
  { name: 'DevOps', count: 1, icon: TrendingUp },
  { name: 'Business', count: 1, icon: Users }
];

const popularTags = [
  'Digital Transformation', 'AI', 'Microservices', 'Data Analytics',
  'UI/UX', 'DevOps', 'Customer Success', 'Cloud Computing',
  'Scalability', 'Innovation', 'Best Practices'
];

interface Comment {
  id: number;
  user: string;
  comment: string;
  time: string;
  likes: number;
}

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: 'John Doe', comment: 'Great insights on digital transformation! Looking forward to implementing these strategies.', time: '2 hours ago', likes: 12 },
    { id: 2, user: 'Sarah Miller', comment: 'The real-time examples really help understand the concepts better. More please!', time: '5 hours ago', likes: 8 },
    { id: 3, user: 'Tech Enthusiast', comment: 'How does this compare to your experience with legacy systems?', time: '1 day ago', likes: 5 }
  ]);
  const [newComment, setNewComment] = useState('');
  const [liveMetrics, setLiveMetrics] = useState({
    currentReaders: 42,
    activeSessions: 156,
    totalViews: 48923,
    trendingPosts: 3
  });

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: number) => {
    // In real app, this would be an API call
    alert(`Liked post ${postId}`);
  };

  const handleBookmark = (postId: number) => {
    alert(`Bookmarked post ${postId}`);
  };

  const handleShare = (postId: number) => {
    alert(`Shared post ${postId}`);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: comments.length + 1,
        user: 'You',
        comment: newComment,
        time: 'Just now',
        likes: 0
      };
      setComments([newCommentObj, ...comments]);
      setNewComment('');
    }
  };

  // Simulate live metrics updates
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        currentReaders: prev.currentReaders + Math.floor(Math.random() * 3) - 1,
        activeSessions: prev.activeSessions + Math.floor(Math.random() * 5) - 2
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white py-20 md:py-28">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 text-indigo-200 mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm font-medium">Infogrowth Insights</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Real-Time Knowledge Hub
            </h1>
            
            <p className="text-xl text-white/90 mb-10 leading-relaxed max-w-3xl mx-auto">
              Stay ahead with our live-updating blogs featuring real-time data, interactive examples, 
              and instant feedback from industry experts. Experience content that evolves as you read.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Blog Posts */}
            <div className="lg:col-span-2">
              {/* Search and Filter */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Articles
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by title, content, or tags..."
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Filter by Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.name ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                          >
                            <Icon className="w-4 h-4" />
                            {cat.name}
                            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                              {cat.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${selectedPost?.id === post.id ? 'ring-2 ring-indigo-500' : ''}`}
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="md:flex">
                      <div className="md:w-2/5 relative h-64 md:h-auto">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                          priority={post.featured}
                        />
                        {post.featured && (
                          <div className="absolute top-4 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Featured
                          </div>
                        )}
                        {post.trending && (
                          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            Trending
                          </div>
                        )}
                      </div>
                      <div className="md:w-3/5 p-6">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-gray-600">
                            <Eye className="w-4 h-4" />
                            {(post.views / 1000).toFixed(1)}K views
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-indigo-600 cursor-pointer">
                          {post.title}
                        </h2>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">{post.author}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <span className="text-sm text-gray-600">{post.role}</span>
                        </div>

                        <p className="text-gray-600 mb-4">{post.excerpt}</p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(post.id);
                              }}
                              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
                            >
                              <ThumbsUp className="w-5 h-5" />
                              <span>{post.likes}</span>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPost(post);
                              }}
                              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
                            >
                              <MessageCircle className="w-5 h-5" />
                              <span>{post.comments}</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(post.id);
                              }}
                              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
                            >
                              <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBookmark(post.id);
                              }}
                              className="text-gray-600 hover:text-indigo-600"
                            >
                              <Bookmark className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPost(post);
                              }}
                              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                              Read Full Article
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* About Card */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About Infogrowth Blogs</h3>
                  <p className="text-gray-600 mb-4">
                    Our blogs feature real-time updates, interactive content, and live data integration. 
                    Experience knowledge that evolves as you engage with it.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm text-gray-700">Real-time content updates</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm text-gray-700">Live expert interactions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm text-gray-700">Interactive data visualizations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-indigo-600" />
                      <span className="text-sm text-gray-700">Instant feedback systems</span>
                    </div>
                  </div>
                </div>

                {/* Featured Image Highlight */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src="/blogs2.avif"
                      alt="Featured Blog Image"
                      fill
                      className="object-cover opacity-90"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-bold text-lg mb-2">Real-Time Blog Experience</h3>
                      <p className="text-white/90 text-sm">
                        Experience dynamic content that updates in real-time as you read
                      </p>
                    </div>
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 rounded-full text-sm transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selected Post Detail Modal/Overlay */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Post Header */}
              <div className="relative h-96">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedPost.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {(selectedPost.views / 1000).toFixed(1)}K views
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedPost.title}</h1>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold">{selectedPost.author}</div>
                        <div className="text-sm opacity-90">{selectedPost.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <div className="mb-8">
                    <p className="text-xl text-gray-700 leading-relaxed">{selectedPost.excerpt}</p>
                  </div>

                  {/* Live Metrics Bar */}
                  <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      <h3 className="text-lg font-bold text-gray-900">Live Metrics</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{selectedPost.views}</div>
                        <div className="text-sm text-gray-600">Total Views</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{selectedPost.likes}</div>
                        <div className="text-sm text-gray-600">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">{selectedPost.comments}</div>
                        <div className="text-sm text-gray-600">Comments</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600">
                          {liveMetrics.currentReaders}
                        </div>
                        <div className="text-sm text-gray-600">Reading Now</div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content */}
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {selectedPost.content}
                  </div>

                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <div className="flex flex-wrap gap-2">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleLike(selectedPost.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                      >
                        <ThumbsUp className="w-5 h-5" />
                        Like ({selectedPost.likes})
                      </button>
                      <button
                        onClick={() => handleBookmark(selectedPost.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                      >
                        <Bookmark className="w-5 h-5" />
                        Bookmark
                      </button>
                      <button
                        onClick={() => handleShare(selectedPost.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700"
                      >
                        <Share2 className="w-5 h-5" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments ({comments.length})</h3>
                  
                  {/* Add Comment */}
                  <form onSubmit={handleSubmitComment} className="mb-8">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-3"
                    />
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                      >
                        Post Comment
                      </button>
                    </div>
                  </form>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <div key={comment.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{comment.user}</div>
                              <div className="text-sm text-gray-500">{comment.time}</div>
                            </div>
                          </div>
                          <button 
                            onClick={() => {
                              const newComments = comments.map(c => 
                                c.id === comment.id ? {...c, likes: c.likes + 1} : c
                              );
                              setComments(newComments);
                            }}
                            className="text-gray-400 hover:text-indigo-600"
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </button>
                        </div>
                        <p className="text-gray-700">{comment.comment}</p>
                        {comment.likes > 0 && (
                          <div className="mt-3 text-sm text-gray-500">
                            {comment.likes} likes
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
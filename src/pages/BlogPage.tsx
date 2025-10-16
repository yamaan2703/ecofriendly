import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FiClock, FiUser, FiArrowRight } from "react-icons/fi";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";

// BlogPost Type
interface BlogPost {
  id: number;
  blog_title: string;
  content: string;
  author_name: string;
  created_at: string;
  read_time: number;
  featured_image: string;
  meta_description: string;
  primary_keyword: string;
  permalink: string;
  status: boolean;
  updated_at: string | null;
}

// BlogCard Component
const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  const navigate = useNavigate();
  const stripHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const getImageUrl = (filename: string) => {
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/blog-images/${filename}`;
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <div className="relative h-full bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-primary/20">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          {post.featured_image ? (
            <>
              <img
                src={getImageUrl(post.featured_image)}
                alt={post.blog_title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <div className="text-center">
                <BsBookmarkHeart className="w-16 h-16 text-primary mx-auto mb-3" />
                <p className="text-primary font-bold text-lg">Eco Story</p>
              </div>
            </div>
          )}

          {/* Floating Badge */}
          <motion.div
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <HiOutlineSparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-foreground">
                Featured
              </span>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm mb-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <FiUser className="w-4 h-4 text-primary" />
              <span className="font-medium">{post.author_name}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FiClock className="w-4 h-4 text-primary" />
              <span className="font-medium">{post.read_time} min read</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {post.blog_title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
            {truncateText(stripHtml(post.meta_description || post.content))}
          </p>

          {/* Read More Button */}
          <motion.button
            onClick={() => navigate(`/blog/${post.id}`)}
            className="group/btn flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all duration-300"
            whileHover={{ x: 5 }}
          >
            <span>Read Full Article</span>
            <FiArrowRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );
};

// Skeleton Loader
const BlogCardSkeleton: React.FC = () => (
  <div className="h-full bg-white rounded-3xl overflow-hidden shadow-md border-2 border-gray-100">
    <div className="w-full h-64 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse"></div>
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
        <div className="h-5 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>
      <div className="space-y-3 mb-5">
        <div className="h-7 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-7 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
      </div>
      <div className="h-5 bg-gray-200 rounded animate-pulse w-32"></div>
    </div>
  </div>
);

// Blog Page
const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error.message);
      } else {
        setBlogPosts(data as BlogPost[]);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 border-4 border-primary rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-primary rounded-lg rotate-45"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 border-4 border-primary rotate-12"></div>
          <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-primary/30 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-6 py-2 rounded-full mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <HiOutlineSparkles className="w-5 h-5 text-primary" />
              <span className="text-primary font-bold text-sm">
                Latest Articles
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground font-eurotypo mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Eco
              <span className="text-primary italic"> Insights</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Explore stories, tips, and insights on sustainable living. Join
              thousands discovering how small changes create big impact.
            </motion.p>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-eurotypo">
                  {blogPosts.length}+
                </div>
                <div className="text-sm text-muted-foreground">Articles</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-eurotypo">
                  10k+
                </div>
                <div className="text-sm text-muted-foreground">Readers</div>
              </div>
              <div className="w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary font-eurotypo">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">
                  Eco-Friendly
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid Section */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : blogPosts.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BsBookmarkHeart className="w-20 h-20 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-foreground font-eurotypo mb-3">
                No Articles Yet
              </h3>
              <p className="text-muted-foreground text-lg">
                We're crafting amazing eco-friendly content for you. Check back
                soon!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogPage;

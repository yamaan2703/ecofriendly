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
import { Clock, User, ArrowRight } from "lucide-react";

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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 bg-white">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {post.featured_image ? (
            <img
              src={getImageUrl(post.featured_image)}
              alt={post.blog_title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <p className="text-gray-400 text-sm">No Image</p>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4 text-gray-400" />
              <span>{post.author_name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span>{post.read_time} min read</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
            {post.blog_title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {truncateText(stripHtml(post.meta_description || post.content))}
          </p>

          <button
            onClick={() => navigate(`/blog/${post.id}`)}
            className="text-green-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Skeleton Loader
const BlogCardSkeleton: React.FC = () => (
  <Card className="overflow-hidden rounded-2xl shadow-md border-0 bg-white">
    <div className="w-full h-52 bg-gray-200 animate-pulse"></div>
    <CardHeader className="pb-3">
      <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="flex items-center gap-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
      </div>
    </CardContent>
    <CardFooter className="pt-0 px-5 pb-5">
      <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
    </CardFooter>
  </Card>
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
    <div
      className="min-h-screen bg-gray-50"
      style={{
        background:
          "linear-gradient(to bottom, #FDFDEA 0%, #FDFDEA 60%, #FEFEF5 75%, #FFFFFF 80%)",
      }}
    >
      <Navbar />

      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center py-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Our Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Discover insights, tips, and stories about eco-friendly living and
          sustainability.
        </motion.p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500">No blog posts found.</p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;

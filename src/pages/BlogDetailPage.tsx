import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  FiClock,
  FiUser,
  FiArrowLeft,
  FiCalendar,
  FiShare2,
} from "react-icons/fi";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BiBookReader } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import QuillDisplay from "@/components/QuillDisplay";

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

const BlogDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getImageUrl = (filename: string) => {
    return `https://dnpxijvjjdokgppqxnap.supabase.co/storage/v1/object/public/images/blog-images/${filename}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        setError("Blog ID not provided");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", parseInt(id))
          .eq("status", true)
          .single();

        if (error) {
          console.error("Error fetching blog post:", error.message);
          setError("Blog post not found");
        } else {
          setBlogPost(data as BlogPost);
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
          <p className="text-lg text-muted-foreground font-medium">
            Loading article...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <BsBookmarkHeart className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-foreground font-eurotypo mb-4">
            Article Not Found
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            {error ||
              "The article you're looking for doesn't exist or has been removed."}
          </p>
          <motion.button
            onClick={() => navigate("/blog")}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-light transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiArrowLeft className="w-5 h-5" />
            Back to Blog
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground font-eurotypo mb-8 leading-tight">
            {blogPost.blog_title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <FiUser className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Written by</p>
                <p className="font-bold text-foreground">
                  {blogPost.author_name}
                </p>
              </div>
            </div>

            <div className="w-px h-12 bg-border"></div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <FiCalendar className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {formatDate(blogPost.created_at)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <FiClock className="w-5 h-5 text-primary" />
              <span className="font-medium">{blogPost.read_time} min read</span>
            </div>
          </div>

          {/* Featured Badge */}
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <HiOutlineSparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold text-sm">
              Featured Article
            </span>
          </motion.div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          className="relative h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {blogPost.featured_image ? (
            <img
              src={getImageUrl(blogPost.featured_image)}
              alt={blogPost.blog_title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const nextElement = e.currentTarget
                  .nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = "flex";
                }
              }}
            />
          ) : null}
          <div
            className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 ${
              blogPost.featured_image ? "hidden" : "flex"
            }`}
          >
            <div className="text-center">
              <BiBookReader className="w-24 h-24 text-primary mx-auto mb-4" />
              <p className="text-primary font-bold text-xl">Eco Story</p>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.article
          className=""
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="prose prose-lg max-w-none">
            <QuillDisplay
              content={blogPost.content}
              className="text-foreground leading-relaxed"
            />
          </div>
        </motion.article>

        {/* Bottom Actions */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#DCE7C8] rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center gap-4">
            <BsBookmarkHeart className="w-8 h-8 text-primary" />
            <div>
              <p className="font-bold text-foreground text-lg">
                Enjoyed this article?
              </p>
              <p className="text-muted-foreground text-sm">
                Share it with your friends!
              </p>
            </div>
          </div>
          <motion.button
            onClick={() => navigate("/blog")}
            className="bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-light transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Read More Articles</span>
            <FiArrowLeft className="w-5 h-5 rotate-180" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetailPage;

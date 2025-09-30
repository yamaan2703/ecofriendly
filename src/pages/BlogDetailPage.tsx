import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import {
  Clock,
  User,
  ArrowLeft,
  Calendar,
  Tag,
  Eye,
  Share2,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !blogPost) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Blog Post Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The blog post you're looking for doesn't exist."}
          </p>
          <Button
            onClick={() => navigate("/blog")}
            className="bg-green-600 hover:bg-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{
        background:
          "linear-gradient(to bottom, #FDFDEA 0%, #FDFDEA 60%, #FEFEF5 75%, #FFFFFF 80%)",
      }}
    >
      <Navbar />

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="">
          {/* Left Column - Main Content */}
          <div className="">
            {/* Blog Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className=""
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                    {blogPost.blog_title}
                  </h1>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-green-500" />
                      <span className="font-medium">
                        {blogPost.author_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>{blogPost.read_time} min read</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span>{formatDate(blogPost.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative h-80 rounded-lg overflow-hidden  mb-6">
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
                  className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 ${
                    blogPost.featured_image ? "hidden" : "flex"
                  }`}
                >
                  <div className="text-center text-gray-500">
                    <BookOpen className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">No Featured Image</p>
                  </div>
                </div>
              </div>

              {/* Meta Description */}
              {blogPost.meta_description && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Article Summary
                  </h3>
                  <p className="text-green-700 text-sm leading-relaxed">
                    {blogPost.meta_description}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Blog Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className=""
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Article Content
              </h3>
              <div className="quill-content">
                <QuillDisplay
                  content={blogPost.content}
                  className="text-gray-700 leading-relaxed"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;


import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowDown, MessageSquare, Share, User, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      avatar?: string;
      isAnonymous: boolean;
    };
    college?: string;
    createdAt: string;
    upvotes: number;
    downvotes: number;
    commentCount: number;
    tags: string[];
    category?: string;
  };
  featured?: boolean;
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  const [votes, setVotes] = useState({
    upvotes: post.upvotes,
    downvotes: post.downvotes,
    userVote: null as "up" | "down" | null,
  });

  const handleVote = (voteType: "up" | "down") => {
    if (votes.userVote === voteType) {
      // User is un-voting
      setVotes({
        upvotes: voteType === "up" ? votes.upvotes - 1 : votes.upvotes,
        downvotes: voteType === "down" ? votes.downvotes - 1 : votes.downvotes,
        userVote: null,
      });
    } else if (votes.userVote === null) {
      // User is voting for the first time
      setVotes({
        upvotes: voteType === "up" ? votes.upvotes + 1 : votes.upvotes,
        downvotes: voteType === "down" ? votes.downvotes + 1 : votes.downvotes,
        userVote: voteType,
      });
    } else {
      // User is changing their vote
      setVotes({
        upvotes: voteType === "up" ? votes.upvotes + 1 : votes.upvotes - 1,
        downvotes: voteType === "down" ? votes.downvotes + 1 : votes.downvotes - 1,
        userVote: voteType,
      });
    }
  };

  const sharePost = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.content.substring(0, 100) + "...",
          url: window.location.origin + "/post/" + post.id,
        });
      } else {
        // Fallback
        navigator.clipboard.writeText(
          window.location.origin + "/post/" + post.id
        );
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div 
      className={cn(
        "card-3d group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-4 overflow-hidden",
        featured ? "border-l-4 border-l-primary sm:shadow-lg" : ""
      )}
    >
      {/* Voting sidebar */}
      <div className="absolute top-0 left-0 h-full flex flex-col items-center justify-center bg-muted/50 dark:bg-gray-700/50 w-10 sm:w-12 py-2">
        <button
          onClick={() => handleVote("up")}
          className={cn(
            "upvote-button p-1 rounded-full",
            votes.userVote === "up" ? "text-green bg-green/10" : "text-gray-500 hover:text-green"
          )}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
        
        <span className="text-sm font-medium my-1">
          {votes.upvotes - votes.downvotes}
        </span>
        
        <button
          onClick={() => handleVote("down")}
          className={cn(
            "upvote-button p-1 rounded-full",
            votes.userVote === "down" ? "text-destructive bg-destructive/10" : "text-gray-500 hover:text-destructive"
          )}
        >
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>

      {/* Main content area */}
      <div className="ml-10 sm:ml-12">
        {/* Post header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-xs text-muted-foreground space-x-2">
            <div className="flex items-center">
              {post.author.isAnonymous ? (
                <User className="h-4 w-4 mr-1 text-gray-400" />
              ) : post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="h-5 w-5 rounded-full mr-1"
                />
              ) : (
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-1">
                  <span className="text-xs text-primary font-bold">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span>{post.author.isAnonymous ? "Anonymous" : post.author.name}</span>
            </div>
            {post.college && (
              <>
                <span>•</span>
                <span>{post.college}</span>
              </>
            )}
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
            
            {post.category && (
              <>
                <span>•</span>
                <Badge variant="outline" className="px-2 py-0 text-xs">
                  {post.category}
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Post title & link */}
        <Link to={`/post/${post.id}`} className="block group-hover:underline">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {post.title}
          </h2>
        </Link>

        {/* Post content preview */}
        <div className="mb-3 text-sm line-clamp-3 text-gray-600 dark:text-gray-300">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap mb-3 -mx-1">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="mx-1 my-1 px-2 py-0.5 text-xs bg-muted/50 dark:bg-gray-700 rounded-full text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post footer */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-4">
            <Link
              to={`/post/${post.id}`}
              className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{post.commentCount} comments</span>
            </Link>
            
            <button
              onClick={sharePost}
              className="flex items-center space-x-1 text-xs text-muted-foreground hover:text-primary"
            >
              <Share className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>

          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{Math.floor(Math.random() * 100) + 20} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

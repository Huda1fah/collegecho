
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/forum/PostCard";
import CreatePostButton from "@/components/forum/CreatePostButton";
import { Search, MessageSquare, BarChart2, Clock, Filter } from "lucide-react";

// Sample data
const allPosts = [
  {
    id: "1",
    title: "JEE 2025: How to prepare for Physics section?",
    content: "I'm struggling with mechanics problems in JEE preparation. Can anyone recommend good resources or strategies to tackle this section effectively? I've been using HC Verma but still finding it difficult to solve complex problems.",
    author: {
      name: "Rajesh Kumar",
      isAnonymous: false,
    },
    college: "VIT Vellore",
    createdAt: "2025-05-19T10:30:00",
    upvotes: 32,
    downvotes: 2,
    commentCount: 14,
    tags: ["JEE", "Physics", "Preparation"],
    category: "Entrance Exams"
  },
  {
    id: "2",
    title: "Campus placements at IITs during the pandemic - My experience",
    content: "I wanted to share my experience with virtual campus placements this year. Despite the challenges of remote interviews, I was able to secure a great offer. Here's what worked for me and some tips for juniors preparing for placements next year.",
    author: {
      name: "Anonymous User",
      isAnonymous: true,
    },
    college: "IIT Bombay",
    createdAt: "2025-05-18T14:45:00",
    upvotes: 56,
    downvotes: 3,
    commentCount: 22,
    tags: ["Placements", "Career", "Tech"],
    category: "Career Advice"
  },
  {
    id: "3",
    title: "How to balance academics and extracurriculars in first year?",
    content: "I'm a first year BTech student and finding it difficult to manage my time between studies and club activities. I've joined 3 clubs but I'm also worried about maintaining my GPA. Any seniors have advice on effective time management?",
    author: {
      name: "Priya Sharma",
      isAnonymous: false,
    },
    college: "BITS Pilani",
    createdAt: "2025-05-17T09:15:00",
    upvotes: 41,
    downvotes: 1,
    commentCount: 18,
    tags: ["First Year", "Time Management", "College Life"],
    category: "Academic Help"
  },
  {
    id: "4",
    title: "Best areas to live near Delhi University North Campus?",
    content: "I'll be joining DU this fall and I'm looking for affordable and safe accommodation options near North Campus. What are some good areas to look at and what's the approximate rent I should expect? Any tips on finding good PGs or flatmates?",
    author: {
      name: "Karan Mehra",
      isAnonymous: false,
    },
    college: "Delhi University",
    createdAt: "2025-05-16T18:20:00",
    upvotes: 28,
    downvotes: 0,
    commentCount: 31,
    tags: ["Delhi University", "Accommodation", "North Campus"],
    category: "Campus Life"
  },
  {
    id: "5",
    title: "GATE CSE: Which topics should I prioritize with limited time?",
    content: "I have only 4 months left for GATE preparation. Which topics should I prioritize in Computer Science to maximize my score? I'm particularly weak in Computer Networks and Theory of Computation.",
    author: {
      name: "Shreya Patel",
      isAnonymous: false,
    },
    college: "IIIT Hyderabad",
    createdAt: "2025-05-15T11:05:00",
    upvotes: 45,
    downvotes: 2,
    commentCount: 19,
    tags: ["GATE", "CSE", "Preparation"],
    category: "Entrance Exams"
  },
  {
    id: "6",
    title: "Internship opportunities for second-year Mechanical Engineering students",
    content: "I'm currently in my second year of Mechanical Engineering and looking for summer internships. Most companies seem to prefer third-year students. Any suggestions on where to apply or how to stand out as a second-year student?",
    author: {
      name: "Anonymous User",
      isAnonymous: true,
    },
    college: "NIT Trichy",
    createdAt: "2025-05-14T15:40:00",
    upvotes: 37,
    downvotes: 1,
    commentCount: 23,
    tags: ["Internship", "Mechanical", "Career"],
    category: "Career Advice"
  },
  {
    id: "7",
    title: "MBBS students: How do you manage clinical rotations and study time?",
    content: "I've just started my clinical rotations and finding it challenging to balance hospital duties with study time. How do you manage to keep up with the curriculum while also learning clinical skills? Any tips from senior MBBS students?",
    author: {
      name: "Neha Sharma",
      isAnonymous: false,
    },
    college: "AIIMS Delhi",
    createdAt: "2025-05-13T09:25:00",
    upvotes: 29,
    downvotes: 0,
    commentCount: 16,
    tags: ["MBBS", "Medical", "Clinical Rotations"],
    category: "Academic Help"
  }
];

const categories = [
  "All Categories",
  "General Discussion",
  "Academic Help",
  "Campus Life",
  "Career Advice",
  "Entrance Exams",
  "Events",
  "Opportunities"
];

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "latest", label: "Latest" },
  { value: "top", label: "Top Rated" },
  { value: "commented", label: "Most Commented" }
];

const Forums = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("trending");

  // Filter posts based on active tab and search query
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All Categories" || 
      post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pb-20 bg-gradient-to-b from-background to-muted/20">
          {/* Page header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center">
                <MessageSquare className="mr-2 h-6 w-6" />
                Forums
              </h1>
              <p className="text-muted-foreground">
                Explore discussions or start a new conversation
              </p>
            </div>
            <CreatePostButton />
          </div>
          
          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search forums, topics, or tags..."
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Category</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <div className="flex items-center">
                      <BarChart2 className="mr-2 h-4 w-4" />
                      <span>Sort by</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="trending">
                <BarChart2 className="mr-2 h-4 w-4" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Posts grid */}
          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-6">
                  There are no posts matching your search criteria
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
            
            {filteredPosts.length > 0 && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="button-3d">
                  Load More
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Forums;

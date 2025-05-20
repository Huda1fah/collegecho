
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PostCard from "@/components/forum/PostCard";
import CreatePostButton from "@/components/forum/CreatePostButton";
import HeroScene from "@/components/3d/HeroScene";
import { MessageSquare, BookOpen, ArrowRight, School } from "lucide-react";

// Sample data
const forumPosts = [
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
  }
];

const examCategories = [
  { name: "JEE Main & Advanced", count: 1243, icon: "📝" },
  { name: "NEET", count: 891, icon: "🔬" },
  { name: "GATE", count: 756, icon: "⚙️" },
  { name: "CAT", count: 524, icon: "📊" },
  { name: "UPSC", count: 678, icon: "📚" },
  { name: "Banking Exams", count: 432, icon: "🏦" },
];

const collegeGroups = [
  { name: "IIT Bombay", members: 5628, icon: "🏛️" },
  { name: "Delhi University", members: 7845, icon: "🏫" },
  { name: "BITS Pilani", members: 3245, icon: "🏢" },
  { name: "IIM Ahmedabad", members: 2876, icon: "🏤" },
  { name: "NIT Trichy", members: 4532, icon: "🏛️" },
  { name: "AIIMS Delhi", members: 3298, icon: "🏥" },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("trending");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pb-20 bg-gradient-to-b from-background to-muted/20">
          {/* Hero section */}
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center mb-3">
                  <span className="bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                    For India's Future Leaders
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  Connect with{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo via-primary to-indigo">
                    college students
                  </span>{" "}
                  across India
                </h1>
                <p className="text-lg text-muted-foreground mb-6 max-w-md">
                  Join discussions, get exam tips, and connect with peers from India's top colleges in one unified platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Button asChild className="bg-primary text-white button-3d">
                    <Link to="/forums">
                      Browse Forums
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="button-3d">
                    <Link to="/exams">
                      Entrance Exam Resources
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="flex -space-x-2 mr-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div 
                        key={i} 
                        className="w-7 h-7 rounded-full border-2 border-background"
                        style={{
                          backgroundColor: ["#FF9933", "#FFFFFF", "#138808", "#000080"][i-1],
                          zIndex: 5-i
                        }}
                      />
                    ))}
                  </span>
                  <p>Join <strong>20,000+</strong> students from 500+ colleges</p>
                </div>
              </div>
              
              <div className="hidden md:block">
                <HeroScene />
              </div>
            </div>
          </section>
          
          <Separator className="my-8" />
          
          {/* Features section */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-6">Why join Campus Echo?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-3d bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Anonymous Discussions</h3>
                <p className="text-muted-foreground text-sm">
                  Share your thoughts, ask questions, and seek advice without revealing your identity.
                </p>
              </div>
              
              <div className="card-3d bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/20 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Entrance Exam Forums</h3>
                <p className="text-muted-foreground text-sm">
                  Dedicated sections for JEE, NEET, UPSC and other competitive exams with expert advice.
                </p>
              </div>
              
              <div className="card-3d bg-white p-6 border border-gray-200">
                <div className="w-12 h-12 mb-4 rounded-lg bg-primary/20 flex items-center justify-center">
                  <School className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">College Groups</h3>
                <p className="text-muted-foreground text-sm">
                  Connect with students from your own college through exclusive verified groups.
                </p>
              </div>
            </div>
          </section>
          
          {/* Forum posts section */}
          <section className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold">Latest Discussions</h2>
              <div className="flex items-center gap-4">
                <CreatePostButton />
              </div>
            </div>
            
            <Tabs defaultValue="trending" className="mb-6" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="space-y-4">
              {forumPosts.map((post, index) => (
                <PostCard key={post.id} post={post} featured={index === 0} />
              ))}
              
              <div className="flex justify-center mt-8">
                <Button asChild variant="outline" className="button-3d">
                  <Link to="/forums">
                    View All Discussions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
          
          {/* Resources section */}
          <section className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Entrance Exam Forums</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {examCategories.map((category) => (
                    <Link 
                      key={category.name}
                      to={`/exams/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="card-3d flex items-center p-4 bg-white border border-gray-200 hover:border-primary/50"
                    >
                      <span className="text-2xl mr-3">{category.icon}</span>
                      <div>
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {category.count} discussions
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">College Groups</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {collegeGroups.map((college) => (
                    <Link 
                      key={college.name}
                      to={`/colleges/${college.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="card-3d flex items-center p-4 bg-white border border-gray-200 hover:border-primary/50"
                    >
                      <span className="text-2xl mr-3">{college.icon}</span>
                      <div>
                        <h3 className="font-medium">{college.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {college.members.toLocaleString()} members
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
          
          {/* CTA section */}
          <section className="glass-morph rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join the largest student community in India
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Connect with peers, get academic help, and stay updated on campus events. 
              Sign up today to be part of the conversation.
            </p>
            <Button className="bg-primary text-white button-3d px-8 py-6">
              Create Your Account
            </Button>
          </section>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

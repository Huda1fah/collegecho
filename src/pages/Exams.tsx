
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Search, BookOpen, Users, Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const examCategories = [
  {
    name: "Engineering",
    exams: [
      { id: "jee-main", name: "JEE Main", posts: 1243, members: 25000, nextDate: "Jan 2026", icon: "🔧" },
      { id: "jee-advanced", name: "JEE Advanced", posts: 987, members: 18000, nextDate: "Jun 2026", icon: "⚙️" },
      { id: "bitsat", name: "BITSAT", posts: 456, members: 8000, nextDate: "May 2026", icon: "🔩" },
      { id: "gate", name: "GATE", posts: 756, members: 12500, nextDate: "Feb 2026", icon: "🛠️" },
    ]
  },
  {
    name: "Medical",
    exams: [
      { id: "neet", name: "NEET", posts: 891, members: 28000, nextDate: "May 2026", icon: "🔬" },
      { id: "aiims", name: "AIIMS PG", posts: 423, members: 7500, nextDate: "Nov 2025", icon: "🩺" },
      { id: "neet-pg", name: "NEET PG", posts: 547, members: 9800, nextDate: "Jan 2026", icon: "💉" },
    ]
  },
  {
    name: "Management",
    exams: [
      { id: "cat", name: "CAT", posts: 524, members: 15600, nextDate: "Nov 2025", icon: "📊" },
      { id: "xat", name: "XAT", posts: 312, members: 8900, nextDate: "Jan 2026", icon: "📈" },
      { id: "snap", name: "SNAP", posts: 256, members: 7200, nextDate: "Dec 2025", icon: "📋" },
    ]
  },
  {
    name: "Civil Services",
    exams: [
      { id: "upsc-cse", name: "UPSC CSE", posts: 678, members: 22000, nextDate: "May 2026", icon: "📚" },
      { id: "state-psc", name: "State PSCs", posts: 432, members: 18500, nextDate: "Various", icon: "🗂️" },
    ]
  },
  {
    name: "Law",
    exams: [
      { id: "clat", name: "CLAT", posts: 345, members: 9200, nextDate: "May 2026", icon: "⚖️" },
      { id: "ailet", name: "AILET", posts: 213, members: 5600, nextDate: "Jun 2026", icon: "📜" },
    ]
  },
];

const popularDiscussions = [
  {
    id: "disc1",
    title: "JEE Main 2025 Paper Analysis - January Session",
    comments: 156,
    likes: 342,
    author: "Kumar Shanu",
    time: "2 days ago"
  },
  {
    id: "disc2",
    title: "NEET 2025: Biology section was tougher than expected",
    comments: 89,
    likes: 217,
    author: "Dr. Priya Sharma",
    time: "1 week ago"
  },
  {
    id: "disc3",
    title: "CAT 2025 Expected Cutoffs - All IIMs",
    comments: 124,
    likes: 298,
    author: "MBA Aspirant",
    time: "3 days ago"
  },
  {
    id: "disc4",
    title: "UPSC CSE Interview Experience - Scored AIR 34",
    comments: 203,
    likes: 512,
    author: "IAS Officer",
    time: "2 weeks ago"
  },
];

const ExamCard = ({ exam }) => {
  return (
    <div className="card-3d bg-white p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mr-4">
            {exam.icon}
          </div>
          <div>
            <h3 className="font-semibold">{exam.name}</h3>
            <p className="text-sm text-muted-foreground">Next: {exam.nextDate}</p>
          </div>
        </div>
        <Button 
          asChild 
          variant="ghost" 
          size="icon"
          className="hover:bg-primary/10"
        >
          <Link to={`/exams/${exam.id}`}>
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>{exam.posts} posts</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 mr-1" />
          <span>{(exam.members / 1000).toFixed(1)}K members</span>
        </div>
      </div>
    </div>
  );
};

const Exams = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter exams based on search query
  const filteredExams = examCategories
    .map(category => ({
      ...category,
      exams: category.exams.filter(exam => 
        exam.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(category => category.exams.length > 0);
    
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pb-20 bg-gradient-to-b from-background to-muted/20">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <BookOpen className="mr-2 h-6 w-6" />
              Entrance Exam Forums
            </h1>
            <p className="text-muted-foreground">
              Get tips, resources, and discuss with fellow aspirants
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for entrance exams..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All Exams</TabsTrigger>
              <TabsTrigger value="engineering">Engineering</TabsTrigger>
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="management">Management</TabsTrigger>
              <TabsTrigger value="others">Others</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {/* Main content */}
          <div className="space-y-10">
            {filteredExams.length > 0 ? (
              filteredExams.map((category) => (
                <section key={category.name} className="space-y-4">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.exams.map((exam) => (
                      <ExamCard key={exam.id} exam={exam} />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No exams found</h3>
                <p className="text-muted-foreground mb-6">
                  There are no exams matching your search criteria
                </p>
                <Button onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              </div>
            )}
          </div>
          
          {/* Popular discussions */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Popular Discussions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularDiscussions.map((disc, index) => (
                <Link 
                  key={disc.id}
                  to={`/post/${disc.id}`}
                  className={cn(
                    "card-3d bg-white p-6 border border-gray-200 transition-all hover:border-primary/20",
                    index === 0 ? "md:col-span-2 bg-gradient-to-br from-white to-primary/5" : ""
                  )}
                >
                  <h3 className="font-semibold text-lg mb-3">{disc.title}</h3>
                  <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground">
                    <div>
                      <span>By {disc.author}</span>
                      <span className="mx-2">•</span>
                      <span>{disc.time}</span>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {disc.comments} comments
                      </span>
                      <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                        {disc.likes} likes
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Exams;

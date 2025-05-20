
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "@/components/layout/Sidebar";
import { BookOpen, Calendar, Users, FileText, Award, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const examData = {
  "jee-main": {
    name: "JEE Main",
    fullName: "Joint Entrance Examination (Main)",
    description: "JEE Main is the national level undergraduate engineering entrance exam for admission to NITs, IIITs, and GFTIs across India. It also serves as the qualifying exam for JEE Advanced.",
    posts: 1243,
    members: 25000,
    nextDate: "January 2026",
    icon: "🔧",
    conductedBy: "National Testing Agency (NTA)",
    eligibility: "Students who have passed their 12th standard or equivalent exam with Physics, Chemistry, and Mathematics as compulsory subjects.",
    applicationFee: "₹650 (General), ₹325 (Reserved Categories)",
    examPattern: "Computer Based Test with Multiple Choice and Numerical Value Questions in Physics, Chemistry and Mathematics",
    totalMarks: "300 (100 per subject)",
    topColleges: ["NITs", "IIITs", "GFTIs"]
  },
  "jee-advanced": {
    name: "JEE Advanced",
    fullName: "Joint Entrance Examination (Advanced)",
    description: "JEE Advanced is the second stage of the Joint Entrance Examination for admission to 23 IITs across India. Only top rankers of JEE Main are eligible to appear for this exam.",
    posts: 987,
    members: 18000,
    nextDate: "June 2026",
    icon: "⚙️",
    conductedBy: "IIT (rotating each year)",
    eligibility: "Top 2,50,000 rankers in JEE Main who satisfy category-wise cutoffs",
    applicationFee: "₹2800 (General), ₹1400 (Reserved Categories)",
    examPattern: "Computer Based Test with two papers. Multiple types of questions including MCQs and numerical value questions",
    totalMarks: "360 (180 per paper)",
    topColleges: ["IIT Bombay", "IIT Delhi", "IIT Madras", "IIT Kanpur", "IIT Kharagpur"]
  },
  "neet": {
    name: "NEET",
    fullName: "National Eligibility cum Entrance Test",
    description: "NEET is the national level entrance exam for admission to undergraduate medical courses (MBBS, BDS) across all medical colleges in India.",
    posts: 891,
    members: 28000,
    nextDate: "May 2026",
    icon: "🔬",
    conductedBy: "National Testing Agency (NTA)",
    eligibility: "Students who have passed their 12th standard or equivalent exam with Physics, Chemistry, and Biology as compulsory subjects.",
    applicationFee: "₹1600 (General), ₹900 (Reserved Categories)",
    examPattern: "Pen and Paper Based Test with Multiple Choice Questions in Physics, Chemistry and Biology",
    totalMarks: "720 (180 questions with 4 marks each)",
    topColleges: ["AIIMS Delhi", "JIPMER Puducherry", "CMC Vellore", "MAMC New Delhi"]
  }
};

// Default exam data in case the exam ID is not found
const defaultExamData = {
  name: "Exam Details",
  fullName: "Exam Information",
  description: "Details for this exam are not yet available. Please check back later.",
  posts: 0,
  members: 0,
  nextDate: "TBA",
  icon: "📝",
  conductedBy: "Not available",
  eligibility: "Not available",
  applicationFee: "Not available",
  examPattern: "Not available",
  totalMarks: "Not available",
  topColleges: []
};

const ExamDetail = () => {
  const { examId } = useParams();
  const exam = examData[examId as string] || {
    ...defaultExamData, 
    name: examId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pb-20 bg-gradient-to-b from-background to-muted/20">
          {/* Page Header */}
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center text-3xl mr-6">
              {exam.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold">{exam.name}</h1>
              <p className="text-muted-foreground">{exam.fullName}</p>
            </div>
          </div>
          
          {/* Exam Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border p-4 flex items-center">
              <Calendar className="h-5 w-5 text-primary mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Next Exam</p>
                <p className="font-medium">{exam.nextDate}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border p-4 flex items-center">
              <Users className="h-5 w-5 text-primary mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Members</p>
                <p className="font-medium">{exam.members.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border p-4 flex items-center">
              <FileText className="h-5 w-5 text-primary mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Posts</p>
                <p className="font-medium">{exam.posts.toLocaleString()}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border p-4 flex items-center">
              <Award className="h-5 w-5 text-primary mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Conducted By</p>
                <p className="font-medium">{exam.conductedBy}</p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="preparation">Preparation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="card-3d bg-white p-6 border rounded-lg">
                <h2 className="text-lg font-semibold mb-3">About {exam.name}</h2>
                <p className="text-muted-foreground mb-6">{exam.description}</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">Eligibility</h3>
                      <p className="text-sm text-muted-foreground">{exam.eligibility}</p>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">Application Fee</h3>
                      <p className="text-sm text-muted-foreground">{exam.applicationFee}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Exam Pattern</h3>
                    <p className="text-sm text-muted-foreground">{exam.examPattern}</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Marks: {exam.totalMarks}</p>
                  </div>
                  
                  {exam.topColleges && exam.topColleges.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">Top Colleges</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground">
                        {exam.topColleges.map((college, index) => (
                          <li key={index}>{college}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="discussions">
              <div className="bg-white p-6 border rounded-lg text-center">
                <h2 className="text-lg font-medium mb-2">Recent Discussions</h2>
                <p className="text-muted-foreground mb-6">Join the conversation with fellow aspirants</p>
                <Button>View All Discussions</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="resources">
              <div className="bg-white p-6 border rounded-lg text-center">
                <h2 className="text-lg font-medium mb-2">Study Materials</h2>
                <p className="text-muted-foreground mb-6">Access books, notes, and practice papers</p>
                <Button>Browse Resources</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="preparation">
              <div className="bg-white p-6 border rounded-lg text-center">
                <h2 className="text-lg font-medium mb-2">Preparation Strategy</h2>
                <p className="text-muted-foreground mb-6">Get guidance from toppers and experts</p>
                <Button>View Strategies</Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default ExamDetail;

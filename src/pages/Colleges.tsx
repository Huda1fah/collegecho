
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Search, School, Users, MapPin, ArrowUpRight } from "lucide-react";

const collegeCategories = [
  {
    name: "IITs",
    colleges: [
      { id: "iit-bombay", name: "IIT Bombay", location: "Mumbai, Maharashtra", members: 8500, icon: "🏛️", verified: true },
      { id: "iit-delhi", name: "IIT Delhi", location: "New Delhi", members: 7800, icon: "🏛️", verified: true },
      { id: "iit-madras", name: "IIT Madras", location: "Chennai, Tamil Nadu", members: 7200, icon: "🏛️", verified: true },
      { id: "iit-kanpur", name: "IIT Kanpur", location: "Kanpur, Uttar Pradesh", members: 6500, icon: "🏛️", verified: true },
    ]
  },
  {
    name: "NITs",
    colleges: [
      { id: "nit-trichy", name: "NIT Trichy", location: "Tiruchirappalli, Tamil Nadu", members: 4500, icon: "🏫", verified: true },
      { id: "nit-warangal", name: "NIT Warangal", location: "Warangal, Telangana", members: 3800, icon: "🏫", verified: true },
      { id: "nit-surathkal", name: "NIT Surathkal", location: "Mangalore, Karnataka", members: 3200, icon: "🏫", verified: true },
    ]
  },
  {
    name: "Private Universities",
    colleges: [
      { id: "bits-pilani", name: "BITS Pilani", location: "Pilani, Rajasthan", members: 5600, icon: "🏢", verified: true },
      { id: "vit-vellore", name: "VIT Vellore", location: "Vellore, Tamil Nadu", members: 6200, icon: "🏢", verified: true },
      { id: "manipal-university", name: "Manipal University", location: "Manipal, Karnataka", members: 5800, icon: "🏢", verified: true },
      { id: "srm-university", name: "SRM University", location: "Chennai, Tamil Nadu", members: 5100, icon: "🏢", verified: true },
    ]
  },
  {
    name: "Medical Colleges",
    colleges: [
      { id: "aiims-delhi", name: "AIIMS Delhi", location: "New Delhi", members: 3500, icon: "🏥", verified: true },
      { id: "cmc-vellore", name: "CMC Vellore", location: "Vellore, Tamil Nadu", members: 2800, icon: "🏥", verified: true },
      { id: "jipmer", name: "JIPMER", location: "Puducherry", members: 2400, icon: "🏥", verified: true },
    ]
  },
];

const states = [
  "All States",
  "Andhra Pradesh",
  "Delhi",
  "Karnataka",
  "Maharashtra",
  "Puducherry",
  "Rajasthan",
  "Tamil Nadu",
  "Telangana",
  "Uttar Pradesh",
];

const CollegeCard = ({ college }) => {
  return (
    <div className="card-3d bg-white p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-2xl mr-4">
            {college.icon}
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="font-semibold">{college.name}</h3>
              {college.verified && (
                <svg className="w-4 h-4 text-primary ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              )}
            </div>
            <p className="text-sm text-muted-foreground flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {college.location}
            </p>
          </div>
        </div>
        <Button 
          asChild 
          variant="ghost" 
          size="icon"
          className="hover:bg-primary/10"
        >
          <Link to={`/colleges/${college.id}`}>
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </Button>
      </div>
      <div className="flex items-center justify-between mt-4 text-sm">
        <div className="flex items-center text-muted-foreground">
          <Users className="h-4 w-4 mr-1" />
          <span>{(college.members / 1000).toFixed(1)}K members</span>
        </div>
        <Button asChild variant="outline" size="sm" className="button-3d">
          <Link to={`/colleges/${college.id}`}>
            Join Group
          </Link>
        </Button>
      </div>
    </div>
  );
};

const Colleges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  
  // Filter colleges based on search query and state
  const filteredColleges = collegeCategories
    .map(category => ({
      ...category,
      colleges: category.colleges.filter(college => 
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedState === "All States" || college.location.includes(selectedState))
      )
    }))
    .filter(category => category.colleges.length > 0);
    
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-1 flex">
        <Sidebar />
        
        <main className="flex-1 ml-0 md:ml-64 p-4 md:p-8 pb-20 bg-gradient-to-b from-background to-muted/20">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center">
              <School className="mr-2 h-6 w-6" />
              College Groups
            </h1>
            <p className="text-muted-foreground">
              Connect with students from your college in exclusive groups
            </p>
          </div>
          
          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search colleges..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select
              value={selectedState}
              onValueChange={setSelectedState}
            >
              <SelectTrigger className="w-[180px]">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{selectedState === "All States" ? "Filter by State" : selectedState}</span>
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* College access information */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-8">
            <h2 className="font-medium mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              How to join college-specific groups
            </h2>
            <p className="text-sm text-muted-foreground">
              To join a college group, you need to verify your college email address. This helps ensure that only students from your college can access the group.
            </p>
          </div>
          
          {/* Main content */}
          <div className="space-y-10">
            {filteredColleges.length > 0 ? (
              filteredColleges.map((category) => (
                <section key={category.name} className="space-y-4">
                  <h2 className="text-xl font-semibold">{category.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.colleges.map((college) => (
                      <CollegeCard key={college.id} college={college} />
                    ))}
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium mb-2">No colleges found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedState("All States")}>
                    Clear filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Request for new college */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="glass-morph rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold mb-4">Can't find your college?</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                If your college isn't listed, you can request to add it to our platform. 
                Once approved, you can become the first member of your college group!
              </p>
              <Button className="bg-primary text-white button-3d">
                Request New College
              </Button>
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Colleges;

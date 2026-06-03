"use client"
import React, { useState } from 'react';
import { 
  Rocket, 
  Code2, 
  Brain, 
  Database, 
  Cloud,
  ChevronRight,
  Users,
  Globe,
  Sparkles
} from 'lucide-react';

function App() {
  const [activeJob, setActiveJob] = useState(null);

  const jobs = [
    {
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Join our core team to build next-generation cloud solutions.",
      requirements: ["5+ years experience", "React/Node.js expertise", "System design knowledge"]
    },
    {
      title: "AI Research Scientist",
      department: "R&D",
      location: "Boston",
      type: "Full-time",
      description: "Shape the future of AI and machine learning applications.",
      requirements: ["PhD in CS/ML", "Published research", "Python/PyTorch expertise"]
    },
    {
      title: "Cloud Architecture Lead",
      department: "Infrastructure",
      location: "Remote",
      type: "Full-time",
      description: "Design and implement scalable cloud infrastructure solutions.",
      requirements: ["AWS/Azure expertise", "8+ years experience", "Team leadership"]
    }
  ];

  const benefits = [
    { icon: Globe, title: "Remote-First", description: "Work from anywhere in the world" },
    { icon: Users, title: "Inclusive Culture", description: "Diverse and supportive environment" },
    { icon: Sparkles, title: "Growth Focus", description: "Continuous learning opportunities" }
  ];

  return (
    <>
    <div className="w-full h-[120px]"></div>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black text-white">
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              Join the Future of Tech
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Help us shape tomorrow's technology landscape
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-gray-100 transition-all flex items-center gap-2">
                View Positions <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-black">Our Values</h2>
            <p className="text-gray-600">What drives us forward</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Rocket, title: "Innovation" },
              { icon: Code2, title: "Excellence" },
              { icon: Brain, title: "Learning" },
              { icon: Database, title: "Impact" }
            ].map((value, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white border-2 border-black hover:bg-black hover:text-white transition-all group">
                <div className="w-12 h-12 rounded-full bg-black text-white group-hover:bg-white group-hover:text-black flex items-center justify-center mb-4 transition-all">
                  <value.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300">Pushing boundaries in everything we do</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center">Open Positions</h2>
          <div className="grid gap-6">
            {jobs.map((job, index) => (
              <div 
                key={index}
                className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all cursor-pointer"
                onClick={() => setActiveJob(activeJob === index ? null : index)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                    <div className="flex gap-4 text-gray-400">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <ChevronRight 
                    size={24}
                    className={`transform transition-transform text-gray-400 ${activeJob === index ? 'rotate-90' : ''}`}
                  />
                </div>
                {activeJob === index && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-gray-300">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                    <button className="mt-6 px-6 py-2 bg-white text-black rounded-full hover:bg-gray-100 transition-all">
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-16 text-center text-black">Why Join Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group hover:bg-black hover:text-white p-8 rounded-2xl transition-all">
                <div className="w-16 h-16 mx-auto rounded-full bg-black text-white group-hover:bg-white group-hover:text-black flex items-center justify-center mb-6 transition-all">
                  <benefit.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 group-hover:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
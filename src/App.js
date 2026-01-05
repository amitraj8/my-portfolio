import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  Brain, 
  Terminal,
  ChevronDown,
  Menu,
  X,
  Download
} from 'lucide-react';

// --- DATA SECTION (Based on your CV) ---
const portfolioData = {
  personal: {
    name: "Amit Raj",
    titles: ["Data Science Student", "AI Researcher", "Python Developer", "Financial Analyst"],
    about: "I am a Master's student in Data Science at HSE University, Moscow, with a unique background spanning Management, Finance, and Technology. Currently working as a Research Intern at the Laboratory of Artificial Intelligence Methods for Cognitive Sciences, I focus on using Machine Learning to understand human behavior.",
    email: "amit83908@gmail.com",
    github: "https://github.com/amitraj8",
    linkedin: "https://www.linkedin.com/in/amit-raj-379045130/",
    location: "Moscow, Russia"
  },
  experience: [
    {
      role: "Research Intern",
      company: "HSE University (Laboratory of AI)",
      date: "Feb 2025 - Present",
      location: "Moscow, Russia",
      desc: [
        "Conducting experiments using Machine Learning tools to gather and validate data.",
        "Analyzing experimental data using statistical modelling to derive actionable insights.",
        "Collaborating on peer-reviewed publications and methodology development."
      ]
    },
    {
      role: "Financial Analyst",
      company: "R1 RCM",
      date: "Mar 2023 - May 2024",
      location: "Gurugram, India",
      desc: [
        "Analyzed and processed medical claims ensuring 100% accuracy with U.S. healthcare regulations.",
        "Collaborated with cross-functional teams to optimize revenue cycle management."
      ]
    },
    {
      role: "Customer Support Advisor",
      company: "UBER",
      date: "Jun 2021 - Jan 2023",
      location: "Gurugram, India",
      desc: [
        "Led a team of 20 support agents, ensuring high-quality service.",
        "Resolved complex customer inquiries and payment disputes."
      ]
    }
  ],
  education: [
    {
      degree: "Master's in Data Science",
      school: "National Research University - HSE",
      date: "2024 - Present",
      location: "Moscow, Russia"
    },
    {
      degree: "Bachelor of Management Studies",
      school: "Aryabhatta College, University of Delhi",
      date: "2018 - 2021",
      location: "New Delhi, India"
    }
  ],
  projects: [
    {
      title: "Tabular Data Chatbot",
      tech: "Python, NLP, Web Dev",
      desc: "A restaurant-specific chatbot capable of answering queries about menus and reservations using structured tabular data.",
      link: "https://github.com/amitraj8/restaurant-chatbot"
    },
    {
      title: "Heart Disease Prediction (GAPSO-RF)",
      tech: "Python, Genetic Algorithms, PSO",
      desc: "A hybrid optimized ML approach integrating Genetic Algorithms and Particle Swarm Optimization with Random Forest.",
      link: "https://github.com/amitraj8"
    },
    {
      title: "Social Network Ego Analysis",
      tech: "Graph Theory, NetworkX",
      desc: "Conducted descriptive analysis on ego-centric social networks to identify influential nodes and community formations.",
      link: "https://github.com/amitraj8"
    },
    {
      title: "Neural-FCA-OSDA",
      tech: "Neural Networks, Formal Concept Analysis",
      desc: "Predicted individual salary based on key features by integrating Neural Networks with Formal Concept Analysis.",
      link: "https://github.com/amitraj8"
    }
  ],
  volunteering: [
    "Moscow International Book Fair (Coordinator)",
    "Bharat Utsav - Festival of India (Event Manager)",
    "BRICS+ Blind Football Tournament (Volunteer)"
  ]
};

// --- COMPONENTS ---

// 1. Custom Hook for Typewriter Effect
const useTypewriter = (textArray, speed = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (index >= textArray.length) {
      setIndex(0);
      return;
    }

    if (subIndex === textArray[index].length + 1 && !reverse) {
      setReverse(true);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % textArray.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setDisplayText(textArray[index].substring(0, subIndex));
    }, reverse ? 50 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, speed, textArray]);

  return displayText;
};

// 2. Navigation Bar
const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Resume", id: "resume" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollTo('home')}>
            <span className="text-2xl font-bold text-purple-400">AR.</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeSection === link.id 
                      ? 'text-purple-400' 
                      : 'text-gray-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <a 
                href={portfolioData.personal.github} 
                target="_blank" 
                rel="noreferrer"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2"
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 shadow-xl">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// 3. Main App Component
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const typedText = useTypewriter(portfolioData.personal.titles);

  // ScrollSpy Logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'resume'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-gray-100 font-sans selection:bg-purple-500 selection:text-white">
      <Navbar activeSection={activeSection} />

      {/* HERO SECTION */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Background Particles/Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="z-10 text-center px-4 max-w-4xl mx-auto">
          <h2 className="text-xl md:text-2xl text-purple-400 font-medium mb-4">Hello There! <span className="animate-wave inline-block origin-bottom-right">👋🏻</span></h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            I'M <span className="text-purple-500">{portfolioData.personal.name.toUpperCase()}</span>
          </h1>
          <div className="h-12 text-2xl md:text-3xl text-gray-400 font-mono">
            {typedText}<span className="animate-blink">|</span>
          </div>
          
          <div className="mt-12 flex justify-center gap-6">
            <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:-translate-y-1">
              <Github size={24} />
            </a>
            <a href={portfolioData.personal.linkedin} target="_blank" rel="noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${portfolioData.personal.email}`} className="p-3 bg-slate-800 rounded-full hover:bg-red-500 hover:text-white transition-all transform hover:-translate-y-1">
              <Mail size={24} />
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-10 animate-bounce cursor-pointer" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
          <ChevronDown size={32} className="text-gray-500" />
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let Me <span className="text-purple-500">Introduce</span> Myself</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6 text-justify">
                {portfolioData.personal.about}
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                My journey spans from <span className="text-purple-400">Finance & Management</span> to the cutting edge of <span className="text-purple-400">Data Science</span>. 
                I love building new things and am fluent in classics like <i className="text-purple-400">Python, SQL, and Machine Learning.</i>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Brain className="text-purple-500" /> AI & Deep Learning
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Database className="text-purple-500" /> Data Analytics
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Code2 className="text-purple-500" /> Python Development
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Terminal className="text-purple-500" /> Research Methodology
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              {/* Abstract avatar placeholder */}
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full p-1 shadow-2xl animate-blob">
                 <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                    <img src="/api/placeholder/400/400" alt="Avatar" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Work <span className="text-purple-500">Experience</span></h2>
          <div className="space-y-8">
            {portfolioData.experience.map((exp, index) => (
              <div key={index} className="bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-purple-500 transition-colors shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-purple-400 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-gray-400 text-sm md:text-right mt-2 md:mt-0">
                    <p>{exp.date}</p>
                    <p>{exp.location}</p>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                  {exp.desc.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-20 px-4 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">My <span className="text-purple-500">Projects</span></h2>
          <p className="text-center text-gray-400 mb-12">Here are a few projects I've worked on recently.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, index) => (
              <div key={index} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:shadow-2xl hover:shadow-purple-500/20 transition-all group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Code2 className="text-purple-500" size={32} />
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{project.title}</h3>
                  <p className="text-xs font-mono text-purple-300 mb-4">{project.tech}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a href={portfolioData.personal.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-purple-500 text-purple-400 rounded-full hover:bg-purple-500 hover:text-white transition-all font-medium">
              View More on GitHub <Github size={18} />
            </a>
          </div>
        </div>
      </section>

       {/* VOLUNTEERING & RESUME SECTION */}
       <section id="resume" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Volunteering Subset */}
          <div className="mb-16">
             <h2 className="text-2xl font-bold mb-8">Community & <span className="text-purple-500">Volunteering</span></h2>
             <div className="flex flex-wrap justify-center gap-4">
                {portfolioData.volunteering.map((vol, idx) => (
                  <span key={idx} className="px-4 py-2 bg-slate-800 rounded-full text-gray-300 text-sm border border-slate-700">
                    {vol}
                  </span>
                ))}
             </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 p-8 rounded-2xl border border-white/10">
            <h2 className="text-3xl font-bold mb-4">Check out my Resume</h2>
            <p className="text-gray-300 mb-8">
              Review my diverse journey from Finance to Data Science in detail.
            </p>
            <a 
              href="/resume.pdf" // Make sure to put your PDF in the 'public' folder and name it resume.pdf
              download="Amit_Raj_CV.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold shadow-lg shadow-purple-500/30 transition-all transform hover:-translate-y-1"
            >
              <Download size={20} /> Download CV
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-slate-950 text-center border-t border-slate-900">
        <p className="text-gray-500 mb-4">Designed and Developed by <span className="text-purple-400">Amit Raj</span></p>
        <div className="flex justify-center gap-6 text-gray-400">
          <a href={portfolioData.personal.github} className="hover:text-white transition-colors"><Github size={20} /></a>
          <a href={portfolioData.personal.linkedin} className="hover:text-white transition-colors"><Linkedin size={20} /></a>
          <a href={`mailto:${portfolioData.personal.email}`} className="hover:text-white transition-colors"><Mail size={20} /></a>
        </div>
      </footer>
    </div>
  );
}
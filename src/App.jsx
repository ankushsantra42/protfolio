import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Moon from "./assets/moon.svg?react"
import Sun from "./assets/sun.svg?react"
import { RiArrowDownLongLine, RiArrowRightLine, RiArrowRightLongFill, RiArrowRightLongLine, RiChat4Line, RiCloseLine, RiMailLine, RiMenuLine, RiUserLine, } from "@remixicon/react"
import Email from "./assets/email.svg?react";
import GitHub from "./assets/github.svg?react";
import Insta from "./assets/instagram.svg?react";
import Linkedin from "./assets/linkedin.svg?react"
import MatterBackground from './component/MatterBackground'
import Mypic from "./assets/my/mypic4.jpg"
import ExternalLink from "./assets/external-link.svg?react"
import Contact from "./assets/contact-me.svg?react"
import ChatApp from "./assets/chatApp.png"
import Ecommerce from "./assets/ecommerce.png"
import Job from "./assets/jobPreparation.png"


function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('portfolio-theme') !== 'light';
  });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const scrollToPage = (event) => {
    event.preventDefault();

    const projectSection = document.getElementById(event.target.name);
    console.log(event.target.name);
    if (!projectSection) return;

    const startPosition = window.scrollY;
    const targetPosition = projectSection.getBoundingClientRect().top + startPosition;
    const distance = targetPosition - startPosition;
    const duration = 1200;
    const startTime = performance.now();

    const animateScroll = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startPosition + distance * easedProgress);

      if (progress < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  };
  const handleMouseMove = (e) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(e.target);
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);

  //   try {
  //     await fetch("/", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //       body: new URLSearchParams(formData).toString(),
  //     });

  //     alert("Message sent successfully!");

  //     setFormData({
  //       name: "",
  //       email: "",
  //       message: "",
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to send message.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data).toString(),
      });

      if (!response.ok) {
        throw new Error(`Form submission failed: ${response.status}`);
      }

      alert("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    }
  };


  const toggleTheme = () => {
    setIsDarkMode((currentMode) => {
      const nextMode = !currentMode;
      localStorage.setItem('portfolio-theme', nextMode ? 'dark' : 'light');
      return nextMode;
    });
  };

  return (
    <div className={`portfolio-app ${isDarkMode ? 'theme-dark' : 'theme-light'} w-full bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300`}>
      <main className='w-full bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300'
        onMouseMove={handleMouseMove}
      >
        <nav className='w-full sticky top-0 z-50 flex items-center justify-between px-10 py-4 max-w-7xl mx-auto bg-[var(--page-bg)] transition-colors duration-300 '>
          <div className='text-lg font-medium'>Ankush Santra</div>
          <div className='hidden md:block'>
            <ul className='flex gap-10'>
              <li className='hover:scale-120 transition duration-200 ease-in relative
      py-2
      after:absolute
      after:bottom-0
      after:left-0
      after:h-[2px]
      after:w-full
      after:origin-right
      after:scale-x-0
      after:bg-[var(--accent)] *:
      after:transition-transform
      after:duration-300
      hover:after:origin-left
      hover:after:scale-x-100'><a name="home" onClick={scrollToPage} href="#home">Home</a></li>
              <li className='hover:scale-120 transition duration-200 ease-in relative
      py-2
      after:absolute
      after:bottom-0
      after:left-0
      after:h-[2px]
      after:w-full
      after:origin-right
      after:scale-x-0
      after:bg-[var(--accent)]
      after:transition-transform
      after:duration-300
      hover:after:origin-left
      hover:after:scale-x-100'><a name="project" onClick={scrollToPage} href="#project">Projects</a></li>
              <li className='hover:scale-120 transition duration-200 ease-in relative
      py-2
      after:absolute
      after:bottom-0
      after:left-0
      after:h-[2px]
      after:w-full
      after:origin-right
      after:scale-x-0
      after:bg-[var(--accent)]
      after:transition-transform
      after:duration-300
      hover:after:origin-left
      hover:after:scale-x-100'><a name="contact" onClick={scrollToPage} href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className='flex items-center'>
            <button
              type='button'
              onClick={toggleTheme}
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className='cursor-pointer rounded-full p-2 text-[var(--text-primary)] transition hover:bg-[var(--control-bg)]'
            >
              {isDarkMode ? <Sun /> : <Moon />}
            </button>
          </div>
          <div onClick={() => setMenuOpen(!menuOpen)} className='md:hidden'>
            {<RiMenuLine />}
          </div>
          <div  className={`overflow-hidden absolute top-0 left-0 w-full transition-all duration-500 ease-in-out md:hidden ${
          menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}>
              <div className=' w-full p-10 bg-[var(--page-bg)]'>
                <div onClick={() => setMenuOpen(!menuOpen)} className='md:hidden absolute right-5'>
                  {<RiCloseLine />}
                </div>
                <ul className='flex w-full flex-col gap-10'>
                  <li onClick={() => setMenuOpen(false)} className='hover:scale-115 transition duration-200 ease-in py-2
      after:absolute
      after:bottom-0
      after:left-0
      after:h-[2px]
      after:w-full
      after:origin-right
      after:scale-x-0
      after:bg-[var(--accent)]
      after:transition-transform
      after:duration-300
      hover:after:origin-left
      hover:after:scale-x-100 w-fit'><a name="home" onClick={scrollToPage} href="#home">Home</a></li>
                  <li onClick={() => setMenuOpen(false)} className='hover:scale-115 transition duration-200 ease-in py-2
      after:absolute
      after:bottom-0
      after:left-0
      after:h-[2px]
      after:w-full
      after:origin-right
      after:scale-x-0
      after:bg-[var(--accent)]
      after:transition-transform
      after:duration-300
      hover:after:origin-left
      hover:after:scale-x-100 w-fit'><a name="project" onClick={scrollToPage} href="#project">Projects</a></li>
                  <li onClick={() => setMenuOpen(false)} className='hover:scale-115 transition duration-200 ease-in py-2
      after:absolute
      after:bottom-0
      after:left-0
      after:h-[2px]
      after:w-full
      after:origin-right
      after:scale-x-0
      after:bg-[var(--accent)]
      after:transition-transform
      after:duration-300
      hover:after:origin-left
      hover:after:scale-x-100 w-fit'><a name="contact" onClick={scrollToPage} href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
            
        </nav>

        <div
          className="pointer-events-none fixed h-40 w-40 rounded-full bg-blue-700/35 blur-xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${position.x - 80}px, ${position.y - 60}px)`,
          }}
        />

        <section id='home' className='view-1 relative flex flex-col h-[90vh] md:h-screen w-full justify-start px-10 md:mb-40 mt-25 md:mt-0'>
          <MatterBackground />
          <div className='first-div flex relative items-center justify-start mt-30 '>
            <div className='flex flex-col gap-15 md:gap-10 md:flex-row items-center justify-evenly   lg:ml-40 md:ml-10'>
              <div id='profile-pic' className='w-50 h-50 md:w-65 md:h-65 lg:w-75 lg:h-75 bg-white rounded-full'>
                <img className='w-full h-full rounded-full object-cover' src={Mypic} alt="" />
              </div>

              <div id='description' className='flex flex-col gap-3 items-start justify-center'>
                <h1 className='text-2xl md:text-4xl font-bold lg:text-6xl mr-8'>Ankush <br className='md:hidden' /> Santra</h1>
                <p className='text-xl'>MERN stack Developer</p>
                <div className='flex items-center mt-10 md:mt-7 hover:scale-110 transition duration-200 ease-in group'>
                  <a href='/Ankush_cv.pdf' download="Ankush-Santra-Resume.pdf"
                    className='bg-linear-to-l from-cyan-800 to-blue-900 text-white px-5  py-2 text-base rounded-md flex whitespace-nowrap '>Resume</a>
                  <span className='-ml-4 group-hover:-ml-3 transition  duration-200 ease-in '><RiArrowRightLongLine size={35} /></span>
                </div>

              </div>
            </div>

            <div className='absolute right-0'>
              <ul className='space-y-6 text-blue-300'>
                <li className='w-7 hover:text-[var(--accent)] hover:scale-120 transition duration-200 ease-in'>
                  <a href="mailto:info.ankushsantra@gmail.com" ><Email /></a>
                  {/* <a href="https://github.com/ankushsantra42" target='_blank'><GitHub /></a> */}
                </li>
                <li className='w-7 hover:text-[var(--accent)] hover:scale-120 transition duration-200 ease-in'>
                  <a href="https://github.com/ankushsantra42" target='_blank'><GitHub /></a>
                </li>
                <li className='w-7 hover:text-[var(--accent)] hover:scale-120 transition duration-200 ease-in'>
                  <a href="https://linkedin.com/in/ankush-santra-5b2385251" target='_blank'><Linkedin /></a>
                </li>
                <li className='w-7 hover:text-[var(--accent)] hover:scale-120 transition duration-200 ease-in'>
                  <Insta />
                </li>
              </ul>
            </div>
          </div>

          {/* <div className='w-full flex items-centr justify-center md:hidden'>
            <a href="#project" onClick={scrollToProject} className='mb-6 w-fit flex flex-col items-center hover:scale-110 transition duration-200 ease-in group'>
              <button className='bg-linear-to-l from-cyan-800 to-blue-900 text-white px-5  py-2 text-base rounded-md flex whitespace-nowrap '>Latest Work</button>
              <span className='-mt-1 group-hover:mt-0 transition  duration-200 ease-in '><RiArrowDownLongLine size={30} /></span>
            </a>
          </div> */}
        </section>

        <section id='project' className='w-full min-h-screen flex flex-col   px-10 relative mb-12'>
          <div className='h-10'></div>
          {/* <h2 className='text-6xl text-center '>Projects</h2> */}
          <div id='project-1' className='w-full mt-12 flex flex-col gap-5 md:flex-row items-center justify-between  relative'>
            <div className='absolute h-px left-1/5 right-1/2 bg-[#459bd5] hidden md:block'></div>
            <div className='absolute z-10 w-3 h-3 border-3 border-[#459bd5] bg-[var(--page-bg)] rounded-full left-1/2 -translate-x-1/2 hidden md:block'></div>
            <a className='w-[90%] h-[50%] md:w-[49%] md:h-full flex flex-col justify-center ' href="https://github.com/ankushsantra42/genAI-fullstack-job-preparation" target='_blank'>
              <div className='w-full md:w-[50%] min-w-60 h-full max-h-64 relative group hover:scale-105 transition ease-in duration-200'>
                <img className='w-full mr-auto h-full object-cover relative z-3' src={Job} alt="" />
                <span className='flex  gap-2 bg-[#fc815c] w-fit px-3 py-2 rounded absolute top-2 left-1/2 -translate-x-1/2 after:h-4 after:w-4 after:bg-inherit after:absolute after:left-1/2 after:-translate-x-1/2 after:rotate-45 after:-bottom-2 group-hover:-top-14 transition-all ease-jump duration-200'>

                  <p className='whitespace-nowrap'>InterviewIQ</p>
                  <ExternalLink />
                </span>
              </div>
            </a>
            <div className='w-full md:w-[49%] px-5 '>
              <h3 className="text-[#fc815c] font-bold text-3xl lg:text-4xl">InterviewIQ</h3>
              <span className="text-[#fc815c] text-base lg:text-lg">(AI-Powered Interview Preparation)</span>
              <p className="text-justify mt-2">
                A full-stack MERN application that uses Google Gemini AI to provide personalized interview preparation, skill-gap analysis, and job-specific resume generation. It features JWT-based authentication, Zod validation, MongoDB integration, and Puppeteer-powered PDF generation.
              </p>

              <ul className="flex flex-wrap gap-2 mt-2 text-sm lg:text-base">
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #react.js
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #express.js
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #node.js
                </li>
                {/* <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #swiper.js
                </li> */}
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #mongoDB
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #mongoose
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #scss
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #Zod
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #Puppeteer
                </li>
              </ul>
            </div>
          </div>
          <div id='project-2' className='w-full mt-12 flex flex-col-reverse gap-5 md:flex-row items-center justify-between  relative'>
            <div className='absolute hidden md:block h-px left-1/2 right-1/5 bg-[#459bd5]'></div>
            <div className='absolute hidden md:block z-10 w-3 h-3 border-3 border-[#459bd5] bg-[var(--page-bg)] rounded-full left-1/2 -translate-x-1/2'></div>
            {/* <div className='w-[49%] px-5 '>
              <h3 class="text-[#fc815c] font-bold text-4xl">Harigurus</h3>
              <span class="text-[#fc815c] text-lg">(Event Booking)</span>
              <p class="text-justify mt-2">
                HariGurus is a one-stop-shop for all Hindu religious, customs and
                traditional requirements. Built the complete site from scratch.
              </p>

              <ul class="flex flex-wrap gap-2 mt-2">
                <li class="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #react.js
                </li>
                <li class="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #express.js
                </li>
                <li class="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #node.js
                </li>
                <li class="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #swiper.js
                </li>
                <li class="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #mongoDB
                </li>
                <li class="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #mongoose
                </li>
                <li class="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #css
                </li>
                <li class="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #javascript
                </li>
                <li class="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #figma
                </li>
              </ul>
            </div> */}
            <div className='w-full md:w-[49%] px-5 '>
              <h3 className="text-[#fc815c] font-bold text-3xl lg:text-4xl">Connectly</h3>
              <span className="text-[#fc815c] text-base lg:text-lg">(Connecting with People)</span>
              <p className="text-justify mt-2">
                a full-stack MERN real-time messaging application featuring instant chat, online status tracking, secure JWT authentication. It uses Socket.io for low-latency communication and Cloudinary for media management, with optimistic updates for a smooth user experience.
              </p>

              <ul className="flex flex-wrap gap-2 mt-2 text-sm lg:text-base">
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #react.js
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #express.js
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #node.js
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #Socket.io
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #mongoDB
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #mongoose
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #Tailwindcss
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #Redux
                </li>
                {/* <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #figma
                </li> */}
              </ul>
            </div>

            {/* <a className='w-[49%] h-full ' href="#">
              <div className='w-[50%] h-full ml-auto relative group hover:scale-105 transition ease-in duration-200'>
                <img className='w-full h-full object-cover relative z-3' src={Mypic} alt="" />
                <span className='flex gap-2 bg-[#fc815c] w-fit px-3 py-2 rounded absolute top-0 left-1/2 -translate-x-1/2 after:h-4 after:w-4 after:bg-inherit after:absolute after:left-1/2 after:-translate-x-1/2 after:rotate-45 after:-bottom-2 group-hover:-top-14 transition-all ease-jump duration-200'>

                  <p>Harigurus</p>
                  <ExternalLink />
                </span>
              </div>
            </a> */}
            <a className='w-[90%] h-[50%] md:w-[49%] md:h-full flex flex-col justify-center ' href="https://chat-app-main-plly.onrender.com/" target='_blank'>
              <div className='w-full md:w-[50%] min-w-60 h-full max-h-64 relative ml-auto group hover:scale-105 transition ease-in duration-200'>
                <img className='w-full ml-auto h-full  object-contain  relative z-3' src={ChatApp} alt="" />
                <span className='flex gap-2 bg-[#fc815c] w-fit px-3 py-2 rounded absolute top-1/2 left-1/2 -translate-x-1/2 after:h-4 after:w-4 after:bg-inherit after:absolute after:left-1/2 after:-translate-x-1/2 after:rotate-45 after:-bottom-2 group-hover:-top-14 transition-all ease-jump duration-200'>

                  <p>Connectly</p>
                  <ExternalLink />
                </span>
              </div>
            </a>
          </div>
          <div id='project-3' className='w-full mt-12 flex flex-col gap-5 md:flex-row items-center justify-between  relative'>
            <div className='absolute h-px left-1/5 right-1/2 bg-[#459bd5] hidden md:block'></div>
            <div className='absolute z-10 w-3 h-3 border-3 border-[#459bd5] bg-[var(--page-bg)] rounded-full left-1/2 -translate-x-1/2 hidden md:block'></div>
            <a className='w-[90%] h-[50%] md:w-[49%] md:h-full flex flex-col justify-center ' href="https://github.com/ankushsantra42/E-commerce">
              <div className='w-full md:w-[50%] min-w-60 h-full max-h-64 relative group hover:scale-105 transition ease-in duration-200'>
                <img className='w-full mr-auto h-full object-cover relative z-3' src={Ecommerce} alt="" />
                <span className='flex  gap-2 bg-[#fc815c] w-fit px-3 py-2 rounded absolute top-2 left-1/2 -translate-x-1/2 after:h-4 after:w-4 after:bg-inherit after:absolute after:left-1/2 after:-translate-x-1/2 after:rotate-45 after:-bottom-2 group-hover:-top-14 transition-all ease-jump duration-200'>

                  <p className=''>Shop Karo</p>
                  <ExternalLink />
                </span>
              </div>
            </a>
            <div className='w-full md:w-[49%] px-5 '>
              <h3 className="text-[#fc815c] font-bold text-3xl lg:text-4xl">Shop Karo</h3>
              <span className="text-[#fc815c] text-base lg:text-lg">(E-commerce platform)</span>
              <p className="text-justify mt-2">
                A full-stack MERN e-commerce platform with user and admin interfaces, secure JWT authentication and role-based access, product and inventory management, cart functionality, and PayPal payment integration. Redux Toolkit manages application state and asynchronous API interactions.
              </p>

              <ul className="flex flex-wrap gap-2 mt-2 text-sm lg:text-base">
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #react.js
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #express.js
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #node.js
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #Tailwindcss
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #mongoDB
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #mongoose
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #mongoose
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #Redux
                </li>
                <li className="border rounded-[50px] border-[#999] px-2.5 py-1.25">
                  #Shadcn ui
                </li>
              </ul>
            </div>
          </div>
          <div className='vertical-line hidden md:block w-0.5 bg-[#459bd5] top-10 bottom-0 absolute left-1/2 -translate-x-1/2 '></div>
          {/* <div className='absolute z-10 w-3 h-3 border-3 border-[#459bd5] bg-[#111111] rounded-full left-1/2 -translate-x-1/2'></div> */}
          <div className='h-12'></div>
        </section>

        <section id='contact' className='contact min-h-screen mt-12 px-10 '>
          <div className='flex justify-center'>
            <h1 className='text-center text-4xl md:text-5xl font-bold w-fit border-3 border-[#459bd5] px-5 py-2 rounded-xl'>Lets's Connect</h1>
          </div>
          <div className='flex flex-col md:flex-row w-full mt-15 items-center'>
            <div className='w-full md:w-[50%]'>
              <Contact className='w-full h-[80%] ' />
            </div>
            <div className='w-full md:w-[50%]'>

              <form
                name="contact"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 w-full"
              >
                <input type="hidden" name="form-name" value="contact" />
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className='flex items-center gap-2' htmlFor="name">< RiUserLine /> Name</label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className='flex items-center gap-2' htmlFor="email"><RiMailLine />Email</label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className='flex items-center gap-2' htmlFor="message"><RiChat4Line />Message</label>

                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    className="resize-none rounded-lg border border-gray-400 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="rounded-lg bg-[#459bd5] px-5 py-3 text-white transition hover:bg-blue-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
          <div className='h-10'></div>
        </section>
      </main>
    </div>
  )
}

export default App

import React, { useRef } from 'react';
import { FaBook, FaUserFriends, FaFileAlt, FaFeatherAlt, FaBookmark } from "react-icons/fa";
import Footer from '../components/Footer';
import ScrollFloat from '../components/ScrollFloat';
import { Link } from 'react-router-dom';

const featureCards = [
  {
    icon: <FaBook size={26} className='text-yellow-800' />, 
    title: 'Book Rentals',
    desc: 'Rent or list textbooks at affordable prices',
  },
  {
    icon: <FaUserFriends size={26} className='text-yellow-800' />, 
    title: 'Mentorship',
    desc: 'Connect with experienced student mentors',
  },
  {
    icon: <FaFileAlt size={26} className='text-yellow-800' />, 
    title: 'PYQ Archive',
    desc: 'Access previous year question papers',
  },
  {
    icon: <FaFeatherAlt size={26} className='text-yellow-800' />, 
    title: 'Academic Blogs',
    desc: 'Share knowledge and read academic insights',
  },
];

const book = {
    image:"",
    status: 'Available',
    title: 'Principle of Economics',
    author: 'Robert Smith',
    subject: 'Economics',
    price: 100,
    rent: '1/day',
    genre: 'Computer Science',
};

const books = Array(4).fill({ ...book });

function Home() {
  
  return (
    // <scrollView></scrollView>
    <main className='bg-choco-light min-h-screen flex flex-col'>
        {/* <div className=''>
          <h1>Welcome to Bookhive</h1>
        </div> */}
        <section className='max-w-4xl mx-auto text-center'>
          <h1 className='text-6xl text-yellow-800 font-playfair font-bold mb-4 mt-20'>Your Academic Journey <br/>Starts Here</h1>
          <p className='text-xl text-cocoa mt-7 mb-2'>BookHive connects university students with textbooks, mentors, resources, and <br/> knowledge all in one place.</p>
{/* buttons */}
          <div className='flex-row items-center  mt-12 justify-between'>
            <button className='bg-yellow-800 text-white rounded-full px-5 py-2 '>
              Browse Books
            </button>
            <button className='bg-choco-light text-yellow-800 border border-yellow-800 rounded-full  ml-4 px-5 py-2 '>
              Find a Mentor
            </button>
          </div>
        </section>
{/* features */}
        <section className='max-w-10xl m-16 mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {featureCards.map((card, idx) => (
            <div key={idx} className='bg-white rounded-xl shadow flex flex-col items-start p-8 min-h-[220px] justify-center hover:shadow-lg transition-shadow'>
              <div className='flex flex-col items-start'>
                <div className='bg-creamy rounded-full flex items-center justify-center' style={{ width: 56, height: 56 }}>
                  {card.icon}
                </div>
                <h3 className='text-2xl font-playfair text-yellow-800 mt-6 font-bold'>{card.title}</h3>
                <p className='text-base text-cocoa font-playfair mt-2'>{card.desc}</p>
              </div>
            </div>
          ))}
        </section>
  {/* resume scanner */}
        <section className="flex-1 flex-col items-center justify-center ">
          <div className='flex flex-col items-center justify-center'>
            <h2 className='text-4xl font-playfair text-yellow-800 mb-4'>Scan Your Resume</h2>
            <p className='text-xl text-cocoa mb-8'>Upload your resume to get personalized recommendations</p>
            <button className='bg-yellow-800 text-white rounded-lg px-5 py-2'>
              Try our Resume Scanner
            </button>
          </div>
        </section>

        {/* virtual library */}
        <section className='flex-1 flex-col mt-20 -ml-10 mb-32 mr-10'>
        <div className='flex flex-col ml-20'>
          <h2 className='text-3xl font-playfair font-bold text-yellow-800 mb-2'>Featured Books</h2>
          <p className='text-base text-cocoa mb-5'>Explore our virtual library to look for books and resources</p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8'>
            {books.map((book, idx) => (
              <div key={idx} className='bg-white rounded-lg shadow-lg flex flex-col overflow-hidden'>
                {/* Image & Status */}
                <div className='bg-gray-200 h-48 flex items-start justify-end relative'>
                  <span className={`absolute top-3 right-3 px-6 py-1 rounded text-sm
                    ${book.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {book.status}
                  </span>
                  <div className='w-full h-full flex items-center justify-center opacity-30'>
                    <span className='text-3xl'>📚</span>
                  </div>
                </div>
                {/* Details Section */}
                <div className='p-6 flex-1 flex flex-col justify-between'>
                  <div>
                    <h3 className='text-2xl font-playfair font-semibold text-yellow-800 leading-tight'>{book.title}</h3>
                    <p className='text-xs+2 text-cocoa mt-1'>by {book.author}</p>
                    <p className='text-xs+1 font-thin text-red-950'>{book.subject}</p>
                  </div>
                  <div className='flex justify-between items-center mt-6'>
                    <span className='text-lg font-playfair font-thin text-yellow-800'>₹{book.price}/month</span>
                    <a href='#' className='text-green-950 text-base font-semibold hover:underline'>Details</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </section>
        
        <Footer className='mt-auto'/>

          
    </main>
  );
}

export default Home;

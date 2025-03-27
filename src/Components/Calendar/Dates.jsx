import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import TimeSlots from './TimeSlots'; 
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; 
import { BreadCrumb } from '../DoctorDashboard/BreadCrumb';

const Dates = () => {   
  const [selectedDate, setSelectedDate] = useState(new Date());   
  const [formattedDate, setFormattedDate] = useState('');    

  useEffect(() => {     
    const formatDate = (date) => {       
      const day = String(date.getDate()).padStart(2, '0');       
      const month = String(date.getMonth() + 1).padStart(2, '0');       
      const year = date.getFullYear();       
      return `${day}-${month}-${year}`;     
    };     
    setFormattedDate(formatDate(selectedDate));   
  }, [selectedDate]);    

  const handleDateClick = (day) => {     
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);     
    if (newDate >= new Date().setHours(0, 0, 0, 0)) { 
      setSelectedDate(newDate);   
    }
  };    

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();   
  const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();   
  const emptyDays = Array(firstDay).fill(null);    

  const submitDate = () => {         
    console.log('Selected Date:', formattedDate);   
  };    

  return (  
  <>
    <BreadCrumb first="Book Appointment"  firstLink="/bookAp" second="Select Dates" secondLink="/patient/dates" />

    <div className='date-TimeSlot-holder lg:flex lg:w-full'>       
      <div className="Calendar flex flex-col items-center min-h-screen bg-gray-100 lg:w-4/6 rounded-2xl">         
        <div className="flex items-center justify-center my-5 text-custom-maroon">           
          <CalendarMonthIcon sx={{ color: "#8f1b1b", fontSize: 40 }} />           
          <span className="text-2xl font-semibold ml-2">Calendar</span>         
        </div>         
        <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden">           
          <div className="flex items-center justify-between p-5 bg-custom-maroon text-white rounded-t-3xl">             
            <select                
              className="bg-custom-maroon text-white outline-none rounded p-2"                
              value={selectedDate.getMonth()}                
              onChange={(e) =>                 
                setSelectedDate(new Date(selectedDate.getFullYear(), parseInt(e.target.value), selectedDate.getDate()))                
              }             
            >               
              {Array.from({ length: 12 }).map((_, index) => (                 
                <option key={index} value={index}>                   
                  {new Intl.DateTimeFormat('en-IN', { month: 'short' }).format(new Date(0, index))}                 
                </option>               
              ))}             
            </select>             
            <select                
              className="bg-custom-maroon text-white outline-none rounded p-2"                
              value={selectedDate.getFullYear()}                
              onChange={(e) =>                 
                setSelectedDate(new Date(parseInt(e.target.value), selectedDate.getMonth(), selectedDate.getDate()))                
              }             
            >               
              {Array.from({ length: 10 }).map((_, index) => (                 
                <option key={index} value={new Date().getFullYear() - 5 + index}>                   
                  {new Date().getFullYear() - 5 + index}                 
                </option>               
              ))}             
            </select>           
          </div>            
          <div className="grid grid-cols-7 text-center text-custom-gray0 font-medium bg-gray-200">             
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (               
              <div key={index} className="p-3 text-lg font-semibold">                 
                {day}               
              </div>             
            ))}           
          </div>            
          <div className="grid grid-cols-7 text-center p-3">             
            {emptyDays.map((_, index) => (               
              <div key={index} className="p-3"></div>             
            ))}             
            {Array.from({ length: daysInMonth }).map((_, index) => { 
              const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), index + 1);
              const isPast = date < new Date().setHours(0, 0, 0, 0);
              return (
                <div                  
                  key={index}                 
                  className={`p-3 cursor-pointer rounded-full transition-all duration-300 ease-in-out 
                    ${selectedDate.getDate() === index + 1 ? 'bg-custom-maroon text-white' : 'hover:bg-custom-maroon-light'}
                    ${isPast ? 'opacity-50 cursor-not-allowed' : ''}`}                 
                  onClick={() => !isPast && handleDateClick(index + 1)}               
                >                 
                  {index + 1}               
                </div>             
              );
            })}           
          </div>            
          <div className="p-4 text-center">             
            <div className="text-custom-maroon font-bold text-lg">Selected Date:</div>             
            <div className="text-2xl font-semibold">{formattedDate}</div>           
          </div>            
          <div className="flex justify-between p-5">             
            <button               
              className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"               
              onClick={() => setSelectedDate(new Date())}             
            >               
              Reset             
            </button>             
            <button               
              className="px-5 py-2 rounded-lg bg-custom-maroon text-white hover:bg-custom-maroon-light font-medium"               
              onClick={submitDate}             
            >               
              Select Date             
            </button>           
          </div>         
        </div>       
      </div>       
      <div className='lg:w-2/6'>         
        <TimeSlots selectedDate={formattedDate} />       
      </div>       
    </div> 
  </>   
  ); 
};

export default Dates;

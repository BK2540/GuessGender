import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material';

import male from '../assets/male.png';
import female from '../assets/female.png';
import close from '../assets/close.svg';

const GuessGender = () => {

  const [names, setNames] = useState([]);
  const [results, setResults] = useState([]);
  const [fetching, setFetching] = useState(false);

  
    // Function to fetch gender data for a single name
    const fetchGenderData = async (name) => {
      try {
        const response = await fetch(`https://api.genderize.io?name=${name}`);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        return {
          name: name,
          gender: data.gender || 'Not found',
          probability: data.probability || 'Not found',
        };
      } catch (error) {
        alert(`Error fetching data for ${name}:`, error);
        return {
          name: name,
          gender: 'Not found',
          probability: 'Not found',
        };
      }
    };

      // Function to fetch gender data for multiple names
      const fetchAllGenderData = async () => {
        const results = await Promise.all(names.map(async (name) => {
          const data = await fetchGenderData(name);
          return {
            name: name,
            gender: data.gender,
            probability: data.probability,
          };
        }));
        setResults(results);
        setFetching(false);

        // console.log(results);
      };  

  const handleSubmit = () => {
    setFetching(true);
    setNames(names.filter((name) => name.trim() !== '')); 
    fetchAllGenderData();
  }

  const handleGoBack = () => {
    setResults([]);
    setNames([]);
  };

  return (
    <div className="flex-center flex-col w-full h-screen z-0">
        <h1 className='text-primary-orange font-bold text-2xl text-center md:text-5xl'>GuessGender</h1>

    <div className="py-12 px-12 md:px-24 w-full">
        <div className="mb-6">
            <label htmlFor="text" className="block mb-4 text-sm md:text-base">Put your name here</label>
            <input 
                type="text" 
                id="text" 
                className="bg-[#cdd1ff48] backdrop-blur-sm border-[#525ee1] placeholder-[#525ee1] text-sm rounded-lg block w-full p-2.5 shadow-lg" 
                placeholder="John, Jane, ..." 
                required
                value={names.join(',')}
                onChange={(e) => {
                    const inputNames = e.target.value.split(',').map(name => name.trim());
                    setNames(inputNames);
                }}
            />
        </div>

         {/* BUTTON */}
        <div className="flex items-center justify-center gap-4">
          <button
            className="main_button flex-center"
            onClick={() => setResults([])}
          >Clear</button>
          <button 
            className="main_button flex-center" 
            onClick={handleSubmit}
          >Guess</button>       
        </div>
    </div>        

    {/* RESULT CARD */}
    {fetching ? (
        <CircularProgress/>
      ) : (        
        <>
        <div className="flex flex-col md:flex-row justify-center  gap-4 absolute items-center z-20">
          {results.map((result, index) => (                       
            <div key={index} className='flex-center flex-col drop-shadow-md text-primary-orange bg-[#191919c0] backdrop-blur-md rounded-xl shadow-lg py-6 px-8 mb-4 w-max h-max mx-2 gap-2'>
              <h1 className='font-semibold text-3xl uppercase'>{result.name}</h1>
              <img src={result.gender === "female" ? female : male} alt={result.gender} className='w-[200px] h-[200px] object-cover' />
              <h2 className='font-semibold text-2xl uppercase'>{result.gender}</h2>
              <p className='text-base font-light text-primary-orange/80'>Probability: {Math.round(result.probability * 100)}%</p>
            </div>            
          ))}
        </div>

            {results.length >= 1 && (
              <>
              <div className="absolute top-4 right-4 md:top-12 md:right-24 flex items-end justify-end gap-4 z-20">
                <button className="rounded-full p-2 hover:bg-white hover:border-none border-primary-orange border flex-center" onClick={handleGoBack}>
                  <img src={close} alt="close" className='w-[16px] h-[16px] md:w-[20px] md:h-[20px]' />
                </button>
              </div>

              <div className='w-full h-full py-24 bg-gray-500/40 backdrop-blur-sm absolute top-0 left-0 z-10'/>
              </>
              
            )}
        </>
      )}
    </div>
  );
}

export default GuessGender

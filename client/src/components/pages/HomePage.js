import React from 'react';
import NavBar from './Navbar';
import '../styles/HomePage.css'; 

const HomePage = () => {
  return (
    <div>
      {/* First section */}
      <div className="homepage-bg flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-white text-4xl font-bold mb-4">VANTAY.COME TO ANTIQUE</h1>
          <NavBar />
        </div>
      </div>

      {/* Second section with three card boxes */}
      <div id="second-section" className="second-section flex justify-center">
        <div className="text-center flex">
          <div className="card bg-gray-200 p-4 mr-4">Card 1</div>
          <div className="card bg-gray-200 p-4 mr-4">Card 2</div>
          <div className="card bg-gray-200 p-4">Card 3</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

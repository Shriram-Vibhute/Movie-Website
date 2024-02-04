import React, { useState } from 'react'
import './style.scss';

const SwitchTabs = ({ data, onTabChange }) => {

  const [selectedTab, setSelectedTab] = useState(0); // Passing the index of selected tab
  const [left, setLeft] = useState(0); // Backgound move animation

  const activeTab = (tab, index) => {
    console.log("Activated")
    setLeft(index * 100);  // the width of each movie item is 100 so that it can move perfectly
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onTabChange(tab, index);
  } // When user click on perticular tag theen this method will run -> For openong the details section for that perticular section


  return (
    <div className='switchingTabs'>
      <div className="tabItems">
        {data.map((tab, index) => (
          <span key={index} className={`tabItem ${selectedTab === index ? "active" : ""
            }`} onClick={() => activeTab(tab, index)}>
            {tab} 
          </span> // map function takes three ags (element, index, array);
        ))}
        <span className="movingBg" style={{ left: left }}></span>
      </div>
    </div>
  )
}

export default SwitchTabs
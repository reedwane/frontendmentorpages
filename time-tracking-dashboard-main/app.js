

window.addEventListener('DOMContentLoaded', (e) => {
  
  //variables
  var infoBox = document.querySelector('.info');
  var timeTabs = document.querySelector('.timetabs');
  //console.log(timeTabs);
  var dimColor = 'hsl(0, 0%, 56%)';
  var brightColor = 'hsl(0, 0%, 100%)';
  
  var durations = ["daily", "weekly", "monthly"];
  var currentDuration = ["weekly", "Last Week"];
  
  
  //async fetch
const getData = async () => {
  let url = 'https://jsonkeeper.com/b/W9BF';
  let url1 = 'data/data.json';
    const resp = await fetch(url1);
    
    if(resp.status !== 200){
      throw new Error('cannot fetch data');
    }
    
    const data = await resp.json();
    return data;
  };
  


//Default view
getData()
.then(data => {
   let jsonData = data;
   
        //Displaying the json data  
  const displayResults = (arr) => {
    
    var df = document.createDocumentFragment();
    
    for (let i = 0; i < arr.length; i++) {
      let taskBox = document.querySelector('.tasks').cloneNode(true);
      taskBox.id = `${arr[i].title}`;
      df.appendChild(taskBox);
    }
    infoBox.appendChild(df);
  }
  displayResults(jsonData);
  var taskBoxes = document.querySelectorAll('.tasks');
  
     //time formatter
   //formatting info in the taskboxes
    const passTime = (arr, currentDuration) => {
      
      taskBoxes.forEach((box) => {
      var boxIndex = Array.prototype.indexOf.call(taskBoxes, box);
     // console.log(boxIndex);
     try {
       box.querySelector('.title').textContent = arr[boxIndex].title;
       //console.log(boxIndex);
      
      box.querySelector('.current-duration').textContent = `${arr[boxIndex]["timeframes"][currentDuration[0]]["current"]}hrs`;
      
      box.querySelector('.timeframe').textContent = currentDuration[1];
      
      box.querySelector('.past-duration').textContent = `${arr[boxIndex]["timeframes"][currentDuration[0]]["previous"]}hrs`;
     } catch (e) {
       console.log(e.message);
     }
     
      
      

    })

    }
    
   
     //reacting to tab switches
  timeTabs.addEventListener('click', e => {
    
      if (e.target.className == "weekly") {
        currentDuration = ["weekly", "Last Week"];
        getData();
      }
     else if (e.target.className == "daily") {
        currentDuration = ["daily", "Yesterday"];
        getData();
      }
      else{
        currentDuration = ["monthly", "Last Month"];
        getData();
      }
      
      
      
      //getting the data and rendering the view
      getData()
.then(data => {
   let jsonData = data;
    passTime(jsonData ,currentDuration);
    
      
      //console.log(taskBoxes.length);
  })
.catch(err => console.log(err.message));

      
    })
   
   
   
    passTime(jsonData ,currentDuration);
    displayResults(jsonData);
  
  })
.catch(err => console.log(err.message));


timeTabs.addEventListener('click', e => {
  timeTabs.querySelectorAll('p').forEach((tab) => {
      tab.style.color = dimColor;
    });
  e.target.style.color = brightColor;
  
})

});


//FAILED JSON FETCH
//   const request = async () => {
//     const resp = await fetch('data/data.json');
//     jsondata = await resp.json();
//   }
  
//   request().then(resp => console.log(resp));
  
// console.log(jsondata);
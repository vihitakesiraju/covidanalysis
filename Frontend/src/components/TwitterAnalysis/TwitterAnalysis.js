import React, { Component } from 'react';

class TwitterAnalysis extends Component {
    state = {  }
    render() { 
        return ( 
            
            <div class="container"> 
        <div class="row"> 
            <div class="col-lg-6 mb-4"> 
                <div class="card text-white bg-secondary mb-1"> 
                    <img class="card-img-top" src="" alt=""></img>
  
                    <div class="card-header">
    Tweets
  </div>
                </div> 
                <div class="card-body">
    <h5 class="card-title">#covid #food #spreadsviafood</h5>
    <p class="card-text">Covid can spread through food</p>
   
  </div>
            </div> 
 
 <div>

 </div>


            <div class="col-lg-6 mb-4"> 
                <div class="card text-white bg-secondary mb-1"> 
                    <img class="card-img-top" src="" alt=""></img>
  
                    <div class="card-header">
    Facts
  </div> 
  </div> 
<div>  <div class="card-body">
    
    <p class="card-text">WHO confirms that covid doesn't spread through food</p>
    
  </div>
  </div>
                
            </div> 
        </div> 

         
    </div> 
  
  

         );
    }
}
 
export default TwitterAnalysis;
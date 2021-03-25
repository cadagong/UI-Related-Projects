//which data is currently displayed on map
let selected_dataset;
//which country is currently selected
let selected_country = null;
//get refence to each individual country (256 countries)
const svg_countries = document.getElementsByClassName('country');


let all_datasets_list = ['population', 'gdp', 'access_to_elec'];


///////////////////
//Environment Setup
///////////////////


//set up tippy tools for every country
for(let i=0; i<svg_countries.length; i++) {
  let country_name = svg_countries[i].getAttribute('title');
  svg_countries[i].setAttribute('data-tippy-content', country_name);

  let tippy_btn = document.createElement("button");
  tippy_btn.setAttribute('class', 'tippy');
  tippy_btn.innerHTML = "\nClick me!";
  svg_countries[i].setAttribute('data-tippy-content', country_name);
}

//create panzoom svg object
const svgElement = document.querySelector('#svg-map');
var panZoomMap = svgPanZoom(svgElement, {
   mouseWheelZoomEnabled: true,
   controlIconsEnabled: true,
   contain: true,
   maxZoom: 40
});

//set up slider events
const date_slider = document.getElementById('date-slider');
const date_display = document.getElementById('date-display');
date_display.innerHTML = date_slider.value;
date_slider.addEventListener('input', function(e) {
  //update map colors
  if(selected_dataset == 'population') set_map_to_population();
  if(selected_dataset == 'gdp') set_map_to_gdp();
  if(selected_dataset == 'access_to_elec') set_map_to_electricity_access();
  //update info panel
  update_info_panel(); 
  //update date on map
  date_display.innerHTML = date_slider.value;
});


//matching our iso2Code from SVG (id of each country) with iso3code from worldbank.
fetch("http://api.worldbank.org/v2/country/all?format=json&per_page=1000").then(function (response) {
  response.json().then(function (json) { 
    let all_country_info = json[1];    
    for(let i=0; i<all_country_info.length; i++){  
      let a_country = all_country_info[i]      
      for(let j=0; j<svg_countries.length; j++) {
        let svg_country = svg_countries[j];
        if(svg_country.id == a_country.iso2Code) {
          svg_country.id = a_country.id;
        }        
      }     
    } 
    //selectbox must be loaded after fetch is complete 
    //this due to our iso code substitution (2 letter --> 3 letter)
    load_country_selectbox();
  })
});


let option_array = [];
//load countries into country selectbox
function load_country_selectbox() {
  let select_box = document.getElementById('country-selectbox');    

  for(let i=0; i<svg_countries.length; i++) {    
    let svg_country = svg_countries[i];        
    let country_name = svg_country.getAttribute('title');
    let country_iso3code = svg_country.getAttribute('id');    
    let option = document.createElement('option');
    option.setAttribute('class', 'selectbox-option');
    option.setAttribute('value', country_name);
    option.innerHTML = country_name + " - " + country_iso3code;    
    select_box.appendChild(option);  
    //option_array.push(option);
  }  

  //event listener for selectbox
  select_box.addEventListener('change', function(e) {
    let selected_value = select_box.options[select_box.selectedIndex].value;        
    selected_country = document.querySelector(' [title="' + selected_value + '"] ');
    
    update_info_panel();
  });          
}


///////////////////////////////
//Data-selection-buttons events
///////////////////////////////


//fetch population data by country and diplay on map
let pop_btn = document.getElementById('btn-population');
pop_btn.addEventListener('click', function(e) {  
  selected_dataset = 'population';
  
  //fetch POPULATION data and display it on map     
  let url = "http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json&mrnev=50&per_page=25000"; 

  fetch(url).then(function (response) {
    response.json().then(function (json) {
      let countries_data = json[1];   
      let most_recent_date = 0;                         

      for(let i=0; i<countries_data.length; i++) {                        
        let country_data = countries_data[i];
        let data_val = country_data.value;    
        //get most recent year
        if(country_data.date > most_recent_date) most_recent_date = country_data.date;                        

        let svg_country = document.getElementById(country_data.countryiso3code);          
        if(svg_country) {
          svg_country.setAttribute('population_' + country_data.date, data_val);
        }             
        
        //set max-date on slider to most_recent_date
        //document.getElementById('date-slider').setAttribute('max', most_recent_date);
      }     

      console.log("population data processed");   
      //console.log(data_filter); 
      set_map_to_population();  
    })
  })
})

//fetch gdp data by country and diplay on map
let gdp_btn = document.getElementById('btn-gdp');
gdp_btn.addEventListener('click', function(e) {
  selected_dataset = 'gdp';

  //set url   
  let url = "http://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&mrnev=50&per_page=25000";  

  fetch(url).then(function (response) {
    response.json().then(function (json) {
      let countries_data = json[1];    
      let most_recent_date = 0;                        

      for(let i=0; i<countries_data.length; i++) {                
        let country_data = countries_data[i];
        let data_val = country_data.value;     
        //get most recent year
        if(country_data.date > most_recent_date) most_recent_date = country_data.date;                

        let svg_country = document.getElementById(country_data.countryiso3code);  
        if(svg_country) {
          svg_country.setAttribute('gdp_' + country_data.date, data_val);
        }   
        
        //set max-date on slider to most_recent_date
        //document.getElementById('date-slider').setAttribute('max', most_recent_date);
      }     

      console.log("gdp data processed");         
      set_map_to_gdp();
    })
  })
});

//fetch access-to-electricity data and display on map
let access_to_elec_btn = document.getElementById('btn-access-to-elec');
access_to_elec_btn.addEventListener('click', function(e) {
  selected_dataset = 'access_to_elec';

  //set url   
  let url = "http://api.worldbank.org/v2/country/all/indicator/1.3_ACCESS.ELECTRICITY.URBAN?format=json&mrnev=50&per_page=25000";  

  fetch(url).then(function (response) {
    response.json().then(function (json) {
      let countries_data = json[1];                      
      let most_recent_date = 0;    

      for(let i=0; i<countries_data.length; i++) {                
        let country_data = countries_data[i];
        let data_val = country_data.value;   
        //get most recent year
        if(country_data.date > most_recent_date) most_recent_date = country_data.date;                    

        let svg_country = document.getElementById(country_data.countryiso3code);                 
        if(svg_country) {
          svg_country.setAttribute('electricity-access_' + country_data.date, data_val);
        }   
        
        //set max-date on slider to most_recent_date
        //document.getElementById('date-slider').setAttribute('max', most_recent_date);
      }     
      console.log("access-to-electricity data processed");         
      set_map_to_electricity_access();
    })
  })
})


//Set map country colors to population values
function set_map_to_population() {
  for(let i=0; i<svg_countries.length; i++) {   
    let country = svg_countries[i];             
    let slider_date = document.getElementById('date-slider').value;
    let country_pop = parseInt(country.getAttribute('population_' + slider_date));    

    if(country_pop) {
      if(country_pop < 4000000) country.style.fill = 'rgba(255, 200, 200, 1)';
      else if(country_pop < 8000000) country.style.fill = 'rgba(255, 180, 180, 1)';
      else if(country_pop < 20000000) country.style.fill = 'rgba(255, 120, 120, 1)';
      else if(country_pop < 80000000) country.style.fill = 'rgba(255, 150, 150, 1)';
      else if(country_pop < 100000000) country.style.fill = 'rgba(255, 90, 90, 1)';
      else if(country_pop < 150000000) country.style.fill = 'rgba(255, 60, 60, 1)';
      else if(country_pop < 400000000) country.style.fill = 'rgba(255, 30, 30, 1)';
      else country.style.fill = 'rgba(255, 0, 0, 1)';  
    }
    else {
      country.style.fill = 'grey';
    }        
    update_info_panel();
  }
}


function set_map_to_gdp() {
  for(let i=0; i<svg_countries.length; i++) {   
    let country = svg_countries[i];  
    let slider_date = document.getElementById('date-slider').value;           
    let country_gdp = parseInt(country.getAttribute('gdp_' + slider_date));

    if(country_gdp) {
      if(country_gdp < 1000000) country.style.fill = 'rgba(0, 0, 110, 0.2)';
      else if(country_gdp < 200000000000) country.style.fill = 'rgba(0, 0, 110, 0.4)';
      else if(country_gdp < 1000000000000) country.style.fill = 'rgba(0, 0, 110, 0.6)';
      else if(country_gdp < 2000000000000) country.style.fill = 'rgba(0, 0, 110, 0.8)';
      else if(country_gdp < 10000000000000) country.style.fill = 'rgba(0, 0, 110, 0.9)';
      else country.style.fill = 'rgba(0, 0, 110, 1)';
    }
    else {
      country.style.fill = 'grey';
    }    
    update_info_panel();
  }
}

function set_map_to_electricity_access() {
  for(let i=0; i<svg_countries.length; i++) {   
    let country = svg_countries[i];    
    let slider_date = document.getElementById('date-slider').value;         
    let country_elec = parseInt(country.getAttribute('electricity-access_' + slider_date));    

    if(country_elec) {  
      if(country_elec < 50) country.style.fill = 'rgba(0, 110, 0, 0.2)';
      else if(country_elec < 60) country.style.fill = 'rgba(0, 110, 0, 0.4)';
      else if(country_elec < 70) country.style.fill = 'rgba(0, 110, 0, 0.6)';
      else if(country_elec < 80) country.style.fill = 'rgba(0, 110, 0, 0.8)';
      else if(country_elec < 90) country.style.fill = 'rgba(0, 110, 0, 0.9)';
      else country.style.fill = 'rgba(0, 110, 0, 1)';
    }
    else {
      country.style.fill = 'grey';
    }    
    update_info_panel();
  }
}

//updates data on currently selected country
function update_info_panel() {
  //show data on selected country
  if(selected_country) {
    let slider_date = document.getElementById('date-slider').value;
    let country_name = selected_country.getAttribute('title');
    let country_pop = selected_country.getAttribute('population_' + slider_date);
    let country_gdp = selected_country.getAttribute('gdp_' + slider_date);    
    let access_to_elec = selected_country.getAttribute('electricity-access_' + slider_date);

    if(country_name != null) document.getElementById('selected-country').innerHTML = country_name; 
    else document.getElementById('selected-country').innerHTML = 'N/A'; 
    if(country_pop != null) document.getElementById('btn-population').innerHTML = "Population: " + country_pop;      
    else document.getElementById('btn-population').innerHTML = 'Population: N/A';
    if(country_gdp != null) document.getElementById('btn-gdp').innerHTML = "GDP: " + country_gdp;      
    else document.getElementById('btn-gdp').innerHTML = 'GDP: N/A';
    if(access_to_elec != null) document.getElementById('btn-access-to-elec').innerHTML = "Urban Access to Electricity (%): " + access_to_elec;
    else document.getElementById('btn-access-to-elec').innerHTML = 'Urban Access to Electricity (%): N/A';
  }
  //no country selected so no data to show
  else {
    return;
  }
}


//set events for each country
for(let i=0; i<svg_countries.length; i++) {   
  let country = svg_countries[i]; 

  //display country info in panel
  country.addEventListener('click', function(e) {      
    selected_country = country;
    update_info_panel();            
  })

  //add black border on mouseover event
  country.addEventListener('mouseover', function(e) {
    country.style.stroke = 'black';   
    country.style.strokeWidth = '0.09em';    
  })

  //reset border color on mouseout event
  country.addEventListener('mouseout', function(e) {
    country.style.stroke = 'grey';    
    country.style.strokeWidth = '0.01em';
  })
}



///////////////////
//Utility Functions
///////////////////

function normalizeValue(value, lowestValue, highestValue, startRange, endRange){
  let result = ( ( value - lowestValue ) / ( highestValue - lowestValue )) 
  console.log(value, lowestValue, highestValue, result)
}

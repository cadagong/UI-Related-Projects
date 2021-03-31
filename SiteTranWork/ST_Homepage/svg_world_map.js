/** 
 * Copyright of TranslateGreat LLC 2021
 */

"use strict";




//** Selected Language Object **//

let language = {};

/**
 * Set the currently selected language
 */
function set_language(lang) {
    //Update all attributes using existing data
    language.name = lang;
    language.id = homepageLangData[lang].langCode;
    language.endonym = homepageLangData[lang].endonym;
    language.helloWorld = homepageLangData[lang].greeting;
    language.onlineSpeakers = homepageLangData[lang].speakers;
    //language.relevantCountries = homepageLangData[lang].relevantCountries;
    language.relevantCountriesData = homepageLangData[lang].relevantCountriesData;
    language.mapColor = homepageLangData[lang].mapColor;
    language.direction = homepageLangData[lang].direction;
}



//** Dynamic Homepage Text **//

/** 
 * Update the dynamic text to reflect the currently selected language
*/
function update_dynamic_text(text) {
    let lang = language.name.toLowerCase();
    //let dynamicText = document.getElementById(`p1-${lang}`);

    let dynamicText = document.querySelector('.selected');

    //dynamicText.className += ' selected';
    
    //dynamicText.style.display = 'block';

    dynamicText.classList.remove('scroll-out');
    dynamicText.className += ' scroll-in';       

    //once scroll-in animation ends, start scroll-out animation
    dynamicText.addEventListener('animationend', dynamic_text_animation_end_listener);
        
}

async function dynamic_text_animation_end_listener() {    
    document.querySelector('.selected').classList.remove('selected');
    let lang = language.name.toLowerCase();
    let dynamicText = document.getElementById(`p1-${lang}`);
    dynamicText.className += ' selected';
    if(!dynamicText.classList.contains('scroll-out')) {           
        //dynamicText.innerText = `${language.onlineSpeakers} ${language.name} speakers`;
        //await siteTran_Call(); 
        //sitetran.new_page();
        //console.log('done');
        dynamicText.classList.remove('scroll-in');
        dynamicText.className += ' scroll-out'; 
        
        dynamicText.removeEventListener('animationend', dynamic_text_animation_end_listener);
    }  
}

function siteTran_Call() {
    return new Promise(resolve => {        
        setTimeout( () => {
            sitetran.change_language(sitetran.widget_get_language_code());
            //sitetran.new_page();
            resolve()
        }, 0); //put resolve at bottom of call stack
    })    
}



//** Fake Website **//

/**
 * Update fake website to reflect the currently selected language.
 * Currently selected language can be set with set_language();
 */
function update_fake_website() {
    //check if selected language is LTR or RTL
    if (language.direction == 'RTL') {  

        let a = document.getElementsByClassName( "LTR" );
        [...a].forEach( x => x.className += " RTL" );
        [...a].forEach( x => {
            x.classList.remove("LTR");
            //restart fade in animation
            x.style.animation = 'none';
            x.offsetHeight; //trigger reflow
            x.style.animation = null; 
        });
    }
    else {
        let a = document.getElementsByClassName( "RTL" );
        [...a].forEach( x => x.className += " LTR" );
        [...a].forEach( x => {
            x.classList.remove("RTL") 
            //restart fade in animation
            x.style.animation = 'none';
            x.offsetHeight; //trigger reflow
            x.style.animation = null;
        });

    }        
    update_fake_dropdown();       
    update_hello_world();
}



//** Fake Dropdown **//

/**
 * Updates selected language in the fake dropdown
 */
function update_fake_dropdown(lang) {
    let selectedLang = document.querySelector('#selected-lang');
    selectedLang.textContent = language.endonym;
    const langs = document.querySelectorAll('#live-demo .list li');

    for (let i = 0; i < langs.length; i++) {
        langs[i].className = '';
        if (langs[i].textContent === language.name) {
            langs[i].className = 'display_sitetran_selected_item';
        }
    }
}

/** 
 * Close or open the fake dropdown
 */
function toggle_list(toClose) {
    setTimeout(function () {
        const el = document.querySelector('#live-demo .display_sitetran_translate_list');
        if (el.classList.contains('dropdown_open') || toClose) {
            el.classList.remove('dropdown_open');
            el.classList.add('dropdown_closed');
        } else {
            el.classList.remove('dropdown_closed');
            el.classList.add('dropdown_open');
        }
    }, 200);
}



//** Fake Website 'Hello World' Animation **//

/**
 * Update 'Hello World' text to reflect the currently selected language 
 */
function update_hello_world(text) {
    let helloWorldDiv = document.getElementsByClassName('hello-world')[0];
    let helloWorldContainer = document.getElementById('hello-world-container');
    helloWorldContainer.style.transition = 'all 0.05s ease-in-out';
    helloWorldContainer.style.opacity = '0%';

    setTimeout(function () {
        helloWorldDiv.innerHTML = text || homepageLangData[language.name].greeting;
        helloWorldContainer.style.transition = 'all 0.08s ease-in-out';
        helloWorldContainer.style.opacity = '100%';
    }, 200);
}



//** SVG World Map **//

let highlightedSvgCountries = []; //array keeps track of which countries are to be highlighted
let circlesToHighlight = []; 

/**
 * set svg world map color values for all countries
 */
/*
function update_world_map(toClear) {    

    //unhighlight previously highlighted countries
    for (let i = 0; i < highlightedSvgCountries.length; i++) {
        let svgCircles = highlightedSvgCountries[i].children; //circles in random order                                   
        for (let j=0; j < svgCircles.length; j++) {
            let circle = svgCircles[j];
            circle.style.animation = `unhighlightDot 1s ease-in-out 0s forwards`;
        }
    }
    
    //highlight new countries  
    highlightedSvgCountries = []; //empty highlighted countries array
    let circlesToHighlight = [];    
    for (let i = 0; i < language.relevantCountries.length; i++) {  
        for (let j = 0; j < svg_countries.length; j++) {              
            let countryId = svg_countries[j].getAttribute('id');        
            //if svg country is one of the relevant countries, highlight it on the map
            //if svg country is one of the relevant countries, 
            //add it to array of countries to be highlighted
            if (countryId == language.relevantCountries[i]) {
                highlightedSvgCountries.push(svg_countries[j]); 
                circlesToHighlight = [...svg_countries[j].children, ...circlesToHighlight];                
            }
        }
    }

    //highlight all relevant countries
    highlight_countries(circlesToHighlight);    
}
*/


function clear_map() {
    return new Promise(resolve => {
        //unhighlight previously highlighted countries
       //unhighlight previously highlighted countries
        for (let i = 0; i < circlesToHighlight.length; i++) {
            let svgCircle = circlesToHighlight[i];                    
            svgCircle.style.animation = `unhighlightDot 0.5s ease-in-out 0s forwards`;        
        }    
        
        setTimeout( () => {
            resolve();
        }, 200)
    })
}



const svg_countries = document.getElementsByClassName('svg-country');
let svg_circles = [];
for (let i=0; i<svg_countries.length; i++) {
    svg_circles = [...svg_circles, ...svg_countries[i].children];
}
svg_circles.sort(function(circle1, circle2) {
    return (circle1.getBBox().x + circle1.getBBox().y) - (circle2.getBBox().x + circle2.getBBox().y);
}) 
console.log(svg_circles);
console.log(svg_circles[0].parentNode);

//console.log(Date.now());
for(let i=0; i<6000; i++) {
    for(let j=0; j<20; j++) {

    }
}
//console.log(Date.now());

/* THIS FUNCTION WILL BE FASTER FASTER FASTER 
async function update_world_map() {

    console.log('1');
    await clear_map();
    console.log('2');
    
    highlightedSvgCountries = []; //empty highlighted countries array
    circlesToHighlight = []; 

    //console.log(Date.now());
    console.log('3');
    for (let i=0; i<svg_circles.length; i++) {
        
        for (let j=0; j<language.relevantCountriesData.length; j++) {
            let svg_country = svg_circles[i].parentNode;
            let circleCountryCode = svg_country.getAttribute('id');
            let relevantCountryCode = language.relevantCountriesData[j].countryCode;

            if (language.relevantCountriesData[j].percentSpeakers != "") {
                //console.log(language.relevantCountriesData[j].percentSpeakers);
                highlightedSvgCountries.push(svg_country);
                circlesToHighlight.push(svg_circles[i]);

                j = language.relevantCountriesData.length; //skip to end of loop
            }
        }
    }
    console.log('4');
    //console.log(Date.now());

    console.log(circlesToHighlight);
    //highlight_countries(circlesToHighlight);
}
*/



 //USE THIS VERSION OF THE FUNCTION ONCE WE FINISH IMPLEMENTING LANGUAGE PERCENTAGES
async function update_world_map(toClear) {    

    await clear_map();
  

    //highlight new countries  
    highlightedSvgCountries = []; //empty highlighted countries array
    circlesToHighlight = []; 
    //console.log(Date.now());
    for (let i=0; i < language.relevantCountriesData.length; i++) {

        let countryCode = language.relevantCountriesData[i].countryCode;
        let percentSpeakers = language.relevantCountriesData[i].percentSpeakers;

        for (let j = 0; j < svg_countries.length; j++) { 

            let country = svg_countries[j];
            let countryId = country.getAttribute('id');  
            let svgCountryCircles = Array.prototype.slice.call(country.children); 

            //if svg country is one of the relevant countries, 
            //add it's svg circles to array of countries to
            if (countryId == countryCode) {

                highlightedSvgCountries.push(country);                                 
                let circlesToHighlightCount = Math.ceil(svgCountryCircles.length * (percentSpeakers/100)); 
                
                for (let k=0; k<circlesToHighlightCount; k++) {
                    let circleIndex = Math.floor(k/(percentSpeakers/100));  
                    let circle = svgCountryCircles[circleIndex];
                    //circle.setAttribute('percent', percentSpeakers);
                    circlesToHighlight.push(circle);
                }                              
            }
        }
    }   
     
    //console.log(Date.now());
    circlesToHighlight.sort(function(circle1, circle2) {
        return (circle1.getBBox().x + circle1.getBBox().y) - (circle2.getBBox().x + circle2.getBBox().y);
    }) 
    //console.log(Date.now());  
               
    
    highlight_countries(circlesToHighlight);  

}


/**
 * Highlight all the svg circles that are part of the
 * countries to be highlighted
 */
/*
function highlight_countries(svgCircles) {                               
    let circlesArray = svgCircles;              
    for (let i=0; i<circlesArray.length; i++) {
        let circle = circlesArray[i];
        circle.xPos = circle.getBBox().x;
        circle.yPos = circle.getBBox().y;                        
    }

    //sort all circles by position on map     
    //for david: think of a way to AVOID SORTING THE CIRCLES EVERY TIME
    circlesArray.sort(function(circle1, circle2) {
        return (circle1.xPos + circle1.yPos) - (circle2.xPos + circle2.yPos);
    });
    
    
    //in order to ensure that the map animation for each language takes the same
    //amount of time, the amount which the delay time is incremented by is dependant 
    //on the number of svg circles that need to be highlighted
    
    let totalAnimationTime = 2000; //in milliseconds
    let numberOfCircles = circlesArray.length;    
    let delayPerCircle = totalAnimationTime/numberOfCircles; //in milliseconds    
    for (let i=0; i<circlesArray.length; i++) {                    
        let svgCircle = circlesArray[i];        
        svgCircle.style.animation = `highlightDot 0.5s ease-in-out ${i * delayPerCircle}ms forwards`;  
    }          
}
*/


//USE THIS VERSION OF THE FUNCTION ONCE WE FINISH IMPLEMENTING LANGUAGE PERCENTAGES
function highlight_countries(svgCircles) {     
    console.log('5');
    let circlesArray = svgCircles;                   
    //in order to ensure that the map animation for each language takes the same
    //amount of time, the amount which the delay time is incremented by is dependant 
    //on the number of svg circles that need to be highlighted    
    let totalAnimationTime = 2000; //in milliseconds
    let numberOfCircles = circlesArray.length;
    let delayPerCircle = totalAnimationTime/numberOfCircles; //in milliseconds 
      
    let delay = 0;
    for (let i=0; i<circlesArray.length; i++) {                    
        let svgCircle = circlesArray[i];  
        let delayCoef = (svgCircle.getBBox().x + svgCircle.getBBox().y);        
        //let percent = svgCircle.getAttribute('percent');        
        delay = (i * delayPerCircle);
        svgCircle.style.animation = `highlightDot 0.5s ease-in-out ${delay + delayCoef}ms forwards`;  
    }  
    console.log('6');      
}




//** 'Backend' Animation **//

/** 
 * Launch the 'backend' animation
 */
async function launch_backend_animation() {
    let front = document.getElementById('sample-website-backend-panel-front');
    let back = document.getElementById('sample-website-backend-panel-back');              
    
    back.style.height = '29vw';
    back.style.top = '0.6vw';
    back.style.left = '11.7vw';

    front.style.height = '25vw';
    front.style.top = '2.55vw';
    front.style.left = '12.9vw';    

    setTimeout(function () {            
        back.style.height = '27vw';
        back.style.top = '1.6vw';
        back.style.left = '12vw';
        
        let tempClass = front.getAttribute('class');
        front.setAttribute('class', back.className);
        back.setAttribute('class', tempClass);
    
        let tempId = front.getAttribute('id');
        front.setAttribute('id', back.id);
        back.setAttribute('id', tempId);                        
    }, 150);
}



//** Homepage Panels Event Definition **//

/**
 * Set events that kick off when user hovers over any panel
 */
function set_homepage_panels_hover_animations() {        
    let homepagePanelsContainer = document.getElementById('homepage-panels-container');     
    homepagePanelsContainer.addEventListener('mouseover', function () { //mouseover event        
        //replace all "tilted" classes with "upright" classes in html
        //this makes all tilted elements in homepage stand upright
        let tiltedElements = document.getElementsByClassName( "tilted" );
        [...tiltedElements].forEach( elem => elem.className += " upright");
        [...tiltedElements].forEach( elem => elem.classList.remove("tilted"));                                
    });    
    homepagePanelsContainer.addEventListener('mouseout', function () { //mouseout event
        //replace all "upright" classes with "tilted" class in html
        //this makes all upright elements in homepage tilted (20deg)
        let uprightElements = document.getElementsByClassName( "upright" );
        [...uprightElements].forEach( elem => elem.className += " tilted" ); 
        [...uprightElements].forEach( elem => elem.classList.remove("upright"));               
    });
}



//** Homepage Animation **//

let cursor = {};

/**
 * Move fake cursor to the position of the elem.
 * Elem is provided by caller.
 */
cursor.move = function (elem, duration, delay, callback) {
    return new Promise(resolve => {
        //cursor.elem = document.getElementById('svg-cursor');

        //starts cursor animation (moving to elem) after provided delay
        setTimeout(function () {
            /*
            let elemBcr = elem.getBoundingClientRect();
            //cursor.bcr = cursor.elem.getBoundingClientRect();
            //console.log(elemBcr);
            cursor.elem.style.transition = `left ${duration}ms ease-in-out,
                                            top ${duration}ms ease-in-out,
                                            transform 0.3s cubic-bezier(0.95, 0.95, 0.165, 1) 0s`;
            cursor.elem.style.left = `${elemBcr.x + (elemBcr.width / 3)}px`;
            cursor.elem.style.top = `${elemBcr.y + (elemBcr.height / 3)}px`;

            //call callback after after animation is complete (its duration) plus another half second
            */
            setTimeout(function () {
                if(callback) callback();
                resolve();
            }, duration + 500);
        }, delay)
    })
}

/**
 * Make the fake cursor perform a clicking motion
 * wherever it currently is.
 */
cursor.click = function (callback) {           
    //cursor.elem.style.width = '27px';
    //cursor.elem.style.height = '27px';

    setTimeout(function () {
        //let w = cursor.elem.style.width;
        //let h = cursor.elem.style.height;

        //cursor.elem.style.width = '30px';
        //cursor.elem.style.height = '30px';

        callback(); 
    }, 0);                 
}

function animate_lang_option_hover(langOption) {
    return new Promise(resolve => {
        //console.log(langOption);
        langOption.style.backgroundColor = 'rgb(184, 179, 179)';
        resolve();
    })    
}

/**
 * Launch the homepage animation cycle after provided delay
 */
async function start_animation() {              
    //The order of langArray determines the animation order as well.
    //The array can be reordered in any way, and the new ordering will 
    //be reflected in the animation.
    let langArray = ['Chinese', 'Arabic', 'French', 'Spanish', 'Hindi', 'Russian', 'English'];

    //times (in ms) to be used in animation cycle
    let duration = 1000;
    let delay = 1500;  
    let longerDelay = 2000;      
    
    //loop through each language in langArray and launch animations for each lang
    for (let i=0; i < langArray.length; i++) {   
        let fakeDropdown = document.querySelector("[id='display_sitetran_translate_element']");
        let langOptionToSelect = document.querySelector(`[title='${langArray[i]}']`);

        let langOptions = document.querySelector('.display_sitetran_translate_list').children;
        //console.log(langOptions);
        

        //--next animation cycle begins--

        //move cursor to fake dropdown                      
        await cursor.move(fakeDropdown, duration, 2000);

        //'click' on dropdown
                
            set_language(langOptionToSelect.getAttribute('title')); //set language            
            toggle_list(false); //open fake dropdown 
            setTimeout( () => {
                //update_dynamic_text(); //update dynamic text
            }, 1500) 
        
        for(let j=0; j<langOptions.length; j++) {       
                 
            //console.log(langOptions[j]);
            //await animate_lang_option_hover(langOptions[j]);


            if(j==0) await cursor.move(langOptionToSelect, 300, 0);
            //langOptions[j].style.backgroundColor = 'red';
            langOptions[j].style.transition = 'all 0.5s ease-in-out';
            langOptions[j].style.backgroundColor = 'rgb(184, 179, 179)';
            langOptions[j].style.transition = 'all 1s ease-in-out';
            
            
            
            if(langOptions[j].getAttribute('title') == langOptionToSelect.getAttribute('title')) {
                await cursor.move(langOptionToSelect, 1000, 0);
                //'click' on next language                
                cursor.click(function() {
                    toggle_list(true);   //close fake dropdown   
                    update_dynamic_text(); //update dynamic text                    
                    launch_backend_animation(); //launch 'backend' animation          
                    update_fake_website(); //and update fake website                
                    setTimeout(update_world_map, 300); //update world map after 500ms
                    langOptions[j].style.backgroundColor = 'white'; 
                });
                break;
            } 
            

            //move cursor to next language option
            await cursor.move(langOptionToSelect, 200, 0); 
            langOptions[j].style.backgroundColor = '#fff';
        }
           

        
        //move cursor to next language option
        //await cursor.move(langOptionToSelect, 1000, 0);            
        

        

        //--animation cycle ends--         
    }
    //upon completion of animation loop, resart animation after 1s       
    setTimeout(start_animation, 2000);
}



//** Utility Functions **//

/** 
 * Shuffle an array
 */ 
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

/**
 * Return a random integer between 0 and the provided 'max' value 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



//** Setup **//

//array holds all html (svg) country elements
//const svg_countries = document.getElementsByClassName('svg-country');

/**
 * Set first language to be displayed and launch homepage animation
 */
function initialize_landing_page() {
    //console.log(window.navigator.language); <-- USE THIS IN THE FUTURE??
    set_homepage_panels_hover_animations();
    set_language('English');
    update_dynamic_text();

    //siteTran_Call();

    update_fake_website();
    setTimeout(update_world_map, 1700);
    setTimeout(start_animation, 1500);
}


window.addEventListener('load', function () {
    console.log('page is fully loaded');
    initialize_landing_page();
});



/*
let countriesDictionary = {}
for (let i=0; i<svg_countries.length; i++) {
    let code = svg_countries[i].getAttribute('id');
    let name = svg_countries[i].getAttribute('title');
    countriesDictionary[code] = name;
}


console.log(countriesDictionary);
*/

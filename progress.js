class Bar {

    constructor(targetElem, props) {
        this.targetElem = targetElem;                  
        this.barProps = props || {};  
        this.barProps.totalAnimationColor = this.barProps.totalAnimationColor || '#3B5998';                   

        this.values = this.barProps.values || []; 
        this.totalValue = this.barProps.totalValue || {};        
        this.ttContentTotal = this.totalValue.tooltipContentTotal || 'Total'; 
        this.ttColorTotal = this.totalValue.color || '#d1d0d0';                   
         
        this.barTooltipOptions = {              
            animation: 'scale',         
            duration: 200,              
            arrow: true,                
            delay: [0, 50],             
            arrowType: 'sharp',         
            theme: 'light',             
            maxWidth: this.barProps.tooltipMaxWidth || 150,
            followCursor: false,
            inertia: false,                                                
        }
                        
        this.rects = [];
        this.generate_progress_bar(); 
        if(props) this.set_bar_values();           
    }


    generate_progress_bar() {                
        let xmlns = "http://www.w3.org/2000/svg";

        //generate outer div container
        this.outerSvgContainer = document.createElement('div');
        this.outerSvgContainer.setAttribute('class', 'outer-bar-container total');        
        this.targetElem.appendChild(this.outerSvgContainer);  
        this.barTooltipOptions.placement = 'right';   
        this.ttOuterTotal = tippy(this.outerSvgContainer, this.barTooltipOptions);
        this.ttOuterTotal.setContent(this.ttContentTotal);
        let totalTippy = this.ttOuterTotal;                                                                     

        //generate inner div container
        this.innerSvgContainer = document.createElement('div');        
        this.innerSvgContainer.setAttribute('class', 'inner-bar-container');                                                           
        this.outerSvgContainer.appendChild(this.innerSvgContainer);                     

        //generate svg bar
        this.innerSvgElem = document.createElementNS(xmlns, 'svg'); 
        this.innerSvgElem.setAttributeNS(null, 'class', 'svg-rect-container');       
        this.innerSvgElem.setAttributeNS(null, 'x', '0%');
        this.innerSvgElem.setAttributeNS(null, 'y', '0%');                
        this.innerSvgContainer.appendChild(this.innerSvgElem);                 
               
        //generate total rect bar
        this.totalRect = document.createElementNS(xmlns, 'rect'); 
        this.totalRect.setAttributeNS(null, 'class', 'svg-bar total');   
        this.totalRect.setAttributeNS(null, 'x', '0%');
        this.totalRect.setAttributeNS(null, 'y', '0%');        
        this.totalRect.setAttributeNS(null, 'width', `100%`)
        this.totalRect.setAttributeNS(null, 'fill', '#d1d0d0');         
        this.innerSvgElem.appendChild(this.totalRect);            
        
        //generate rect elements         
        for(let i=0; i<this.values.length; i++) {
            let value = this.values[i];
            let rect = document.createElementNS(xmlns, 'rect');
            rect.setAttributeNS(null, 'class', `svg-bar value`); 
            rect.setAttributeNS(null, 'x', '0%');
            rect.setAttributeNS(null, 'y', '0%');            
            rect.setAttributeNS(null, 'width', `0%`)                          
            rect.setAttributeNS(null, 'title', `${value.title}`)
            rect.setAttributeNS(null, 'fill', `${value.color}`);            
            this.innerSvgElem.appendChild(rect);  
            
            //add tooltip to rect
            //** Translation Progress-Bar Tooltips **// 
            this.barTooltipOptions.placement = 'top';
            value.tippyInstance = tippy(rect, this.barTooltipOptions);
            let ttContent = value.tooltipContent || value.title;
            value.tippyInstance.setContent(ttContent);
            
            //add
            rect.addEventListener( 'mouseover', function(e) {            
                e.stopPropagation();    
                totalTippy.hide();                
                
                for (let j=0; j<rects.length; j++) {                    
                    rects[j].style.opacity = '0.3';                    
                } 
                rect.style.opacity = '1';                
            });
            rect.addEventListener( 'mouseout', function() {    
                //totalTippy.show();

                for (let j=0; j<rects.length; j++) {
                    rects[j].style.opacity = '1';
                }                                       
            });                                                  
            this.rects.push(rect);
        }          

        let totalRect = this.totalRect;           
        let rects = this.rects;
        let barProps = this.barProps;

        this.outerSvgContainer.addEventListener( 'mouseover', function() {  
            if (barProps.totalAnimationActive && barProps.totalAnimationActive != false) {
                let headRect = rects[0];  
                let totalRectValue = parseInt(totalRect.getAttribute('value'));             
                let headRectValue = parseInt(headRect.getAttribute('value'));             
                let headProgressPercent = (headRectValue/totalRectValue)*100;
                let headProgressPercentBuffer = (headProgressPercent< 2) ? 2 - headProgressPercent : 0;             
                let totalProgressPercent = headProgressPercent + headProgressPercentBuffer;             
    
                for (let i=1; i<rects.length; i++) {
                    let rect = rects[i];                
                    let rectValue = parseInt(rect.getAttribute('value'));                          
                    let rectProgressPercent = (rectValue/totalRectValue)*100;
                    let rectProgressBuffer = (rectProgressPercent < 2) ? 2 - rectProgressPercent : 0;  
                    totalProgressPercent += (rectProgressPercent + rectProgressBuffer);
                }                                          
                headRect.setAttribute('width', `${totalProgressPercent}%`);           
                headRect.setAttribute('fill', barProps.totalAnimationColor);
                
                for (let i=1; i<rects.length; i++) {
                    let rect = rects[i];
                    rect.setAttribute('width', '0%');
                    rect.setAttribute('x', `${totalProgressPercent}%`)
                }
            }                                    
        }); 

        let value = this.values[0] || {};
        let headColor = value.color || '';     
        this.outerSvgContainer.addEventListener('mouseout', function() {
            let headRect = rects[0];
            let headRectValue = parseInt(headRect.getAttribute('value'));             
            let totalRectValue = parseInt(totalRect.getAttribute('value'));                                   
            
            let headRectPercent = (headRectValue/totalRectValue)*100;
            let headBuffer = (headRectPercent < 2) ? 2 - headRectPercent : 0;            
            
            let acc = 0;
            for (let i=1; i<rects.length; i++) {
                let rect = rects[i];
                let rectValue = parseInt(rect.getAttribute('value'));                          
                let rectProgressPercent = (rectValue/totalRectValue)*100;
                let rectProgressBuffer = (rectProgressPercent < 2) ? 2 - rectProgressPercent : 0;
                rect.setAttribute('width', `${rectProgressBuffer + rectProgressPercent}%`);
                rect.setAttribute('x', `${headBuffer + headRectPercent + acc}%`);

                acc += rectProgressBuffer + rectProgressPercent;
            }
            headRect.setAttribute('width', `${headBuffer + headRectPercent}%`);
            headRect.setAttribute('fill', `${headColor}`);
        });

        
        this.totalRect.addEventListener( 'mouseover', function(e) { 
            totalTippy.show();
            if(barProps.totalAnimationActive != false) {
                let headRect = rects[0];  
                let totalRectValue = parseInt(totalRect.getAttribute('value'));
                let headRectValue = parseInt(headRect.getAttribute('value'));           
                let headProgressPercent = (headRectValue/totalRectValue)*100;
                let headProgressPercentBuffer = (headProgressPercent< 2) ? 2 - headProgressPercent : 0;
                let totalProgressPercent = headProgressPercent + headProgressPercentBuffer;         
    
                for (let i=1; i<rects.length; i++) {
                    let rect = rects[i];         
                    let rectValue = parseInt(rect.getAttribute('value'));                                        
                    let rectProgressPercent = (rectValue/totalRectValue)*100;                              
                    let rectProgressBuffer = (rectProgressPercent < 2) ? 2 - rectProgressPercent : 0;  
                    totalProgressPercent += (rectProgressPercent + rectProgressBuffer);                
                }            
                               
                headRect.setAttribute('width', `${totalProgressPercent}%`);           
                headRect.setAttribute('fill', barProps.totalAnimationColor);
                
                for (let i=1; i<rects.length; i++) {
                    let rect = rects[i];
                    rect.setAttribute('width', '0%');
                    rect.setAttribute('x', `${totalProgressPercent}%`)
                }                
            }            
        });
        this.totalRect.addEventListener('mouseout', function() {
            let headRect = rects[0];
            let headRectValue = parseInt(headRect.getAttribute('value'));             
            let totalRectValue = parseInt(totalRect.getAttribute('value'));                                   
            
            let headRectPercent = (headRectValue/totalRectValue)*100;
            let headBuffer = (headRectPercent < 2) ? 2 - headRectPercent : 0;            
                        
            for (let i=1; i<rects.length; i++) {
                let rect = rects[i];
                let rectValue = parseInt(rect.getAttribute('value'));                          
                let rectProgressPercent = (rectValue/totalRectValue)*100;
                let rectProgressBuffer = (rectProgressPercent < 2) ? 2 - rectProgressPercent : 0;
                rect.setAttribute('width', `${rectProgressBuffer + rectProgressPercent}%`);
                rect.setAttribute('x', `${headBuffer + headRectPercent}%`);                
            }
            headRect.setAttribute('width', `${headBuffer + headRectPercent}%`);
            headRect.setAttribute('fill', `${headColor}`);
        });                                      
    }


    set_bar_values(customValues, customTotal) {    
        let totalValue = customTotal || this.barProps.totalValue.numVal;
        let values = customValues || this.values;        
        let x = 0;        
        for (let i=0; i<values.length; i++) {                     
            let value_percent = (values[i].numVal/totalValue)*100;                
            let value_buffer = (value_percent < 2) ? 2 - value_percent : 0;

            let rect = this.rects[i];
            rect.setAttribute('width', `${value_buffer + value_percent}%`);
            rect.setAttribute('x', `${x}%`);                                  
            rect.setAttribute('value', values[i].numVal);

            x += value_percent + value_buffer;
        }
        x = (x > 100) ? 100 : x;
        this.totalRect.setAttribute('value', this.barProps.totalValue.numVal);
        this.totalRect.setAttribute('x', `${x}%`);
        this.totalRect.setAttribute('width', `${100 - x}%`);
    }  
    
    //customTooltip: { title: 'title1', tooltipContent: 'i am a tooltip' }
    set_bar_tooltips(customTooltips) {
        for (let i=0; i < customTooltips.length; i++) {
            let customTooltip = customTooltips[i];                       
            if (customTooltip.title == this.barProps.totalValue.title) {
                this.ttOuterTotal.setContent(customTooltip.tooltipContent)
                this.barProps.totalValue.tooltipContentTotal = customTooltip.tooltipContent;
            }

            for (let j=0; j < this.values.length; j++) {                
                let customContent = customTooltip.tooltipContent;
                let title = customTooltip.title;
                let value = this.values[j];                
                if (title == value.title) {
                    value.tooltipContent = customContent;
                    value.tippyInstance.setContent(customContent);                    
                }
            }
        }        
    }
}
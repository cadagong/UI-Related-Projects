


//set up bar and update values
const element = document.getElementById('bars-container');

/*
//demo bars
const bar1 = new Bar(element, [
    { title: 'Your Words', numVal: 500, color:  '#f6921e', tooltipContent: 'content1' },
    { title: 'Other Words', numVal: 500, color: '#29b191', tooltipContent: 'content2' }
    ],
    {
        tooltipContentTotal: 'Total Words'
    }
);
const bar6 = new Bar(element, [
    { title: 'a', color: '#f6921e' },
    { title: 'b', color: '#29b191' },
    { title: 'c', color: '#a03f5c' }
    ],
    {
        tooltipContentTotal: 'd'
    }
);
*/

const bar7 = new Bar(element, {
    values: [{ title: '1', numVal: 100, color: '#ef5350' },
             { title: '2', numVal: 100, color: '#ec407a' },
             { title: '3', numVal: 100, color: '#ab47bc' },
             { title: '4', numVal: 100, color: '#7e57c2' },
             { title: '5', numVal: 100, color: '#42a5f5' },
             { title: '6', numVal: 100, color: '#26c6da' },
             { title: '7', numVal: 100, color: '#26a69a' },
             { title: '8', numVal: 100, color: '#66bb6a' },
             { title: '9', numVal: 100, color: '#9ccc65' },
             { title:'10', numVal: 100, color: '#d4e157' },
             { title:'11', numVal: 100, color: '#ffca28' },
             { title:'12', numVal: 100, color: '#ffa726' },
             { title:'13', numVal: 100, color: '#ff7043' },
             { title:'14', numVal: 100, color: '#8d6e63' },
             { title:'15', numVal: 100, color: '#bdbdbd' },
             { title:'16', numVal: 100, color: '#78909c' }],
    totalValue: { title: 'Total', numVal: 1700, tooltipContentTotal: 'Total', color: '#d1d0d0' },
    totalAnimationActive: true,
    //totalAnimationColor: 'green',
    tooltipsAreActive: true,    
    onHoverAnimation: () => {},
    shouldSort: true,
    sorter: () => {}
});


const bar8 = new Bar(element, {
    values: [{ title: '1', numVal: 100, color: 'red' },
             { title: '2', numVal: 100, color: 'orange' },
             { title: '3', numVal: 100, color: 'yellow' },
             { title: '4', numVal: 100, color: 'green' },
             { title: '5', numVal: 100, color: 'blue'},
             { title: '6', numVal: 100, color: 'purple'},
             { title: '7', numVal: 100, color: 'pink'}],
    totalValue: { title: 'Title', numVal: 800, tooltipContentTotal: 'Total' },
    totalAnimationColor: 'green',
});

const bar9 = new Bar(element, {
    values: [{ title: 'title1', numVal: 65, color: '#be6262'}],
    totalValue: { title: 'total', numVal: 100, color: 'grey'},
    totalAnimationActive: false
})


let your = 100;
let other = 150;
let total = 400;

let stBar = new Bar(element, {
    values: [{ title: 'your words', numVal: your, color: '#f6921e', tooltipContent: `You translated ${your}/${total} words`},
             { title: 'other words', numVal: other, color: '#29b191', tooltipContent: `Other translators did ${other}/${total} words`}],
    totalValue: { tooltipContentTotal: `Translated / Total: ${(your+other)}/${total} words`, numVal: total, tooltipMaxWidth: '120px'}    
});

//let username = 'ece.baris@mail.mcgill.ca';
//let password ='Ananami123';




//get refence to each individual country (256 countries)
const svg_countries = document.getElementsByClassName('svg-country');

//let linear_gradients = [];

//color palette for generating colors to represent languages on the map
const color_palette_array = [    
    ['#ba6b6c', '#dfcccb'], //light red
    ['#9c64a6', '#ffc4ff'], //purple
    ['#836fa9', '#e6ceff'], //dark purple
    ['#000075', 'beige'],// Navy
    ['#4363d8', 'beige'],//Blue
    ['#42d4f4', 'beige'],//Cyan
    //['#5d99c6', '#c3fdff'], //conflicting blue
    ['#4f9a94', '#b2fef7'], //teal
    ['#75a478', '#d7ffd9'], //salad green
    ['#b3bc6d', '#ffffce'], //yellow
    ['#ca9b52', '#ffffb0'], //orange
    ['#f032e6', 'white'],//Magenta
    ['#c97b63', '#ffddc1'], //salmon red
    ['#9A6324', 'beige'],//Brown  
    ['#800000', 'beige'], //Maroon
    ['#8c7b75', '#efdcd5'], //ash     
    ['#808000', '#efdcd5'] //olive
];
let primary_color;
let secondary_color;
let data_by_country = [
    {
        "country": "China",
        "population": 1427647786,
        "internetUsers": 904080566,
        "gdpNominalX1m": 14140163,
        "gdpPppX1m": 27804953,
        "gdpPerCapita": 9904.517864044094,
        "nominalGdpPerInternetUsers": 15640.37933318434
    },
    {
        "country": "India",
        "population": 1366696635,
        "internetUsers": 633740000,
        "gdpNominalX1m": 2935570,
        "gdpPppX1m": 11321280,
        "gdpPerCapita": 2147.9309488458644,
        "nominalGdpPerInternetUsers": 4632.136207277433
    },
    {
        "country": "United States",
        "population": 324459463,
        "internetUsers": 246390854,
        "gdpNominalX1m": 21439453,
        "gdpPppX1m": 20289987,
        "gdpPerCapita": 66077.44709236606,
        "nominalGdpPerInternetUsers": 87013.99687506257
    },
    {
        "country": "Indonesia",
        "population": 269603400,
        "internetUsers": 171176716,
        "gdpNominalX1m": 1111713,
        "gdpPppX1m": 3778134,
        "gdpPerCapita": 4123.512537304797,
        "nominalGdpPerInternetUsers": 6494.533987905224
    },
    {
        "country": "Pakistan",
        "population": 220892341,
        "internetUsers": 82000000,
        "gdpNominalX1m": 284214,
        "gdpPppX1m": 1190555,
        "gdpPerCapita": 1286.66299027543,
        "nominalGdpPerInternetUsers": 3466.0243902439024
    },
    {
        "country": "Brazil",
        "population": 212011902,
        "internetUsers": 150410801,
        "gdpNominalX1m": 1847020,
        "gdpPppX1m": 3316920,
        "gdpPerCapita": 8711.869393068318,
        "nominalGdpPerInternetUsers": 12279.83620670965
    },
    {
        "country": "Nigeria",
        "population": 206139587,
        "internetUsers": 136203231,
        "gdpNominalX1m": 446543,
        "gdpPppX1m": 1181399,
        "gdpPerCapita": 2166.2166229138707,
        "nominalGdpPerInternetUsers": 3278.5051919950415
    },
    {
        "country": "Bangladesh",
        "population": 169232698,
        "internetUsers": 103476000,
        "gdpNominalX1m": 317465,
        "gdpPppX1m": 860916,
        "gdpPerCapita": 1875.908165217575,
        "nominalGdpPerInternetUsers": 3068.0061076964707
    },
    {
        "country": "Russia",
        "population": 146748590,
        "internetUsers": 118446612,
        "gdpNominalX1m": 1637892,
        "gdpPppX1m": 4176350,
        "gdpPerCapita": 11161.211157122532,
        "nominalGdpPerInternetUsers": 13828.103415908596
    },
    {
        "country": "Mexico",
        "population": 129163276,
        "internetUsers": 80630752,
        "gdpNominalX1m": 1274175,
        "gdpPppX1m": 2458339,
        "gdpPerCapita": 9864.839600383008,
        "nominalGdpPerInternetUsers": 15802.593531559769
    },
    {
        "country": "Japan",
        "population": 127484450,
        "internetUsers": 116505120,
        "gdpNominalX1m": 5154475,
        "gdpPppX1m": 5451452,
        "gdpPerCapita": 40432.18604308212,
        "nominalGdpPerInternetUsers": 44242.47621048758
    },
    {
        "country": "Ethiopia",
        "population": 104957438,
        "internetUsers": 19543075,
        "gdpNominalX1m": 91166,
        "gdpPppX1m": 253102,
        "gdpPerCapita": 868.5997080073544,
        "nominalGdpPerInternetUsers": 4664.874898141669
    },
    {
        "country": "Philippines",
        "population": 109109320,
        "internetUsers": 73003313,
        "gdpNominalX1m": 356814,
        "gdpPppX1m": 1040413,
        "gdpPerCapita": 3270.243091974178,
        "nominalGdpPerInternetUsers": 4887.641195133157
    },
    {
        "country": "Egypt",
        "population": 100856372,
        "internetUsers": 54740141,
        "gdpNominalX1m": 302256,
        "gdpPppX1m": 1427432,
        "gdpPerCapita": 2996.8954266964906,
        "nominalGdpPerInternetUsers": 5521.651834985226
    },
    {
        "country": "Vietnam",
        "population": 97338579,
        "internetUsers": 68172134,
        "gdpNominalX1m": 261637,
        "gdpPppX1m": 1035051,
        "gdpPerCapita": 2687.9065082715047,
        "nominalGdpPerInternetUsers": 3837.8877797781715
    },
    {
        "country": "Germany",
        "population": 83166711,
        "internetUsers": 77794405,
        "gdpNominalX1m": 3863344,
        "gdpPppX1m": 4160925,
        "gdpPerCapita": 46453.00930561027,
        "nominalGdpPerInternetUsers": 49660.94926749552
    },
    {
        "country": "Democratic Republic of the Congo",
        "population": 89561404,
        "internetUsers": 7011507,
        "gdpNominalX1m": 48994,
        "gdpPppX1m": 81806,
        "gdpPerCapita": 547.0436796636194,
        "nominalGdpPerInternetUsers": 6987.656148671034
    },
    {
        "country": "Iran",
        "population": 83748478,
        "internetUsers": 58428556,
        "gdpNominalX1m": 458500,
        "gdpPppX1m": 1411093,
        "gdpPerCapita": 5474.726358609168,
        "nominalGdpPerInternetUsers": 7847.190336177398
    },
    {
        "country": "Turkey",
        "population": 83154997,
        "internetUsers": 62075879,
        "gdpNominalX1m": 743708,
        "gdpPppX1m": 2257987,
        "gdpPerCapita": 8943.635702373966,
        "nominalGdpPerInternetUsers": 11980.627773309501
    },
    {
        "country": "Thailand",
        "population": 69037513,
        "internetUsers": 36513941,
        "gdpNominalX1m": 529177,
        "gdpPppX1m": 1293924,
        "gdpPerCapita": 7665.064643913231,
        "nominalGdpPerInternetUsers": 14492.464672602719
    },
    {
        "country": "United Kingdom",
        "population": 66796807,
        "internetUsers": 65001016,
        "gdpNominalX1m": 2743586,
        "gdpPppX1m": 2975557,
        "gdpPerCapita": 41073.610000549874,
        "nominalGdpPerInternetUsers": 42208.35563554883
    },
    {
        "country": "France",
        "population": 67117000,
        "internetUsers": 58038536,
        "gdpNominalX1m": 2707074,
        "gdpPppX1m": 2860018,
        "gdpPerCapita": 40333.656152688585,
        "nominalGdpPerInternetUsers": 46642.699602209126
    },
    {
        "country": "Italy",
        "population": 59359900,
        "internetUsers": 36387619,
        "gdpNominalX1m": 1988636,
        "gdpPppX1m": 2244767,
        "gdpPerCapita": 33501.33676101206,
        "nominalGdpPerInternetUsers": 54651.44614161207
    },
    {
        "country": "Tanzania",
        "population": 57637628,
        "internetUsers": 9169603,
        "gdpNominalX1m": 62224,
        "gdpPppX1m": 198652,
        "gdpPerCapita": 1079.572532027168,
        "nominalGdpPerInternetUsers": 6785.89901874705
    },
    {
        "country": "South Africa",
        "population": 56717156,
        "internetUsers": 31858027,
        "gdpNominalX1m": 358839,
        "gdpPppX1m": 762826,
        "gdpPerCapita": 6326.815822711562,
        "nominalGdpPerInternetUsers": 11263.69187897292
    },
    {
        "country": "Myanmar",
        "population": 53370609,
        "internetUsers": 16374103,
        "gdpNominalX1m": 65994,
        "gdpPppX1m": 366079,
        "gdpPerCapita": 1236.5232707012956,
        "nominalGdpPerInternetUsers": 4030.3887180873353
    },
    {
        "country": "South Korea",
        "population": 50982212,
        "internetUsers": 49421084,
        "gdpNominalX1m": 1629532,
        "gdpPppX1m": 2307718,
        "gdpPerCapita": 31962.75595103641,
        "nominalGdpPerInternetUsers": 32972.40505691862
    },
    {
        "country": "Kenya",
        "population": 49699862,
        "internetUsers": 8861485,
        "gdpNominalX1m": 98607,
        "gdpPppX1m": 194401,
        "gdpPerCapita": 1984.0497746251287,
        "nominalGdpPerInternetUsers": 11127.593174281736
    },
    {
        "country": "Colombia",
        "population": 50372424,
        "internetUsers": 30548252,
        "gdpNominalX1m": 327895,
        "gdpPppX1m": 771957,
        "gdpPerCapita": 6509.41475439022,
        "nominalGdpPerInternetUsers": 10733.674712386162
    },
    {
        "country": "Spain",
        "population": 47329981,
        "internetUsers": 39215756,
        "gdpNominalX1m": 1397870,
        "gdpPppX1m": 1780996,
        "gdpPerCapita": 29534.556542501043,
        "nominalGdpPerInternetUsers": 35645.62162208476
    },
    {
        "country": "Argentina",
        "population": 45376763,
        "internetUsers": 33561876,
        "gdpNominalX1m": 445469,
        "gdpPppX1m": 864887,
        "gdpPerCapita": 9817.117188372384,
        "nominalGdpPerInternetUsers": 13273.066142071439
    },
    {
        "country": "Ukraine",
        "population": 44222947,
        "internetUsers": 25260147,
        "gdpNominalX1m": 150401,
        "gdpPppX1m": 380545,
        "gdpPerCapita": 3400.9718981414785,
        "nominalGdpPerInternetUsers": 5954.082531665394
    },
    {
        "country": "Uganda",
        "population": 42862958,
        "internetUsers": 10162807,
        "gdpNominalX1m": 30666,
        "gdpPppX1m": 123653,
        "gdpPerCapita": 715.4429239344611,
        "nominalGdpPerInternetUsers": 3017.47342048314
    },
    {
        "country": "Algeria",
        "population": 43900000,
        "internetUsers": 19704622,
        "gdpNominalX1m": 172781,
        "gdpPppX1m": 638363,
        "gdpPerCapita": 3935.7858769931663,
        "nominalGdpPerInternetUsers": 8768.551865648576
    },
    {
        "country": "Sudan",
        "population": 40533330,
        "internetUsers": 12512639,
        "gdpNominalX1m": 30873,
        "gdpPppX1m": 163606,
        "gdpPerCapita": 761.6694705320289,
        "nominalGdpPerInternetUsers": 2467.345217903274
    },
    {
        "country": "Iraq",
        "population": 38274618,
        "internetUsers": 18892351,
        "gdpNominalX1m": 224462,
        "gdpPppX1m": 679098,
        "gdpPerCapita": 5864.513135049448,
        "nominalGdpPerInternetUsers": 11881.104686229892
    },
    {
        "country": "Poland",
        "population": 38170712,
        "internetUsers": 29005924,
        "gdpNominalX1m": 565854,
        "gdpPppX1m": 1236132,
        "gdpPerCapita": 14824.297749541585,
        "nominalGdpPerInternetUsers": 19508.22183771839
    },
    {
        "country": "Canada",
        "population": 36624199,
        "internetUsers": 33950632,
        "gdpNominalX1m": 1730914,
        "gdpPppX1m": 1797170,
        "gdpPerCapita": 47261.484135120605,
        "nominalGdpPerInternetUsers": 50983.262991982
    },
    {
        "country": "Morocco",
        "population": 35739580,
        "internetUsers": 22072765,
        "gdpNominalX1m": 119040,
        "gdpPppX1m": 317001,
        "gdpPerCapita": 3330.7610218139107,
        "nominalGdpPerInternetUsers": 5393.07150690002
    },
    {
        "country": "Saudi Arabia",
        "population": 32938213,
        "internetUsers": 27048861,
        "gdpNominalX1m": 779289,
        "gdpPppX1m": 1869288,
        "gdpPerCapita": 23659.11593321714,
        "nominalGdpPerInternetUsers": 28810.41830190188
    },
    {
        "country": "Afghanistan",
        "population": 32225560,
        "internetUsers": 4068194,
        "gdpNominalX1m": 18734,
        "gdpPppX1m": 74792,
        "gdpPerCapita": 581.3397812171456,
        "nominalGdpPerInternetUsers": 4604.991797342998
    },
    {
        "country": "Peru",
        "population": 32165485,
        "internetUsers": 15674241,
        "gdpNominalX1m": 228989,
        "gdpPppX1m": 457320,
        "gdpPerCapita": 7119.090540683593,
        "nominalGdpPerInternetUsers": 14609.256039893733
    },
    {
        "country": "Venezuela",
        "population": 31977065,
        "internetUsers": 20564451,
        "gdpNominalX1m": 70140,
        "gdpPerCapita": 2193.4470846527033,
        "nominalGdpPerInternetUsers": 3410.7402137795943
    },
    {
        "country": "Uzbekistan",
        "population": 31910641,
        "internetUsers": 16692456,
        "gdpNominalX1m": 60490,
        "gdpPppX1m": 310738,
        "gdpPerCapita": 1895.605920294738,
        "nominalGdpPerInternetUsers": 3623.7926881460703
    },
    {
        "country": "Malaysia",
        "population": 31624264,
        "internetUsers": 25343685,
        "gdpNominalX1m": 365303,
        "gdpPppX1m": 1064795,
        "gdpPerCapita": 11551.351835413467,
        "nominalGdpPerInternetUsers": 14413.965451354055
    },
    {
        "country": "Angola",
        "population": 29784193,
        "internetUsers": 4271053,
        "gdpNominalX1m": 91527,
        "gdpPppX1m": 199329,
        "gdpPerCapita": 3073.0058726116904,
        "nominalGdpPerInternetUsers": 21429.609981426125
    },
    {
        "country": "Mozambique",
        "population": 29668834,
        "internetUsers": 6162217,
        "gdpNominalX1m": 15093,
        "gdpPppX1m": 45990,
        "gdpPerCapita": 508.7156441672093,
        "nominalGdpPerInternetUsers": 2449.2808351280064
    },
    {
        "country": "Nepal",
        "population": 29304998,
        "internetUsers": 6271270,
        "gdpNominalX1m": 29813,
        "gdpPppX1m": 97365,
        "gdpPerCapita": 1017.3349952113971,
        "nominalGdpPerInternetUsers": 4753.901522339175
    },
    {
        "country": "Ghana",
        "population": 28833629,
        "internetUsers": 4065541,
        "gdpNominalX1m": 67077,
        "gdpPppX1m": 209179,
        "gdpPerCapita": 2326.346087063824,
        "nominalGdpPerInternetUsers": 16498.91121501419
    },
    {
        "country": "Yemen",
        "population": 28250420,
        "internetUsers": 7548512,
        "gdpNominalX1m": 29855,
        "gdpPppX1m": 70414,
        "gdpPerCapita": 1056.7984475983012,
        "nominalGdpPerInternetUsers": 3955.084127838705
    },
    {
        "country": "Madagascar",
        "population": 25570895,
        "internetUsers": 2505948,
        "gdpNominalX1m": 12550,
        "gdpPppX1m": 53409,
        "gdpPerCapita": 490.7923637401037,
        "nominalGdpPerInternetUsers": 5008.08476472776
    },
    {
        "country": "Australia",
        "population": 24450561,
        "internetUsers": 21159515,
        "gdpNominalX1m": 1376255,
        "gdpPppX1m": 1279361,
        "gdpPerCapita": 56287.256558244204,
        "nominalGdpPerInternetUsers": 65041.89722685043
    },
    {
        "country": "Côte d'Ivoire",
        "population": 24294750,
        "internetUsers": 10650818,
        "gdpNominalX1m": 44439,
        "gdpPppX1m": 163594,
        "gdpPerCapita": 1829.1606211218473,
        "nominalGdpPerInternetUsers": 4172.3555880872245
    },
    {
        "country": "Cameroon",
        "population": 24053727,
        "internetUsers": 5580465,
        "gdpNominalX1m": 38632,
        "gdpPppX1m": 100013,
        "gdpPerCapita": 1606.0712753578687,
        "nominalGdpPerInternetUsers": 6922.720597656288
    },
    {
        "country": "Taiwan",
        "population": 23626456,
        "internetUsers": 21920626,
        "gdpNominalX1m": 586104,
        "gdpPppX1m": 1293972,
        "gdpPerCapita": 24807.106067875775,
        "nominalGdpPerInternetUsers": 26737.557586174775
    },
    {
        "country": "Niger",
        "population": 21477348,
        "internetUsers": 2194985,
        "gdpNominalX1m": 9443,
        "gdpPppX1m": 35211,
        "gdpPerCapita": 439.6725331265294,
        "nominalGdpPerInternetUsers": 4302.079513071843
    },
    {
        "country": "Sri Lanka",
        "population": 20876917,
        "internetUsers": 7121116,
        "gdpNominalX1m": 86566,
        "gdpPppX1m": 304458,
        "gdpPerCapita": 4146.49346931829,
        "nominalGdpPerInternetUsers": 12156.240679129507
    },
    {
        "country": "Romania",
        "population": 19679306,
        "internetUsers": 12545558,
        "gdpNominalX1m": 243698,
        "gdpPppX1m": 525051,
        "gdpPerCapita": 12383.465148618554,
        "nominalGdpPerInternetUsers": 19425.042712328937
    },
    {
        "country": "Burkina Faso",
        "population": 19193382,
        "internetUsers": 3047909,
        "gdpNominalX1m": 14593,
        "gdpPppX1m": 48553,
        "gdpPerCapita": 760.314154118331,
        "nominalGdpPerInternetUsers": 4787.872603808053
    },
    {
        "country": "Malawi",
        "population": 18622104,
        "internetUsers": 2566126,
        "gdpNominalX1m": 7522,
        "gdpPppX1m": 25570,
        "gdpPerCapita": 403.9285786396639,
        "nominalGdpPerInternetUsers": 2931.2668201015854
    },
    {
        "country": "Mali",
        "population": 18541980,
        "internetUsers": 2358540,
        "gdpNominalX1m": 17647,
        "gdpPppX1m": 48443,
        "gdpPerCapita": 951.7322314013929,
        "nominalGdpPerInternetUsers": 7482.1711736922
    },
    {
        "country": "Syria",
        "population": 18269868,
        "internetUsers": 6257430,
        "gdpNominalX1m": 40000,
        "gdpPerCapita": 2189.397318032073,
        "nominalGdpPerInternetUsers": 6392.40071403116
    },
    {
        "country": "Kazakhstan",
        "population": 18204499,
        "internetUsers": 13913699,
        "gdpNominalX1m": 170326,
        "gdpPppX1m": 530646,
        "gdpPerCapita": 9356.25858201316,
        "nominalGdpPerInternetUsers": 12241.604479153963
    },
    {
        "country": "Chile",
        "population": 18054726,
        "internetUsers": 14864456,
        "gdpNominalX1m": 294237,
        "gdpPppX1m": 475964,
        "gdpPerCapita": 16296.951834107036,
        "nominalGdpPerInternetUsers": 19794.66991593907
    },
    {
        "country": "Zambia",
        "population": 17094130,
        "internetUsers": 4760715,
        "gdpNominalX1m": 23946,
        "gdpPppX1m": 73662,
        "gdpPerCapita": 1400.8317475063077,
        "nominalGdpPerInternetUsers": 5029.916724693665
    },
    {
        "country": "Netherlands",
        "population": 17035938,
        "internetUsers": 15877494,
        "gdpNominalX1m": 902355,
        "gdpPppX1m": 935911,
        "gdpPerCapita": 52967.732096700514,
        "nominalGdpPerInternetUsers": 56832.33134901515
    },
    {
        "country": "Guatemala",
        "population": 16913503,
        "internetUsers": 6883796,
        "gdpNominalX1m": 81318,
        "gdpPppX1m": 150731,
        "gdpPerCapita": 4807.8745130444,
        "nominalGdpPerInternetUsers": 11812.959012730766
    },
    {
        "country": "Ecuador",
        "population": 16624858,
        "internetUsers": 9521056,
        "gdpNominalX1m": 107914,
        "gdpPppX1m": 192056,
        "gdpPerCapita": 6491.123112149288,
        "nominalGdpPerInternetUsers": 11334.246957480345
    },
    {
        "country": "Zimbabwe",
        "population": 16529904,
        "internetUsers": 4472992,
        "gdpNominalX1m": 12818,
        "gdpPppX1m": 37039,
        "gdpPerCapita": 775.4430999720264,
        "nominalGdpPerInternetUsers": 2865.6433993175037
    },
    {
        "country": "Cambodia",
        "population": 16005373,
        "internetUsers": 5441827,
        "gdpNominalX1m": 26730,
        "gdpPppX1m": 76218,
        "gdpPerCapita": 1670.064171575383,
        "nominalGdpPerInternetUsers": 4911.953283336644
    },
    {
        "country": "Senegal",
        "population": 15850567,
        "internetUsers": 4698108,
        "gdpNominalX1m": 23940,
        "gdpPppX1m": 66438,
        "gdpPerCapita": 1510.3560648650614,
        "nominalGdpPerInternetUsers": 5095.668298813054
    },
    {
        "country": "Chad",
        "population": 14899994,
        "internetUsers": 968500,
        "gdpNominalX1m": 11026,
        "gdpPppX1m": 32065,
        "gdpPerCapita": 740.0002979866972,
        "nominalGdpPerInternetUsers": 11384.615384615385
    },
    {
        "country": "Somalia",
        "population": 14742523,
        "internetUsers": 294851,
        "gdpNominalX1m": 4958,
        "gdpPppX1m": 12417,
        "gdpPerCapita": 336.30607189827685,
        "nominalGdpPerInternetUsers": 16815.272798803464
    },
    {
        "country": "Guinea",
        "population": 12717176,
        "internetUsers": 1449758,
        "gdpNominalX1m": 13368,
        "gdpPppX1m": 34585,
        "gdpPerCapita": 1051.176770691858,
        "nominalGdpPerInternetUsers": 9220.84927277518
    },
    {
        "country": "South Sudan",
        "population": 13249924,
        "internetUsers": 1003542,
        "gdpNominalX1m": 3681,
        "gdpPppX1m": 23320,
        "gdpPerCapita": 277.8129142476591,
        "nominalGdpPerInternetUsers": 3668.007915961664
    },
    {
        "country": "Rwanda",
        "population": 12208407,
        "internetUsers": 2657770,
        "gdpNominalX1m": 10209,
        "gdpPppX1m": 32258,
        "gdpPerCapita": 836.2270360088748,
        "nominalGdpPerInternetUsers": 3841.1901707070215
    },
    {
        "country": "Tunisia",
        "population": 11532127,
        "internetUsers": 6400330,
        "gdpNominalX1m": 38732,
        "gdpPppX1m": 143234,
        "gdpPerCapita": 3358.6171917808397,
        "nominalGdpPerInternetUsers": 6051.56296628455
    },
    {
        "country": "Cuba",
        "population": 11484636,
        "internetUsers": 5638956,
        "gdpNominalX1m": 100023,
        "gdpPerCapita": 8709.287782390316,
        "nominalGdpPerInternetUsers": 17737.857858795138
    },
    {
        "country": "Belgium",
        "population": 11429336,
        "internetUsers": 10021242,
        "gdpNominalX1m": 517609,
        "gdpPppX1m": 536621,
        "gdpPerCapita": 45287.75774900659,
        "nominalGdpPerInternetUsers": 51651.182558010274
    },
    {
        "country": "Benin",
        "population": 11175692,
        "internetUsers": 1578008,
        "gdpNominalX1m": 14374,
        "gdpPppX1m": 42749,
        "gdpPerCapita": 1286.184336504621,
        "nominalGdpPerInternetUsers": 9108.95255283877
    },
    {
        "country": "Greece",
        "population": 11159773,
        "internetUsers": 7923438,
        "gdpNominalX1m": 214012,
        "gdpPppX1m": 293009,
        "gdpPerCapita": 19177.09258064658,
        "nominalGdpPerInternetUsers": 27009.992379570587
    },
    {
        "country": "Bolivia",
        "population": 11051601,
        "internetUsers": 4843916,
        "gdpNominalX1m": 42401,
        "gdpPppX1m": 91225,
        "gdpPerCapita": 3836.638691534376,
        "nominalGdpPerInternetUsers": 8753.454849340906
    },
    {
        "country": "Haiti",
        "population": 10981229,
        "internetUsers": 1353986,
        "gdpNominalX1m": 8819,
        "gdpPppX1m": 20135,
        "gdpPerCapita": 803.0977224862536,
        "nominalGdpPerInternetUsers": 6513.361290293991
    },
    {
        "country": "Burundi",
        "population": 10864245,
        "internetUsers": 607311,
        "gdpNominalX1m": 3573,
        "gdpPppX1m": 8281,
        "gdpPerCapita": 328.8769721227752,
        "nominalGdpPerInternetUsers": 5883.311845166644
    },
    {
        "country": "Dominican Republic",
        "population": 10766998,
        "internetUsers": 6997472,
        "gdpNominalX1m": 89475,
        "gdpPppX1m": 198725,
        "gdpPerCapita": 8310.115781576258,
        "nominalGdpPerInternetUsers": 12786.76070443726
    },
    {
        "country": "Czech Republic",
        "population": 10618303,
        "internetUsers": 8358728,
        "gdpNominalX1m": 246953,
        "gdpPppX1m": 388587,
        "gdpPerCapita": 23257.29450365091,
        "nominalGdpPerInternetUsers": 29544.32779724379
    },
    {
        "country": "Portugal",
        "population": 10329506,
        "internetUsers": 7622142,
        "gdpNominalX1m": 236408,
        "gdpPppX1m": 321199,
        "gdpPerCapita": 22886.670475819465,
        "nominalGdpPerInternetUsers": 31015.953258283564
    },
    {
        "country": "Sweden",
        "population": 9910701,
        "internetUsers": 9554907,
        "gdpNominalX1m": 528929,
        "gdpPppX1m": 529778,
        "gdpPerCapita": 53369.48415656975,
        "nominalGdpPerInternetUsers": 55356.79206506144
    },
    {
        "country": "Azerbaijan",
        "population": 9827589,
        "internetUsers": 7763795,
        "gdpNominalX1m": 47171,
        "gdpPppX1m": 184418,
        "gdpPerCapita": 4799.854776181625,
        "nominalGdpPerInternetUsers": 6075.7657820692075
    },
    {
        "country": "Hungary",
        "population": 9721559,
        "internetUsers": 7461297,
        "gdpNominalX1m": 170407,
        "gdpPppX1m": 327410,
        "gdpPerCapita": 17528.772905662558,
        "nominalGdpPerInternetUsers": 22838.790628492607
    },
    {
        "country": "Jordan",
        "population": 9702353,
        "internetUsers": 6480202,
        "gdpNominalX1m": 44172,
        "gdpPppX1m": 93256,
        "gdpPerCapita": 4552.710048789196,
        "nominalGdpPerInternetUsers": 6816.454178434561
    },
    {
        "country": "Belarus",
        "population": 9468338,
        "internetUsers": 7048231,
        "gdpNominalX1m": 62572,
        "gdpPppX1m": 184593,
        "gdpPerCapita": 6608.551574732545,
        "nominalGdpPerInternetUsers": 8877.688600160807
    },
    {
        "country": "United Arab Emirates",
        "population": 9400145,
        "internetUsers": 8913217,
        "gdpNominalX1m": 405771,
        "gdpPppX1m": 722670,
        "gdpPerCapita": 43166.46179394041,
        "nominalGdpPerInternetUsers": 45524.64054224193
    },
    {
        "country": "Honduras",
        "population": 9265067,
        "internetUsers": 2977793,
        "gdpNominalX1m": 24449,
        "gdpPppX1m": 50496,
        "gdpPerCapita": 2638.8368265442655,
        "nominalGdpPerInternetUsers": 8210.443103331896
    },
    {
        "country": "Tajikistan",
        "population": 8921343,
        "internetUsers": 1959127,
        "gdpNominalX1m": 8152,
        "gdpPppX1m": 34692,
        "gdpPerCapita": 913.763768526779,
        "nominalGdpPerInternetUsers": 4161.037033331683
    },
    {
        "country": "Serbia",
        "population": 8790574,
        "internetUsers": 6182411,
        "gdpNominalX1m": 51523,
        "gdpPppX1m": 127096,
        "gdpPerCapita": 5861.16447003347,
        "nominalGdpPerInternetUsers": 8333.803753907658
    },
    {
        "country": "Austria",
        "population": 8735453,
        "internetUsers": 7681957,
        "gdpNominalX1m": 447718,
        "gdpPppX1m": 446265,
        "gdpPerCapita": 51252.980240406534,
        "nominalGdpPerInternetUsers": 58281.76335795683
    },
    {
        "country": "Switzerland",
        "population": 8476005,
        "internetUsers": 7942864,
        "gdpNominalX1m": 715360,
        "gdpPppX1m": 535832,
        "gdpPerCapita": 84398.25129881353,
        "nominalGdpPerInternetUsers": 90063.23160008783
    },
    {
        "country": "Israel",
        "population": 8321570,
        "internetUsers": 6788737,
        "gdpNominalX1m": 387717,
        "gdpPppX1m": 334675,
        "gdpPerCapita": 46591.808997580985,
        "nominalGdpPerInternetUsers": 57111.80150298944
    },
    {
        "country": "Papua New Guinea",
        "population": 8251162,
        "internetUsers": 924955,
        "gdpNominalX1m": 23587,
        "gdpPppX1m": 34502,
        "gdpPerCapita": 2858.6276696542864,
        "nominalGdpPerInternetUsers": 25500.70003405571
    },
    {
        "country": "Togo",
        "population": 7797694,
        "internetUsers": 963795,
        "gdpNominalX1m": 5502,
        "gdpPppX1m": 15217,
        "gdpPerCapita": 705.5932176871778,
        "nominalGdpPerInternetUsers": 5708.682863056978
    },
    {
        "country": "Sierra Leone",
        "population": 7557212,
        "internetUsers": 1000575,
        "gdpNominalX1m": 4229,
        "gdpPppX1m": 12868,
        "gdpPerCapita": 559.5979046240863,
        "nominalGdpPerInternetUsers": 4226.569722409614
    },
    {
        "country": "Hong Kong",
        "population": 7364883,
        "internetUsers": 6585678,
        "gdpNominalX1m": 372989,
        "gdpPppX1m": 461894,
        "gdpPerCapita": 50644.25327598551,
        "nominalGdpPerInternetUsers": 56636.38580568318
    },
    {
        "country": "Bulgaria",
        "population": 7084571,
        "internetUsers": 4492326,
        "gdpNominalX1m": 66250,
        "gdpPppX1m": 165130,
        "gdpPerCapita": 9351.307228059399,
        "nominalGdpPerInternetUsers": 14747.371406260365
    },
    {
        "country": "Laos",
        "population": 6858160,
        "internetUsers": 1749517,
        "gdpNominalX1m": 19127,
        "gdpPppX1m": 57912,
        "gdpPerCapita": 2788.9404738297153,
        "nominalGdpPerInternetUsers": 10932.731719668915
    },
    {
        "country": "Paraguay",
        "population": 6811297,
        "internetUsers": 4160340,
        "gdpNominalX1m": 40714,
        "gdpPppX1m": 95949,
        "gdpPerCapita": 5977.422508517834,
        "nominalGdpPerInternetUsers": 9786.219395530174
    },
    {
        "country": "El Salvador",
        "population": 6377853,
        "internetUsers": 1993079,
        "gdpNominalX1m": 26871,
        "gdpPppX1m": 52888,
        "gdpPerCapita": 4213.17330455876,
        "nominalGdpPerInternetUsers": 13482.154997368394
    },
    {
        "country": "Libya",
        "population": 6374616,
        "internetUsers": 1387116,
        "gdpNominalX1m": 33018,
        "gdpPppX1m": 34753,
        "gdpPerCapita": 5179.606112744674,
        "nominalGdpPerInternetUsers": 23803.34449317865
    },
    {
        "country": "Nicaragua",
        "population": 6217581,
        "internetUsers": 1732218,
        "gdpNominalX1m": 12528,
        "gdpPppX1m": 32991,
        "gdpPerCapita": 2014.931530445683,
        "nominalGdpPerInternetUsers": 7232.346044204598
    },
    {
        "country": "Lebanon",
        "population": 6082357,
        "internetUsers": 4755187,
        "gdpNominalX1m": 58565,
        "gdpPppX1m": 74628,
        "gdpPerCapita": 9628.668623035444,
        "nominalGdpPerInternetUsers": 12316.02458536331
    },
    {
        "country": "Kyrgyzstan",
        "population": 6045117,
        "internetUsers": 2309235,
        "gdpNominalX1m": 8261,
        "gdpPppX1m": 25187,
        "gdpPerCapita": 1366.557504180647,
        "nominalGdpPerInternetUsers": 3577.3751913512483
    },
    {
        "country": "Turkmenistan",
        "population": 5758075,
        "internetUsers": 1223591,
        "gdpNominalX1m": 46674,
        "gdpPppX1m": 124884,
        "gdpPerCapita": 8105.833980974545,
        "nominalGdpPerInternetUsers": 38145.09913851932
    },
    {
        "country": "Denmark",
        "population": 5733551,
        "internetUsers": 5567278,
        "gdpNominalX1m": 347176,
        "gdpPppX1m": 300621,
        "gdpPerCapita": 60551.654637762884,
        "nominalGdpPerInternetUsers": 62360.09769945025
    },
    {
        "country": "Singapore",
        "population": 5708844,
        "internetUsers": 4821119,
        "gdpNominalX1m": 362818,
        "gdpPppX1m": 576839,
        "gdpPerCapita": 63553.67216199987,
        "nominalGdpPerInternetUsers": 75255.97273164177
    },
    {
        "country": "Finland",
        "population": 5523231,
        "internetUsers": 4831170,
        "gdpNominalX1m": 269654,
        "gdpPppX1m": 251431,
        "gdpPerCapita": 48821.78565408544,
        "nominalGdpPerInternetUsers": 55815.46499088213
    },
    {
        "country": "Slovakia",
        "population": 5447662,
        "internetUsers": 4446926,
        "gdpNominalX1m": 106552,
        "gdpPppX1m": 187264,
        "gdpPerCapita": 19559.216412471993,
        "nominalGdpPerInternetUsers": 23960.82147532925
    },
    {
        "country": "Norway",
        "population": 5305383,
        "internetUsers": 5120225,
        "gdpNominalX1m": 417627,
        "gdpPppX1m": 384298,
        "gdpPerCapita": 78717.59682571456,
        "nominalGdpPerInternetUsers": 81564.18907372234
    },
    {
        "country": "Republic of the Congo",
        "population": 5260750,
        "internetUsers": 455055,
        "gdpNominalX1m": 11576,
        "gdpPppX1m": 30702,
        "gdpPerCapita": 2200.446704367248,
        "nominalGdpPerInternetUsers": 25438.68323609234
    },
    {
        "country": "Eritrea",
        "population": 5068831,
        "internetUsers": 66402,
        "gdpNominalX1m": 2110,
        "gdpPppX1m": 6640,
        "gdpPerCapita": 416.26955011914976,
        "nominalGdpPerInternetUsers": 31776.151320743353
    },
    {
        "country": "Palestinian Authority",
        "population": 4920724,
        "internetUsers": 3208312,
        "gdpNominalX1m": 14620,
        "gdpPerCapita": 2971.1,
        "nominalGdpPerInternetUsers": 4556.9134173983075
    },
    {
        "country": "Costa Rica",
        "population": 4905769,
        "internetUsers": 3511549,
        "gdpNominalX1m": 61021,
        "gdpPppX1m": 89597,
        "gdpPerCapita": 12438.620734078591,
        "nominalGdpPerInternetUsers": 17377.231529447545
    },
    {
        "country": "Ireland",
        "population": 4761657,
        "internetUsers": 4024552,
        "gdpNominalX1m": 387717,
        "gdpPppX1m": 392014,
        "gdpPerCapita": 81424.8065326839,
        "nominalGdpPerInternetUsers": 96337.92779916871
    },
    {
        "country": "Liberia",
        "population": 4731906,
        "internetUsers": 377607,
        "gdpNominalX1m": 3221,
        "gdpPppX1m": 6160,
        "gdpPerCapita": 680.6982218159025,
        "nominalGdpPerInternetUsers": 8530.03254706613
    },
    {
        "country": "New Zealand",
        "population": 4705818,
        "internetUsers": 4273353,
        "gdpNominalX1m": 204671,
        "gdpPppX1m": 194919,
        "gdpPerCapita": 43493.182269267534,
        "nominalGdpPerInternetUsers": 47894.709376922525
    },
    {
        "country": "Central African Republic",
        "population": 4659080,
        "internetUsers": 202204,
        "gdpNominalX1m": 2321,
        "gdpPppX1m": 4270,
        "gdpPerCapita": 498.16702009838855,
        "nominalGdpPerInternetUsers": 11478.506854463809
    },
    {
        "country": "Oman",
        "population": 4636262,
        "internetUsers": 3717818,
        "gdpNominalX1m": 76609,
        "gdpPppX1m": 200203,
        "gdpPerCapita": 16523.872033116335,
        "nominalGdpPerInternetUsers": 20605.90378549999
    },
    {
        "country": "Mauritania",
        "population": 4420184,
        "internetUsers": 919398,
        "gdpNominalX1m": 5651,
        "gdpPppX1m": 25109,
        "gdpPerCapita": 1278.453566638855,
        "nominalGdpPerInternetUsers": 6146.413196461162
    },
    {
        "country": "Croatia",
        "population": 4189353,
        "internetUsers": 2811056,
        "gdpNominalX1m": 60702,
        "gdpPppX1m": 103111,
        "gdpPerCapita": 14489.58824906853,
        "nominalGdpPerInternetUsers": 21594.020183162484
    },
    {
        "country": "Kuwait",
        "population": 4136528,
        "internetUsers": 4053797,
        "gdpNominalX1m": 137591,
        "gdpPppX1m": 307193,
        "gdpPerCapita": 33262.4365168083,
        "nominalGdpPerInternetUsers": 33941.265435837064
    },
    {
        "country": "Panama",
        "population": 4098587,
        "internetUsers": 2371852,
        "gdpNominalX1m": 68536,
        "gdpPppX1m": 110399,
        "gdpPerCapita": 16721.860485089128,
        "nominalGdpPerInternetUsers": 28895.563466860494
    },
    {
        "country": "Moldova",
        "population": 4051212,
        "internetUsers": 3083783,
        "gdpNominalX1m": 11688,
        "gdpPppX1m": 26642,
        "gdpPerCapita": 2885.062544246018,
        "nominalGdpPerInternetUsers": 3790.149955428122
    },
    {
        "country": "Georgia",
        "population": 3912061,
        "internetUsers": 2366406,
        "gdpNominalX1m": 15925,
        "gdpPppX1m": 46286,
        "gdpPerCapita": 4070.7442956538766,
        "nominalGdpPerInternetUsers": 6729.614444858575
    },
    {
        "country": "Puerto Rico",
        "population": 3663131,
        "internetUsers": 2664928,
        "gdpNominalX1m": 99913,
        "gdpPppX1m": 123851,
        "gdpPerCapita": 27275.300828717292,
        "nominalGdpPerInternetUsers": 37491.81966642251
    },
    {
        "country": "Bosnia and Herzegovina",
        "population": 3507017,
        "internetUsers": 3330502,
        "gdpNominalX1m": 20106,
        "gdpPppX1m": 47540,
        "gdpPerCapita": 5733.077427340671,
        "nominalGdpPerInternetUsers": 6036.927766444818
    },
    {
        "country": "Uruguay",
        "population": 3456750,
        "internetUsers": 2360269,
        "gdpNominalX1m": 59918,
        "gdpPppX1m": 80817,
        "gdpPerCapita": 17333.622622405437,
        "nominalGdpPerInternetUsers": 25386.089466920934
    },
    {
        "country": "Mongolia",
        "population": 3075647,
        "internetUsers": 729236,
        "gdpNominalX1m": 13637,
        "gdpPppX1m": 46550,
        "gdpPerCapita": 4433.86383417863,
        "nominalGdpPerInternetUsers": 18700.393288318184
    },
    {
        "country": "Armenia",
        "population": 2930450,
        "internetUsers": 2043110,
        "gdpNominalX1m": 13444,
        "gdpPppX1m": 33141,
        "gdpPerCapita": 4587.69131020833,
        "nominalGdpPerInternetUsers": 6580.164553058817
    },
    {
        "country": "Albania",
        "population": 2930187,
        "internetUsers": 2105339,
        "gdpNominalX1m": 15418,
        "gdpPppX1m": 38078,
        "gdpPerCapita": 5261.780220852799,
        "nominalGdpPerInternetUsers": 7323.286178615415
    },
    {
        "country": "Jamaica",
        "population": 2890299,
        "internetUsers": 1409888,
        "gdpNominalX1m": 15702,
        "gdpPppX1m": 26516,
        "gdpPerCapita": 5432.655929369245,
        "nominalGdpPerInternetUsers": 11137.054858258245
    },
    {
        "country": "Lithuania",
        "population": 2890297,
        "internetUsers": 2243448,
        "gdpNominalX1m": 53641,
        "gdpPppX1m": 95286,
        "gdpPerCapita": 18558.992380367832,
        "nominalGdpPerInternetUsers": 23910.07056994412
    },
    {
        "country": "Qatar",
        "population": 2639211,
        "internetUsers": 2532059,
        "gdpNominalX1m": 191849,
        "gdpPppX1m": 345455,
        "gdpPerCapita": 72691.80069346483,
        "nominalGdpPerInternetUsers": 75767.98170974689
    },
    {
        "country": "Namibia",
        "population": 2533794,
        "internetUsers": 933450,
        "gdpNominalX1m": 14368,
        "gdpPppX1m": 26261,
        "gdpPerCapita": 5670.547803017925,
        "nominalGdpPerInternetUsers": 15392.36166907708
    },
    {
        "country": "Botswana",
        "population": 2291661,
        "internetUsers": 948977,
        "gdpNominalX1m": 18690,
        "gdpPppX1m": 41809,
        "gdpPerCapita": 8155.656530350693,
        "nominalGdpPerInternetUsers": 19694.89250002898
    },
    {
        "country": "Lesotho",
        "population": 2233339,
        "internetUsers": 665312,
        "gdpNominalX1m": 2741,
        "gdpPppX1m": 6593,
        "gdpPerCapita": 1227.3103187648628,
        "nominalGdpPerInternetUsers": 4119.871579048627
    },
    {
        "country": "The Gambia",
        "population": 2100568,
        "internetUsers": 416753,
        "gdpNominalX1m": 1773,
        "gdpPppX1m": 6614,
        "gdpPerCapita": 844.0574168510612,
        "nominalGdpPerInternetUsers": 4254.318505205721
    },
    {
        "country": "North Macedonia",
        "population": 2083160,
        "internetUsers": 1589659,
        "gdpNominalX1m": 12672,
        "gdpPppX1m": 33517,
        "gdpPerCapita": 6083.066111100444,
        "nominalGdpPerInternetUsers": 7971.520936251107
    },
    {
        "country": "Slovenia",
        "population": 2079976,
        "internetUsers": 1640893,
        "gdpNominalX1m": 54154,
        "gdpPppX1m": 73276,
        "gdpPerCapita": 26035.877337046197,
        "nominalGdpPerInternetUsers": 33002.76130131581
    },
    {
        "country": "Gabon",
        "population": 2025137,
        "internetUsers": 1019049,
        "gdpNominalX1m": 16877,
        "gdpPppX1m": 39584,
        "gdpPerCapita": 8333.757172971507,
        "nominalGdpPerInternetUsers": 16561.519612893982
    },
    {
        "country": "Latvia",
        "population": 1949670,
        "internetUsers": 1585471,
        "gdpNominalX1m": 35045,
        "gdpPppX1m": 54700,
        "gdpPerCapita": 17974.83676724779,
        "nominalGdpPerInternetUsers": 22103.841697514494
    },
    {
        "country": "Guinea-Bissau",
        "population": 1861283,
        "internetUsers": 73148,
        "gdpNominalX1m": 1458,
        "gdpPppX1m": 3664,
        "gdpPerCapita": 783.3306380598759,
        "nominalGdpPerInternetUsers": 19932.192267731174
    },
    {
        "country": "Bahrain",
        "population": 1492584,
        "internetUsers": 1431090,
        "gdpNominalX1m": 38184,
        "gdpPppX1m": 74649,
        "gdpPerCapita": 25582.47978003248,
        "nominalGdpPerInternetUsers": 26681.760057019474
    },
    {
        "country": "Trinidad and Tobago",
        "population": 1369125,
        "internetUsers": 1058744,
        "gdpNominalX1m": 22607,
        "gdpPppX1m": 43178,
        "gdpPerCapita": 16512.005843147996,
        "nominalGdpPerInternetUsers": 21352.65937752658
    },
    {
        "country": "Swaziland",
        "population": 1367254,
        "internetUsers": 414278,
        "gdpNominalX1m": 4657,
        "gdpPppX1m": 12368,
        "gdpPerCapita": 3406.0971845757995,
        "nominalGdpPerInternetUsers": 11241.243802470804
    },
    {
        "country": "Estonia",
        "population": 1309632,
        "internetUsers": 1153786,
        "gdpNominalX1m": 31038,
        "gdpPppX1m": 44503,
        "gdpPerCapita": 23699.78742119924,
        "nominalGdpPerInternetUsers": 26901.00243892715
    },
    {
        "country": "Timor Leste",
        "population": 1296311,
        "internetUsers": 356356,
        "gdpNominalX1m": 2938,
        "gdpPppX1m": 2613,
        "gdpPerCapita": 2266.431435049151,
        "nominalGdpPerInternetUsers": 8244.564424339706
    },
    {
        "country": "Equatorial Guinea",
        "population": 1267689,
        "internetUsers": 332642,
        "gdpNominalX1m": 12142,
        "gdpPppX1m": 26828,
        "gdpPerCapita": 9578.058971877172,
        "nominalGdpPerInternetUsers": 36501.704535206016
    },
    {
        "country": "Mauritius",
        "population": 1265138,
        "internetUsers": 702911,
        "gdpNominalX1m": 14391,
        "gdpPppX1m": 29631,
        "gdpPerCapita": 11375.043671125206,
        "nominalGdpPerInternetUsers": 20473.431202527772
    },
    {
        "country": "Cyprus",
        "population": 1179551,
        "internetUsers": 952369,
        "gdpNominalX1m": 24280,
        "gdpPppX1m": 34745,
        "gdpPerCapita": 20584.103612306717,
        "nominalGdpPerInternetUsers": 25494.31995371542
    },
    {
        "country": "Djibouti",
        "population": 956985,
        "internetUsers": 532849,
        "gdpNominalX1m": 3166,
        "gdpPppX1m": 6362,
        "gdpPerCapita": 3308.3068177662135,
        "nominalGdpPerInternetUsers": 5941.645757053124
    },
    {
        "country": "Fiji",
        "population": 905502,
        "internetUsers": 452479,
        "gdpNominalX1m": 5708,
        "gdpPppX1m": 10078,
        "gdpPerCapita": 6303.685690368437,
        "nominalGdpPerInternetUsers": 12614.950086081344
    },
    {
        "country": "Comoros",
        "population": 813912,
        "internetUsers": 69020,
        "gdpNominalX1m": 1179,
        "gdpPppX1m": 2516,
        "gdpPerCapita": 1448.5595494353197,
        "nominalGdpPerInternetUsers": 17082.005215879453
    },
    {
        "country": "Bhutan",
        "population": 807610,
        "internetUsers": 388541,
        "gdpNominalX1m": 2842,
        "gdpPppX1m": 8200,
        "gdpPerCapita": 3519.0252720991566,
        "nominalGdpPerInternetUsers": 7314.543381522156
    },
    {
        "country": "Guyana",
        "population": 777859,
        "internetUsers": 290375,
        "gdpNominalX1m": 4121,
        "gdpPppX1m": 10989,
        "gdpPerCapita": 5297.875321877101,
        "nominalGdpPerInternetUsers": 14191.993112354714
    },
    {
        "country": "Montenegro",
        "population": 628960,
        "internetUsers": 448260,
        "gdpNominalX1m": 5424,
        "gdpPppX1m": 11549,
        "gdpPerCapita": 8623.759857542611,
        "nominalGdpPerInternetUsers": 12100.120465801097
    },
    {
        "country": "Macau",
        "population": 622567,
        "internetUsers": 517789,
        "gdpNominalX1m": 55136,
        "gdpPppX1m": 53662,
        "gdpPerCapita": 88562.35553763692,
        "nominalGdpPerInternetUsers": 106483.52900505805
    },
    {
        "country": "Solomon Islands",
        "population": 611343,
        "internetUsers": 72872,
        "gdpNominalX1m": 1440,
        "gdpPppX1m": 1433,
        "gdpPerCapita": 2355.469842625171,
        "nominalGdpPerInternetUsers": 19760.676254254035
    },
    {
        "country": "Luxembourg",
        "population": 583455,
        "internetUsers": 570794,
        "gdpNominalX1m": 69453,
        "gdpPppX1m": 65868,
        "gdpPerCapita": 119037.45790163765,
        "nominalGdpPerInternetUsers": 121677.87327827553
    },
    {
        "country": "Suriname",
        "population": 563402,
        "internetUsers": 275785,
        "gdpNominalX1m": 3774,
        "gdpPppX1m": 8956,
        "gdpPerCapita": 6698.591769287294,
        "nominalGdpPerInternetUsers": 13684.573127617528
    },
    {
        "country": "Cabo Verde",
        "population": 546388,
        "internetUsers": 312315,
        "gdpNominalX1m": 1977,
        "gdpPppX1m": 4194,
        "gdpPerCapita": 3618.30786913329,
        "nominalGdpPerInternetUsers": 6330.147447288795
    },
    {
        "country": "Maldives",
        "population": 436330,
        "internetUsers": 275717,
        "gdpNominalX1m": 5786,
        "gdpPppX1m": 7839,
        "gdpPerCapita": 13260.605505007677,
        "nominalGdpPerInternetUsers": 20985.285637084402
    },
    {
        "country": "Malta",
        "population": 430835,
        "internetUsers": 344970,
        "gdpNominalX1m": 14859,
        "gdpPppX1m": 22496,
        "gdpPerCapita": 34488.841435816496,
        "nominalGdpPerInternetUsers": 43073.31072267154
    },
    {
        "country": "Brunei",
        "population": 428697,
        "internetUsers": 406705,
        "gdpNominalX1m": 12455,
        "gdpPppX1m": 37342,
        "gdpPerCapita": 29053.154092517558,
        "nominalGdpPerInternetUsers": 30624.162476487872
    },
    {
        "country": "Bahamas",
        "population": 395361,
        "internetUsers": 336057,
        "gdpNominalX1m": 12664,
        "gdpPppX1m": 11807,
        "gdpPerCapita": 32031.48514901571,
        "nominalGdpPerInternetUsers": 37684.08335490705
    },
    {
        "country": "Belize",
        "population": 374681,
        "internetUsers": 176400,
        "gdpNominalX1m": 2001,
        "gdpPppX1m": 2974,
        "gdpPerCapita": 5340.543021930655,
        "nominalGdpPerInternetUsers": 11343.537414965986
    },
    {
        "country": "Iceland",
        "population": 335025,
        "internetUsers": 329196,
        "gdpNominalX1m": 23918,
        "gdpPppX1m": 18720,
        "gdpPerCapita": 71391.68718752332,
        "nominalGdpPerInternetUsers": 72655.80383722766
    },
    {
        "country": "Barbados",
        "population": 285719,
        "internetUsers": 233604,
        "gdpNominalX1m": 5189,
        "gdpPppX1m": 5051,
        "gdpPerCapita": 18161.200340194388,
        "nominalGdpPerInternetUsers": 22212.804575264123
    },
    {
        "country": "French Polynesia",
        "population": 283007,
        "internetUsers": 205746,
        "gdpNominalX1m": 3448,
        "gdpPerCapita": 12183.4442257612,
        "nominalGdpPerInternetUsers": 16758.527504787457
    },
    {
        "country": "New Caledonia",
        "population": 276255,
        "internetUsers": 226557,
        "gdpNominalX1m": 2682,
        "gdpPerCapita": 9708.42156703046,
        "nominalGdpPerInternetUsers": 11838.080483057243
    },
    {
        "country": "Vanuatu",
        "population": 276244,
        "internetUsers": 71050,
        "gdpNominalX1m": 951,
        "gdpPppX1m": 829,
        "gdpPerCapita": 3442.608708243437,
        "nominalGdpPerInternetUsers": 13384.94018296974
    },
    {
        "country": "São Tomé and Príncipe",
        "population": 204327,
        "internetUsers": 61155,
        "gdpNominalX1m": 430,
        "gdpPppX1m": 705,
        "gdpPerCapita": 2104.469795964312,
        "nominalGdpPerInternetUsers": 7031.313874580983
    },
    {
        "country": "Samoa",
        "population": 196440,
        "internetUsers": 66023,
        "gdpNominalX1m": 905,
        "gdpPppX1m": 1132,
        "gdpPerCapita": 4607.004683363877,
        "nominalGdpPerInternetUsers": 13707.344410281265
    },
    {
        "country": "Saint Lucia",
        "population": 178844,
        "internetUsers": 90889,
        "gdpNominalX1m": 1992,
        "gdpPppX1m": 2702,
        "gdpPerCapita": 11138.198653575182,
        "nominalGdpPerInternetUsers": 21916.84362244056
    },
    {
        "country": "Jersey",
        "population": 165314,
        "internetUsers": 38958,
        "gdpNominalX1m": 6312,
        "gdpPerCapita": 38181.88417193946,
        "nominalGdpPerInternetUsers": 162020.63760973356
    },
    {
        "country": "Guam",
        "population": 164229,
        "internetUsers": 132221,
        "gdpNominalX1m": 5920,
        "gdpPerCapita": 36047.226738273996,
        "nominalGdpPerInternetUsers": 44773.523116600234
    },
    {
        "country": "Kiribati",
        "population": 116398,
        "internetUsers": 16971,
        "gdpNominalX1m": 184,
        "gdpPppX1m": 253,
        "gdpPerCapita": 1580.783174968642,
        "nominalGdpPerInternetUsers": 10842.024630251604
    },
    {
        "country": "Saint Vincent and the Grenadines",
        "population": 109897,
        "internetUsers": 72048,
        "gdpNominalX1m": 856,
        "gdpPerCapita": 7789.111622701256,
        "nominalGdpPerInternetUsers": 11880.968243393294
    },
    {
        "country": "Tonga",
        "population": 108020,
        "internetUsers": 44558,
        "gdpNominalX1m": 488,
        "gdpPppX1m": 620,
        "gdpPerCapita": 4517.681910757267,
        "nominalGdpPerInternetUsers": 10952.017595044661
    },
    {
        "country": "Grenada",
        "population": 107825,
        "internetUsers": 63692,
        "gdpNominalX1m": 1238,
        "gdpPppX1m": 1681,
        "gdpPerCapita": 11481.567354509622,
        "nominalGdpPerInternetUsers": 19437.291967594047
    },
    {
        "country": "Micronesia, Federated States of",
        "population": 105544,
        "internetUsers": 37257,
        "gdpNominalX1m": 381,
        "gdpPppX1m": 363,
        "gdpPerCapita": 3609.8688698552264,
        "nominalGdpPerInternetUsers": 10226.266205008455
    },
    {
        "country": "Aruba",
        "population": 105264,
        "internetUsers": 102285,
        "gdpNominalX1m": 2903,
        "gdpPppX1m": 3883,
        "gdpPerCapita": 27578.27937376501,
        "nominalGdpPerInternetUsers": 28381.48311091558
    },
    {
        "country": "U.S. Virgin Islands",
        "population": 104901,
        "internetUsers": 67535,
        "gdpNominalX1m": 3855,
        "gdpPerCapita": 36748.9347098693,
        "nominalGdpPerInternetUsers": 57081.51328940549
    },
    {
        "country": "Antigua and Barbuda",
        "population": 102012,
        "internetUsers": 77529,
        "gdpNominalX1m": 1688,
        "gdpPerCapita": 16547.07289338509,
        "nominalGdpPerInternetUsers": 21772.498032994106
    },
    {
        "country": "Seychelles",
        "population": 94737,
        "internetUsers": 55677,
        "gdpNominalX1m": 1644,
        "gdpPerCapita": 17353.304411159315,
        "nominalGdpPerInternetUsers": 29527.45298776874
    },
    {
        "country": "Andorra",
        "population": 76965,
        "internetUsers": 76095,
        "gdpNominalX1m": 3237,
        "gdpPerCapita": 42058.07834730072,
        "nominalGdpPerInternetUsers": 42538.93159865957
    },
    {
        "country": "Dominica",
        "population": 73925,
        "internetUsers": 51467,
        "gdpNominalX1m": 593,
        "gdpPppX1m": 813,
        "gdpPerCapita": 8021.6435576597905,
        "nominalGdpPerInternetUsers": 11521.946101385352
    },
    {
        "country": "Cayman Islands",
        "population": 61559,
        "internetUsers": 49906,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Bermuda",
        "population": 61349,
        "internetUsers": 60349,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Greenland",
        "population": 56480,
        "internetUsers": 39242,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Saint Kitts and Nevis",
        "population": 55345,
        "internetUsers": 44669,
        "gdpNominalX1m": 1032,
        "gdpPerCapita": 18646.670882645227,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Marshall Islands",
        "population": 53127,
        "internetUsers": 20560,
        "gdpNominalX1m": 220,
        "gdpPerCapita": 4141.020573343121,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Faroe Islands",
        "population": 49290,
        "internetUsers": 48097,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Monaco",
        "population": 38695,
        "internetUsers": 37553,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Liechtenstein",
        "population": 37922,
        "internetUsers": 37201,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Gibraltar",
        "population": 34571,
        "internetUsers": 32494,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "San Marino",
        "population": 33400,
        "internetUsers": 20100,
        "gdpNominalX1m": 1591,
        "gdpPerCapita": 47634.73053892216,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "British Virgin Islands",
        "population": 31196,
        "internetUsers": 14456,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Anguilla",
        "population": 14909,
        "internetUsers": 12043,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Wallis and Futuna",
        "population": 11773,
        "internetUsers": 1383,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Nauru",
        "population": 11359,
        "internetUsers": 6475,
        "gdpNominalX1m": 108,
        "gdpPerCapita": 9507.879214719605,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Tuvalu",
        "population": 11192,
        "internetUsers": 5520,
        "gdpNominalX1m": 42,
        "gdpPerCapita": 3752.6804860614725,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Montserrat",
        "population": 5177,
        "internetUsers": 2833,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Saint Helena",
        "population": 4534,
        "internetUsers": 2906,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Falkland Islands",
        "population": 2910,
        "internetUsers": 2881,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Niue",
        "population": 1618,
        "internetUsers": 1034,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Turks and Caicos Islands (UK)",
        "population": 42953,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Sint Maarten (Netherlands)",
        "population": 40614,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Liechtenstein",
        "population": 38749,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Monaco",
        "population": 38100,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Saint Martin (France)",
        "population": 35334,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Gibraltar (UK)",
        "population": 33691,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "San Marino",
        "population": 33607,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Åland Islands (Finland)",
        "population": 30074,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "British Virgin Islands (UK)",
        "population": 30030,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Palau",
        "population": 17900,
        "gdpNominalX1m": 291,
        "gdpPppX1m": 256,
        "gdpPerCapita": 16256.983240223464,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Cook Islands (NZ)",
        "population": 15200,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Anguilla (UK)",
        "population": 14869,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Wallis and Futuna (France)",
        "population": 11558,
        "gdpPerCapita": 0,
        "nominalGdpPerInternetUsers": 0
    },
    {
        "country": "Nauru",
        "population": 11000,
        "gdpPerCapita": 0
    },
    {
        "country": "Tuvalu",
        "population": 10200,
        "gdpPerCapita": 0
    },
    {
        "country": "Saint Barthélemy (France)",
        "population": 9961,
        "gdpPerCapita": 0
    },
    {
        "country": "Saint Pierre and Miquelon (France)",
        "population": 5997,
        "gdpPerCapita": 0
    },
    {
        "country": "Saint Helena, Ascension\nand Tristan da Cunha (UK)",
        "population": 5633,
        "gdpPerCapita": 0
    },
    {
        "country": "Montserrat (UK)",
        "population": 4989,
        "gdpPerCapita": 0
    },
    {
        "country": "Falkland Islands (UK)",
        "population": 3198,
        "gdpPerCapita": 0
    },
    {
        "country": "Christmas Island (Australia)",
        "population": 1955,
        "gdpPerCapita": 0
    },
    {
        "country": "Norfolk Island (Australia)",
        "population": 1735,
        "gdpPerCapita": 0
    },
    {
        "country": "Niue (NZ)",
        "population": 1520,
        "gdpPerCapita": 0
    },
    {
        "country": "Tokelau (NZ)",
        "population": 1400,
        "gdpPerCapita": 0
    },
    {
        "country": "Vatican City[ab]",
        "population": 825,
        "gdpPerCapita": 0
    },
    {
        "country": "Cocos (Keeling) Islands (Australia)",
        "population": 555,
        "gdpPerCapita": 0
    },
    {
        "country": "Pitcairn Islands (UK)",
        "population": 50,
        "gdpPerCapita": 0
    }
];
let pops_by_lang = {

    "Afrikaans": {
        "Australia": 67000,
        "Eswatini": 13000,
        "Namibia": 128000,
        "Netherlands": 15000,
        "South Africa": 9544000,
        "United Kingdom": 68000,
        "United States": 13000,
        "Zambia": 101000,
        "Zimbabwe": 93000,
        "Total": 10042000
    },
    "Albanian": {
        "Albania": 2725000,
        "Australia": 38000,
        "Austria": 64000,
        "Egypt": 29000,
        "Germany": 33000,
        "Greece": 419000,
        "Kosovo": 1680000,
        "Montenegro": 30000,
        "North Macedonia": 521000,
        "Switzerland": 109000,
        "Turkey": 73000,
        "United States": 93000,
        "Canada": 24000,
        "Croatia": 16000,
        "Total": 5854000
    },
    "Amharic": {
        "Eritrea": 12000,
        "Ethiopia": 29596000,
        "Israel": 77000,
        "Kuwait": 93000,
        "Saudi Arabia": 21000,
        "Sudan": 109000,
        "United States": 252000,
        "Yemen": 12000,
        "Total": 30172000
    },
    "Arabic": {
        "Algeria": 32701000,
        "Argentina": 1482000,
        "Australia": 304000,
        "Austria": 19000,
        "Bahrain": 1046000,
        "Belgium": 439000,
        "Brazil": 1413000,
        "Bulgaria": 11000,
        "Burkina Faso": 21000,
        "Cameroon": 204000,
        "Canada": 417000,
        "Central African Republic": 131000,
        "Chad": 3332000,
        "Colombia": 38000,
        "Democratic Republic of the Congo": 27000,
        "Côte d'Ivoire": 79000,
        "Cuba": 21000,
        "Denmark": 53000,
        "Djibouti": 87000,
        "Egypt": 97712000,
        "Eritrea": 184000,
        "Ethiopia": 20000,
        "France": 1445000,
        "Germany": 427000,
        "Honduras": 32000,
        "Indonesia": 280000,
        "Iran": 1719000,
        "Iraq": 27150000,
        "Ireland": 22000,
        "Israel": 1708000,
        "Italy": 1338000,
        "Jamaica": 22000,
        "Jordan": 9673000,
        "Kenya": 76000,
        "Kuwait": 2408000,
        "Lebanon": 5853000,
        "Liberia": 60000,
        "Libya": 6104000,
        "Madagascar": 56000,
        "Malaysia": 15000,
        "Mexico": 1029000,
        "Morocco": 26252000,
        "Netherlands": 138000,
        "Niger": 858000,
        "Nigeria": 265000,
        "Norway": 56000,
        "Oman": 3259000,
        "Philippines": 33000,
        "Portugal": 20000,
        "Qatar": 1875000,
        "Saudi Arabia": 29489000,
        "Senegal": 92000,
        "Serbia": 22000,
        "Sierra Leone": 47000,
        "Singapore": 11000,
        "Somalia": 111000,
        "South Africa": 60000,
        "South Sudan": 454000,
        "Spain": 840000,
        "Sudan": 34806000,
        "Sweden": 144000,
        "Switzerland": 16000,
        "Syria": 14969000,
        "Tunisia": 11604000,
        "Turkey": 1921000,
        "Uganda": 15000,
        "United Arab Emirates": 3551000,
        "United Kingdom": 346000,
        "United States": 1323000,
        "Venezuela": 126000,
        "West Bank / Gaza": 4586000,
        "Yemen": 28219000,
        "Total": 364666000
    },
    "Assamese": {
        "India": 5525000,
        "Total": 5525000
    },
    "Azerbaijani": {
        "Azerbaijan": 9092000,
        "Georgia": 221000,
        "Germany": 15000,
        "Kazakhstan": 98000,
        "Kyrgyzstan": 22000,
        "Russia": 615000,
        "Turkmenistan": 50000,
        "Ukraine": 41000,
        "Uzbekistan": 60000,
        "Afghanistan": 15000,
        "Iran": 16997000,
        "Iraq": 2372000,
        "Syria": 35000,
        "Turkey": 590000,
        "Total": 30223000
    },
    "Bengali": {
        "Australia": 55000,
        "Bangladesh": 158052000,
        "Canada": 15000,
        "Fiji": 22000,
        "France": 32000,
        "Greece": 11000,
        "India": 59996000,
        "Italy": 93000,
        "Japan": 70000,
        "Malaysia": 82000,
        "Myanmar (Burma)": 282000,
        "Oman": 166000,
        "Saudi Arabia": 35000,
        "Singapore": 77000,
        "Thailand": 35000,
        "United Arab Emirates": 76000,
        "United Kingdom": 352000,
        "United States": 142000,
        "Total": 219593000
    },
    "Bulgarian": {
        "Australia": 12000,
        "Belgium": 19000,
        "Bulgaria": 6066000,
        "Canada": 19000,
        "Cyprus": 20000,
        "Germany": 188000,
        "Greece": 69000,
        "Italy": 48000,
        "Moldova": 51000,
        "Netherlands": 20000,
        "Russia": 25000,
        "Serbia": 17000,
        "Spain": 152000,
        "Turkey": 376000,
        "Ukraine": 184000,
        "United Kingdom": 64000,
        "United States": 99000,
        "Total": 7429000
    },
    "Burmese": {
        "Australia": 13000,
        "Bangladesh": 313000,
        "China": 26000,
        "China, Macau": 19000,
        "India": 15000,
        "Korea, South": 23000,
        "Malaysia": 30000,
        "Myanmar (Burma)": 31228000,
        "Singapore": 20000,
        "Thailand": 207000,
        "United Kingdom": 14000,
        "United States": 194000,
        "Total": 32102000
    },
    "Catalan": {
        "Andorra": 33000,
        "Argentina": 200000,
        "France": 111000,
        "Germany": 50000,
        "Italy": 23000,
        "Mexico": 64000,
        "Spain": 3792000,
        "Total": 4273000
    },
    "Chhattisgarhi": {
        "India": 1246000,
        "Total": 1246000
    },
    "Chichewa": {
        "Malawi": 10742000,
        "Mozambique": 1354000,
        "Tanzania": 47000,
        "Zambia": 1860000,
        "Zimbabwe": 439000,
        "Total": 14442000
    },
    "Chinese, Mandarin": {
        "Algeria": 36000,
        "Angola": 388000,
        "Argentina": 77000,
        "Australia": 510000,
        "Austria": 38000,
        "Belize": 11000,
        "Brunei": 13000,
        "Canada": 1257000,
        "Chad": 16000,
        "Chile": 13000,
        "China": 901334000,
        "China, Hong Kong": 37000,
        "China, Macau": 37000,
        "Colombia": 11000,
        "Costa Rica": 39000,
        "Cuba": 40000,
        "Denmark": 12000,
        "Dominican Republic": 50000,
        "Ecuador": 19000,
        "Ethiopia": 39000,
        "Ghana": 12000,
        "Greece": 19000,
        "Indonesia": 1291000,
        "Italy": 225000,
        "Japan": 549000,
        "Kenya": 35000,
        "Korea, North": 182000,
        "Korea, South": 1039000,
        "Laos": 67000,
        "Madagascar": 70000,
        "Malaysia": 1078000,
        "Mauritius": 19000,
        "Mongolia": 45000,
        "Mozambique": 26000,
        "Myanmar (Burma)": 979000,
        "Netherlands": 30000,
        "Nicaragua": 14000,
        "Northern Mariana Islands": 11000,
        "Papua New Guinea": 25000,
        "Paraguay": 11000,
        "Portugal": 11000,
        "Saudi Arabia": 172000,
        "Serbia": 14000,
        "Singapore": 1391000,
        "Spain": 172000,
        "Sweden": 19000,
        "Taiwan": 4639000,
        "Tanzania": 103000,
        "Thailand": 89000,
        "Turkey": 42000,
        "Uganda": 19000,
        "United Arab Emirates": 33000,
        "United Kingdom": 131000,
        "United States": 4224000,
        "Zambia": 51000,
        "Total": 920814000
    },
    "Croatian": {
        "Australia": 70000,
        "Austria": 73000,
        "Bosnia-Herzegovina": 508000,
        "Canada": 54000,
        "Croatia": 3666000,
        "France": 20000,
        "Germany": 270000,
        "Hungary": 25000,
        "Italy": 17000,
        "Libya": 21000,
        "Serbia": 53000,
        "Slovenia": 35000,
        "Switzerland": 41000,
        "United States": 403000,
        "Total": 5256000
    },
    "Czech": {
        "Australia": 23000,
        "Austria": 18000,
        "Canada": 23000,
        "Czechia": 10295000,
        "France": 13000,
        "Germany": 33000,
        "Serbia": 45000,
        "Slovakia": 30000,
        "Switzerland": 11000,
        "United Kingdom": 40000,
        "United States": 300000,
        "Total": 10831000
    },
    "Dutch": {
        "Australia": 72000,
        "Belgium": 232000,
        "Brazil": 11000,
        "Canada": 299000,
        "Curacao": 12000,
        "France": 89000,
        "Germany": 148000,
        "Indonesia": 17000,
        "Netherlands": 14165000,
        "New Zealand": 30000,
        "South Africa": 30000,
        "Spain": 46000,
        "Sweden": 11000,
        "Switzerland": 14000,
        "Turkey": 34000,
        "United Kingdom": 88000,
        "United States": 143000,
        "Total": 15441000
    },
    "English": {
        "Angola": 24000,
        "Antigua and Barbuda": 90000,
        "Australia": 20424000,
        "Bahamas": 93000,
        "Bahrain": 25000,
        "Barbados": 275000,
        "Belgium": 87000,
        "Bermuda": 52000,
        "Brazil": 49000,
        "Canada": 19512000,
        "Cayman Islands": 47000,
        "China": 120000,
        "China, Hong Kong": 21000,
        "Colombia": 20000,
        "Costa Rica": 12000,
        "Cyprus": 33000,
        "Denmark": 30000,
        "Dominican Republic": 48000,
        "Ecuador": 88000,
        "Egypt": 19000,
        "Fiji": 17000,
        "France": 236000,
        "Germany": 218000,
        "Gibraltar": 25000,
        "Greece": 35000,
        "Guam": 15000,
        "Guatemala": 504000,
        "Guyana": 63000,
        "Haiti": 17000,
        "Honduras": 35000,
        "India": 260000,
        "Indonesia": 34000,
        "Ireland": 4254000,
        "Isle of Man": 73000,
        "Israel": 94000,
        "Italy": 37000,
        "Jamaica": 28000,
        "Japan": 73000,
        "Jordan": 12000,
        "Kenya": 55000,
        "Korea, South": 194000,
        "Kuwait": 27000,
        "Liberia": 60000,
        "Malawi": 11000,
        "Malaysia": 75000,
        "Mexico": 512000,
        "Myanmar (Burma)": 56000,
        "Namibia": 29000,
        "Netherlands": 17000,
        "New Zealand": 3226000,
        "Nigeria": 24000,
        "Norway": 17000,
        "Oman": 13000,
        "Panama": 168000,
        "Papua New Guinea": 118000,
        "Philippines": 182000,
        "Portugal": 14000,
        "Puerto Rico": 61000,
        "Qatar": 41000,
        "Samoa": 20000,
        "Saudi Arabia": 105000,
        "Singapore": 202000,
        "Solomon Islands": 20000,
        "South Africa": 2500000,
        "Spain": 354000,
        "Sweden": 44000,
        "Switzerland": 42000,
        "Thailand": 123000,
        "Trinidad and Tobago": 1284000,
        "Turkey": 63000,
        "United Kingdom": 56960000,
        "United States": 264062000,
        "Venezuela": 22000,
        "Virgin Islands (U.S.)": 39000,
        "Zambia": 12000,
        "Total": 377851000
    },
    "Estonian": {
        "Estonia": 854000,
        "Finland": 50000,
        "Germany": 83000,
        "Russia": 18000,
        "United Kingdom": 15000,
        "United States": 27000,
        "Total": 1047000
    },
    "French": {
        "Algeria": 13000,
        "Argentina": 16000,
        "Australia": 25000,
        "Austria": 17000,
        "Belgium": 321000,
        "Benin": 33000,
        "Brazil": 18000,
        "Burkina Faso": 15000,
        "Cambodia": 14000,
        "Cameroon": 1644000,
        "Canada": 7852000,
        "Central African Republic": 21000,
        "Chad": 17000,
        "Democratic Republic of the Congo": 87000,
        "Republic of the Congo": 12000,
        "Côte d'Ivoire": 41000,
        "Egypt": 93000,
        "France": 54028000,
        "French Guiana": 24000,
        "French Polynesia": 169000,
        "Gabon": 11000,
        "Germany": 126000,
        "Ghana": 13000,
        "Israel": 38000,
        "Italy": 25000,
        "Lebanon": 25000,
        "Luxembourg": 40000,
        "Madagascar": 167000,
        "Mali": 19000,
        "Mauritius": 52000,
        "Mexico": 13000,
        "Monaco": 11000,
        "Netherlands": 20000,
        "New Caledonia": 142000,
        "Panama": 43000,
        "Reunion": 188000,
        "Saudi Arabia": 34000,
        "Senegal": 59000,
        "South Africa": 11000,
        "Spain": 102000,
        "Switzerland": 1774000,
        "Thailand": 14000,
        "Turkey": 30000,
        "United Kingdom": 173000,
        "United States": 2102000,
        "Uruguay": 20000,
        "Vietnam": 478000,
        "Total": 70190000
    },
    "Galician": {
        "Argentina": 761000,
        "Germany": 41000,
        "Mexico": 13000,
        "Portugal": 15000,
        "Spain": 2358000,
        "Uruguay": 41000,
        "Total": 3229000
    },
    "German": {
        "Argentina": 42000,
        "Australia": 106000,
        "Austria": 185000,
        "Belgium": 42000,
        "Bolivia": 237000,
        "Canada": 592000,
        "Chile": 45000,
        "Côte d'Ivoire": 30000,
        "Denmark": 35000,
        "Ecuador": 43000,
        "Egypt": 30000,
        "France": 649000,
        "Germany": 60221000,
        "Hungary": 176000,
        "Ireland": 12000,
        "Israel": 15000,
        "Italy": 36000,
        "Luxembourg": 14000,
        "Mexico": 13000,
        "Namibia": 12000,
        "Netherlands": 73000,
        "New Zealand": 13000,
        "Norway": 29000,
        "Paraguay": 102000,
        "Poland": 121000,
        "Romania": 51000,
        "Russia": 402000,
        "Slovenia": 13000,
        "South Africa": 15000,
        "Spain": 154000,
        "Sweden": 38000,
        "Switzerland": 301000,
        "Tanzania": 13000,
        "Ukraine": 30000,
        "United Kingdom": 141000,
        "United States": 1580000,
        "Uruguay": 40000,
        "Uzbekistan": 17000,
        "Total": 65668000
    },
    "German, Swiss": {
        "Austria": 310000,
        "Canada": 27000,
        "France": 1661000,
        "Germany": 34000,
        "Liechtenstein": 26000,
        "Spain": 15000,
        "Switzerland": 4671000,
        "United Kingdom": 15000,
        "Total": 6759000
    },
    "Gujarati": {
        "Australia": 54000,
        "Bahrain": 34000,
        "Burundi": 12000,
        "Fiji": 24000,
        "India": 56389000,
        "Iran": 36000,
        "Kenya": 212000,
        "Madagascar": 89000,
        "Malawi": 54000,
        "Malaysia": 30000,
        "Mozambique": 45000,
        "Myanmar (Burma)": 35000,
        "New Zealand": 25000,
        "Oman": 52000,
        "Portugal": 20000,
        "Reunion": 22000,
        "Somalia": 22000,
        "South Africa": 32000,
        "Sri Lanka": 21000,
        "Tanzania": 497000,
        "Uganda": 465000,
        "United Kingdom": 635000,
        "United States": 256000,
        "Zambia": 43000,
        "Zimbabwe": 30000,
        "Total": 59134000
    },
    "Haryanvi": {
        "India": 27000,
        "Total": 27000
    },
    "Hausa": {
        "Algeria": 12000,
        "Benin": 1085000,
        "Cameroon": 392000,
        "Central African Republic": 34000,
        "Chad": 307000,
        "Republic of the Congo": 11000,
        "Côte d'Ivoire": 1096000,
        "Equatorial Guinea": 28000,
        "Gabon": 16000,
        "Gambia": 11000,
        "Ghana": 296000,
        "Niger": 12249000,
        "Nigeria": 35095000,
        "Sudan": 116000,
        "Togo": 23000,
        "Total": 50771000
    },
    "Hebrew": {
        "Israel": 4972000,
        "United States": 214000,
        "West Bank / Gaza": 393000,
        "Total": 5579000
    },
    "Hindi": {
        "Austria": 23000,
        "Canada": 482000,
        "Democratic Republic of the Congo": 190000,
        "Cuba": 34000,
        "Finland": 11000,
        "France": 275000,
        "Germany": 195000,
        "Ghana": 13000,
        "India": 685561000,
        "Indonesia": 92000,
        "Ireland": 32000,
        "Jamaica": 98000,
        "Kuwait": 1333000,
        "Malaysia": 60000,
        "Mauritius": 36000,
        "Mozambique": 45000,
        "Myanmar (Burma)": 131000,
        "Netherlands": 223000,
        "New Zealand": 67000,
        "Oman": 104000,
        "Panama": 15000,
        "Portugal": 79000,
        "Russia": 36000,
        "Saudi Arabia": 172000,
        "Sierra Leone": 15000,
        "Singapore": 14000,
        "South Africa": 463000,
        "Sweden": 61000,
        "Tanzania": 68000,
        "Thailand": 23000,
        "United Arab Emirates": 3937000,
        "United Kingdom": 3059000,
        "United States": 350000,
        "Yemen": 316000,
        "Total": 697613000
    },
    "Hungarian": {
        "Australia": 29000,
        "Austria": 66000,
        "Brazil": 22000,
        "Canada": 84000,
        "Croatia": 13000,
        "Czechia": 16000,
        "France": 112000,
        "Germany": 161000,
        "Hungary": 8865000,
        "Israel": 23000,
        "Netherlands": 11000,
        "Romania": 1077000,
        "Serbia": 233000,
        "Slovakia": 449000,
        "Sweden": 11000,
        "Switzerland": 15000,
        "Ukraine": 141000,
        "United Kingdom": 92000,
        "United States": 102000,
        "Total": 11522000
    },
    "Igbo": {
        "Cameroon": 113000,
        "Equatorial Guinea": 56000,
        "Ghana": 66000,
        "Nigeria": 30112000,
        "United States": 226000,
        "Total": 30573000
    },
    "Indonesian": {
        "Australia": 76000,
        "China": 11000,
        "China, Hong Kong": 134000,
        "Germany": 19000,
        "Indonesia": 8260000,
        "Kuwait": 24000,
        "Malaysia": 833000,
        "Netherlands": 12000,
        "Philippines": 55000,
        "Saudi Arabia": 103000,
        "Singapore": 119000,
        "Suriname": 17000,
        "Taiwan": 256000,
        "United States": 70000,
        "Total": 9989000
    },
    "Italian": {
        "Argentina": 1128000,
        "Australia": 180000,
        "Belgium": 475000,
        "Brazil": 278000,
        "Canada": 728000,
        "Chile": 38000,
        "Croatia": 16000,
        "France": 178000,
        "Germany": 589000,
        "Italy": 35058000,
        "Libya": 26000,
        "Luxembourg": 21000,
        "Mexico": 25000,
        "Netherlands": 28000,
        "Panama": 21000,
        "Paraguay": 42000,
        "San Marino": 33000,
        "Saudi Arabia": 38000,
        "South Africa": 20000,
        "Spain": 179000,
        "Sweden": 11000,
        "Switzerland": 308000,
        "United Kingdom": 183000,
        "United States": 1127000,
        "Uruguay": 79000,
        "Venezuela": 132000,
        "Zambia": 13000,
        "Total": 40954000
    },
    "Japanese": {
        "Argentina": 38000,
        "Australia": 37000,
        "Bolivia": 20000,
        "Brazil": 1546000,
        "Canada": 57000,
        "China, Hong Kong": 13000,
        "France": 30000,
        "Germany": 25000,
        "Indonesia": 14000,
        "Japan": 122012000,
        "Korea, South": 52000,
        "Malaysia": 15000,
        "Mexico": 51000,
        "New Zealand": 15000,
        "Paraguay": 16000,
        "Peru": 155000,
        "Singapore": 39000,
        "Taiwan": 14000,
        "Thailand": 71000,
        "United Kingdom": 30000,
        "United States": 839000,
        "Total": 125089000
    },
    "Javanese": {
        "Australia": 13000,
        "Indonesia": 114670000,
        "Malaysia": 670000,
        "Netherlands": 35000,
        "Saudi Arabia": 31000,
        "Singapore": 92000,
        "Total": 115511000
    },
    "Kannada": {
        "India": 36464000,
        "Malaysia": 59000,
        "Singapore": 22000,
        "Total": 36545000
    },
    "Khmer": {
        "Australia": 35000,
        "Cambodia": 14925000,
        "Canada": 22000,
        "France": 71000,
        "Germany": 13000,
        "Korea, South": 46000,
        "Thailand": 65000,
        "United Kingdom": 11000,
        "United States": 255000,
        "Vietnam": 1320000,
        "Total": 16763000
    },
    "Korean": {
        "Argentina": 33000,
        "Australia": 102000,
        "Brazil": 47000,
        "Canada": 160000,
        "China": 2590000,
        "France": 11000,
        "Germany": 16000,
        "Iran": 18000,
        "Japan": 998000,
        "Korea, North": 25208000,
        "Korea, South": 49173000,
        "Kyrgyzstan": 17000,
        "Madagascar": 16000,
        "Mozambique": 45000,
        "New Zealand": 32000,
        "Philippines": 33000,
        "Russia": 156000,
        "Saudi Arabia": 179000,
        "Singapore": 11000,
        "Thailand": 13000,
        "Ukraine": 11000,
        "United Kingdom": 12000,
        "United States": 1510000,
        "Uzbekistan": 182000,
        "Vietnam": 85000,
        "Total": 80658000
    },
    "Kurdish, Northern": {
        "Armenia": 35000,
        "Austria": 25000,
        "Bahrain": 59000,
        "Belgium": 29000,
        "Denmark": 20000,
        "France": 84000,
        "Georgia": 12000,
        "Germany": 597000,
        "Greece": 21000,
        "Iran": 546000,
        "Iraq": 4001000,
        "Italy": 12000,
        "Kazakhstan": 53000,
        "Kyrgyzstan": 16000,
        "Lebanon": 293000,
        "Netherlands": 75000,
        "Russia": 65000,
        "Sweden": 11000,
        "Syria": 1418000,
        "Turkey": 9029000,
        "Turkmenistan": 50000,
        "United Kingdom": 27000,
        "United States": 52000,
        "Total": 16530000
    },
    "Latvian": {
        "Ireland": 22000,
        "Latvia": 1131000,
        "Russia": 19000,
        "United Kingdom": 117000,
        "United States": 85000,
        "Total": 1374000
    },
    "Lau": {
        "Solomon Islands": 28000,
        "Total": 28000
    },
    "Lithuanian": {
        "Canada": 11000,
        "Germany": 41000,
        "Ireland": 39000,
        "Latvia": 23000,
        "Lithuania": 2322000,
        "Norway": 39000,
        "Russia": 32000,
        "Spain": 20000,
        "United Kingdom": 167000,
        "United States": 39000,
        "Total": 2733000
    },
    "Madura": {
        "Indonesia": 7674000,
        "Malaysia": 57000,
        "Singapore": 28000,
        "Total": 7759000
    },
    "Maithili": {
        "India": 135000,
        "Nepal": 4787000,
        "Total": 4922000
    },
    "Malayalam": {
        "Bahrain": 61000,
        "Canada": 19000,
        "India": 34944000,
        "Israel": 11000,
        "Myanmar (Burma)": 23000,
        "Oman": 73000,
        "Qatar": 77000,
        "Singapore": 27000,
        "Sri Lanka": 11000,
        "United Arab Emirates": 326000,
        "United States": 85000,
        "Total": 35657000
    },
    "Maltese": {
        "Australia": 61000,
        "Canada": 13000,
        "Italy": 30000,
        "Malta": 410000,
        "United Kingdom": 48000,
        "United States": 38000,
        "Total": 600000
    },
    "Marathi": {
        "India": 64126000,
        "Israel": 11000,
        "Mauritius": 17000,
        "United States": 36000,
        "Total": 64190000
    },
    "Marwari": {
        "India": 540000,
        "Pakistan": 484000,
        "Total": 1024000
    },
    "Nepali": {
        "Australia": 63000,
        "China, Hong Kong": 17000,
        "India": 1872000,
        "Malaysia": 235000,
        "Myanmar (Burma)": 295000,
        "Nepal": 15930000,
        "United Arab Emirates": 99000,
        "United States": 57000,
        "Total": 18568000
    },
    "Norwegian": {
        "Canada": 46000,
        "Denmark": 19000,
        "Ecuador": 16000,
        "Norway": 4582000,
        "Spain": 16000,
        "Sweden": 37000,
        "United Kingdom": 18000,
        "United States": 45000,
        "Total": 4779000
    },
    "Odia": {
        "India": 22135000,
        "Myanmar (Burma)": 120000,
        "Total": 22255000
    },
    "Oromo": {
        "Ethiopia": 27534000,
        "Sudan": 105000,
        "United States": 51000,
        "Total": 27690000
    },
    "Pashto": {
        "Afghanistan": 12405000,
        "Denmark": 2500,
        "France": 39000,
        "Germany": 39000,
        "Pakistan": 30342000,
        "United Arab Emirates": 541000,
        "United Kingdom": 103000,
        "United States": 51000,
        "Austria": 37000,
        "Iran": 160000,
        "Tajikistan": 33000,
        "Total": 43752500
    },
    "Persian, Farsi": {
        "Afghanistan": 663000,
        "Australia": 60000,
        "Austria": 18000,
        "Bahrain": 220000,
        "Canada": 136000,
        "Denmark": 14000,
        "France": 65000,
        "Germany": 99000,
        "Iran": 37677000,
        "Iraq": 474000,
        "Japan": 50000,
        "Kuwait": 54000,
        "Malaysia": 42000,
        "Norway": 21000,
        "Oman": 64000,
        "Pakistan": 14000,
        "Qatar": 276000,
        "Saudi Arabia": 241000,
        "Sweden": 44000,
        "Syria": 54000,
        "Turkey": 685000,
        "Turkmenistan": 16000,
        "United Arab Emirates": 316000,
        "United Kingdom": 47000,
        "United States": 346000,
        "Uzbekistan": 34000,
        "Yemen": 22000,
        "Total": 41752000
    },
    "Polish": {
        "Argentina": 200000,
        "Australia": 74000,
        "Austria": 60000,
        "Azerbaijan": 31000,
        "Belarus": 291000,
        "Belgium": 52000,
        "Brazil": 211000,
        "Canada": 254000,
        "Czechia": 22000,
        "Denmark": 33000,
        "France": 130000,
        "Germany": 691000,
        "Greece": 12000,
        "Iceland": 11000,
        "Ireland": 129000,
        "Israel": 127000,
        "Italy": 90000,
        "Kazakhstan": 37000,
        "Latvia": 40000,
        "Lithuania": 161000,
        "Netherlands": 102000,
        "Norway": 99000,
        "Poland": 36289000,
        "Russia": 48000,
        "Serbia": 29000,
        "Spain": 76000,
        "Sweden": 58000,
        "Ukraine": 129000,
        "United Kingdom": 920000,
        "United States": 745000,
        "Total": 41151000
    },
    "Portuguese": {
        "Andorra": 12000,
        "Angola": 459000,
        "Argentina": 59000,
        "Australia": 22000,
        "Belgium": 36000,
        "Bolivia": 11000,
        "Brazil": 202583000,
        "Canada": 260000,
        "China, Hong Kong": 23000,
        "Czechia": 11000,
        "France": 598000,
        "Germany": 134000,
        "Italy": 39000,
        "Japan": 270000,
        "Luxembourg": 100000,
        "Malawi": 18000,
        "Mozambique": 2417000,
        "Netherlands": 19000,
        "Paraguay": 43000,
        "Portugal": 9712000,
        "Russia": 11000,
        "South Africa": 1854000,
        "Spain": 212000,
        "Switzerland": 261000,
        "United Kingdom": 219000,
        "United States": 998000,
        "Uruguay": 49000,
        "Venezuela": 180000,
        "Zimbabwe": 17000,
        "Total": 220627000
    },
    "Punjabi": {
        "Australia": 134000,
        "Canada": 512000,
        "India": 27199000,
        "Iran": 36000,
        "Japan": 71000,
        "Kenya": 67000,
        "Libya": 136000,
        "Malaysia": 68000,
        "Mauritius": 25000,
        "Myanmar (Burma)": 11000,
        "New Zealand": 20000,
        "Oman": 95000,
        "Saudi Arabia": 827000,
        "Singapore": 25000,
        "Tanzania": 68000,
        "Thailand": 62000,
        "United States": 153000,
        "Afghanistan": 37000,
        "Bangladesh": 19000,
        "Pakistan": 146124000,
        "Total": 175689000
    },
    "Romanian": {
        "Argentina": 16000,
        "Australia": 14000,
        "Austria": 87000,
        "Belgium": 36000,
        "Brazil": 21000,
        "Canada": 86000,
        "Cyprus": 26000,
        "Denmark": 16000,
        "France": 13000,
        "Germany": 364000,
        "Greece": 22000,
        "Hungary": 34000,
        "Ireland": 18000,
        "Italy": 1082000,
        "Kazakhstan": 15000,
        "Moldova": 3408000,
        "Netherlands": 12000,
        "Portugal": 35000,
        "Romania": 17152000,
        "Russia": 160000,
        "Serbia": 27000,
        "Spain": 822000,
        "Sweden": 17000,
        "Ukraine": 368000,
        "United Kingdom": 189000,
        "United States": 147000,
        "Total": 24187000
    },
    "Russian": {
        "Argentina": 32000,
        "Armenia": 12000,
        "Australia": 27000,
        "Austria": 17000,
        "Azerbaijan": 129000,
        "Belarus": 779000,
        "Belgium": 20000,
        "Brazil": 143000,
        "Canada": 111000,
        "China": 23000,
        "Cyprus": 11000,
        "Czechia": 14000,
        "Estonia": 308000,
        "Finland": 31000,
        "France": 130000,
        "Georgia": 27000,
        "Germany": 227000,
        "Greece": 12000,
        "Hungary": 13000,
        "Israel": 674000,
        "Italy": 31000,
        "Kazakhstan": 4306000,
        "Korea, South": 17000,
        "Kyrgyzstan": 404000,
        "Latvia": 457000,
        "Lithuania": 142000,
        "Mexico": 102000,
        "Moldova": 110000,
        "Norway": 20000,
        "Poland": 22000,
        "Romania": 21000,
        "Russia": 117780000,
        "Slovenia": 30000,
        "Spain": 55000,
        "Tajikistan": 27000,
        "Turkey": 36000,
        "Turkmenistan": 163000,
        "Ukraine": 7487000,
        "United Kingdom": 29000,
        "United States": 896000,
        "Uruguay": 14000,
        "Uzbekistan": 750000,
        "Yemen": 12000,
        "Total": 135651000
    },
    "Saraiki": {
        "Pakistan": 1209000,
        "Total": 1209000
    },
    "Serbian": {
        "Albania": 35000,
        "Australia": 85000,
        "Austria": 122000,
        "Bosnia-Herzegovina": 1013000,
        "Brazil": 21000,
        "Canada": 125000,
        "Croatia": 170000,
        "France": 26000,
        "Germany": 259000,
        "Kosovo": 111000,
        "Libya": 25000,
        "Luxembourg": 16000,
        "Montenegro": 487000,
        "Netherlands": 14000,
        "North Macedonia": 37000,
        "Norway": 15000,
        "Romania": 16000,
        "Serbia": 7617000,
        "Slovenia": 57000,
        "Sweden": 11000,
        "Switzerland": 94000,
        "United Kingdom": 14000,
        "United States": 47000,
        "Total": 10417000
    },
    "Sinhala": {
        "Australia": 113000,
        "Cyprus": 15000,
        "Italy": 60000,
        "Libya": 14000,
        "Oman": 16000,
        "Qatar": 55000,
        "Singapore": 17000,
        "Sri Lanka": 15683000,
        "Switzerland": 76000,
        "Thailand": 72000,
        "United States": 42000,
        "Total": 16163000
    },
    "Slovak": {
        "Austria": 37000,
        "Canada": 20000,
        "Czechia": 97000,
        "Germany": 57000,
        "Hungary": 33000,
        "Ireland": 11000,
        "Romania": 12000,
        "Serbia": 48000,
        "Slovakia": 4732000,
        "United Kingdom": 85000,
        "United States": 43000,
        "Total": 5175000
    },
    "Slovene": {
        "Argentina": 12000,
        "Austria": 31000,
        "Canada": 14000,
        "Germany": 83000,
        "Slovenia": 1765000,
        "Total": 1905000
    },
    "Somali": {
        "Australia": 14000,
        "Canada": 41000,
        "Djibouti": 543000,
        "Ethiopia": 7337000,
        "Kenya": 3347000,
        "Norway": 39000,
        "Saudi Arabia": 72000,
        "Somalia": 11175000,
        "South Africa": 24000,
        "Sweden": 46000,
        "Tanzania": 68000,
        "United Arab Emirates": 41000,
        "United Kingdom": 58000,
        "United States": 83000,
        "Yemen": 447000,
        "Total": 23335000
    },
    "Spanish": {
        "Andorra": 23000,
        "Angola": 14000,
        "Argentina": 39072000,
        "Aruba": 12000,
        "Australia": 156000,
        "Belgium": 63000,
        "Belize": 204000,
        "Bolivia": 7750000,
        "Brazil": 257000,
        "Canada": 573000,
        "Chile": 17077000,
        "Colombia": 49261000,
        "Costa Rica": 4841000,
        "Cuba": 11101000,
        "Dominican Republic": 10001000,
        "Ecuador": 15708000,
        "El Salvador": 6347000,
        "Equatorial Guinea": 23000,
        "France": 256000,
        "Germany": 151000,
        "Guatemala": 10415000,
        "Haiti": 46000,
        "Honduras": 9481000,
        "Italy": 285000,
        "Japan": 200000,
        "Mexico": 116570000,
        "Netherlands": 26000,
        "Nicaragua": 6280000,
        "Panama": 3099000,
        "Paraguay": 313000,
        "Peru": 24666000,
        "Puerto Rico": 2562000,
        "Spain": 29945000,
        "Sweden": 18000,
        "Switzerland": 78000,
        "United Kingdom": 242000,
        "United States": 43526000,
        "Uruguay": 3100000,
        "Venezuela": 26436000,
        "Virgin Islands (U.S.)": 12000,
        "Total": 440190000
    },
    "Sunda": {
        "Indonesia": 41136000,
        "Total": 41136000
    },
    "Swahili": {
        "Australia": 12000,
        "Burundi": 13000,
        "Canada": 342000,
        "Democratic Republic of the Congo": 54000,
        "Germany": 248000,
        "Italy": 126000,
        "Kenya": 286000,
        "Mozambique": 23000,
        "Oman": 50000,
        "Reunion": 25000,
        "Rwanda": 18000,
        "Saudi Arabia": 411000,
        "Somalia": 298000,
        "Sudan": 24000,
        "Tanzania": 1838000,
        "United Kingdom": 15000,
        "United States": 60000,
        "Zambia": 46000,
        "Total": 3889000
    },
    "Swedish": {
        "Canada": 27000,
        "Denmark": 22000,
        "Finland": 303000,
        "France": 13000,
        "Germany": 24000,
        "Norway": 42000,
        "Spain": 20000,
        "Sweden": 8849000,
        "United Kingdom": 35000,
        "United States": 70000,
        "Total": 9405000
    },
    "Tagalog": {
        "Australia": 244000,
        "Bahrain": 34000,
        "Brunei": 34000,
        "Canada": 526000,
        "China, Hong Kong": 134000,
        "Denmark": 11000,
        "France": 23000,
        "Germany": 39000,
        "Guam": 48000,
        "Indonesia": 84000,
        "Ireland": 13000,
        "Israel": 21000,
        "Italy": 141000,
        "Japan": 499000,
        "Korea, South": 57000,
        "Kuwait": 179000,
        "Lebanon": 21000,
        "Libya": 12000,
        "Malaysia": 478000,
        "New Zealand": 42000,
        "Nigeria": 20000,
        "Northern Mariana Islands": 11000,
        "Norway": 22000,
        "Oman": 24000,
        "Papua New Guinea": 13000,
        "Philippines": 34563000,
        "Qatar": 124000,
        "Saudi Arabia": 965000,
        "Singapore": 156000,
        "Spain": 31000,
        "Switzerland": 17000,
        "Taiwan": 152000,
        "United Arab Emirates": 303000,
        "United Kingdom": 63000,
        "United States": 2722000,
        "Total": 41826000
    },
    "Tamil": {
        "Australia": 74000,
        "Bahrain": 42000,
        "Canada": 27000,
        "Fiji": 77000,
        "Germany": 34000,
        "India": 57909000,
        "Italy": 30000,
        "Malaysia": 1912000,
        "Myanmar (Burma)": 149000,
        "Netherlands": 20000,
        "Oman": 108000,
        "Qatar": 28000,
        "Reunion": 44000,
        "Saudi Arabia": 69000,
        "Singapore": 109000,
        "South Africa": 32000,
        "Sri Lanka": 5109000,
        "Thailand": 35000,
        "United States": 90000,
        "Total": 65898000
    },
    "Telugu": {
        "Bahrain": 34000,
        "Fiji": 33000,
        "India": 73281000,
        "Malaysia": 119000,
        "Mauritius": 19000,
        "Myanmar (Burma)": 138000,
        "Saudi Arabia": 363000,
        "United States": 203000,
        "Total": 74190000
    },
    "Thai": {
        "Australia": 68000,
        "China, Hong Kong": 11000,
        "Denmark": 12000,
        "Germany": 21000,
        "Korea, South": 102000,
        "Laos": 143000,
        "Malaysia": 30000,
        "Myanmar (Burma)": 43000,
        "Norway": 21000,
        "Singapore": 46000,
        "Sweden": 31000,
        "Taiwan": 64000,
        "Thailand": 26985000,
        "United Kingdom": 26000,
        "United States": 183000,
        "Total": 27786000
    },
    "Turkish": {
        "Afghanistan": 11000,
        "Australia": 47000,
        "Austria": 121000,
        "Azerbaijan": 120000,
        "Belgium": 232000,
        "Bulgaria": 638000,
        "Canada": 28000,
        "Cyprus": 217000,
        "Denmark": 32000,
        "Egypt": 49000,
        "France": 221000,
        "Germany": 1566000,
        "Greece": 49000,
        "Iran": 11000,
        "Italy": 18000,
        "Jordan": 62000,
        "Kazakhstan": 56000,
        "Kosovo": 19000,
        "Kyrgyzstan": 47000,
        "Lebanon": 88000,
        "Libya": 30000,
        "Netherlands": 79000,
        "North Macedonia": 80000,
        "Norway": 20000,
        "Romania": 25000,
        "Russia": 55000,
        "Saudi Arabia": 34000,
        "Sweden": 33000,
        "Switzerland": 73000,
        "Syria": 285000,
        "Turkey": 65621000,
        "Turkmenistan": 53000,
        "United Kingdom": 51000,
        "United States": 197000,
        "Uzbekistan": 144000,
        "Venezuela": 27000,
        "Total": 70439000
    },
    "Ukrainian": {
        "Argentina": 32000,
        "Australia": 19000,
        "Azerbaijan": 23000,
        "Belarus": 154000,
        "Brazil": 34000,
        "Canada": 287000,
        "Czechia": 50000,
        "Estonia": 21000,
        "France": 23000,
        "Germany": 131000,
        "Greece": 14000,
        "Italy": 193000,
        "Kazakhstan": 463000,
        "Kyrgyzstan": 12000,
        "Latvia": 42000,
        "Lithuania": 13000,
        "Moldova": 178000,
        "Paraguay": 42000,
        "Poland": 49000,
        "Portugal": 49000,
        "Romania": 45000,
        "Russia": 1966000,
        "Spain": 85000,
        "Turkmenistan": 22000,
        "Ukraine": 32861000,
        "United Kingdom": 13000,
        "United States": 140000,
        "Uzbekistan": 49000,
        "Total": 37010000
    },
    "Urdu": {
        "Australia": 70000,
        "Bahrain": 76000,
        "Bangladesh": 921000,
        "Belgium": 32000,
        "Canada": 207000,
        "Denmark": 53000,
        "Germany": 23000,
        "Greece": 120000,
        "India": 159095000,
        "Iran": 90000,
        "Italy": 425000,
        "Malaysia": 15000,
        "Nepal": 1018000,
        "Norway": 61000,
        "Oman": 97000,
        "Pakistan": 1887000,
        "Qatar": 176000,
        "Saudi Arabia": 769000,
        "South Africa": 15000,
        "Spain": 126000,
        "Turkey": 24000,
        "United States": 302000,
        "Total": 165602000
    },
    "Uzbek, Northern": {
        "China": 22000,
        "Kazakhstan": 528000,
        "Korea, South": 55000,
        "Kyrgyzstan": 925000,
        "Mongolia": 26000,
        "Pakistan": 279000,
        "Russia": 296000,
        "Tajikistan": 1123000,
        "Turkmenistan": 422000,
        "Ukraine": 11000,
        "United States": 26000,
        "Uzbekistan": 27199000,
        "Total": 30912000
    },
    "Vietnamese": {
        "Australia": 227000,
        "Cambodia": 825000,
        "Canada": 163000,
        "China": 23000,
        "China, Hong Kong": 47000,
        "Czechia": 71000,
        "France": 325000,
        "Germany": 66000,
        "Japan": 14000,
        "Korea, South": 151000,
        "Laos": 122000,
        "Malaysia": 101000,
        "Norway": 24000,
        "Poland": 45000,
        "Russia": 14000,
        "Taiwan": 225000,
        "Thailand": 122000,
        "United Kingdom": 14000,
        "United States": 1664000,
        "Vietnam": 81559000,
        "Total": 85802000
    },
    "Yoruba": {
        "Benin": 208000,
        "Burkina Faso": 72000,
        "Côte d'Ivoire": 121000,
        "Equatorial Guinea": 62000,
        "Gambia": 11000,
        "Ghana": 495000,
        "Italy": 57000,
        "Liberia": 24000,
        "Niger": 75000,
        "Nigeria": 40650000,
        "Togo": 127000,
        "United Kingdom": 101000,
        "United States": 195000,
        "Total": 42198000
    },
    "Grand Total": {
        "Total": 5551682000
    }
};


//*** Class used to create language objects for selected languages
class Language {

    constructor(language_name) {
        this.name = language_name;
        this.worldwide_GDP;
        this.language_pops_by_country = [];
        this.primary_color;
        this.secondary_color;        

        //this.assign_color();
        this.get_language_data();        
    }

    assign_color() {               
        let available_color_pairs = subject.available_colors;
        let color_pair = available_color_pairs.pop();
        
        this.primary_color = color_pair[0];
        this.secondary_color = color_pair[1];

        subject.unavailable_colors.push(color_pair);        
    }

    unassign_color() {        
        let temp_array = []
        for(let i=0; i<subject.unavailable_colors.length; i++) {
            let color_pair = subject.unavailable_colors[i];
            let primary_color = color_pair[0]

            if(primary_color == this.primary_color) {
                subject.available_colors.push(color_pair);             
            }
            else {
                temp_array.push(color_pair);
            }
        }

        subject.unavailable_colors = temp_array;
        this.primary_color = null;
        this.secondary_color = null;
    }

    get_language_data() {        
        this.worldwide_GDP = 0;

        for (let i=0; i<subject.countries.length; i++) {  
            
            let country = subject.countries[i];

            if (pops_by_lang[this.name][country.name]) {                
                let language_pop = pops_by_lang[this.name][country.name];

                let total_country_pop = 0;
                let per_capita_gdp = 0
                let lang_gdp = 0;                                
                for (let j=0; j<data_by_country.length; j++) {

                    if (data_by_country[j].country == country.name) {
                        let country_data = data_by_country[j];
                        total_country_pop += country_data.population;                        
                        per_capita_gdp += country_data.gdpPerCapita;                        
                        lang_gdp += per_capita_gdp*language_pop;                                                                       
                    }
                }

                let language_percent = (total_country_pop == 0) ? 0 : (language_pop/total_country_pop)*100;
                let rounded_lang_percent = (language_percent < 0.5)? 0.5 : Math.round(language_percent); 
                let language_data_by_country = {

                    Country: country.name,                        
                    Population: language_pop,
                    Percent: rounded_lang_percent,
                    PerCapitaGDP: per_capita_gdp,
                    LangGDP: lang_gdp
                };

                this.language_pops_by_country.push(language_data_by_country); 
                this.worldwide_GDP += lang_gdp;                                                  
            }
        } 
        
        this.language_pops_by_country.sort(function(a,b) {
            return b.Population - a.Population;
        });        
    }    
}



class Country {
     
    constructor(name, svg_element) {                
        this.name = name;        
        this.svg_element = svg_element

        /* live laguages for a country object are languages that 
        are spoken in this country AND are selected by user */
        this.live_languages_in_country = [];  

        /* 'other' is an object that represents the poportion
        of the country population that do not speak a 'live language' */
        this.other = {
            Language: 'Other',
            Percent: 100
        };
    }
    

    update_live_country_languages() {
         
        this.other.Percent = 100;            
        let temp_array = [];
        for (let i=0; i<subject.selected_langs_array.length; i++) {

            let selected_lang = subject.selected_langs_array[i];
            let lang_data_for_each_country = selected_lang.language_pops_by_country;            

            for (let j=0; j<lang_data_for_each_country.length; j++) {
                                
                let lang_data_for_a_country = lang_data_for_each_country[j];
                if (lang_data_for_a_country.Country == this.name) {   
                                                            
                    //create language_data object
                    let language_data = {
                        Language: selected_lang.name,
                        Population: lang_data_for_a_country.Population,
                        Percent: parseInt(lang_data_for_a_country.Percent),
                        PerCapitaGDP: lang_data_for_a_country.PerCapitaGDP
                    }

                    temp_array.push(language_data);                    
                    this.other.Percent -= language_data.Percent;                    
                }
            }            
        }
        this.live_languages_in_country = temp_array;
        this.live_languages_in_country.push(this.other);
        this.sort_live_country_languages();
    }


    sort_live_country_languages() {
        this.live_languages_in_country.sort(function(a,b) {
            return b.Percent - a.Percent;
        });
    }    
}


class Subject {

    constructor(selected_languages, countries) { 

        this.selected_langs_array = [];
        this.languages_in_panel = [];         

        this.countries = countries;   
        
        this.available_colors = color_palette_array;         
        this.unavailable_colors = [];             
        this.max_selected_langs = this.available_colors.length;

        //add all languages passed to constructor
        for(let i=0; i<selected_languages.length; i++) {
            this.add_language(selected_languages[i]);
        }

    }

    get_language(language_name) {
        for(let i=0; i<this.selected_langs_array.length; i++) {
            let language = this.selected_langs_array[i];
            if(language_name == language.name) return language;
            else continue;
        }
    }    

    //*** Update all observers with current data
    update_observers() {
        this.update_language_panel();
        this.update_world_map();
        this.update_selectbox();               
    }

    //*** add language to selected languages
    add_language(language) {
        language.assign_color();
        this.selected_langs_array.push(language);                  
        this.language_count += 1;        
        this.update_observers();
    }

    //*** remove language from selected languages
    remove_language(language) {
        let temp_array = [];        
        for (let i=0; i<this.selected_langs_array.length; i++) {
            let lang = this.selected_langs_array[i];
            
            if (lang.name == language.name) continue;
            else temp_array.push(lang); 
        }
        this.selected_langs_array = temp_array;                  
        this.language_counter -= 1;  

        for(let i=0; i<this.countries.length; i++) {
            let country = this.countries[i];
            country.update_live_country_languages();
            country.sort_live_country_languages();
        }  

        this.language_count -= 1;
        language.unassign_color();
        this.update_observers();          
    }   

    //*** add country to countries
    add_country(country) {
        this.countries.push(country);
        this.language_counter += 1;
    }
    

    //*** update the data displayed in the language panel
    update_language_panel() {          
        for (let i=0; i<this.selected_langs_array.length; i++)  {

            let selected_lang = this.selected_langs_array[i];              
            if(this.languages_in_panel.includes(selected_lang)) continue;
            else {                
                add_language_data_to_panel(selected_lang, selected_lang.primary_color, selected_lang.secondary_color);
                this.languages_in_panel.push(selected_lang); 
            }                
        }
    }


    //*** update the data displayed in the world map
    update_world_map() {

        let linear_gradients = document.getElementsByClassName('linear-gradient');        
        for(let i=0; i<linear_gradients.length; i++) {            
            let linear_gradient = linear_gradients[i]; 

            //get and remove all stops (children)           
            let children = linear_gradient.children;                                                       
            for (let j = (children.length - 1); j>=0; j--) {                           
                let child = children[j];
                child.remove();                 
            }            
        }                
        for(let i=0; i<this.countries.length; i++) {
            let country = this.countries[i];
            country.update_live_country_languages();
        }
        display_lang_data_on_map();           
    }

    //*** update the choices in the selectbox
    update_selectbox() {
        //start up new instance of choices
        choices.removeActiveItems();
        choices.destroy()
        choices.init();   
                     
        //update max number of selections that user can make
        choices.config.maxItemCount = (this.max_selected_langs - this.selected_langs_array.length);                                            
        

        //get all languages from json data and set them as options in selectbox
        for (language in pops_by_lang) {
    
            let lang_is_selected = false;    
            for(let i=0; i<this.selected_langs_array.length; i++) {

                let selected_lang = this.selected_langs_array[i].name;    
                if (language == selected_lang) lang_is_selected = true;                
            }            
            
            console.log(choices);

            if (lang_is_selected) continue;            
            else choices.setChoices([{ value: language, label: `${language} - ` }]); choices.config.itemSelectText = `${pops_by_lang[language]['Total']} Speakers`;
        }  

        //ADD IMG TO EACH CHOICE IN SELECTBOX//
        for (let i=2; i<100; i++) {
        
            let choice_element = document.getElementById(`choices--country-selectbox-item-choice-${i}`);
            console.log(choice_element);
            choice_element.style.left = '0%';
            choice_element.style.width = 'auto';
            //choice_element.style.border = '1px solid black';
            choice_element.style.textAlign = '200px';
            choice_element.style.paddingLeft = '25%'
    
            //let choice_element = choices_elements[i];
            let img = document.createElement('img');
            img.setAttribute('src', './images/temp_image.jpg');
            let width = 18;
            img.style.width = `15%`;
            img.style.height = `75%`;
            img.style.border = '1px solid black';
            img.style.borderRadius = '5px';
            img.style.top = '10%';
            img.style.left = '3%';
            img.style.zIndex = '999';
            img.style.position = 'absolute';
            choice_element.appendChild(img);
        }        


        //update max item count in choices
        if(choices.config.maxItemCount == 0) {
            choices.config.addItems = false;
        } else {
            choices.config.addItems = true;
        }        
    } 
}

const starting_lang_names = ['English', 'Spanish', 'Arabic', 
                             'Russian', 'French', 'Dutch',
                             'Portuguese', 'Afrikaans', 'Swedish'];
let starting_langs = [];
let countries = []

const subject = new Subject(starting_langs, countries);


///////////
//SELECTBOX
///////////
let choices;
function set_choices_selectbox() {    

    //create Choices object for selectbox
    const element = document.querySelector('[data-choice]');

    choices = new Choices(element, {
        position: 'bottom',
        noResultsText: 'No results found',
        removeItems: true,
        addItems: true,
        removeItemButton: true,
        renderChoiceLimit: 100,
        searchResultLimit: 100,
        maxItemCount: subject.max_selected_langs,
        searchFields: ['label', 'value'],
        duplicateItemsAllowed: false,
        itemSelectText: ``,
        /*sorter: (a, b) => {
            return a - b;
        },*/
        maxItemText: (maxItemCount) => {
            return 'A maximum of infinite languages can currently be selected at a time';
        }       
    });
    
    let choices_elements = document.getElementsByClassName('choices__item choices__item--choice choices__item--selectable');
    //console.log(choices_elements);

    
    

    //get all languages from json data and set them as options in selectbox    
    for (language in pops_by_lang) {            
      

        //set up Choices values
        choices.setChoices(
            [{
                //value: my_value,
                //label: my_label
            }]
        );
    }

    //event listener for 'Add Languages' button
    let add_language_btn = document.getElementById('choices-input-btn');
    add_language_btn.addEventListener(
    'click',
    function(e) {
        
        let selected_langs = choices.getValue(true); 
        let temp_array = [];


        for (let i = 0; i < selected_langs.length; i++) {
            let language_name = selected_langs[i];                        

            let selected_lang = new Language(language_name, primary_color, secondary_color);
            subject.add_language(selected_lang);                                                                      
        }                                     
    }
    );
}

set_choices_selectbox();



///////////////////
//Environment Setup
///////////////////


//add linear gradient to every svg element
function add_linear_gradients() {
    for (let i = 0; i < svg_countries.length; i++) {                            

        let svg = svg_countries[i];
        let country = svg.children[0].getAttribute('id');
        let xmlns = "http://www.w3.org/2000/svg";
    
        let defs = document.createElementNS(xmlns, 'defs');
        let linearGradient = document.createElementNS(xmlns, 'linearGradient');
    
        //linear_gradients.push(linearGradient);
    
        linearGradient.setAttribute('class', 'linear-gradient');
        linearGradient.setAttribute('id', country + '_gradient');
        linearGradient.setAttribute('x1', '0%');
        linearGradient.setAttribute('y1', '100%');
        linearGradient.setAttribute('x2', '0%');
        linearGradient.setAttribute('y2', '0%');
    
    
        svg.appendChild(defs);
        defs.appendChild(linearGradient);    
    }
}
add_linear_gradients();



function generate_country_details_panel() {
    //COUNTRY DETAILS PANEL
    for(let i=0; i<svg_countries.length; i++) {
        let country = svg_countries[i]; 

        country.addEventListener(
            'click',
            function(e) {
                let parent_elem = document.getElementById('country-details-container');
                for(let i=(parent_elem.children.length-1); i>=0; i--) {
                    parent_elem.children[i].remove();
                }

                //add country details panel
                let svg_country_details = document.createElement('div');
                svg_country_details.setAttribute('class', 'country-details-panel')                             
                

                
                //SVG MANIPULATION            
                //create clone and get svg path
                /*
                let clone = country.cloneNode(true);
                let path = clone.children[0].getAttribute('d');                   
                */
                //set new path
                //let new_path = path.replace(/(m)\s*\d*\.\d*,\s?\d*\.\d*/, '$1 0,0');
                //clone.children[0].setAttribute('d', new_path);                         
                //get bbox
                /*
                let bbox = country.getBBox();                     
                clone.setAttribute('class', 'svg-country-clone');                 
                clone.style.opacity = '1';
                clone.style.position = 'absolute';                                            
                //clone.setAttribute('viewBox', '0 0 100 100');
                clone.setAttribute('viewBox', '0 0 ' + bbox.width + ' ' + bbox.height);           
                clone.style.overflow = 'visible';                                                       
                svg_country_details.appendChild(clone);
                */

                //add country name in country details panel
                let country_name = document.createElement('div');
                country_name.setAttribute('class', 'country-details country-name');
                country_name.innerHTML = country.children[0].getAttribute('title'); 
                svg_country_details.appendChild(country_name); 

                //add 'close panel' button
                let close_country_details_btn = document.createElement('button');
                close_country_details_btn.setAttribute('class', 'remove-btn remove-country');
                close_country_details_btn.innerHTML = 'X';
                close_country_details_btn.addEventListener(
                    'click',                
                    function(e) {                    
                        parent_elem.removeChild(svg_country_details);
                        parent_elem.removeChild(close_country_details_btn);
                    }
                );            

                //add country data container
                let language_data_container = document.createElement('div');
                language_data_container.setAttribute('class', 'language-data-container');
                svg_country_details.appendChild(language_data_container);
                
                //add language data to country details panel for each country        
                let language_data_array = [];                  
                for(language in pops_by_lang) {                                
                    let country_pop_for_lang = pops_by_lang[language][country_name.innerHTML];
                    let language_data_for_country = document.createElement('div');  
                    if(country_pop_for_lang) {                                            
                        language_data_for_country.setAttribute('class', 'country-panel-lang-data');
                        language_data_for_country.setAttribute('pop-value', country_pop_for_lang);
                        language_data_for_country.innerHTML = language + ': ' + country_pop_for_lang;                                        
                        language_data_array.push(language_data_for_country);                                           
                    }                                
                    //sort array of languages in details panel
                    language_data_array.sort(function(a,b) {
                        return b.getAttribute('pop-value') - a.getAttribute('pop-value');
                    })                    
                }     
                
                for(let i=0; i<language_data_array.length; i++) {
                    let language_data_for_country = language_data_array[i];
                    language_data_container.appendChild(language_data_for_country); 
                }
                
                //parent_elem.appendChild(close_country_details_btn);         
                parent_elem.appendChild(svg_country_details);            
                $('.country-details-panel').css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow');
            }
        );
    }
}
generate_country_details_panel();


//////////
//TOOLTIPS
//////////

function set_up_tooltips() {

    //set up tippy tools for every country
    for (let i = 0; i < svg_countries.length; i++) {
        let country_name = svg_countries[i].children[0].getAttribute('title');
        svg_countries[i].children[0].setAttribute('data-tippy-content', country_name);
    } 

    tippy('.tippy', {              
        animation: 'scale',         
        duration: 200,              
        arrow: true,                
        delay: [0, 50],             
        arrowType: 'sharp',         
        theme: 'light',             
        maxWidth: 220,              
        followCursor: true,
        inertia: false,
        multiple: true,                
    });       
}
set_up_tooltips();

function set_up_panzoom() {
    
}
set_up_panzoom();
    


//** SVG WORLD MAP AND INDIVIDUAL COUNTRIES **//

function set_up_svg_map() {
    //create panzoom svg object
    const svgElement = document.querySelector('#svg-map');
    const panZoomMap = svgPanZoom(svgElement, {
        mouseWheelZoomEnabled: false,
        controlIconsEnabled: true,
        fit: true,
        contain: true,
        maxZoom: 40,
        preventMouseEventsDefault: true
    });  
    
    panZoomMap.zoomOut();
}
set_up_svg_map();

function display_lang_data_on_map() {    

    for (let i = 0; i < subject.countries.length; i++) {

        try {
            //get all relevant html elements
            let svg_country_path = subject.countries[i].svg_element.children[0]; 
            let country_id = svg_country_path.getAttribute('id'); 
            let linearGradient = document.getElementById(country_id + '_gradient');                
            let xmlns = "http://www.w3.org/2000/svg";                                                                  

            let country = subject.countries[i];                                                        
            let country_data = country.live_languages_in_country;        

            let offset = 0;            

            //add 'other' stops           
            let other = country.other.Percent;
            if(isNaN(other)) throw e;

            let new_stop_3 = document.createElementNS(xmlns, 'stop');
            new_stop_3.setAttribute("offset", `${offset}%`);
            new_stop_3.setAttribute("style", "stop-color:rgb(165, 165, 165); stop-opacity:1");                   
            
            offset += other;        

            let new_stop_4 = document.createElementNS(xmlns, 'stop');
            new_stop_4.setAttribute("offset", `${offset}%`);
            new_stop_4.setAttribute("style", "stop-color:rgb(165, 165, 165); stop-opacity:1");            

            linearGradient.appendChild(new_stop_3);
            linearGradient.appendChild(new_stop_4);
                            
            setTimeout( function() {}

            )
            for(let j=0; j<country_data.length; j++) {

                let language_data_for_country = country_data[j];              
                let language_name = language_data_for_country.Language;             
                let language_percent = language_data_for_country.Percent;

                if(language_name == 'Other') continue;
                let color = subject.get_language(language_name).primary_color;                

                //add new stops                        
                let new_stop_1 = document.createElementNS(xmlns, 'stop');
                new_stop_1.setAttribute("offset", "" + offset + "%");
                new_stop_1.setAttribute("style", "stop-color:" + color + "; stop-opacity:1");                   
                
                let new_stop_2 = document.createElementNS(xmlns, 'stop');
                new_stop_2.setAttribute("offset", `${(offset + language_percent)}%`);
                new_stop_2.setAttribute("style", `stop-color:${color}; stop-opacity:1`);
                        
                linearGradient.appendChild(new_stop_1);
                linearGradient.appendChild(new_stop_2);                 
                
                offset += language_percent;
            }                  
            
            svg_country_path.setAttribute('fill', 'url(#' + country_id + '_gradient)');
        }
        catch (e) {
            console.error(`Could not find data for country: ${subject.countries[i].name}`);
        }
       
    }    
}


//set events for each country
for (let i = 0; i < svg_countries.length; i++) {
    let country = svg_countries[i];

    //display country info in panel
    country.addEventListener('click', function(e) {
        selected_country = country;        
    })
    
    country.addEventListener('mouseover', function(e) {
        country.style.opacity = '0.7';                
    })

    //reset border color on mouseout event
    country.addEventListener('mouseout', function(e) {        
        country.style.opacity = '1';        
    })
}


/** LANGUAGE PANEL **/

function add_language_data_to_panel(selected_lang) {        
    //get parent element
    let parent_elem = document.getElementById('language-data-inner');

    //create container for new language data entry
    let new_entry_container = document.createElement('div');
    new_entry_container.setAttribute('class', 'panel-data-row-container');  
    
    //add 'remove entry' button
    let remove_entry_btn = document.createElement('button');
    remove_entry_btn.setAttribute('class', 'remove-btn remove-lang');    
    remove_entry_btn.innerHTML = 'X'; 

    //add language name in title
    let new_lang_entry = document.createElement('button');
    new_lang_entry.setAttribute('class', 'panel-data-row language-name-btn');
    new_lang_entry.innerHTML = selected_lang.name;    

    //add color icon
    let new_color_icon = document.createElement('button');
    new_color_icon.setAttribute('class', 'color-icon');
    new_color_icon.style.backgroundColor = selected_lang.primary_color;
    new_lang_entry.appendChild(new_color_icon);

    //add online presence data in title
    let new_online_presence_entry = document.createElement('button');
    new_online_presence_entry.setAttribute('class', 'panel-data-row online-presence-btn');
    new_online_presence_entry.innerHTML = pops_by_lang[selected_lang.name]["Total"];  
    
    //add gdp of market data in title
    let new_gdp_entry = document.createElement('button');
    new_gdp_entry.setAttribute('class', 'panel-data-row gdp-btn');  
    let gdp_pretty_print = make_gdp_pretty(selected_lang.worldwide_GDP);    
    new_gdp_entry.innerHTML = gdp_pretty_print;
                    
    //add language details container and data (drop-down)  
    let language_details_container = document.createElement('div');      
    language_details_container.setAttribute('class', 'language-details-container'); 
    generate_language_details(selected_lang, language_details_container);
            
    //append all new child elements
    parent_elem.appendChild(new_entry_container);
    new_entry_container.appendChild(new_lang_entry);
    new_entry_container.appendChild(new_online_presence_entry);
    new_entry_container.appendChild(new_gdp_entry);
    new_entry_container.appendChild(remove_entry_btn);    
    new_entry_container.appendChild(language_details_container);


    //** DEFINING EVENTS FOR NEWLY CREATED ELEMENTS **//

    //sort details alphabetically
    new_lang_entry.addEventListener(
        'click', 
        function(e) {               

            let countries_that_contain_lang = selected_lang.language_pops_by_country;
            countries_that_contain_lang.sort(function(a,b) {    
                let text1 = a.Country.toUpperCase();
                let text2 = b.Country.toUpperCase();            
                return (text1 < text2) ? -1 : (text1 >= text2) ? 1 : 0;
            });                        

            generate_language_details(selected_lang, language_details_container);
        }
    );

    //sort details by population
    new_online_presence_entry.addEventListener(
        'click',
        function(e) {
            let countries_that_contain_lang = selected_lang.language_pops_by_country;
            countries_that_contain_lang.sort(function(a,b) {                                    
                return b.Population - a.Population;
            });                        

            generate_language_details(selected_lang, language_details_container);
        }
    );

    //sort details by lang gdp
    new_gdp_entry.addEventListener(
        'click', 
        function(e) {
            let countries_that_contain_lang = selected_lang.language_pops_by_country;
            countries_that_contain_lang.sort(function(a,b) {                                    
                return b.LangGDP - a.LangGDP;
            });

            generate_language_details(selected_lang, language_details_container);
        }
    );

    //remove-entry button event            
    remove_entry_btn.addEventListener(
        'click',
        function(e) {                                
            subject.remove_language(selected_lang);            
            remove_entry_btn.parentElement.remove();
        }
    );
        
    //new data row events
    new_entry_container.addEventListener(
      'mouseover',
      function(e) {
          new_entry_container.style.backgroundColor = secondary_color;
          language_details_container.style.visibility = 'visible';
          new_entry_container.style.borderBottom = '1px solid #cac9c9';
      }
    );

    new_entry_container.addEventListener(
      'mouseout',
      function(e) {          
          language_details_container.style.visibility = 'hidden';
          new_entry_container.style.borderBottom = 'none';                   
      }
    );
}


function generate_language_details(language, language_details_container) {            

    //remove data in details container that was there before
    for(let i=(language_details_container.children.length-1); i>=0; i--) {        
        language_details_container.children[i].remove();        
    }
 
    //replace with same data but sorted in user-requested manner    
    let countries_that_contain_lang = language.language_pops_by_country;           
    for (let i=0; i<countries_that_contain_lang.length; i++) {
                            
        let country_data = countries_that_contain_lang[i];

        //get country name and population
        let country_name = country_data.Country;        
        let language_pop = country_data.Population; 
        //get gdp of language speakers in country        
        let country_gdp_for_lang = (isNaN(country_data.LangGDP))? NaN : (country_data.LangGDP);
        let pretty_gdp = make_gdp_pretty(country_gdp_for_lang);           
        
        //add language details row (in drop-down)
        let language_details = document.createElement('div');
        language_details.setAttribute('class', 'language-details');                 
        
        let country = document.createElement('div');
        country.setAttribute('class', 'language-data-point country-column');
        country.innerText = country_name;

        let population = document.createElement('div');
        population.setAttribute('class', 'language-data-point population-column');
        population.innerText = language_pop;

        let gdp = document.createElement('div');
        gdp.setAttribute('class', 'language-data-point gdp-column');
        gdp.innerText = pretty_gdp;
        
        language_details.appendChild(country);
        language_details.appendChild(population);
        language_details.appendChild(gdp);
        language_details_container.appendChild(language_details);        
    }  

    return language_details_container;
}




//initialize things (probably should change this at some point)
for(let i=0; i<svg_countries.length; i++) {
    let svg_country = svg_countries[i];
    let country_name = svg_country.children[0].getAttribute('title');
    let country = new Country(country_name, svg_country);
    subject.add_country(country);
}

for(let i=0; i<starting_lang_names.length; i++) {        
    let new_lang = new Language(starting_lang_names[i]);
    subject.add_language(new_lang);        
}






///////////////////
//UTILITY FUNCTIONS
///////////////////


function make_gdp_pretty(gdp) {
    let trillion = 1000000000000; let billion = 1000000000; 
    //determine how to present gdp (in billions or trillions)       
    let formated_gdp = (gdp >= trillion)? gdp/trillion : gdp/billion;
    formated_gdp = Math.round(formated_gdp);
    let pretty_gdp = (gdp >= trillion)? `$${formated_gdp} T` : `$${formated_gdp} B`;    
    return pretty_gdp;
}


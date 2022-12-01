// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css';

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import gsap from 'gsap';
import { svg } from 'd3';
import * as m from './map.js';

console.log('Hello, world!');

// getRanking();

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': '4a7a27e753mshe8c1eed5f04fb1dp1b9763jsna989b692cae0',
//     'X-RapidAPI-Host': 'api-formula-1.p.rapidapi.com',
//   },
// };

// fetch(
//   'https://api-formula-1.p.rapidapi.com/rankings/drivers?season=2022',
//   options
// )
//   .then((response) => response.json())
//   .then((data) => {
//     const name = data.response;
//     // console.log(name);
//     name.forEach((element) => {
//       const driverName = element.driver.name;
//       const driverImg = element.driver.image;
//       // console.log(driverImg);
//       // console.log(driverName);
//       const markup = `<li>${driverName}</li>`;
//       const markupImg = `<img src='${driverImg}' alt='${driverName}'>`;
//       document.querySelector('ul').insertAdjacentHTML('beforeend', markupImg);
//     });
//   })
//   .catch((err) => console.error(err));

fetch('../public/data/f1rankings.json')
  .then((response) => response.json())
  .then((data) => {
    const rakingArray = data.response;
    console.log(rakingArray);

    //forEach ranking
    rakingArray.forEach((element) => {
      const driverPostition = element.position;
      const driverName = element.driver.name;
      const driverImg = element.driver.image;
      const driverPoints = element.points;

      //HTML markup
      const markup = `<li>
      <h2>${driverPostition}</h2>
    	<img src="${driverImg}" alt="${driverName}">
      <h3>${driverName}</h3>
    	<p>${driverPoints}</p>
      </li>`;

      document.querySelector('.listD').insertAdjacentHTML('beforeend', markup);
    });

    const top4Driver = rakingArray.slice(0, 5);
    console.log(top4Driver);
    top4Driver.forEach((e) => {
      const top4DriverImg = e.driver.image;
      const top4DriverName = e.driver.name;
      console.log(top4DriverImg);

      const top4DriverMarkup = `<li class='imgLi'>

      <img src="${top4DriverImg}" alt="${top4Driver}">

      </li>`;
      document
        .querySelector('.imgDriver')
        .insertAdjacentHTML('beforeend', top4DriverMarkup);
    });
  })

  .catch((err) => console.error(err));

const dataSet = [
  { driver: 'VER', winst: 15 },
  { driver: 'LEC', winst: 3 },
  { driver: 'PER', winst: 2 },
  { driver: 'SAI', winst: 1 },
  { driver: 'RUS', winst: 1 },
];

const chartWidth = 400;
const chartHeight = 300;

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataSet, (d) => d.winst)])
  .range([0, chartWidth]);

const yScale = d3
  .scaleBand()
  .domain(d3.map(dataSet, (d) => d.driver))
  .range([0, chartHeight])
  .paddingInner(0.35);

//Om text labels toe te voegen hebben we twee
//elementen nodig: <rect> en <text>. Om dit te
//organiseren zetten we die samen in een <g>
//De structuur die we willen is dus:
// <g>
//   <rect/>
//   <text/>
// </g>

//In plaats van dat we direct een join doen om
//de balken te maken, doen we een join om lege
//<g> groepen te maken. Die join actie bewaren
//als 'bars'
const bars = d3.select('#bars').selectAll('g').data(dataSet).join('g');

//Nu gaan we die lege groepen vullen met bars
//met de append() functie voegen we een element
//toe aan de <g> tag die we eerder hebben gemaakt
bars
  .append('rect')
  .attr('height', yScale.bandwidth())
  .attr('width', (d) => xScale(d.winst))
  .attr('y', (d) => yScale(d.driver))
  .attr('rx', 5);

//Nu doen we dat nog een keer maar dan voor <text>
bars
  .append('text')
  .attr('y', (d) => yScale(d.driver) + yScale.bandwidth() / 2)
  .attr('x', (d) => xScale(d.winst) + 20)
  .text((d) => d.winst);

d3.select('#labels')
  .selectAll('text')
  .data(dataSet)
  .join('text')
  .attr('y', (d) => yScale(d.driver) + yScale.bandwidth() / 2)
  .text((d) => d.driver);

//leaft let

const coords = [
  {
    name: 'Bahrain International Circuit',
    longlat: [33.763489, -118.193649],
    winner: 'Charles Leclerc',
  },
  {
    name: 'Jeddah Corniche Circuit',
    longlat: [21.61264, 39.10806],
    winner: 'Max Verstappen',
  },
  {
    name: 'Albert Park Street Circuit',
    longlat: [-37.84452, 144.94651],
    winner: 'Charles Leclerc',
  },
  {
    name: 'Autodromo Enzo e Dino Ferrari',
    longlat: [44.34425020604998, 11.719518298678329],
    winner: 'Max Verstappen',
  },

  {
    name: 'Miami International Autodrome',
    longlat: [25.956777117916822, -80.23150098991948],
    winner: 'Max Verstappen',
  },
  {
    name: 'Circuit de Barcelona-Catalunya',
    longlat: [41.56830708666628, 2.2571188084700045],
    winner: 'Max Verstappen',
  },
  {
    name: 'Circuit de Monaco',
    longlat: [43.73486454785762, 7.421411392106805],
    winner: 'Sergio Perez',
  },

  {
    name: 'Baku City Circuit',
    longlat: [40.37282816855186, 49.85295629315864],
    winner: 'Max Verstappen',
  },

  {
    name: 'Circuit Gilles Villeneuve',
    longlat: [45.501528363448784, -73.52803410120104],
    winner: 'Max Verstappen',
  },
  {
    name: 'Silverstone Circuit',
    longlat: [52.073295900672065, -1.0148545602668675],
    winner: 'Carlos Sainz Jr.',
  },
  {
    name: 'Red Bull Ring',
    longlat: [47.22315229010509, 14.76129439965457],
    winner: 'Charles Leclerc',
  },

  {
    name: 'Circuit Paul Ricard',
    longlat: [43.25108100419511, 5.793438680986409],
    winner: 'Max Verstappen',
  },

  {
    name: 'Hungaroring',
    longlat: [47.58132751634226, 19.25095392155147],
    winner: 'Max Verstappen',
  },
  {
    name: 'Circuit van Spa-Francorchamps',
    longlat: [50.436576937266786, 5.971899795181605],
    winner: 'Max Verstappen',
  },
  {
    name: 'Circuit Zandvoort',
    longlat: [52.38760986011846, 4.544008951045924],
    winner: 'Max Verstappen',
  },

  {
    name: 'Autodromo Nazionale Monza',
    longlat: [45.61970904196297, 9.287476258857936],
    winner: 'Max Verstappen',
  },

  {
    name: 'Marina Bay Street Circuit',
    longlat: [1.2944204060642202, 103.86663581786028],
    winner: 'Sergio Perez',
  },
  {
    name: 'Circuit Suzuka',
    longlat: [34.84562870078928, 136.53838357031526],
    winner: 'Max Verstappen',
  },
  {
    name: 'Circuit of the Americas',
    longlat: [30.134209628415075, -97.63584037264167],
    winner: 'Max Verstappen',
  },

  {
    name: 'Autódromo Hermanos Rodríguez',
    longlat: [19.405068316076758, -99.09237308256166],
    winner: 'Max Verstappen',
  },
  {
    name: 'Autódromo José Carlos Pace',
    longlat: [-23.701332343097416, -46.697707638342],
    winner: 'George Russel',
  },
  {
    name: 'Yas Marina Circuit',
    longlat: [24.473429941219667, 54.60418912684601],
    winner: 'Max Verstappen',
  },
];

var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/maarwaarom/clb2etvk200d115oktiskpzer/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFhcndhYXJvbSIsImEiOiJjbGF0aWw2aHMwMWJwM3FsNGcyZDJ1NnY0In0.yVsF9VnckgXKerO30_gogA',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">Mapbox</a>',
  }
).addTo(map);

var myIcon = L.icon({
  iconUrl: 'public/images/flag2.png',
  iconSize: [40, 40],
  iconAnchor: [5, 40],
  popupAnchor: [15, -33],
});

// var marker = L.marker([51.5, -0.09]).addTo(map);
// var markerD = L.marker([20.5, -0.09]).addTo(map);
// marker.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();
// markerD.bindPopup('<b>Hello world!</b><br>I am a popup.').openPopup();

coords.forEach(({ name, longlat, winner }) => {
  L.marker(longlat, { icon: myIcon })
    .addTo(map)
    .bindPopup(`<h2>${name}</h2> <p>Winner of the GP: <b>${winner}</b></p>`);
});

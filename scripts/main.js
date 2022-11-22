// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css';

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import gsap from 'gsap';
import { svg } from 'd3';

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

fetch('../data/f1rankings')
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

      document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
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

// Our bundler automatically creates styling when imported in the main JS file!
import '../styles/style.css';

// We can use node_modules directely in the browser!
import * as d3 from 'd3';
import gsap from 'gsap';
import { svg } from 'd3';
import * as co from './map.js';

//FETCH F1 RANKING
fetch('../data/f1rankings.json')
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

//BARCHART
function updateChart(idNumber) {
  idNumber = Number(idNumber);
  const dataSet = filterData(idNumber);
  drawChart(dataSet);
}

function filterData(idNumber) {
  const dataSet = [
    { id: 1, driver: 'VER', winst: 15 },
    { id: 1, driver: 'LEC', winst: 3 },
    { id: 1, driver: 'PER', winst: 2 },
    { id: 1, driver: 'RUS', winst: 1 },
    { id: 1, driver: 'SAI', winst: 1 },
    { id: 2, driver: 'VER', winst: 5 },
    { id: 2, driver: 'LEC', winst: 3 },
    { id: 2, driver: 'PER', winst: 3 },
    { id: 2, driver: 'RUS', winst: 4 },
    { id: 2, driver: 'SAI', winst: 2 },
  ];

  return dataSet.filter((d) => d.id === idNumber);
}

function drawChart(dataSet) {
  const chartWidth = 550;
  const chartHeight = 300;

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataSet, (d) => d.winst)])
    .range([0, chartWidth]);

  console.log(dataSet);

  const yScale = d3
    .scaleBand()
    .domain(d3.map(dataSet, (d) => d.driver))
    .range([0, chartHeight])
    .paddingInner(0.05);

  d3.select('#bars')
    .selectAll('rect')
    .data(dataSet)
    .join('rect')
    .transition()
    .duration(500)
    .attr('height', yScale.bandwidth() - 20)
    .attr('width', (d) => xScale(d.winst))
    .attr('y', (d) => yScale(d.driver))
    .attr('rx', 5);

  const bars = d3
    .select('#bars')
    .selectAll('text')
    .data(dataSet)
    .join('text')
    .transition()
    .duration(500)
    .attr('y', (d) => yScale(d.driver) + yScale.bandwidth() / 2)
    .attr('x', (d) => xScale(d.winst) + 20)
    .text((d) => d.winst);

  d3.select('#labels')
    .selectAll('text')
    .data(dataSet)
    .join('text')
    .attr('y', (d) => yScale(d.driver))
    .text((d) => d.driver);
}

window.addEventListener('DOMContentLoaded', (e) => {
  d3.selectAll('button').on('click', (e) => updateChart(e.target.value));
  updateChart(1);
});

const filterItem = document.querySelector('.buttonFilter');
window.onload = () => {
  filterItem.onclick = (selectedItem) => {
    if (selectedItem.target.classList.contains('btn')) {
      filterItem.querySelector('.active').classList.remove('active');
      selectedItem.target.classList.add('active');
    }
  };
};

//LEAFLET

var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/maarwaarom/clb2etvk200d115oktiskpzer/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibWFhcndhYXJvbSIsImEiOiJjbGF0aWw2aHMwMWJwM3FsNGcyZDJ1NnY0In0.yVsF9VnckgXKerO30_gogA',
  {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">Mapbox</a>',
  }
).addTo(map);

//ICON
var myIcon = L.icon({
  iconUrl: '../images/flag2.png',
  iconSize: [40, 40],
  iconAnchor: [5, 40],
  popupAnchor: [15, -33],
});

//WINNAAR GP
co.coords.forEach(({ name, longlat, winner }) => {
  L.marker(longlat, { icon: myIcon })
    .addTo(map)
    .bindPopup(`<h2>${name}</h2> <p>Winner of the GP: <b>${winner}</b></p>`);
});

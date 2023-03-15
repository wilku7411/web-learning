"use strict";

const xLabels = [];
const yTemps = [];
const globalMeanTemp = 14.0;

async function getDataFromCSV(CSVfile)
{
    const resultYears = [];
    const resultTemps = [];
    
    const response = await fetch(CSVfile);
    const data = await response.text();

    let table = data.split('\n');
    table = table.slice(1);

    table.forEach(row => {
        const columns = row.split(',');
        const year = columns[0];
        resultYears.push(year);
        const temp = columns[1];
        resultTemps.push(parseFloat(temp) + globalMeanTemp);
        console.log(year, temp);
    });
    return {resultYears, resultTemps};
}

async function createChart(htmlElement)
{
    const resultMap = await getDataFromCSV("ZoneTemp.csv");

    new Chart(htmlElement, {
      type: 'line',
      data: {
        labels: resultMap.resultYears,
        datasets: [{
          label: 'Global avg. temperatures',
          data: resultMap.resultTemps,
          borderWidth: 1,
          fill: true,
          backgroundColor: 'rgba(0, 255, 255, 0.2)',
          borderColor: 'rgba(255, 0, 0, 1.0)'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
            ticks:
            {
                callback: function(value, index, values)
                {
                    return value + '°'; // alt+0176
                }
            }
          }
        }
      }
    });
}

const ctx = document.getElementById('chart');
createChart(ctx);
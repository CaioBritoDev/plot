import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Chart from 'chart.js/auto';

export default function Graph() {
  const router = useRouter();
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const chartRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Function to extract labels and values from query parameters
    const extractLabelsAndValues = () => {
      const { labels: labelParams, values: valueParams } = router.query;
      const labelsArray = labelParams ? labelParams.split(',') : [];
      const valuesArray = valueParams ? valueParams.split(',').map(Number) : [];
      setLabels(labelsArray);
      setValues(valuesArray);
    };

    // Call the function when the component mounts
    extractLabelsAndValues();
  }, [router.query]);

  useEffect(() => {
    // Plot the graph when labels and values are updated
    if (chartRef.current) {
      const newChart = chartRef.current;
      newChart.data.labels = labels;
      newChart.data.datasets[0].data = values;
      newChart.update();
    } else if (labels.length > 0 && values.length > 0) {
      const ctx = document.getElementById('myChart');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Values',
            data: values,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  const value = context.parsed.y;
                  return `R$ ${value.toFixed(2).replace('.', ',')}`;
                }
              }
            }
          },
          scales: {
            y: {
              ticks: {
                callback: function(value) {
                  return `R$ ${value.toFixed(2).replace('.', ',')}`;
                }
              }
            }
          }
        }
      });

      // Update chartRef with the new chart instance
      chartRef.current = newChart;
    }
  }, [labels, values]);

  return (
    <div id="chart-container" ref={containerRef} style={{ width: '100%', height: '450px' }}>
      <canvas id="myChart"></canvas>
    </div>
  );
}

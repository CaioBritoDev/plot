import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Chart from 'chart.js/auto';

export default function Graph() {
  const router = useRouter();
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const chartRef = useRef(null);

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
    const ctx = document.getElementById('myChart');

    // Destroy previous chart instance if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (ctx && labels.length > 0 && values.length > 0) {
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
        options: {}
      });

      // Update chartRef with the new chart instance
      chartRef.current = newChart;
    }
  }, [labels, values]);

  return (
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
}

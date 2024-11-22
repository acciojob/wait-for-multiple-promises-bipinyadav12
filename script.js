// Utility function to generate a promise that resolves after a random time between 1 and 3 seconds
const createRandomPromise = (id) => {
  const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, time: time.toFixed(3) }), time * 1000);
  });
};

// Start time for measuring total duration
const startTime = performance.now();

// Create an array of 3 promises
const promises = [
  createRandomPromise(1),
  createRandomPromise(2),
  createRandomPromise(3)
];

// Wait for all promises to resolve
Promise.all(promises).then((results) => {
  // Calculate total time taken
  const totalTime = ((performance.now() - startTime) / 1000).toFixed(3);

  // Get reference to the table body and remove the loading row
  const tableBody = document.getElementById('output');
  const loadingRow = document.getElementById('loading');
  if (loadingRow) tableBody.removeChild(loadingRow);

  // Add rows for each promise result
  results.forEach(({ id, time }) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>Promise ${id}</td><td>${time}</td>`;
    tableBody.appendChild(row);
  });

  // Add row for total time
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
  tableBody.appendChild(totalRow);
});

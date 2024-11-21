//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => { 
  const tableBody = document.getElementById("output");

  // Add the loading row
  const loadingRow = document.createElement("td");
  const loadingCell = document.createElement("tr"); 
  loadingCell.colSpan = 2;
  loadingCell.textContent = "Loading...";
  loadingRow.appendChild(loadingCell);
  tableBody.appendChild(loadingRow);

  // Generate a random time between 1 and 3 seconds
  const getRandomTime = () => (Math.random() * 2 + 1).toFixed(3);

  // Create 3 promises
  const promises = [1, 2, 3].map((_, index) =>
    new Promise((resolve) => {
      const time = getRandomTime();
      setTimeout(() => resolve({ name: `Promise ${index + 1}`, time: parseFloat(time) }), time * 1000);
    })
  );

  // Start timer
  const startTime = performance.now();

  // Use Promise.all to resolve all promises
  Promise.all(promises).then((results) => {
    // Remove the loading row
    tableBody.innerHTML = "";

    // Populate the table with resolved promises
    results.forEach(({ name, time }) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      const timeCell = document.createElement("td");
      nameCell.textContent = name;
      timeCell.textContent = time.toFixed(3);
      row.appendChild(nameCell);
      row.appendChild(timeCell);
      tableBody.appendChild(row);
    });

    // Calculate total time
    const totalTime = (performance.now() - startTime) / 1000;

    // Add the total row
    const totalRow = document.createElement("tr");
    const totalNameCell = document.createElement("td");
    const totalTimeCell = document.createElement("td");
    totalNameCell.textContent = "Total";
    totalTimeCell.textContent = totalTime.toFixed(3);
    totalRow.appendChild(totalNameCell);
    totalRow.appendChild(totalTimeCell);
    tableBody.appendChild(totalRow);
  });
});

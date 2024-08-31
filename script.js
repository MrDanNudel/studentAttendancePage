document.addEventListener("DOMContentLoaded", function () {
  const checkboxes = document.querySelectorAll("input.attended");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const row = this.closest("tr");
      if (!this.checked) {
        row.classList.add("row-not-attended");
      } else {
        row.classList.remove("row-not-attended");
      }
    });
  });
});

function exportToTextFile() {
  const rows = document.querySelectorAll("table tr");
  let data = "";

  rows.forEach((row, index) => {
    const cells = row.querySelectorAll("td, th");
    let rowData = [];
    cells.forEach((cell) => {
      if (cell.querySelector('input[type="checkbox"]')) {
        rowData.push(cell.querySelector("input").checked ? "Yes" : "No");
      } else {
        rowData.push(cell.innerText);
      }
    });
    data += rowData.join("\t") + "\n";
  });

  // Create a Blob from the data
  const blob = new Blob([data], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);

  // Create a link element to download the file
  const a = document.createElement("a");
  a.href = url;
  a.download = "attendance.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

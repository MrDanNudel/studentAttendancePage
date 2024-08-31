document.addEventListener("DOMContentLoaded", function () {
  const classData = {
    Sport: [
      {
        name: "John",
        lastName: "Doe",
        phone: "123-456-7890",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
      {
        name: "Jane",
        lastName: "Smith",
        phone: "234-567-8901",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
      {
        name: "Emily",
        lastName: "Jones",
        phone: "345-678-9012",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
      {
        name: "Michael",
        lastName: "Brown",
        phone: "456-789-0123",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
      {
        name: "Sarah",
        lastName: "Davis",
        phone: "567-890-1234",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
    ],
    Math: [
      {
        name: "Alice",
        lastName: "Wilson",
        phone: "678-901-2345",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
      {
        name: "Bob",
        lastName: "Taylor",
        phone: "789-012-3456",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
      {
        name: "Charlie",
        lastName: "Anderson",
        phone: "890-123-4567",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
      {
        name: "Diana",
        lastName: "Thomas",
        phone: "901-234-5678",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
      {
        name: "Ethan",
        lastName: "Jackson",
        phone: "012-345-6789",
        attended: true,
        signed: true,
        date: "2024-08-31",
      },
    ],
  };

  // Initial setup
  const classSelect = document.getElementById("classSelect");
  const tableBody = document.getElementById("tableBody");
  const classNameText = document.querySelector(".class-name");

  // Function to update table based on selected class
  function updateTable() {
    const selectedClass = classSelect.value;
    const students = classData[selectedClass];

    // Clear current table rows
    tableBody.innerHTML = "";

    // Populate table with data
    students.forEach((student) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.lastName}</td>
          <td>${student.phone}</td>
          <td><input type="checkbox" class="attended" ${
            student.attended ? "checked" : ""
          }></td>
          <td><input type="checkbox" class="signed" ${
            student.signed ? "checked" : ""
          }></td>
          <td>${student.date}</td>
        `;
      tableBody.appendChild(row);
    });

    // Update the class name text
    classNameText.textContent = selectedClass;
  }

  // Event listener for class select dropdown
  classSelect.addEventListener("change", updateTable);

  // Initial table load
  updateTable();

  // Handle row color change on checkbox change
  document.addEventListener("change", function (e) {
    if (e.target && e.target.classList.contains("attended")) {
      const row = e.target.closest("tr");
      if (!e.target.checked) {
        setTimeout(() => row.classList.add("row-not-attended"), 2);
      } else {
        row.classList.remove("row-not-attended");
      }
    }
  });

  // Export table data to text file
  document
    .getElementById("exportButton")
    .addEventListener("click", function () {
      const rows = document.querySelectorAll("table tr");
      let data = `Class: ${classSelect.value}\n\n`;
      data += "Name | Last Name | Phone Number | Attended | Signed | Date\n";
      data += "----------------------------------------------------------\n";

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td, th");
        let rowData = [];
        cells.forEach((cell) => {
          if (cell.querySelector('input[type="checkbox"]')) {
            rowData.push(cell.querySelector("input").checked ? "Yes" : "No");
          } else {
            rowData.push(cell.innerText.trim());
          }
        });
        data += rowData.join(" | ") + "\n";
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
    });
});

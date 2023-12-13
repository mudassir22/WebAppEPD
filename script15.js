document.addEventListener("DOMContentLoaded", function () {
  // Fetch JSON data
  fetch("example.json")
    .then(response => response.json())
    .then(data => {
      const stateDropdown = document.getElementById("stateName");
      const zoneDropdown = document.getElementById("zoneName");
      const numberDropdown = document.getElementById("displayNumber");

      // Populate States
      data.states.forEach(state => {
        const stateOption = document.createElement("option");
        stateOption.value = state.value;
        stateOption.textContent = state.label;
        stateDropdown.appendChild(stateOption);
      });

      // Event listener for State change
      stateDropdown.addEventListener("change", function () {
        const selectedState = stateDropdown.value;
        populateZones(selectedState);
      });

      // Event listener for Zone change
      zoneDropdown.addEventListener("change", function () {
        const selectedZone = zoneDropdown.value;
        populateNumbers(selectedZone);
      });
    })
    .catch(error => console.error("Error fetching JSON:", error));
});

function populateZones(selectedState) {
  fetch("example.json")
    .then(response => response.json())
    .then(data => {
      const zoneDropdown = document.getElementById("zoneName");

      // Clear existing options
      zoneDropdown.innerHTML = "<option value=''>Select Zone</option>";

      // Populate Zones based on the selected State
      const stateData = data.states.find(state => state.value === selectedState);
      if (stateData && stateData.zones) {
        stateData.zones.forEach(zone => {
          const zoneOption = document.createElement("option");
          zoneOption.value = zone.value;
          zoneOption.textContent = zone.label;
          zoneDropdown.appendChild(zoneOption);
        });
      }
    })
    .catch(error => console.error("Error fetching JSON:", error));
}

function populateNumbers(selectedZone) {
  fetch("example.json")
    .then(response => response.json())
    .then(data => {
      const numberDropdown = document.getElementById("displayNumber");

      // Clear existing options
      numberDropdown.innerHTML = "<option value=''>Select Display Number</option>";

      // Populate Numbers based on the selected Zone
      const zoneData = data.states.flatMap(state => state.zones).find(zone => zone.value === selectedZone);
      if (zoneData && zoneData.numbers) {
        zoneData.numbers.forEach(number => {
          const numberOption = document.createElement("option");
          numberOption.value = number.value;
          numberOption.textContent = number.label;
          numberDropdown.appendChild(numberOption);
        });
      }
    })
    .catch(error => console.error("Error fetching JSON:", error));
}

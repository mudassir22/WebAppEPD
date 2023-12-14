function toggleContent(option) {
  const textContent = document.getElementById('textContent');
  const imageContent = document.getElementById('imageContent');
  const textButton = document.querySelector('.toggle-button:nth-child(1)');
  const imageButton = document.querySelector('.toggle-button:nth-child(2)');

  if (option === 'text') {
    textContent.style.display = 'block';
    imageContent.style.display = 'none';
    textButton.classList.add('active')
    imageButton.classList.remove('active');
  } else if (option === 'image') {
    textContent.style.display = 'none';
    imageContent.style.display = 'block';
    textButton.classList.remove('active');
    imageButton.classList.add('active');
  }

  document.getElementById('contentContainer').style.display = 'block';
}

function displayClearButton() {
  const fileInput = document.getElementById('fileInput');
  const clearButton = document.querySelector('.clear-button');
  const fileName = fileInput.value.split(/\\|\//).pop();

  clearButton.style.display = fileName ? 'block' : 'none';
}


function sendRequest() {
  const textInput = document.getElementById("textInput");
  const fileInput = document.getElementById("fileInput");
  const textContent = document.getElementById('textContent');
  
  // Get selected values from the form
  const state = document.getElementById("stateName").value;
  const zone = document.getElementById("zoneName").value;
  const displayNumber = document.getElementById("displayNumber").value;

  // Check if required values are selected
  if (!state || !zone || !displayNumber) {
    alert("Please select State, Zone, and Display Number before sending data.");
    return;
  }

  // Update the URL dynamically
  const baseUrl = "https://d6bb-122-160-48-182.ngrok-free.app";
  const dynamicUrl = `/${state}/POST/data-channel/${zone}/${displayNumber}`;

  if (textContent.style.display === 'block') {
    // Send text data
    fetch(baseUrl + dynamicUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: textInput.value }),
    })
      .then(response => response.text())
      .then(responseData => {
        alert("Server response: " + responseData);
        textInput.value = "";
      })
      .catch(error => {
        alert("Error: " + error);
      });
  } else {
    // Send image data
    sendImage(fileInput, baseUrl + dynamicUrl);
  }
}

async function sendImage(fileInput, url) {
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.text();
    alert("Server response: " + responseData);
    fileInput.value = null;
    displayClearButton();
  } catch (error) {
    alert("Error: " + error.message);
  }
}




/*
function sendRequest() {
    // Get selected values from the form
    var state = document.getElementById("stationName").value;
    var zone = document.getElementById("zoneName").value;
    var displayNumber = document.getElementById("displayNumber").value;

    // Check if it's text or image content
    var content;
    if (document.getElementById("textButton").classList.contains("active")) {
    content = document.getElementById("textInput").value;
    } else {
    // For image, you may need to handle file uploading, here's a basic example
    var fileInput = document.getElementById("fileInput");
    var file = fileInput.files[0];

    // Create a FormData object to send the file
    var formData = new FormData();
    formData.append("file", file);

    content = formData;
    }

    // Send data to the server
    fetch(' https://13b7-122-160-48-182.ngrok-free.app', {
    method: 'POST',
    body: content,
    headers: {
        'Content-Type': 'application/json', // Adjust content type based on your server requirements
        // You might need to include additional headers, like authentication headers
    },
    })
    .then(response => response.json())
    .then(data => {
    console.log('Success:', data);
    // Handle success response from the server
    })
    .catch((error) => {
    console.error('Error:', error);
    // Handle error
    });
}
*/



/*

     const jsonData = {
          "states": [
            {
              "name": "Delhi",
              "zones": [
                {"name": "Zone A", "displayNumbers": ["1A", "2A", "3A", "4A", "AllA"]},
                {"name": "Zone B", "displayNumbers": ["1B", "2B", "3B", "4B", "AllB"]},
                
              ]
            },
            {
              "name": "Mumbai",
              "zones": [
                {"name": "Zone X", "displayNumbers": ["1X", "2X", "3X", "4X", "AllX"]},
                {"name": "Zone Y", "displayNumbers": ["1Y", "2Y", "3Y", "4Y", "AllY"]},
                
              ]
            },
            {
              "name": "Chennai",
              "zones": [
                {"name": "Zone M", "displayNumbers": ["1M", "2M", "3M", "4M", "AllM"]},
                {"name": "Zone N", "displayNumbers": ["1N", "2N", "3N", "4N", "AllN"]},
                
              ]
            }            
          ]
     };

    // Function to update dropdown options
    function updateDropdown(elementId, options) {
      const dropdown = document.getElementById(elementId);
      dropdown.innerHTML = '';

      options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
      });
    }

    // Function to update state options
    function updateStateOptions() {
      const states = jsonData.states;

      updateDropdown('stateName', states.map(state => state.name));

      // Trigger initial update for zones based on the default state
      updateZoneOptions();
    }

    // Function to update zone options
    function updateZoneOptions() {
      const selectedState = document.getElementById('stateName').value;
      const selectedStateObject = jsonData.states.find(state => state.name === selectedState);

      if (selectedStateObject) {
        updateDropdown('zoneName', selectedStateObject.zones.map(zone => zone.name));
        updateDisplayNumberOptions(); // Update display numbers based on the default zone
      }
    }

    // Function to update display number options
    function updateDisplayNumberOptions() {
      const selectedState = document.getElementById('stateName').value;
      const selectedZone = document.getElementById('zoneName').value;

      const selectedStateObject = jsonData.states.find(state => state.name === selectedState);
      const selectedZoneObject = selectedStateObject.zones.find(zone => zone.name === selectedZone);

      if (selectedZoneObject) {
        updateDropdown('displayNumber', selectedZoneObject.displayNumbers);
      }
    }

    // Initial updates
    updateStateOptions();

    // Event listeners to update options based on user selections
    document.getElementById('stateName').addEventListener('change', updateZoneOptions);
    document.getElementById('zoneName').addEventListener('change', updateDisplayNumberOptions);

    */


    /*
   fetch('selection.json')
  .then(response => response.json())
  .then(jsonData => {
    // Function to update dropdown options
    function updateDropdown(elementId, options) {
      const dropdown = document.getElementById(elementId);
      dropdown.innerHTML = '';

      options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
      });
    }

    // Function to update state options
    function updateStateOptions() {
      const states = jsonData.states;
      updateDropdown('stateName', states.map(state => state.name));

      // Trigger initial update for zones based on the default state
      updateZoneOptions();
    }

    // Function to update zone options
    function updateZoneOptions() {
      const selectedState = document.getElementById('stateName').value;
      const selectedStateObject = jsonData.states.find(state => state.name === selectedState);

      if (selectedStateObject) {
        updateDropdown('zoneName', selectedStateObject.zones.map(zone => zone.name));
        updateDisplayNumberOptions(); // Update display numbers based on the default zone
      }
    }

    // Function to update display number options
    function updateDisplayNumberOptions() {
      const selectedState = document.getElementById('stateName').value;
      const selectedZone = document.getElementById('zoneName').value;

      const selectedStateObject = jsonData.states.find(state => state.name === selectedState);
      const selectedZoneObject = selectedStateObject.zones.find(zone => zone.name === selectedZone);

      if (selectedZoneObject) {
        updateDropdown('displayNumber', selectedZoneObject.displayNumbers);
      }
    }

    // Initial updates
    updateStateOptions();

    // Event listeners to update options based on user selections
    document.getElementById('stateName').addEventListener('change', updateZoneOptions);
    document.getElementById('zoneName').addEventListener('change', updateDisplayNumberOptions);
  })
  .catch(error => console.error('Error fetching JSON:', error));

  */
/*
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
*/

document.addEventListener("DOMContentLoaded", function () {
  // Fetch JSON data
  fetch("example.json")
    .then(response => response.json())
    .then(data => {
      const stateDropdown = document.getElementById("stateName");
      const zoneDropdown = document.getElementById("zoneName");
      const numberDropdown = document.getElementById("displayNumber");

      // Add default options
      addDefaultOption(stateDropdown, "Select State");
      addDefaultOption(zoneDropdown, "Select Zone");
      addDefaultOption(numberDropdown, "Select Display Number");

      // Populate States
      data.states.forEach(state => {
        const stateOption = createOption(state.value, state.label);
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

function addDefaultOption(dropdown, label) {
  const defaultOption = createOption("", label);
  dropdown.appendChild(defaultOption);
}

function createOption(value, label) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  return option;
}

function populateZones(selectedState) {
  fetch("example.json")
    .then(response => response.json())
    .then(data => {
      const zoneDropdown = document.getElementById("zoneName");

      // Clear existing options
      zoneDropdown.innerHTML = "";
      
      // Add default option
      addDefaultOption(zoneDropdown, "Select Zone");

      // Populate Zones based on the selected State
      const stateData = data.states.find(state => state.value === selectedState);
      if (stateData && stateData.zones) {
        stateData.zones.forEach(zone => {
          const zoneOption = createOption(zone.value, zone.label);
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
      numberDropdown.innerHTML = "";
      
      // Add default option
      addDefaultOption(numberDropdown, "Select Display Number");

      // Populate Numbers based on the selected Zone
      const zoneData = data.states.flatMap(state => state.zones).find(zone => zone.value === selectedZone);
      if (zoneData && zoneData.numbers) {
        zoneData.numbers.forEach(number => {
          const numberOption = createOption(number.value, number.label);
          numberDropdown.appendChild(numberOption);
        });
      }
    })
    .catch(error => console.error("Error fetching JSON:", error));
}


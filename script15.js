// script.js
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
  // Implement your logic to send data to the server
  alert('Data sent successfully!');
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



     const jsonData = {
          "states": [
            {
              "name": "Delhi",
              "zones": [
                {"name": "Zone A", "displayNumbers": ["1A", "2A", "3A", "4A", "AllA"]},
                {"name": "Zone B", "displayNumbers": ["1B", "2B", "3B", "4B", "AllB"]},
                // Add more zone data as needed
              ]
            },
            {
              "name": "Mumbai",
              "zones": [
                {"name": "Zone X", "displayNumbers": ["1X", "2X", "3X", "4X", "AllX"]},
                {"name": "Zone Y", "displayNumbers": ["1Y", "2Y", "3Y", "4Y", "AllY"]},
                // Add more zone data as needed
              ]
            }
            // Add more state data as needed
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
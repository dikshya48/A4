document.addEventListener('DOMContentLoaded', () => {
  const breedSelect = document.getElementById('breed-select');
  const getImageBtn = document.getElementById('get-image');
  
  const dogImage = document.getElementById('dog-image');
  const loading = document.getElementById('loading');
  
  fetchBreeds();
  
  getImageBtn.addEventListener('click', () => {

      const selectedBreed = breedSelect.value;
      if (selectedBreed) {
          fetchDogImage(selectedBreed);
      } else {
          alert('Please select a breed first');
      }
  });
  
  async function fetchBreeds() {
      try {
          const response = await fetch('/breeds');
          const data = await response.json();
          
          if (data.status === 'success') {


              breedSelect.innerHTML = '';
              
              const defaultOption = document.createElement('option');

              defaultOption.value = '';


              defaultOption.textContent = 'Select a breed';
              breedSelect.appendChild(defaultOption);
              
              data.message.forEach(breed => {
                  const option = document.createElement('option');
                  option.value = breed;
                  option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
                  breedSelect.appendChild(option);
              });
          } else {
              throw new Error('Failed to fetch breeds');
          }
      } catch (error) {
          console.error('Error fetching breeds:', error);
          breedSelect.innerHTML = '<option value="">Error loading breeds</option>';
      }
  }
  
  async function fetchDogImage(breed) {
      try {
          loading.classList.remove('hidden');
          dogImage.classList.add('hidden');
          
          const response = await fetch(`/image/${breed}`);
          const data = await response.json();
          
          if (data.status === 'success') {
              dogImage.src = data.message;
              dogImage.alt = `A ${breed} dog`;
              
              loading.classList.add('hidden');
              dogImage.classList.remove('hidden');
          } else {
              throw new Error('Failed to fetch dog image');
          }
      } catch (error) {
          console.error('Error fetching dog image:', error);
          loading.classList.add('hidden');
          alert('Error loading dog image. Please try again.');
      }
  }
});
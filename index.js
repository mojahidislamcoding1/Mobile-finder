// Load all Phone code start
const loadAllPhones = async (status, searchValue) => {
  // Hide spinner if it exists in DOM
  const spinner = document.getElementById('spinner');
  if (spinner) {
    spinner.style.display = "none";
  }

  const query = searchValue ? searchValue : "iphone";
  const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${query}`);
  const data = await response.json();

  // যদি উল্টাপাল্টা টাইপ করা হয় বা কোনো মোবাইল না পাওয়া যায়
  if (!data.data || data.data.length === 0) {
    displayError("No phone found! Please search with a valid name.");
    return;
  }

  // ডেটা পাওয়া গেলে লিস্ট দেখাবে
  if (status) {
    displayAllPhones(data.data);
  } else {
    displayAllPhones(data.data.slice(0, 10));
  }
}

// Load all Phone code end


const displayError = (message) => {
  const phoneContainer = document.getElementById('phones-container');
  // সব কার্ড মুছে ফেলা হবে এবং এরর মেসেজ দেখানো হবে
  phoneContainer.innerHTML = `
    <div id="spinner" style="display: none;"></div>
    <div class="text-center w-full py-10">
      <h2 class="text-2xl font-bold text-red-500">${message}</h2>
    </div>
  `;
}




// Display all phone code start 
const displayAllPhones = (phones) => {
  const phoneContainer = document.getElementById('phones-container');
  // Re-insert the spinner HTML so it remains present in the container for future searches
  phoneContainer.innerHTML = `<div id="spinner" style="display: none;"></div>`;

  phones.forEach(phone => {
    const { brand, image, phone_name, slug } = phone;
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="card bg-base-100 w-96 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="${image}" alt="Phone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${brand}</h2>
          <h2 class="card-title">${phone_name}</h2>
          <div class="card-actions">
            <button onclick="phoneDetails('${slug}')" class="btn btn-primary text-white">Show Details</button>
          </div>
        </div>
      </div>
    `;
    phoneContainer.appendChild(div);
  });
}
// Display all phone code end 

// Global variable to keep track of current search term
let currentSearchTerm = "iphone";

// Handle Show All button click event
const handleShowAll = () => {
  loadAllPhones(true, currentSearchTerm);
}

// Search button click event
const handleSearch = () => {
  
const searchInput = document.getElementById('search-box');
  const searchValue = searchInput.value.trim();

  if (!searchValue) return; // খালি রেখে সার্চ চাপলে কিছু হবে না

  currentSearchTerm = searchValue; // Show All-এর জন্য সার্চ টার্ম সংরক্ষণ

  const phoneContainer = document.getElementById('phones-container');
  phoneContainer.innerHTML = `<div id="spinner" style="display: block;"></div>`;
  
  // সার্চ ইনপুট ফিল্ড খালি করে দেওয়া
  searchInput.value = '';
  
  setTimeout(function() {
    loadAllPhones(false, searchValue);
  }, 2000); // Reduced delay for faster response
}

// Phone details section start
const phoneDetails = async (slugs) => {
  const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`);
  const data = await response.json();

  const { brand, name, slug, image } = data.data;
  const modalContainer = document.getElementById('modal-container');

  modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal flex justify-center items-center">
      <div class="modal-box">
        <h3 class="text-lg font-bold">${brand}</h3> <br>
        <img src="${image}" alt="Phone" class="rounded-xl" />
        <p class="py-2 text-xl font-bold">${name}</p>
        <p>The ultimate performance and camera of any device, with exceptional battery life.</p>
        <p class="py-2">${slug}</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">❌</button>
          </form>
        </div>
      </div>
    </dialog>
  `;
  document.getElementById('my_modal_1').showModal();
}

// Initial load
loadAllPhones(false, "iphone");
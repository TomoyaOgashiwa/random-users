const container = document.getElementById('user-container');
const button = document.getElementById('load-users');

function fetchUsers() {
  container.innerHTML = 'Loading...';

  fetch('https://randomuser.me/api' , {
    method: 'GET',
    headers: {
      'Content-Type': "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      container.innerHTML = ''; // Clear loading text

      for(const user of data.results){
        const div = document.createElement('div');
        div.className = 'user-card';
        div.innerHTML = `
          <img src="${user.picture.thumbnail}" alt="${user.name.first}" />
          <div>
            <p><strong>${user.name.first} ${user.name.last}</strong></p>
            <p>${user.email}</p>
            <p>${user.location.city}, ${user.location.country}</p>
          </div>
        `;
        container.appendChild(div);
      }
    })
    .catch(error => {
      container.innerHTML = 'Failed to load users.';
      console.error('Error fetching users:', error);
    });
}

// Call on page load
window.addEventListener('DOMContentLoaded', fetchUsers);

// Call when button is clicked
button.addEventListener('click', fetchUsers);

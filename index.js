const container = document.getElementById('user-card');
const button = document.getElementById('load-users');

function fetchUser() {
  container.innerHTML = 'Loading...';

  fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
      const user = data.results[0];
      const fullName = `${user.name.first} ${user.name.last}`;
      const dob = new Date(user.dob.date);
      const dobStr = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`;
      const age = user.dob.age;

      container.innerHTML = `
        <img src="${user.picture.large}" alt="${fullName}" />
        <h2>${fullName}</h2>
        <div class="info">
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Location:</strong> ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}</p>
          <p><strong>Coordinates:</strong> ${user.location.coordinates.latitude}, ${user.location.coordinates.longitude}</p>
          <p><strong>Timezone:</strong> ${user.location.timezone.description} (UTC ${user.location.timezone.offset})</p>
          <p><strong>Date of Birth:</strong> ${dobStr} (Age : ${age})</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Username:</strong> ${user.login.username}</p>
        </div>
      `;
    })
    .catch(error => {
      container.innerHTML = 'Failed to load user.';
      console.error(error);
    });
}

window.addEventListener('DOMContentLoaded', fetchUser);
button.addEventListener('click', fetchUser);

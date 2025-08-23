import bcrypt from 'bcryptjs';

// The password you want to use for your admin account
const plainPassword = 'AdminPassword123';

// Generate the hash
const hashedPassword = bcrypt.hashSync(plainPassword, 10);

// Print the result to your terminal
console.log('Your Hashed Password Is:');
console.log(hashedPassword);

//xxx:~/CodesByRahul_LINUX/Sarthak Mall JEC/test back end/travel-itenary-dashboard-backend$ node hash-password.js
// Your Hashed Password Is:
// $2b$10$WabviDqqVHcI6mG2lkzHTewjZXVXqw1xS2EgGXZd61HqhHohYmsdO
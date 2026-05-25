const bcrypt = require('bcryptjs');

async function test() {
  const isMatch = await bcrypt.compare('123456', '$2b$10$RZIKTIZoBPos40IJotWadu6xBOzK8nxzyBBHWjJA7B.7OQJsEx7nm');
  console.log(isMatch);
}

test();

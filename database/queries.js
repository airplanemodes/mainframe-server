const selectEntry = "SELECT * FROM entries WHERE id = $1";
const selectEntries = "SELECT * FROM entries";
const createEntry = "INSERT INTO entries (title, content, author, node, created) VALUES($1, $2, $3, $4, $5)"
const selectUser = "SELECT * FROM users WHERE id = $1";
const createUser = "INSERT INTO users (username, email, passwd, entered) VALUES($1, $2, $3, $4)";

module.exports = {
    selectEntry,
    selectEntries,
    createEntry,
    selectUser,
    createUser
};
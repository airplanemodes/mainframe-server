const selectEntry = "SELECT * FROM entries WHERE id = $1";
const selectEntries = "SELECT * FROM entries";
const createEntry = "INSERT INTO entries (title, content, author, node, points, created) VALUES($1, $2, $3, $4, $5, $6)";
const deleteEntryById = "DELETE FROM entries WHERE id = $1";
const selectUser = "SELECT * FROM users WHERE id = $1";
const createUser = "INSERT INTO users (username, email, passwd, points, entered, moderator) VALUES($1, $2, $3, $4, $5, $6)";

module.exports = {
    selectEntry,
    selectEntries,
    createEntry,
    deleteEntryById,
    selectUser,
    createUser
};
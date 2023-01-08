const selectEntry = "SELECT * FROM entries WHERE id = $1";
const selectEntries = "SELECT * FROM entries ORDER BY id DESC";
const selectEntriesByNode = "SELECT * FROM entries WHERE node = $1 ORDER BY id DESC";
const insertEntry = "INSERT INTO entries (title, content, author, node, points, created) VALUES($1, $2, $3, $4, $5, $6)";
const updateEntry = "UPDATE entries SET title = $1, content = $2, author = $3, node = $4, points = $5, created = $6 WHERE id = $7";
const deleteEntryById = "DELETE FROM entries WHERE id = $1";

const selectAllUsers = "SELECT * FROM users";
const selectUserById = "SELECT * FROM users WHERE id = $1";
const selectUserByUsername = "SELECT * FROM users WHERE username = $1";
const insertUser = "INSERT INTO users (username, email, passwd, points, entered, moderator) VALUES($1, $2, $3, $4, $5, $6)";

const selectReplies = "SELECT * FROM replies";
const insertReply = "INSERT INTO replies (body, username, authorid, entryid) VALUES($1, $2, $3, $4)"

const selectCredits = "SELECT * FROM credits";
const insertCredit = "INSERT INTO credits (entryid, userid) VALUES ($1, $2)";
const deleteCredit = "DELETE FROM credits WHERE entryid = $1 AND userid = $2";

const selectPrivates = "SELECT * FROM privates";

module.exports = {
    selectEntry,
    selectEntries,
    selectEntriesByNode,
    insertEntry,
    updateEntry,
    deleteEntryById,
    selectAllUsers,
    selectUserById,
    selectUserByUsername,
    insertUser,
    selectReplies,
    insertReply,
    selectCredits,
    insertCredit,
    deleteCredit,
    selectPrivates
};
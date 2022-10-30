const selectPosts = "SELECT * FROM posts";
const createUser = "INSERT INTO users (username, email, passwd, entered) VALUES($1, $2, $3, $4)";

module.exports = {
    selectPosts,
    createUser
};
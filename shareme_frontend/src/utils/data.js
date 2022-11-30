export const userQuery = (userId) => {
    const query = `*[_type = "user" && _id == '${userId}']`;
    // try to get me a user (type) which has id == userId
    // console.log("query inside the userQuery ---->",query )
    return query;
}
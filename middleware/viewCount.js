
let count = 0;
const viewCount = (req, res, next) => {
    count++;
    console.log(count);
    // res.send("tools found viewCount")
    next();
};

module.exports = viewCount;
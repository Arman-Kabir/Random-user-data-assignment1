
const fs = require("fs");

// function fileS(){
//     fs.readFile("userData.json", "utf-8", (err, data) => {
//         const loadedData = JSON.parse(data);
//         return loadedData;
//     });
// }




module.exports.aRandomUser = (req, res, next) => {
    fs.readFile("userData.json", "utf-8", (err, data) => {
        const loadedData = JSON.parse(data);
        let dataCount = loadedData.length;
        const randomNumber = Math.floor(Math.random() * dataCount) + 1;
        const randomUser = loadedData.find(user => user.id == randomNumber);
        // console.log(randomUser);
        // console.log("random",randomNumber);
        // console.log("total data",dataCount);  
        res.send(randomUser);
    });
}

module.exports.allRandomUsers = (req, res, next) => {
    fs.readFile("userData.json", "utf-8", (err, data) => {
        const loadedData = JSON.parse(data);
        // let dataCount = loadedData.length;
        // const randomNumber = Math.floor(Math.random() * dataCount) + 1;
        // const randomUser = loadedData.find(user=>user.id==randomNumber);
        // console.log(randomUser);
        // console.log("random",randomNumber);
        // console.log("total data",dataCount);  
        res.send(loadedData);
    });
}

module.exports.saveRandomUser = (req, res, next) => {
    const newData= req.body;
    // console.log(newData);
    fs.readFile("userData.json", "utf-8", (err, data) => {
        const loadedData = JSON.parse(data);
        const updatedData = [...loadedData, newData]; 
        // console.log(updatedData);
        // console.log(loadedData);         
        // console.log(typeof(loadedData));         
        // console.log(typeof(newData)); 
        res.send(updatedData); 
        
    });
}
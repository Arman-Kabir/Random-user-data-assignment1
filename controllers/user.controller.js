
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
    const newData = req.body;
    // console.log(newData);
    fs.readFile("userData.json", "utf-8", (err, data) => {
        const loadedData = JSON.parse(data);
        const updatedData = [...loadedData, newData];
        const savedData = JSON.stringify(updatedData);
        // console.log(updatedData);
        // console.log(loadedData);         
        // console.log(typeof(loadedData));         
        // console.log(typeof(newData)); 
        res.send(updatedData);

        fs.writeFile("userData.json", savedData, function (err) {
            console.log('saved');
        });
    });
}


module.exports.updateAUser = (req, res, next) => {
    const newData = req.body;
    fs.readFile("userData.json", "utf-8", (err, data) => {
        const loadedData = JSON.parse(data);
        const isValid = loadedData.find(data => data.id == newData.id);
        if (isValid) {
            const allData = loadedData.filter(data => data.id != newData.id);
            let updatedData = [...allData, newData];
            const savedData = JSON.stringify(updatedData);
            fs.writeFile("userData.json", savedData, function (err) {
                console.log(`updated id ${newData.id} and saved`);
                res.send(savedData);
            });
        } else {
            res.send(`this id: ${newData.id} is not available`);
        }
    });
}

module.exports.updateMultipleUser = (req, res, next) => {
    const newData = req.body;
    // res.send(newData);

    fs.readFile("userData.json", "utf-8", (err, data) => {
        const loadedData = JSON.parse(data);
        let isValid;
        let availableData = [];
        let notAvailableData = 0;
        for (let i = 0; i < newData.length; i++) {
            console.log(i);
            isValid = loadedData.find(data => data.id == newData[i].id);
            // console.log(isValid);

            if (isValid) {
                const allData = loadedData.filter(data => data.id != Number(isValid.id));
                console.log(allData);
                let updatedData = [...allData, newData[i]];
                const savedData = JSON.stringify(updatedData);
                fs.writeFile("userData.json", savedData, function (err) {
                    console.log(`updated id  and saved`);
                    // res.send(savedData);
                });
            } else {
                console.log(`id: ${newData[i].id} not available`);
                notAvailableData++;
            }
        }
        res.send(`updated= available ids and not updated ${notAvailableData} id cz not available in the DB `);
    });
}


module.exports.deleteUser = (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    fs.readFile("userData.json", "utf-8", (err, data) => {
        const loadedData = JSON.parse(data);
        const isValid = loadedData.find(data => data.id == id);

        if (isValid) {
            const updatedData = loadedData.filter(data => data.id != id);
            const savedData = JSON.stringify(updatedData);
            fs.writeFile("userData.json", savedData, function (err) {
                console.log(`deleted id ${id} and saved`);
                res.send(savedData);
            });
        } else {
            res.send(`this id: ${id} is not available`);
        }
    });
}
const AWS_API_ENDPOINT = "https://9qhj4mhy82.execute-api.eu-west-2.amazonaws.com/prod"

function createDogId(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function registerDogs(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var formData = new FormData(event.target);
    var object = {};
    formData.forEach((value, key) => object[key] = value);
    object["id"] = createDogId(6);
    var wrapped_object = {
        "operation":"create",
        "tableName":"waqqlydog",
        "payload":{
            "Item": object
        }
    }
    var json = JSON.stringify(wrapped_object);
    
    console.log(json);



    fetch(AWS_API_ENDPOINT + '/DynamoDBManager', {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: json,
    })
    .then(response => {
        if (response.ok) {
            alert("Successfully added dog")
        } else {
            alert("Couldn't add dog")
            throw new Error('Dog Not Added');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Operation Failed:', error);
    });

}

function displayDogs(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var wrapped_object = {
        "operation":"getAll",
        "tableName":"waqqlydog",
        "payload":{"Key":"1"},
    }
    var json = JSON.stringify(wrapped_object);
    
    console.log(json);


    fetch(AWS_API_ENDPOINT + '/DynamoDBManager', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json,
    })
    .then(response => {
        if (response.ok) {
            response.json().then(json => {
                console.log(json);
                var table = document.getElementById('tableBodyDogInfo');
                table.innerHTML = '';
                json['Items'].forEach((object) => {
                    var tr = document.createElement('tr');
                    tr.innerHTML = '<td>' + object.dogName + '</td>' +
                    '<td>' + object.dogBreed + '</td>' +
                    '<td>' + object.dogAge + '</td>' +
                    '<td>' + object.dogOwnerEmail + '</td>';
                    table.appendChild(tr);
                })
    
              });
        
        } else {
            alert("Couldn't get dogs")
            throw new Error('Dog Not Displayed');
        }
        
    })
    .catch(error => {
        console.error('Operation Failed:', error);
    });

}



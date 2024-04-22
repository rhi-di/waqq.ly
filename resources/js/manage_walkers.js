const AWS_API_ENDPOINT_2 = "https://9qhj4mhy82.execute-api.eu-west-2.amazonaws.com/prod"

function createWalkerId(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function registerWalkers(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var formData = new FormData(event.target);
    var object = {};
    formData.forEach((value, key) => object[key] = value);
    object["id"] = createWalkerId(6);
    var wrapped_object = {
        "operation":"create",
        "tableName":"waqqlywalker",
        "payload":{
            "Item": object
        }
    }
    var json = JSON.stringify(wrapped_object);
    
    console.log(json);



    fetch(AWS_API_ENDPOINT_2 + '/DynamoDBManager', {
        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: json,
    })
    .then(response => {
        if (response.ok) {
            alert("Successfully added walker")
        } else {
            alert("Couldn't add walker")
            throw new Error('walker Not Added');
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

function displayWalkers(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var wrapped_object = {
        "operation":"getAll",
        "tableName":"waqqlywalker",
        "payload":{"Key":"1"},
    }
    var json = JSON.stringify(wrapped_object);
    
    console.log(json);


    fetch(AWS_API_ENDPOINT_2 + '/DynamoDBManager', {
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
                var table = document.getElementById('tableBodyWalkerInfo');
                table.innerHTML = '';
                json['Items'].forEach((object) => {
                    var tr = document.createElement('tr');
                    tr.innerHTML = '<td>' + object.walkerName + '</td>' +
                    '<td>' + object.walkerExperience + '</td>' +
                    '<td>' + object.walkerArea + '</td>' +
                    '<td>' + object.walkerEmail + '</td>';
                    table.appendChild(tr);
                })
    
              });
        
        } else {
            alert("Couldn't get walkers")
            throw new Error('Walker Not Displayed');
        }
        
    })
    .catch(error => {
        console.error('Operation Failed:', error);
    });

}



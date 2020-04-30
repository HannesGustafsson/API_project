const uri = 'https://5ea6a04c84f6290016ba6f29.mockapi.io/api/v1/visitors'

// LOADS DATA
function loadData() {
    const datadiv = document.getElementById('datadiv');
    datadiv.innerHTML = '';
    fetch(uri)
        .then((resp) => resp.json())
        .then(function (data) {
            return data.map(function (data) {
                let divtag = document.createElement('div');

                divtag.innerHTML = `<button onclick="deleteVisitor(${data.id})">-</button> ${data.name}`;
                datadiv.appendChild(divtag);
            })
        })
}

// ADDS NEW VISITOR
function addVisitor() {

    const textInput = document.getElementById('name').value;
    var data = { name: textInput };

    fetch(uri,
        {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers:
            {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => console.log(res))

        setTimeout(() => {loadData()}, 500);
}


// DELETE VISITOR
function deleteVisitor(id) {

    fetch(uri + "/" + id,
        {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",

            headers:
            {
                'Accept': 'application/json, text/plain, /',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => console.log(res))

        setTimeout(() => {loadData()}, 500);                        
}
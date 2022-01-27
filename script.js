//const api_url = "<heroku_app_url>"
const api_url = "https://esd6-mevn.herokuapp.com/reservations"
// const api_url = "https://hotelesd13.herokuapp.com/reservations"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].room_no}</td>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].phone}</td>`;
		table_data += `<td>${records[i].room_type}</td>`;
		table_data += `<td>${records[i].adults}</td>`;
		table_data += `<td>${records[i].children}</td>`;
		table_data += `<td>${records[i].from}</td>`;
		table_data += `<td>${records[i].to}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i]._id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("roomNo").value = data.room_no;
		document.getElementById("name").value = data.name;
		document.getElementById("phoneNo").value = data.phone;
		document.getElementById("type").value = data.room_type;
		document.getElementById("adults").value = data.adults;
		document.getElementById("children").value = data.children;
		document.getElementById("from").value = data.from;
		document.getElementById("to").value = data.to;
	})
}


function postData() {
	var roomNo = document.getElementById("roomNo").value;
	var name = document.getElementById("name").value;
	var phoneNo = document.getElementById("phoneNo").value;
	var roomType = document.getElementById("type").value;
	var adults = document.getElementById("adults").value;
	var children = document.getElementById("children").value;
	var from = document.getElementById("from").value;
	var to = document.getElementById("to").value;
	
	data = {room_no: roomNo, name: name, phone: phoneNo, room_type: roomType, 
		adults: adults, children: children, from: from, to: to};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html";
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var roomNo = document.getElementById("roomNo").value;
	var name = document.getElementById("name").value;
	var phoneNo = document.getElementById("phoneNo").value;
	var roomType = document.getElementById("type").value;
	var adults = document.getElementById("adults").value;
	var children = document.getElementById("children").value;
	var from = document.getElementById("from").value;
	var to = document.getElementById("to").value;
	
	data = {_id: _id, room_no: roomNo, name: name, phone: phoneNo, room_type: roomType, 
		adults: adults, children: children, from: from, to: to};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}
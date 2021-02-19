// ======== NARRATIVE EDITOR =============

var gameOutputTemplate = `
			<button type="button" onclick="createNewRow()"> NEW CARD </button>
			<button type="button" onclick="getStoryData(true)"> GENERATE STORY DATA </button>
			<button type="button" onclick="deleteRowData()"> DELETE LAST ROW</button>
			<hr>
			<div id="gameStats">
				<p id="stat1">?: 50 || </p><p id="stat2">?: 50 || </p><p id="stat3">?: 50 || </p><p id="stat4">?: 50 || </p>
			</div>
			<hr>
			<div id="gameOutput">
				<button type="button" onclick="displayQuestion()"> FLIP CARD</button>
			</div>
			<hr>`;

var tableTemplate = `
			<tr class="editorRow">
			<td><textarea rows="2" cols="10" placeholder="label"></textarea></td>
			<td><textarea rows="2" cols="10" placeholder="author"></textarea></td>
			<td><textarea rows="2" cols="10" placeholder="conditions"></textarea></td>
			<td><textarea rows="2" cols="4" placeholder="lock"></textarea></td>
			<td><textarea rows="2" cols="4" placeholder="weight"></textarea></td>
			<td><textarea rows="2" cols="70" maxlength="140" placeholder="question" style="background-color:#7c3f58;color:#fff6d3;"></textarea></td>
			<td><textarea rows="2" cols="10" maxlength="20" placeholder="yesAnswer" style="background-color:#eb6b6f ;"></textarea></td>
			<td><textarea rows="2" cols="10" maxlength="20" placeholder="yesResponse" style="background-color:#eb6b6f ;"></textarea></td>
			<td><textarea rows="2" cols="3" maxlength="3" placeholder="stat1" style="background-color:#eb6b6f ;"></textarea></td>
			<td><textarea rows="2" cols="3" maxlength="3" placeholder="stat2" style="background-color:#eb6b6f ;"></textarea></td>
			<td><textarea rows="2" cols="3" maxlength="3" placeholder="stat3" style="background-color:#eb6b6f ;"></textarea></td>
			<td><textarea rows="2" cols="3" maxlength="3" placeholder="stat4" style="background-color:#eb6b6f ;"></textarea></td>
			<td><textarea rows="2" cols="10" maxlength="300" placeholder="yOutcome" style="background-color:#eb6b6f ;"></textarea></td>
			<td><textarea rows="2" cols="10" maxlength="20" placeholder="noAnswer" style="background-color:#f9a875 ;"></textarea></td>
			<td><textarea rows="2" cols="10" maxlength="20" placeholder="noResponse" style="background-color:#f9a875;"></textarea></td>
			<td><textarea rows="2" cols="3" maxlength="3" placeholder="stat1" style="background-color:#f9a875;"></textarea></td>
			<td><textarea rows="2" cols="3" maxlength="3" placeholder="stat2" style="background-color:#f9a875;"></textarea></td>
			<td><textarea rows="2" cols="3" maxlength="3" placeholder="stat3" style="background-color:#f9a875;"></textarea></td>
			<td><textarea rows="2" cols="3" maxlength="3" placeholder="stat4" style="background-color:#f9a875;"></textarea></td>
			<td><textarea rows="2" cols="10" maxlength="300" placeholder="noOutcome" style="background-color:#f9a875;"></textarea></td>
		</tr>`;

//Initializes the narrative editor
function createEditor(){
	var body = document.querySelector("body");
	var editor = document.createElement("div");
	editor.id = "editor";
	editor.innerHTML = gameOutputTemplate + `<table id="editorTable" ><tbody></tbody></table>`;
	body.appendChild(editor);

	for (var i = 0; i < story.length; i++) {
		document.getElementById("editorTable").innerHTML += tableTemplate;
	}

	populateStoryData();
}

//Adds a new row to spreadsheet
function createNewRow(){
	story = getStoryData(false);
	document.getElementById("editorTable").innerHTML += tableTemplate;
	populateStoryData();
}

// Retrieves all the data and saves it as story.js
function getStoryData(dl){
	var array = [];
	var tableRows = document.getElementById("editorTable").getElementsByTagName("tr");

	for (var i = 0; i < tableRows.length; i++) {
		array.push(getRowData(i));
	}

	if(dl){
		download("story.js", "var story = [" + array.toString() + "];");
	}

	return eval("[" + array.toString() + "]");
}

// Function that handles the downloading of a txt file
function download(filename, text){
	var element = document.createElement("a");
	element.setAttribute('href','data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
  	document.body.appendChild(element);

  	element.click();

  	document.body.removeChild(element);
}

// Insert all the saved data into the rows
function populateStoryData(){
	var tableRows = document.getElementById("editorTable").getElementsByTagName("tr");

	for (var i = 0; i < story.length; i++) {
		var cells = tableRows[i].getElementsByTagName("td");

		for (var j = 0; j < cells.length; j++) {
			cells[j].getElementsByTagName("textarea")[0].value = story[i][j];
		}
	}
}

// Returns all the cells in a row as a string array.
function getRowData(row){
	var array = [];
	var row = document.getElementById("editorTable").getElementsByTagName("tr")[row];
	var cells = row.getElementsByTagName("td");

	for (var i = 0; i < cells.length; i++) {
		array.push('`'+cells[i].getElementsByTagName("textarea")[0].value+'`');
	}
	return "[" + array.toString() + "]";
}

//Deletes the last row of the spreadsheet
function deleteRowData(row){
	var tableRows = document.getElementById("editorTable").getElementsByTagName("tr")
	if(tableRows.length > story.length){
		document.getElementById("editorTable").deleteRow(tableRows.length-1);
	}
}

//======= FUNCTIONS TO PLAY STORY IN THE EDITOR // ALSO IS AN EXAMPLE OF HOW THE STORY CARDS API CAN BE USED ============

function displayQuestion(){
	flipCard();
	document.getElementById("gameOutput").innerHTML = activeCard.author +": " + activeCard.question + "<br><br>" + `<button type="button" onclick="displayYesResponse()">` + activeCard.yesAnswer + `</button><br><br><button type="button" onclick="displayNoResponse()">` + activeCard.noAnswer + `</button>`;
	console.clear();
	console.log(activeCard.question + "\n\n" + "1. " + activeCard.yesAnswer + "\n2. " + activeCard.noAnswer);
}


function displayYesResponse(){
	if(selectYes()){
		console.clear();
		document.getElementById("gameOutput").innerHTML = activeCard.yesResponse + `<br><br><button type="button" onclick="displayQuestion()"> FLIP CARD</button>`;
		console.log(activeCard.yesResponse);
		displayStats();
	};
}

function displayNoResponse(){
	if(selectNo()){
		console.clear();
		document.getElementById("gameOutput").innerHTML = activeCard.noResponse + `<br><br><button type="button" onclick="displayQuestion()"> FLIP CARD</button>`;
		console.log(activeCard.noResponse);
		displayStats();
	}
}

function displayStats(){
	document.getElementById("stat1").innerHTML = statData[0][0] + ": " + statData[0][1] + " || ";
	document.getElementById("stat2").innerHTML = statData[1][0] + ": " + statData[1][1] + " || ";
	document.getElementById("stat3").innerHTML = statData[2][0] + ": " + statData[2][1] + " || ";
	document.getElementById("stat4").innerHTML = statData[3][0] + ": " + statData[3][1] + " || ";
}
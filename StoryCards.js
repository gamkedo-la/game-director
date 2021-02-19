//==== STORY SETUP ==============================================================

// Step 1. Rename the statData to the stats you want represented in the game
var statData = [["ENERGY",50],["QUALITY",50],["TIME",50],["BUDGET",50]]; // NEEDED

// Step 2. Rename the stats object to match statData names. You can reference these stats by stats.name in the editor
var stats = {};
stats.energy = 50; //rename to match what's in stat data
stats.quality = 50;
stats.time = 50;
stats.budget = 50;

//Step 3. Declare any variables you plan to use in your story below
var programmer_ate_pudding = false;

// =============================================================================

/*
========================
VERSION: 1.0
AUTHOR: GABRIEL CORNISH

API:
- flipCard(): Sets a new active card from a list of valid story cards.
	- You can access the data from a card from the activeCard object.
- selectYes(): Executes all the game logic for selecting the YES choice on a card
- selectNo(): Executes all the game logic for selecting the NO choice on a card
========================
*/

const NUMBER_OF_STATS = 4;
const LABEL = 0;
const AUTHOR = 1;
const CONDITIONS = 2;
const LOCK = 3;
const WEIGHT = 4;
const QUESTION = 5
const YES_ANSWER = 6;
const YES_RESPONSE = 7;
const YES_STATS = 8;
const YES_OUTCOME = 12;
const NO_ANSWER = 13;
const NO_RESPONSE = 14;
const NO_STATS = 15;
const NO_OUTCOME = 19;

var deck = createDeck();
var validDeck = createValidDeck();
var activeCard;
var turn = 0;


//Creates a deck of story cards from the Story variable
function createDeck(){
	var tempCard;
	var tempDeck = [];

	for (var i = 0; i < story.length; i++) {
		tempCard = createCard(i);
		tempDeck.push(tempCard);
	}

	return tempDeck;
}

// Creates a deck of cards with only cards whos conditions evaluate to true.
function createValidDeck(){
	var array = []

	for (var i = 0; i < deck.length; i++) {
		if(deck[i].conditions || deck[i].conditions == undefined){
			if(deck[i].activatedTurn){
				if((deck[i].activatedTurn + deck[i].lock) <= turn){
					array.push(deck[i])
				}
			} else{
				array.push(deck[i])
			}	
		}
	}

	return array;
}

//resets all the cards that have activatedTurn on them
function resetLockedCards(){
	for (var i = 0; i < deck.length; i++) {
		deck[i].activatedTurn = undefined;
	}
}

//Pulls a random card from the valid deck of cards and displays it.
function flipCard(){
	validDeck = createValidDeck(); //Find all the valid cards and recreate the valid deck
	
	if(validDeck.length == 0){ //If the validDeck is empty, reset the locks on all cards and retry
		resetLockedCards()
		validDeck = createValidDeck();
	}

	if(!activeCard || !activeCard.active){
		turn++; //Increase the turn counter
		setActiveCard(validDeck[weightedRandom()].id); //Display a random weighted card from the valid deck
	}
}

//select a valid card randomly taking into account their weighting.
function weightedRandom(){
	var totalWeight = 0;

	for (var i = 0; i < validDeck.length; i++) {
		totalWeight += validDeck[i].weight;
	}

	const threshhold = Math.random() * totalWeight;

	var total = 0;

	for (var i = 0; i < validDeck.length; i++) {
		total += validDeck[i].weight;

		if(total >= threshhold){
			return i;
		}
	}
}

// Applies the stats from a choice the player has made
function applyStats(statsArray){
	for (var i = 0; i < statsArray.length; i++) {
		statData[i][1] += statsArray[i];
	}

	for (var i = 0; i < statData.length; i++) {
		stats[Object.keys(stats)[i]] = statData[i][1];
	}
}

//Jump to any card that has a label
function goto(label){
	activeCard.active = false;
	var gotoCard;
	for (var i = 0; i < story.length; i++) {
		if(deck[i].label === label){
			gotoCard = deck[i];
		}
	}

	if(gotoCard){
		setActiveCard(gotoCard.id);
	}
}

//update all the conditions for the cards
function updateCardConditions(){
	for (var i = 0; i < deck.length; i++) {
		deck[i].conditions = getConditions(deck[i].id);
	}
}

//Function for when the player selects YES
function selectYes(){
	if(activeCard.active){
		applyStats(activeCard.yesStats);
		activeCard.applyYesOutcome(activeCard.id);
		updateCardConditions();
		activeCard.active = false;
		return true;
	}
}

//Function for when the player selects NO
function selectNo(){
	if(activeCard.active){
		applyStats(activeCard.noStats);
		activeCard.applyNoOutcome(activeCard.id);
		updateCardConditions();
		activeCard.active = false;
		return true;
	}
}

// Set the current Active Card
function setActiveCard(cardNumber){
	deck[cardNumber].activatedTurn = turn; //Set when this card was activated

	activeCard = deck[cardNumber]; // Set the active card
	activeCard.active = true; // This card is now being displayed
}



// =============== CARD CREATION FUNCTIONS =============
function createCard(rowNum){
	var card = {}
	card.id = rowNum;
	card.activatedTurn = undefined;
	card.label = getLabel(rowNum);	
	card.author = getAuthor(rowNum);
	card.conditions = getConditions(rowNum);
	card.lock = getLock(rowNum);
	card.weight = getWeight(rowNum);
	card.question = getQuestion(rowNum);
	card.yesAnswer = getYesAnswer(rowNum);
	card.yesResponse = getYesResponse(rowNum);
	card.noAnswer = getNoAnswer(rowNum);
	card.noResponse = getNoResponse(rowNum);
	card.yesStats = getYesStats(rowNum);
	card.noStats = getNoStats(rowNum);
	card.applyYesOutcome = getYesOutcome;
	card.applyNoOutcome = getNoOutcome;
	card.active = false;

	return card;
}


function getLabel(rowNumber){
	return story[rowNumber][LABEL] || "";
}

function getAuthor(rowNumber){
	return story[rowNumber][AUTHOR];
}

function getConditions(rowNumber){
	return eval(story[rowNumber][CONDITIONS]);
}

function getLock(rowNumber){
	if(!story[rowNumber][LOCK]){
		return 0;
	} else{
		return parseInt(story[rowNumber][LOCK]);
	}
}

function getWeight(rowNumber){
	return parseInt(story[rowNumber][WEIGHT]);;
}

function getQuestion(rowNumber){
	return story[rowNumber][QUESTION];
}

function getYesAnswer(rowNumber){
	return story[rowNumber][YES_ANSWER];
}

function getYesResponse(rowNumber){
	return story[rowNumber][YES_RESPONSE];

}

function getYesStats(rowNumber){
	var statsArray = [];

	for (var i = 0; i < NUMBER_OF_STATS; i++) {
		statsArray.push(parseInt(story[rowNumber][YES_STATS + i]));

		if (isNaN(statsArray[i])){
			statsArray[i] = 0;
		}
	}
	return statsArray;
}

function getNoAnswer(rowNumber){
	return story[rowNumber][NO_ANSWER];
}

function getNoResponse(rowNumber){
	return story[rowNumber][NO_RESPONSE];
}


function getNoStats(rowNumber){
	var statsArray = [];

	for (var i = 0; i < NUMBER_OF_STATS; i++) {
		statsArray.push(parseInt(story[rowNumber][NO_STATS + i]));

		if (isNaN(statsArray[i])){
			statsArray[i] = 0;
		}
	}
	return statsArray;
}

function getYesOutcome(rowNumber){
	if(eval(story[rowNumber][YES_OUTCOME]) != undefined){
		return eval(story[rowNumber][YES_OUTCOME]);
	}	
}

function getNoOutcome(rowNumber){
	if(eval(story[rowNumber][NO_OUTCOME]) != undefined){
		return eval(story[rowNumber][NO_OUTCOME]);
	}	
}


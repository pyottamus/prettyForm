var jstester;
var checkbx;
var addressSection;
var formOveride;

var xcardNumberInput;
var expDateInput;
var cvvInputField;

//money for personal
var amountInputBox;
var selectDonateBox; //contains the select
var inputMoneyDiv; //div containing selectDonateBox

//money for buisness
var sponsorshipLevel;

//address related
var contactFname;
var billFname;

var contactLname;
var billLname;

var contactZip;
var billZip;

var contactCountry;
var billCountry;

//the folowing are for vanishing
var personalGreetings;
var businessSponsorship;
var reaminderBlock;

var pgreetingType;
var bgreetingType;

var buisnessText;
var personalText;

function autoTransfAddr() {
	if (checkbx.checked === !0) {
		addressSection.style.display = "none"
		billFname.value = contactFname.value;

		billLname.value = contactLname.value;

		billZip.value = contactZip.value;

		billCountry.elem.value = contactCountry.elem.value;

	} else {
		addressSection.style.display = "block"
	}
};  

function resizeTextbox(o) {
  o.style.height = "0px";
  o.style.height = (o.scrollHeight)+"px";
}

function setup(x) {
	x.elem.addEventListener("input", function (event) {
		if (x.elem.validity.patternMismatch) {
			x.elem.setCustomValidity(x.printString)
		} else {
			x.elem.setCustomValidity("")
		}
	})
};


function luhns(event) {
	var inn = event.target.value;
	var reg = RegExp("([0-9]{15,16})", 'g');
	var res = reg.exec(inn);
	if (res == null) {

		event.target.setCustomValidity("Please enter a valid credit card number with no spaces or dashes");
	} else if (pyoLib.utils.luhn_checksum(inn) != 0) {
		event.target.setCustomValidity("The credit card number provided is invalid");
	} else {
		event.target.setCustomValidity("");
	}
}

function expireValidate(event) {
	var d = new Date();
	var month = parseInt(d.getMonth()) + 1;
	var year = d.getFullYear();
	var inn = event.target.value;
	var reg = RegExp("([0-9]{2})/([0-9]{4})", 'g');

	var res = reg.exec(inn);
		console.log(month);
	console.log(year);
	console.log(res[1]);
	console.log(res[2]);
	console.log(((res[2] == year) & (res[1] >= month)));
	if ((res == null) | (res[1] > 12)) {
		event.target.setCustomValidity("Please enter a valid date in the format MM/YYYY");
	} else if ((res[2] > year) | (((res[2] == year) & (res[1] >= month)))) {//only valid one
		event.target.setCustomValidity("");
	} else {
		event.target.setCustomValidity("The Date provided is in the past");
	}
}

function paternValidate(string, elemID) {
	this.elem = document.getElementById(elemID);
	this.printString = string;
	setup(this)
};

//when the user chooses other, switch beetween the input div  and the select div
function selectDonateSwitch() {
	if (selectDonateBox.value == "JMPCST") {
		inputMoneyDiv.style.removeProperty("display");
		amountInputBox.elem.required = true;
		amountInputBox.elem.name = "x_amount";
		amountInputBox.elem.value = "";
		selectDonateBox.name = "";

	} else {
		inputMoneyDiv.style.display = "none"
			amountInputBox.elem.required = false;
		amountInputBox.elem.name = "";
		amountInputBox.elem.value = "0";
		selectDonateBox.name = "x_amount";

	}
}

function selectGreetingType() {
	//personalGreeting

	if (pgreetingType.checked) {
		//hide/show
		personalGreetings.style.removeProperty("display");
		reaminderBlock.style.removeProperty("display");
		businessSponsorship.style.display = "none";
		//change textboxs around
		buisnessText.name = "";
		personalText.name = "transactText";
		//change money inputs
		sponsorshipLevel.name = "";
		//call selectDonateSwitch since its athoritative for personal money
		selectDonateSwitch();

		//businessSponsorship
	} else if (bgreetingType.checked){
		//hide/show
		businessSponsorship.style.removeProperty("display");
		reaminderBlock.style.removeProperty("display");
		personalGreetings.style.display = "none";
		//change textboxs around
		buisnessText.name = "transactText";
		personalText.name = "";
		//change money inputs
		sponsorshipLevel.name = "x_amount";

		amountInputBox.name = "";
		selectDonateBox.name = "";
		amountInputBox.elem.required = false;
		amountInputBox.elem.name = "";
		amountInputBox.elem.value = "";
	}
}

function copybox(event){
	if (checkbx.checked === !0){
	this.value=event.target.value;
	}
}

function duallisten(a, b){
	a.addEventListener("change", copybox.bind(b));
	b.addEventListener("change", copybox.bind(a));
}


window.addEventListener('load', function () {
	jstester = document.getElementById("jsTestDupADDR");
	checkbx = jstester.getElementsByTagName("input")[0];
	checkbx.addEventListener("click", autoTransfAddr);
	addressSection = document.getElementById("addressSection");
	jstester.style.display = "block";
	try {
		formOveride = document.getElementById("form1");
		formOveride.noValidate = false;
	} catch {
		console.log("Form not found");
	}
	//personal money
	selectDonateBox = document.getElementById("selectDonateBox");
	selectDonateBox.addEventListener("change", selectDonateSwitch);
	inputMoneyDiv = document.getElementById("inputMoneyDiv");
	//buisness money
	sponsorshipLevel = document.getElementById("sponsorshipLevel");

	//find the 3 blocks
	personalGreetings = document.getElementById("personalGreetings");
	businessSponsorship = document.getElementById("businessSponsorship");
	reaminderBlock = document.getElementById("reaminderBlock");

	//find greeting select radios
	pgreetingType = document.getElementById("pgreetingType");
	pgreetingType.addEventListener("change", selectGreetingType);
	
	bgreetingType = document.getElementById("bgreetingType");
	bgreetingType.addEventListener("change", selectGreetingType);

	
	//find textfeilds
	buisnessText = document.getElementById("buisnessText");
	personalText = document.getElementById("personalText");

	//addr setup
	contactFname = document.getElementById("contactFname");
	billFname = document.getElementById("billFname");

	contactLname = document.getElementById("contactLname");
	billLname = document.getElementById("billLname");

	contactZip = document.getElementById("contactZip");
	billZip = document.getElementById("billZip");

	contactCountry = new paternValidate("Please enter a 2 Charector Country Code", "contactCountry");
	billCountry = new paternValidate("Please enter a 2 Charector Country Code", "billCountry");

	
	//add copycode for each box(
	duallisten(contactFname, billFname);
	duallisten(contactLname, billLname);
	duallisten(contactZip, billZip);
	duallisten(contactCountry.elem, billCountry.elem);
	
	//input boxes and protos
	amountInputBox = new paternValidate("Please enter a monetary value", "amountInputBox");
	xcardNumberInput = document.getElementById("xcardNumberInput");
	//add luhns to xcard
	xcardNumberInput.addEventListener("change", luhns);

	expDateInput = document.getElementById("expDateInput");
	expDateInput.addEventListener("change", expireValidate);

	cvvInputField = new paternValidate("Please enter the 3 to 4 digit security code found on back of credit card", "cvvInputField")
})




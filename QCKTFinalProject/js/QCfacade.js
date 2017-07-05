/**QCfinalDAL.js
 This js file handles database functions
 Revision History:
 Quinlain Crawford 2017-04-19: Created
 */

function QCClearDatabase() {
    var result = confirm("Are you sure you want to clear the database?");
    try{
        if(result){
            DB.QCDropTables();
            alert("Database cleared");
        }
    } catch(e) {
        alert(e);
    }
}

function QCUpdateScheduleDogDropdown() {
    function QCSuccessSelectOwned(tx, results) {
        $("#selDog").empty();
        var sel = document.getElementById("selDog");
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows[i];
            var option = document.createElement("option");
            option.text = row['name'];
            sel.add(option);
        }
        $("#selDog").selectmenu("refresh", true);
    }
    var owner = localStorage.getItem("username");
    var options = [owner];
    Dog.QCSelectOwned(QCSuccessSelectOwned, options)
}

function QCUpdateEditScheduleDogDropdown() {
    function QCSuccessSelectOwned(tx, results) {
        $("#selEditDog").empty();
        var sel = document.getElementById("selEditDog");
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows[i];
            var option = document.createElement("option");
            option.text = row['name'];
            sel.add(option);
        }
        $("#selEditDog").selectmenu("refresh", true);
    }
    var owner = localStorage.getItem("username");
    var options = [owner];
    Dog.QCSelectOwned(QCSuccessSelectOwned, options)
}

function QCGetDogs() {
    function QCSuccessSelectOwned(tx, results) {
        var htmlCode = "";
        for (var i = 0; i < results.rows.length; i++){
            var row = results.rows[i];

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h1>Name: " + row['name'] + "</h1>" +
                "<h3>Age: " + row['age'] + "</h3>" +
                "<h3>Breed: " + row['breed'] + "</h3>" +
                "<h3>Gender: " + row['gender'] + "</h3></a></li>";
        }

        var lv = $("#dogList");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
        $("#dogList a").on("click", clickHandler);
        function clickHandler() {
            localStorage.setItem("id", $(this).attr("data-row-id"));
            $(location).prop('href', "#pageEditDog");
        }
    }
    var owner = localStorage.getItem("username");
    var options = [owner];
    Dog.QCSelectOwned(QCSuccessSelectOwned, options);
}

function QCAddDog() {
    if (doValidate_addDogForm()){
        console.info("Validation succeeded");
        var name = $("#txtAddDogName").val();
        var age = $("#txtAddDogAge").val();
        var breed = $("#txtAddDogBreed").val();
        var gender = null;
        if ($("#radMale").is(":checked")){
            gender = "male";
        }
        else{
            gender = "female";
        }
        var owner = localStorage.getItem("username");
        var options = [name, owner, age, breed, gender];
        Dog.QCInsert(options);
        $(location).prop('href', "#pageViewDog");
    }
    else{
        console.info("Validation failed");
    }
}

function QCShowCurrentDog() {
    var id = localStorage.getItem("id");
    var options = [id];

    function QCSuccessSelectOne(tx, results) {
        var row = results.rows[0];

        console.info("id: " + id + " name: " + row['name']);

        $("#txtEditDogName").val(row['name']);
        $("#txtEditDogAge").val(row['age']);
        $("#txtEditDogBreed").val(row['breed']);
        if (row['gender'] == 'male'){
            $("#radEditMale").prop("checked", true);
        }
        else{
            $("#radEditFemale").prop("checked", true);
        }
        $("#editDogForm :radio").checkboxradio("refresh");
    }
    Dog.QCSelect(options, QCSuccessSelectOne);
}

function QCEditDog() {
    if (doValidate_editDogForm()){
        console.info("Validation succeeded");
        var name = $("#txtEditDogName").val();
        var age = $("#txtEditDogAge").val();
        var breed = $("#txtEditDogBreed").val();
        var id = localStorage.getItem("id")
        var gender = null;
        if ($("#radEditMale").is(":checked")){
            gender = "male";
        }
        else{
            gender = "female";
        }
        var options = [name, age, breed, gender, id];
        Dog.QCUpdate(options);
        $(location).prop('href', "#pageViewDog");
    }
    else{
        console.info("Validation failed");
    }
}

function QCDeleteDog() {
    var id = localStorage.getItem("id");
    var options = [id];

    Dog.QCDelete(options);
    $(location).prop("href", "#pageViewDog");
}
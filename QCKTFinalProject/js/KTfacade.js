/**
 * Created by kthiel3170 on 4/19/2017.
 */


function UserInsert() {
    if (doValidate_addAccountForm()) {
        console.info("Validation succeeded");


        //if validation is successful then fetch info from input controls(radio, text etc)
        var username = $("#txtAddUsername").val();
        var password = $("#txtAddPassword").val();
        var firstName = $("#txtAddFirstName").val();
        var lastName = $("#txtAddLastName").val();
        var email = $("#txtAddEmail").val();

        if($("#chkAddWalker").prop("checked")){
            var isWalker = "y";
        }
        else{
            var isWalker= "n";

        }
        var options = [username, password, firstName, lastName, email, isWalker];


        //then insert a record to the database table;
        User.UserInsert(options);
        $(location).prop('href', "#pageViewAccount");

    }
    else{
        console.info("Validation failed");
    }
}

function Login() {
    var username = $("#txtLoginUsername").val();
    var password = $("#txtLoginPassword").val();
    var options = [username, password];

    function successSelectOne(tx, results) {
        if (results.rows.length == 1) {
            localStorage.setItem("username", username);
            $(location).prop('href', "#pageViewAccount");
        }
        else {
            alert("Invalid Username or password");
        }
    }

    User.UserSelect(options, successSelectOne);
}

function ShowAccountPage() {

    var username = localStorage.getItem("username");
    var options = [username];
    var htmlCode="";

    function successSelectOne(tx, results) {
        var row = results.rows[0];

        htmlCode += "<li data-row-id=" + row['username'] + ">" +
            "<h1>Username: " + row['username'] + "</h1>" +
            "<h3>First Name: " + row['firstName'] + "</h3>" +
            "<h3>Last Name: " + row['lastName'] + "</h3>" +
            "<h3>Email: " + row['email'] + "</h3>" +
            "</li>";

        var lv = $("#lvAccountInfo");
        lv = lv.html(htmlCode);
        lv.listview("refresh");
    }

    User.UserSelectNoPassword(options, successSelectOne);
}

function EditAccount() {
    var username = localStorage.getItem("username");
    var options = [username];

    function successSelectOne(tx, results) {
        var row = results.rows[0];


        $("#txtEditUsername").val(row['username']);
        $("#txtEditPassword").val(row['password']);
        $("#txtConfirmEditPassword").val(row['password']);
        $("#txtEditFirstName").val(row['firstName']);
        $("#txtEditLastName").val(row['lastName']);
        $("#txtEditEmail").val(row['email']);


        if(row['walker'] == "y"){
            $("#chkEditWalker").prop("checked", true);

        }
        else if(row['walker'] == "n"){
            $("#chkEditWalker").prop("checked", false);

        }

        $("#editAccountForm :checkbox").checkboxradio("refresh");

    }

    User.UserSelectNoPassword(options, successSelectOne);
}

function UpdateAccount() {
    if (doValidate_editAccountForm()) {
        console.info("Validation succeeded");


        //if validation is successful then fetch info from input controls(radio, text etc)
        var oldUsername = localStorage.getItem("username");
        var username = $("#txtEditUsername").val();
        var password = $("#txtEditpassword").val();
        var firstName = $("#txtEditFirstName").val();
        var lastName = $("#txtEditLastName").val();
        var email = $("#txtEditEmail").val();

        if($("#chkEditWalker").prop("checked")){
            var isWalker = "y";
        }
        else{
            var isWalker= "n";

        }
        var options = [username, password, firstName, lastName, email, isWalker, oldUsername];

        localStorage.setItem("username", username);

        //then insert a record to the database table;
        User.UserUpdate(options);

    }
    else{
        console.info("Validation failed");
    }
}

function UpdateWalkersDropdown(page) {
    function successSelectAll(tx, results) {
        var htmlCode="";
        var yourUsername = localStorage.getItem("username");

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            if (row['username'] != yourUsername) {
                htmlCode += "<option value=" + row['username'] + ">" + row['firstName'] + "</option>";
            }
        }

        if(page == "add"){
            var lv = $("#selWalker");
            lv = lv.html(htmlCode);
            lv.selectmenu("refresh");
        }
        else if (page == "edit"){
            var lv = $("#selEditWalker");
            lv = lv.html(htmlCode);
            lv.selectmenu("refresh");
        }


    }

    User.UserSelectWalkers(successSelectAll);
}

function UpdateDogsDropdown(page) {
    function successSelectAll(tx, results) {
        var htmlCode="";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            htmlCode += "<option value=" + row['id'] + ">" + row['name'] +"</option>";

        }

        if(page == "add"){
            var lv = $("#selDog");
            lv = lv.html(htmlCode);
            lv.selectmenu("refresh");
        }
        else if (page == "edit"){
            var lv = $("#selEditDog");
            lv = lv.html(htmlCode);
            lv.selectmenu("refresh");
        }


    }

    var owner = localStorage.getItem("username");
    var option = [owner];

    Dog.QCSelectOwned(successSelectAll, option);
}

function ScheduleInsert() {
    if (doValidate_scheduleForm()) {
        console.info("Validation succeeded");


        //if validation is successful then fetch info from input controls(radio, text etc)
        var username = localStorage.getItem("username");
        var walker = $("#selWalker").val();
        var dog = $("#selDog").val();
        var date = $("#datDate").val();
        var pickup = $("#datPickupTime").val();
        var length = $("#selLength").val();


        var options = [username, walker, dog, date, pickup, length];


        //then insert a record to the database table;
        Schedule.ScheduleInsert(options);
        $(location).prop('href', "#pageViewSchedule");

    }
    else{
        console.info("Validation failed");
    }
}

function ScheduleSelectAll() {
    function successSelectAll(tx, results) {
        var htmlCode="";

        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

            htmlCode += "<li><a data-role='button' data-row-id=" + row['id'] + " href='#'>" +
                "<h1>Dog name: " + row['dog'] + "</h1>" +
                "<h3>Walker: " + row['walker'] + "</h3>" +
                "<h3>Date: " + row['date'] + "</h3>" +
                "<h3>Pickup Time: " + row['pickupTime'] + "</h3>" +
                "</a></li>";


        }
        var lv = $("#lvViewAppointments");
        lv = lv.html(htmlCode);
        lv.listview("refresh");

        $("#lvViewAppointments a").on("click", clickHandler);

        function clickHandler() {
            localStorage.setItem("scheduleId", $(this).attr("data-row-id"));
            //navigate to detail/modify page
            $(location).prop('href', "#pageEditSchedule");
        }


    }


    Schedule.ScheduleSelectAll(successSelectAll);
}

function ScheduleShowOne() {
    var id = localStorage.getItem("ScheduleId");
    var options = [id];

    function successSelectOne(tx, results) {
        var row = results.rows[0];

        $("#selEditWalker").val(row['walker']);
        $("#selEditDog").val(row['dog']);
        $("#datEditDate").val(row['date']);
        $("#datEditPickupTime").val(row['pickupTime']);
        $("#selEditLength").val(row['length']);

    }

    Schedule.ScheduleSelect(options, successSelectOne);
}

function ScheduleUpdate() {
    if (doValidate_editScheduleForm()) {
        console.info("Validation succeeded");


        //if validation is successful then fetch info from input controls(radio, text etc)
        var username = localStorage.getItem("username");
        var walker = $("#selEditWalker").val();
        var dog = $("#selEditDog").val();
        var date = $("#datEditDate").val();
        var pickup = $("#datEditPickupTime").val();
        var length = $("#selEditLength").val();
        var id = localStorage.getItem("scheduleId");


        var options = [username, walker, dog, date, pickup, length, id];


        //then insert a record to the database table;
        Schedule.ScheduleUpdate(options);
        $(location).prop('href', "#pageViewSchedule");
    }
    else{
        console.info("Validation failed");
    }
}

function ScheduleDelete() {
    var id = localStorage.getItem("scheduleId");
    var options = [id];
    Schedule.ScheduleDelete(options);

    $(location).prop('href', "#pageViewSchedule");
}
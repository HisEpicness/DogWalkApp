/**
 * Created by kthiel3170 on 4/19/2017.
 */

function btnAddAccount_click() {
    UserInsert();
}

function btnLogin_click() {
    Login();
}

function viewAccount_show() {
    ShowAccountPage();
}

function btnEditAccount_click() {
    EditAccount();
}

function btnUpdateAccount_click() {
    UpdateAccount();
}

function pageAddSchedule_show() {
    var page = "add";
    UpdateWalkersDropdown(page);
    UpdateDogsDropdown(page);
}

function pageEditSchedule_show() {
    var page = "edit";
    UpdateWalkersDropdown(page);
    UpdateDogsDropdown(page);
    ScheduleShowOne();
}

function btnBookAppointment_click() {
    ScheduleInsert();
}

function btnViewSchedule_click() {
    ScheduleSelectAll();
}

function btnEditSchedule_click() {
    ScheduleUpdate();
}

function btnDeleteSchedule_click() {
    ScheduleDelete();
}

function btnLogout_click() {
    localStorage.removeItem("username");
}

// function initDB() {
//     DB.QCCreateDatabase();
//     DB.QCCreateTables();
// }

// function pageLogin_show() {
//     var username = localStorage.getItem("username");
//     if(username != null){
//         $(location).prop('href', "#pageViewAccount");
//     }
// }

function init() {
    $("#btnAddAccount").on("click", btnAddAccount_click);
    $("#btnLogin").on("click", btnLogin_click);
    $("#btnEditAccount").on("click", btnEditAccount_click);
    $("#btnUpdateAccount").on("click", btnUpdateAccount_click);
    $("#btnCreateAppointment").on("click", btnBookAppointment_click);
    $("#btnViewSchedule").on("click", btnViewSchedule_click);
    $("#btnUpdateSchedule").on("click", btnEditSchedule_click);
    $("#btnDeleteSchedule").on("click", btnDeleteSchedule_click);
    $("#btnLogout").on("click", btnLogout_click);

    //$("#pageLogin").on("pageshow", pageLogin_show);
    $("#pageViewAccount").on("pageshow", viewAccount_show);
    $("#pageScheduleWalk").on("pageshow", pageAddSchedule_show);
    $("#pageEditSchedule").on("pageshow", pageEditSchedule_show);

    $("#pageEditDog").on("pageshow", pageEditDog_pageshow);
    $("#pageViewDog").on("pageshow", pageViewDog_pageshow);

    $("#btnCreateDog").on("click", btnCreateDog_click);
    $("#btnEditDog").on("click", btnEditDog_click);
    $("#btnDeleteDog").on("click", btnDeleteDog_click);
}

$(document).ready(function () {
    initDB();
    init();
});


/** Initialize database and tables */
function initDB() {
    console.info("Creating database in initDB()");
    try{
        DB.QCCreateDatabase();
        if (db) {
            DB.QCCreateTables();
        }
    } catch (e){
        console.error("Error: (Fatal) Error in initDB, can not proceed");
    }
}

/** Handler to show dog info on edit pageload*/
function pageEditDog_pageshow() {
    QCShowCurrentDog();
}

/** Handler to show all dogs on viewdog pageshow*/
function pageViewDog_pageshow() {
    QCGetDogs();
}

/** Handler to add dog to database on create button click*/
function btnCreateDog_click() {
    QCAddDog();
}

/** Handler to update dog record on edit button click*/
function btnEditDog_click() {
    QCEditDog();
}

/** Handler to delete dog on delete button click*/
function btnDeleteDog_click() {
    QCDeleteDog()
}

// /** Initialize handlers */
// function init() {
//
//
//
//
// }

$(document).ready(function () {
    initDB();
    //init();
});
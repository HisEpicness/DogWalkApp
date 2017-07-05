/**
 * Created by kthiel3170 on 4/19/2017.
 */




function errorHandler(tx, error) {
    console.error("SQL error: " + tx + " (" + error.code + ") -- " + error.message);
}

function successTransaction() {
    console.info("Success: Transaction is successful");
}
/**QCfinalDAL.js
 This js file handles CRUD operations
 Revision History:
 Quinlain Crawford 2017-04-19: Created
 */

var Dog={
    QCInsert: function(options) {
        function QCTXFunction(tx) {
            var sql  = "INSERT INTO dog(name, owner, age," +
                "breed, gender)" +
                "values(?,?,?,?,?);";
            function QCSuccessInsert() {
                console.info("Success: Insert successful");
                alert("New record added");
            }
            tx.executeSql(sql, options, QCSuccessInsert, QCErrorHandler);
        }
        db.transaction(QCTXFunction, QCErrorHandler, QCSuccessTransaction);
    },
    QCSelect: function (options, QCSuccessSelectOne) {
        function QCTXFunction(tx) {
            var sql = "SELECT * FROM dog WHERE id=?;";
            tx.executeSql(sql, options, QCSuccessSelectOne, QCErrorHandler);
        }
        db.transaction(QCTXFunction, QCErrorHandler, QCSuccessTransaction);
    },
    QCSelectOwned: function (QCSuccessSelectOwned, options) {
        function QCTXFunction(tx) {
            var sql = "SELECT * FROM dog WHERE owner=?;";
            tx.executeSql(sql, options, QCSuccessSelectOwned, QCErrorHandler);
        }
        db.transaction(QCTXFunction, QCErrorHandler, QCSuccessTransaction);
    },
    QCUpdate: function (options) {
        function QCTXFunction(tx) {
            var sql = "UPDATE dog SET name=?, age=?," +
                "breed=?, gender=? WHERE id=?;";
            function QCSuccessUpdate() {
                console.info("Success: Update successful");
                alert("Record updated successfully");
            }
            tx.executeSql(sql, options, QCSuccessUpdate, QCErrorHandler);
        }
        db.transaction(QCTXFunction, QCErrorHandler, QCSuccessTransaction);
    },
    QCDelete: function (options) {
        function QCTXFunction(tx) {
            var sql = "DELETE FROM dog WHERE id=?;";
            function QCSuccessDelete() {
                console.info("Success: Delete successful");
                alert("Record deleted successfully");
            }
            tx.executeSql(sql, options, QCSuccessDelete, QCErrorHandler);
        }
        db.transaction(QCTXFunction, QCErrorHandler, QCSuccessTransaction);
    }
}
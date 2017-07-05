/**QCdatabase.js
 This js file creates databases and creates/drops tables
 Revision History:
 Quinlain Crawford 2017-04-19: Created
*/

var db;

function QCErrorHandler(tx,error) {
    console.error("SQL error: " + tx + " (" + error.code + ") -- " + error.message);
}

function QCSuccessTransaction() {
    console.info("Success: Transaction is successful");
}

var DB={
    QCCreateDatabase: function () {
        var shortName = "QCFinalDB";
        var version = "1.0";
        var displayName = "DB for QCKTFinalProject app";
        var dbSize = 2 * 1024 * 1024;

        console.info("Creating database ...");

        db = openDatabase(shortName, version, displayName, dbSize, QCDBCreateSuccess);

        function QCDBCreateSuccess() {
            console.info("Success: Database creation is successful");
        }
    },
    QCCreateTables: function () {
        function QCTXFunction(tx) {
            //create user
            sql = "CREATE TABLE IF NOT EXISTS user( "
                + "username VARCHAR(30) NOT NULL PRIMARY KEY,"
                + "password VARCHAR(30) NOT NULL,"
                + "firstName VARCHAR(30) NOT NULL,"
                + "lastName VARCHAR(30) NOT NULL,"
                + "email VARCHAR(30) NOT NULL,"
                + "walker VARCHAR(1));";
            options = [];
            function QCSuccessCreate(){
                console.info("Success: Table Creation Successful");
            }
            tx.executeSql(sql, options, QCSuccessCreate, QCErrorHandler);
            //delete test user from users
            sql = "DELETE FROM user WHERE username=?;";
            options = ["testuser"];
            function QCSuccessDelete(){
                console.info("Success: Record Deletion Successful");
            }
            tx.executeSql(sql, options, QCSuccessDelete, QCErrorHandler);
            //insert test user into users
            sql = "INSERT INTO user(username, password, firstName, lastName, email, walker) " +
                "values(?, ?, ?, ?, ?, ?);";
            options = ["testuser","password","firstname","lastname","test@test.com","y"];
            function QCSuccessInsert(){
                console.info("Success: Table Insertion Successful");
            }
            tx.executeSql(sql, options, QCSuccessInsert, QCErrorHandler);
            //create schedule
            sql = "CREATE TABLE IF NOT EXISTS schedule( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "username VARCHAR(30) NOT NULL,"
                + "walker VARCHAR(30) NOT NULL,"
                + "dog INTEGER NOT NULL,"
                + "date DATE,"
                + "pickupTime TIME,"
                + "length INTEGER,"
                + "FOREIGN KEY(dog) REFERENCES dog(id),"
                + "FOREIGN KEY(walker) REFERENCES user(username),"
                + "FOREIGN KEY(username) REFERENCES user(username));";
            options = [];
            tx.executeSql(sql, options, QCSuccessCreate, QCErrorHandler);
            //create dog
            sql = "CREATE TABLE IF NOT EXISTS dog( "
                + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"
                + "name VARCHAR(30) NOT NULL,"
                + "owner VARCHAR(30) NOT NULL,"
                + "age INTEGER NOT NULL,"
                + "breed VARCHAR(30) NOT NULL,"
                + "gender VARCHAR(6) NOT NULL,"
                + "FOREIGN KEY(owner) REFERENCES user(username));";
            options = [];
            tx.executeSql(sql, options, QCSuccessCreate, QCErrorHandler);
            //delete test dog from dogs
            sql = "DELETE FROM dog WHERE name=?;";
            options = ["testdog"];
            function QCSuccessDelete(){
                console.info("Success: Record Deletion Successful");
            }
            tx.executeSql(sql, options, QCSuccessDelete, QCErrorHandler);
            //insert test dog into dogs
            sql = "INSERT INTO dog(name, owner, age, breed, gender) " +
                "values(?, ?, ?, ?, ?);";
            options = ["testdog","testuser","5","corgi","female"];
            function QCSuccessInsert(){
                console.info("Success: Table Insertion Successful");
            }
            tx.executeSql(sql, options, QCSuccessInsert, QCErrorHandler);
        }
        db.transaction(QCTXFunction, QCErrorHandler, QCSuccessTransaction);
    },
    QCDropTables: function () {
        function QCTXFunction(tx) {
            console.info("Dropping Table user...");

            var sql = "DROP TABLE IF EXISTS user;";
            var options = [];
            function QCSuccessDrop(){
                console.info("Success: Table dropped successfully");
            }
            tx.executeSql(sql, options, QCSuccessDrop, QCErrorHandler);
            console.info("Dropping Table schedule...");

            var sql = "DROP TABLE IF EXISTS schedule;";
            var options = [];
            tx.executeSql(sql, options, QCSuccessDrop, QCErrorHandler);
            console.info("Dropping Table dog...");

            var sql = "DROP TABLE IF EXISTS dog;";
            var options = [];
            tx.executeSql(sql, options, QCSuccessDrop, QCErrorHandler);
        }
        db.transaction(QCTXFunction, QCErrorHandler, QCSuccessTransaction);
    }
};
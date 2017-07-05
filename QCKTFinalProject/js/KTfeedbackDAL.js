/**
 * Created by kthiel3170 on 4/19/2017.
 */


var User = {
    UserInsert: function (options) {
        function txFunction(tx) {

            //edit based on what db table looks like


            var sql = "INSERT INTO user(username, password, " +
                "firstName, lastName, email, walker)" +
                "values(?, ?, ?, ?, ?, ?);";


            // var options = [];


            function successInsert() {
                console.info("Success: Insert successful");
                alert("New record added.");
            }
            tx.executeSql(sql, options, successInsert, errorHandler );
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    UserSelectWalkers: function (successSelectAll) {

        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE walker='y';";
            var options = [];

            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }


        db.transaction(txFunction, errorHandler, successTransaction);
    },
    UserSelect: function (options, successSelectOne) {



        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE username=? AND password=?;";



            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }



        db.transaction(txFunction, errorHandler, successTransaction);
    },
    UserSelectNoPassword: function (options, successSelectOne) {

        function txFunction(tx) {
            var sql = "SELECT * FROM user WHERE username=?;";



            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    UserUpdate: function (options) {

        function txFunction(tx) {



                var sql = "UPDATE user set username=?, password=?, " +
                    "firstName=?, lastName=?," +
                    "email=?, walker=?" +
                    "WHERE username=?;";




            // var options=[];
            function successUpdate() {
                console.info("Success: Update successful");
                alert("Record has been successfully updated");
            }

            tx.executeSql(sql, options, successUpdate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }
    // KTdelete: function (options) {
    //     function txFunction(tx) {
    //         var sql = "DELETE FROM review WHERE id=?;";
    //         // var options = [];
    //
    //         function successDelete() {
    //             console.info("Success: Delete successful");
    //             alert("Record deleted successfully");
    //         }
    //
    //         tx.executeSql(sql, options, successDelete, errorHandler);
    //     }
    //
    //
    //
    //     db.transaction(txFunction, errorHandler, successTransaction);
    // }
};

var Schedule = {
    ScheduleInsert: function (options) {
        function txFunction(tx) {

            //edit based on what db table looks like


            var sql = "INSERT INTO schedule(username, walker, " +
                "dog, date, pickupTime, length)" +
                "values(?, ?, ?, ?, ?, ?);";


            // var options = [];


            function successInsert() {
                console.info("Success: Insert successful");
                alert("New record added.");
            }
            tx.executeSql(sql, options, successInsert, errorHandler );
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    ScheduleSelectAll: function (successSelectAll) {

        function txFunction(tx) {
            var sql = "SELECT * FROM schedule WHERE username=?;";
            var username = localStorage.getItem("username");
            var options = [username];

            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }


        db.transaction(txFunction, errorHandler, successTransaction);
    },
    ScheduleSelect: function (options, successSelectOne) {

        function txFunction(tx) {
            var sql = "SELECT * FROM schedule WHERE id=?;";



            tx.executeSql(sql, options, successSelectOne, errorHandler());
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    ScheduleUpdate: function (options) {

        function txFunction(tx) {

            //edit based on what db table looks like

            var sql = "UPDATE schedule set username=?, walker=?, " +
                "dog=?, date=?," +
                "pickupTime=?, length=?" +
                "WHERE id=?;";


            // var options = [];


            function successInsert() {
                console.info("Success: Insert successful");
                alert("Record updated.");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
    ScheduleDelete: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM schedule WHERE id=?;";
            // var options = [];

            function successDelete() {
                console.info("Success: Delete successful");
                alert("Record deleted successfully");
            }

            tx.executeSql(sql, options, successDelete, errorHandler);
        }



        db.transaction(txFunction, errorHandler, successTransaction);
    }
};
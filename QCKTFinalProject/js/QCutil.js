/**QCutil.js
 * This js file contains form validation
 * Revision History:
 * Quinlain Crawford: 2017-04-20: Created
 */

/** Validation for adding dog */

function doValidate_addDogForm() {
    var form = $("#addDogForm");
    form.validate({
        rules:{
            txtAddDogName:{
                required:true,
                rangelength:[1,30]
            },
            txtAddDogAge:{
                required:true,
                number:true
            },
            txtAddDogBreed:{
                required:true,
                rangelength:[1,30]
            },
            radDogGender:{
                required:true
            }
        },
        messages:{
            txtAddDogName:{
                required:"Name is required",
                rangelength:"Length must be 1-30 characters long"
            },
            txtAddDogAge:{
                required:"Age is required",
                number:"Age must be a number"
            },
            txtAddDogBreed:{
                required:"Breed is required",
                rangelength:"Length must be 1-30 characters long"
            },
            radDogGender:{
                required:"Gender is required"
            }
        }
    });
    return form.valid();
}

/** Validation for editing dog */

function doValidate_editDogForm() {
    var form = $("#editDogForm");
    form.validate({
        rules:{
            txtEditDogName:{
                required:true,
                rangelength:[1,30]
            },
            txtEditDogAge:{
                required:true,
                number:true
            },
            txtEditDogBreed:{
                required:true,
                rangelength:[1,30]
            },
            radEditDogGender:{
                required:true
            }
        },
        messages:{
            txtEditDogName:{
                required:"Name is required",
                rangelength:"Length must be 1-30 characters long"
            },
            txtEditDogAge:{
                required:"Age is required",
                number:"Age must be a number"
            },
            txtEditDogBreed:{
                required:"Breed is required",
                rangelength:"Length must be 1-30 characters long"
            },
            radEditDogGender:{
                required:"Gender is required"
            }
        }
    });
    return form.valid();
}

/** Validation for confirming password on add form*/
jQuery.validator.addMethod("passwordAddMatch",
    function (value, element) {
        if (value != $("#txtAddPassword").val()) {
            return false;
        }
        return true;
    },
    "Passwords must match"
);

/** Validation for adding user */

function doValidate_addAccountForm() {
    var form = $("#addAccountForm");
    form.validate({
        rules:{
            txtAddUsername:{
                required:true,
                rangelength:[1,30]
            },
            txtAddPassword:{
                required:true,
                rangelength:[1,30]
            },
            txtConfirmPassword:{
                required:true,
                rangelength:[1,30],
                passwordAddMatch:true
            },
            txtAddFirstName:{
                required:true,
                rangelength:[1,30]
            },
            txtAddLastName:{
                required:true,
                rangelength:[1,30]
            },
            txtAddEmail:{
                required:true,
                email:true,
                rangelength:[1,30]
            }
        },
        messages:{
            txtAddUsername:{
                required:"Username is required",
                rangelength:"Length must be 1-30"
            },
            txtAddPassword:{
                required:"Password is required",
                rangelength:"Length must be 1-30"
            },
            txtConfirmPassword:{
                required:"Password confirmation is required",
                rangelength:"Length must be 1-30",
                passwordAddMatch:"Passwords must match"
            },
            txtAddFirstName:{
                required:"First name is required",
                rangelength:"Length must be 1-30"
            },
            txtAddLastName:{
                required:"Last name is required",
                rangelength:"Length must be 1-30"
            },
            txtAddEmail:{
                required:"Email is required",
                email:"Must be a valid email",
                rangelength:"Length must be 1-30"
            }
        }
    });
    return form.valid();
}

/** Validation for confirming password on edit form*/
jQuery.validator.addMethod("passwordEditMatch",
    function (value, element) {
        if (value != $("#txtConfirmEditPassword").val()) {
            return false;
        }
        return true;
    },
    "Passwords must match"
);

/** Validation for editing user */

function doValidate_editAccountForm() {
    var form = $("#editAccountForm");
    form.validate({
        rules:{
            txtEditUsername:{
                required:true,
                rangelength:[1,30]
            },
            txtEditPassword:{
                required:true,
                rangelength:[1,30]
            },
            txtConfirmEditPassword:{
                required:true,
                rangelength:[1,30],
                passwordEditMatch:true
            },
            txtEditFirstName:{
                required:true,
                rangelength:[1,30]
            },
            txtEditLastName:{
                required:true,
                rangelength:[1,30]
            },
            txtEditEmail:{
                required:true,
                email:true,
                rangelength:[1,30]
            }
        },
        messages:{
            txtEditUsername:{
                required:"Username is required",
                rangelength:"Length must be 1-30"
            },
            txtEditPassword:{
                required:"Password is required",
                rangelength:"Length must be 1-30"
            },
            txtConfirmEditPassword:{
                required:"Password confirmation is required",
                rangelength:"Length must be 1-30",
                passwordEditMatch:"Passwords must match"
            },
            txtEditFirstName:{
                required:"First name is required",
                rangelength:"Length must be 1-30"
            },
            txtEditLastName:{
                required:"Last name is required",
                rangelength:"Length must be 1-30"
            },
            txtEditEmail:{
                required:"Email is required",
                email:"Must be a valid email",
                rangelength:"Length must be 1-30"
            }
        }
    });
    return form.valid();
}

/** Validation for date not in past*/

jQuery.validator.addMethod("dateNotInPast",
    function (value, element) {
        var now = new Date();
        var date = Date.parse(value);
        if (date <= now){
            return false;
        }
        return true;
    },
    "Passwords must match"
);

/** Validation for scheduling walk */

function doValidate_scheduleForm() {
    var form = $("#scheduleForm");
    form.validate({
        rules:{
            selWalker:{
                required:true
            },
            selDog:{
                required:true
            },
            datDate:{
                required:true,
                dateNotInPast:true
            },
            datPickupTime:{
                required:true
            },
            selLength:{
                required:true
            }
        },
        messages:{
            selWalker:{
                required:"Walker is required"
            },
            selDog:{
                required:"Dog is required"
            },
            datDate:{
                required:"Date is required",
                dateNotInPast:"Date must be at least tommorow"
            },
            datPickupTime:{
                required:"Pickup Time is required"
            },
            selLength:{
                required:"Length is required"
            }
        }
    });
    return form.valid();
}

/** Validation for editing schedule */

function doValidate_editScheduleForm() {
    var form = $("#editScheduleForm");
    form.validate({
        rules:{
            selEditWalker:{
                required:true
            },
            selEditDog:{
                required:true
            },
            datEditDate:{
                required:true,
                dateNotInPast:true
            },
            datEditPickupTime:{
                required:true
            },
            selEditLength:{
                required:true
            }
        },
        messages:{
            selEditWalker:{
                required:"Walker is required"
            },
            selEditDog:{
                required:"Dog is required"
            },
            datEditDate:{
                required:"Date is required",
                dateNotInPast:"Date must be at least tommorow"
            },
            datEditPickupTime:{
                required:"Pickup Time is required"
            },
            selEditLength:{
                required:"Length is required"
            }
        }
    });
    return form.valid();
}
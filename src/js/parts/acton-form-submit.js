/**
 * HOW TO USE 
 * ==========
 * 1) Create your form in pure HTML/CSS markup 
 * 2) Create an Acton marketing list with the same values as the name attribute in your form fields
 * 3) Create a form using that marketing list and make sure all of the acton form values are teh same as your form field's name attribute 
 * 4) Create your form POST URL 
 * 5) Define a form variable here, example: const form = document.querySelector( '#contact-form' );
 * 6) Define a submitBtn variable here, example: const submitBtn = document.querySelector( 'input[type=submit]' );
 * 7) Define all of your form fields, example: const firstName = document.querySelector( '#inp_firstName' );
 * 8) Call submitForm function, example shown below
 *      - url: the url for the form post 
 *      - form: the form variable you defined 
 *      - submitBtn: the submitBtn variable you defined 
 *      - validate: boolean ( true/false ) if you want the form to be validated or not, if you pass in true you'll want to populate the validate function 
 *      - ...fields, pass in all of your form field variables separated by commas 
 * 9) Create your landing page 
 * 10) Check your work, celebrate or cry
 */
window.addEventListener( 'load', () => {
    // submitForm( 'https://marketing.resolutionre.com/acton/eform/43498/deffaf8b-b13e-4fd0-95ff-e4fb49a16d9a/d-ext-0001', form, submitBtn, false, firstName, lastName, email );
});

/**
 * @author Orion Palmer
 * @description Submits form via AJAX to Act-On
 * @param {*} form 
 * @param {*} submitBtn 
 * @param {*} validate 
 * @param  {...any} fields 
 */
function submitForm( url, form, submitBtn, validate, ...fields ) {
    if ( validate ) {
        submitBtn.addEventListener( 'click', ( e ) => {
            e.preventDefault(); 
            const errors = validate( ...fields );
            if ( errors.length > 0 ) {
                let errorMessage = '';
                for( const error of errors ) {
                    errorMessage += `${error.message}\n`;
                }
                alert( errorMessage ); 
            } else {
                ajaxReq( url, form );
                clearFields( ...fields );
            }
        })
    } else {
        submitBtn.addEventListener( 'click', ( e ) => {
            e.preventDefault(); 
            ajaxReq( url, form );
            clearFields( ...fields );
        });
    }
}

/**
 * @author Orion Palmer
 * @description Creates an error object for validation processing
 * @param  {...any} fields 
 * @returns Error object with DOM token and an error message
 */
function validate( ...fields ) {
    const errors = [];
    for( const field of fields ) {
        /* {{ ADD IN ANY VALIDATIONS FOR FORM FIELDS YOU WANT HERE }} */
        /* EXAMPLES: 
        VALIDATES A VALUE WAS PASSED INTO FIELD
        =======================================
        if ( first.value === '' ) {
            errors.push( { element: first, msg: 'First Name field is required!' } );
        } 

        VALIDATES A VALUE WAS PASSED INTO FIELD & VALUE IS A VALID EMAIL ADDRESS 
        ========================================================================
        if ( email.value === '' ) {
            errors.push( { element: email, msg: 'Email field is required!' } );
        } else if ( !emailRegEx.test( email.value ) ) {
            errors.push( { element: email, msg: 'Email field is invalid!' } );
        }
        */
    }
    return errors; 
}

/**
 * @author Orion Palmer
 * @description Makes AJAX request with form data
 * @param {*} form 
 * @param {*} url 
 */
function ajaxReq( url, form ) {
    const data = new FormData( form ); 
    let xhr = new XMLHttpRequest(); 
    xhr.open( 'POST', url, true ); 
    xhr.onload = function() {
        console.log( 'Success! Response recorded below!' );
        console.log( this.responseText );
    }
    xhr.onerror = function() {
        alert( 'There was an error submitting this form!' );
    }
    xhr.send( data );
}

/**
 * @author Orion Palmer 
 * @description Clears all input fields
 * @param  {...any} fields 
 */
function clearFields( ...fields ) {
    for ( const field of fields ) {
        field.value = '';
    }
}

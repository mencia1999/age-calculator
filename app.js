function manageAge()
{
    let now = new Date();
    let now_day = now.getDate();
    let now_month = now.getMonth() +1;
    let now_year = now.getFullYear();

    const dayInput = document.querySelector('#day');
    const monthInput = document.querySelector('#month');
    const yearInput = document.querySelector('#year');

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);
   

    // verification si champs non vides
    let isThereANaNInput = false;
    if(isNaN(day)){
        manageError(dayInput);
        isThereANaNInput = true;
    }else{
        hideError(dayInput);
    }
    if(isNaN(month)){
        manageError(monthInput);
        isThereANaNInput = true;
    }else{
        hideError(monthInput);
    }
    if(isNaN(year)){
        manageError(yearInput);
        isThereANaNInput = true;
    }else{
        hideError(yearInput);
    }


    if(isThereANaNInput){
        return false;
    }

    // verification si champs correctes
    let isThereErrorInInput = false;
    // champs des jours
    if(day > 31 || day < 1){
        manageError(dayInput,'Must be a valid day');
        isThereErrorInInput = true;
    }

    // champs des mois
    if(month > 12 || month < 1){
        manageError(dayInput,'Must be a valid month');
        isThereErrorInInput = true;
    }

    // champs des années
    if(year > now_year){
        manageError(dayInput,'Must be in the past');
        isThereErrorInInput = true;
    }

    if(isThereErrorInInput){
        return false;
    }

    const daysInMonths = {
        1 : 31,
        2 : 28,
        3 : 31,
        4 : 30,
        5 : 31,
        6 : 30,
        7 : 31,
        8 : 31,
        9 : 30,
        10 : 31,
        11 : 30,
        12: 31
    };
     
    // verification correspondance entre nombres de jours et de mois
    for(var key in daysInMonths)
    {
        var value = daysInMonths[key];
        // gestion correspondance month année bisextile
        if(year % 4 === 0 && month == 2){
            daysInMonths[2] = 29;
        }
        if(month == key && day > value){
            manageError(dayInput,'Must be a valid day');
            return false;
        }
    }

   

    let diff_days = Math.abs(now_day - day).toString().split('');
    let diff_months =  Math.abs(now_month - month).toString().split('');
    let diff_yearss =  Math.abs(now_year - year).toString().split('');
   
    let year1 = diff_yearss.length > 1 ? diff_yearss[0] : 0;
    let year2 =  diff_yearss.length > 1 ? diff_yearss[1] : diff_yearss[0];

    let month1 = diff_months.length > 1 ? diff_months[0] : 0;
    let month2 =  diff_months.length > 1 ? diff_months[1] : diff_months[0];

    let day1 = diff_days.length > 1 ? diff_days[0] : 0;
    let day2 =  diff_days.length > 1 ? diff_days[1] : diff_days[0];

    const placeYear1 = document.querySelector('#year-1');
    const placeYear2 = document.querySelector('#year-2');

    const placeMonth1 = document.querySelector('#month-1');
    const placeMonth2 = document.querySelector('#month-2');

    const placeDay1 = document.querySelector('#day-1');
    const placeDay2 = document.querySelector('#day-2');
    
    const numberPlaceholders = document.querySelectorAll('.results .result-content .number');
   
    var div_array = [...numberPlaceholders]; 
    div_array.forEach(div => {
        div.style.backgroundColor = 'unset';
       
    });
    placeYear1.innerHTML = "<p>"+year1+"</p>";
    placeYear2.innerHTML = "<p>"+year2+"</p>";
    placeMonth1.innerHTML = "<p>"+month1+"</p>";
    placeMonth2.innerHTML = "<p>"+month2+"</p>";
    placeDay1.innerHTML = "<p>"+day1+"</p>";
    placeDay2.innerHTML = "<p>"+day2+"</p>";

}

function manageError(element, text = ''){
    element.classList.add('error-input');
    let parent = element.parentElement.previousElementSibling;
    parent.classList.add('error-title');
    let paragraph_error = element.nextElementSibling;
    if(text !== ''){
        paragraph_error.innerHTML = text;
    }
    paragraph_error.style.display = 'block';
   
}

function hideError(element){
    element.classList.remove('error-input');
    let parent = element.parentElement.previousElementSibling;
    parent.classList.remove('error-title');
    let paragraph_error = element.nextElementSibling;
   
    paragraph_error.style.display = 'none';
    
}
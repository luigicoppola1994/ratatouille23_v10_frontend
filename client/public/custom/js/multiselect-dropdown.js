


function creaSelect(allergeni){

  var options = allergeni

var select = document.querySelector('.multiselect select');
var checkboxes = document.querySelector('.multiselect .checkboxes');

// Popola le opzioni
for (var i = 0; i < options.length; i++) {
 var option = document.createElement('option');
 option.value = options[i].id;
 option.innerHTML = options[i].name;
 select.appendChild(option);

 var label = document.createElement('label');
 label.innerHTML = '<input type="checkbox" value="' + options[i].id + '"> ' + options[i].name;
 checkboxes.appendChild(label);
}

// Mostra le opzioni selezionate
select.addEventListener('change', function() {
 var selectedOptions = this.selectedOptions;
 var values = [];

 for (    var i = 0; i < selectedOptions.length; i++) {
values.push(selectedOptions[i].value);
}

var checkboxes = document.querySelectorAll('.multiselect input[type="checkbox"]');

for (var i = 0; i < checkboxes.length; i++) {
if (values.indexOf(checkboxes[i].value) !== -1) {
 checkboxes[i].checked = true;
} else {
 checkboxes[i].checked = false;
}
}
});

// Mostra/nascondi le opzioni
var selectBox = document.querySelector('.multiselect .selectBox');
var overSelect = document.querySelector('.multiselect .overSelect');
var checkboxes = document.querySelector('.multiselect .checkboxes');
var searchbox = document.querySelector('.multiselect .searchbox');

selectBox.addEventListener('click', function() {
overSelect.style.display = 'block';
checkboxes.style.display = 'block';
searchbox.value = '';
searchbox.focus();
});

overSelect.addEventListener('click', function() {
overSelect.style.display = 'none';
checkboxes.style.display = 'none';
});

// Filtro opzioni
searchbox.addEventListener('input', function() {
var value = this.value.toLowerCase();
var labels = checkboxes.querySelectorAll('label');

for (var i = 0; i < labels.length; i++) {
var label = labels[i];
var checkbox = label.querySelector('input[type="checkbox"]');
var name = label.textContent.toLowerCase();

if (name.indexOf(value) !== -1) {
 label.style.display = 'block';
} else {
 label.style.display = 'none';
 checkbox.checked = false;
}
}
});
}

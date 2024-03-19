var movieList;
fetch("http://localhost:3000/json/data.json")
.then(response => response.json())
.then(json => {movieList =  json});


function clearModal() {
    $("#mTitle").val("");
    $("#mReview").val("");
    $("#mRate").val("1");
}

function completeModal(value) {
    $('#fTitle').val(movieList[value]["title"]);
    $('#fReview').val(movieList[value]["review"]);
    $('#fRate').val(movieList[value]["rate"]);
    $('#index').val(value);
}

$('#modal').on('hidden.bs.modal', function(){
    clearModal();
});

$('#addMovieBtn').on('click', function(){
    $('#modalTitle').html("Add movie");
    $('#myForm').attr('action', '/save');
});

$('#saveBtn').on('click', function(){
    $('#myForm').submit();
});

$('button[name="editBtn"]').on('click', function(){
    $('#modalTitle').html("Edit movie");
    completeModal(this.value);
    $('#myForm').attr('action', '/edit');
});

$('button[name="deleteBtn"]').on('click', function(){
    const body = {
        index: this.value
    };
    $.post("http://localhost:3000/delete", body, (data, status) => {
        console.log(data);
      });
      location.reload(true);
});


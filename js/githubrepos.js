var items;
var currentPage;
var pageLength = 20;

$(document).ready(function() {

    $.ajax({
        url: ('https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100'),
        dataType: 'json',
        type: 'get',
        success: function(response) {
            items = response.items;
            fillTable(1);
        }
    });
});

function fillTable(index) {
    $(".pagination li").removeClass("active");
    currentPage = index;
    $('#' + index).addClass('active');
    $("#repositoryTable > tbody").html("");
    for (var i = pageLength * (index - 1); i < pageLength * index; i++) {
        $('#repositoryTable tbody').append('<tr class="child"><td>' + items[i].name + '</td>' + '<td>' + items[i].owner.login + '</td>' +
            '<td>' + items[i].watchers_count + '</td>' + '<td>' + items[i].created_at.substring(0, 10) + '</td>' + '</tr>');
    }
}

$('ul.pagination li').click(function(e) {
    if ($(this).text() === '«') {
        if (currentPage > 1) {
            fillTable(parseInt(currentPage) - 1);
        }
    } else if ($(this).text() === '»') {
        if (currentPage < 5) {
            fillTable(parseInt(currentPage) + 1);
        }
    } else {
        fillTable($(this).text());
    }
});

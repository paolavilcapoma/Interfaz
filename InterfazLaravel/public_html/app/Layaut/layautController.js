var _token = sessionStorage.getItem('_token')

if(!_token) window.location="/login.html";

$(document).ready(function () {
    $("#header").load("/public_html/Views/layaut/header.html")
    $("#admin-menu").load("/public_html/Views/layaut/admin-menu.html", configurarMenu);
    $("#footer").load("/public_html/Views/layaut/footer.html");

});

function configurarMenu(response){
    path=document.location.pathname;
    $("#admin-menu li").each(function(index){
        if($(this).html().indexOf(path)>0){
            $(this).children().addClass("active");
        }
    })
}
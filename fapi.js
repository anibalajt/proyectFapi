window.fbAsyncInit = function() {
    FB.init({appId:"884863301601302",
    version    : 'v2.4',
     status:true, cookie:true, xfbml:true, channelUrl:"http://fapi.conoz.ca/"});

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log(response)
             FB.api('/'+response.authResponse.userID+'/friends', 'GET',function(response) {
               console.log(response);
            });
            console.log(response.authResponse.userID)

            FB.api(
              '/me/inbox',
              'GET',
              {},
              function(respons) {
                  console.log(respons)
                  // Insert your code here
              }
            );
            userIsLogged();
        } else {
            userIsNotLogged();
        }
    });
};


$(document).ready(function() {
    $("#ajaxActivityIndicator").hide();
    // $("#tabs").tabs();
    $("#loginFacebook").on("click",facebookLogin);

    $("#likes").change(function(){
        showCurrentPage($(this).val(), "externalWebPreviewLikes");
        $("#previewLink").attr("href", $(this).val());
        return false;
    });


});

function clearAllOptions(controlID){
    $("#" + controlID).find('option').remove().end();
}

function getURLParameter(urlPage, param){
    var name 	 = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( urlPage );
    var toReturn = "";

    if (results != null){
        toReturn = results[1];
    }

    return toReturn;
}

function isYouTubeURL(urlPage){
    return (urlPage.indexOf("http://www.youtube") != -1);
}

function userIsNotLogged(){
    $("#logged_actions").show();
    $("#user_information").hide();
    $("#loaded_user").show();
}

function userIsLogged(){
    $("#logged_actions").hide();
    $("#user_information").show();

    FB.api('/me', function(user) {
        $("#user_information").html("<h3>Bienvenido " + user.name + "<h3>");
    });

}

function facebookLoginCallBack(response){
    if (response.status === 'connected') {
        console.log(response)
        userIsLogged();
    } else if (response.status === 'not_authorized') {
        userIsNotLogged();
    } else {
        userIsNotLogged();
    }
}

// Logamos al usuario en facebook en caso de que no lo está ya
function facebookLogin(){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            userIsLogged();
        } else {
            if (response.status === 'not_authorized') {
                // El usuario ya esta logado Facebook pero la aplicación no está conectada a Facebook
                userIsNotLogged();
            }
            // FB.login(facebookLoginCallBack,  {
            //     scope: 'publish_actions',
            //     return_scopes: true
            // })
            FB.login(facebookLoginCallBack,  { scope: "email,read_custom_friendlists,read_mailbox,user_photos,user_posts,user_videos" })
        }
    });
}

/**
* Inicializa la lista de tus amigos
*/

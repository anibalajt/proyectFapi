window.fbAsyncInit = function() {
    FB.init({appId:"884863301601302",
    version    : 'v2.4',
    status:true, cookie:true, xfbml:true, channelUrl:"http://fapi.conoz.ca/"});

    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            console.log(response)

            console.log("friends")

            FB.api(
                "/"+response.authResponse.userID+"/friends","GET",
                function (response) {
                    console.log(response)
                    if (response && !response.error) {
                        /* handle the result */
                    }
                }
            );
            console.log("-----------------------------------------------------------------")

            FB.api(
                "/"+response.authResponse.userID+"/friendlists",
                function (response) {
                    console.log(response)
                    if (response && !response.error) {
                        /* handle the result */
                    }
                }
            );
            FB.api(
                '/me/friends',
                {},
                function(response) {
                    console.log(response)
                }
            );
            console.log("posts")
            FB.api(
                '/me/posts',
                'GET',
                {},
                function(response) {
                    console.log(response)
                    // Insert your code here
                }
            );
            console.log("photos")
            FB.api(
                '/me/photos',
                'GET',
                {},
                function(response) {
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
            FB.login(facebookLoginCallBack,  { scope: "user_birthday, user_religion_politics, user_relationships, user_relationship_details, user_hometown, user_location, user_likes, user_education_history, user_work_history, user_website, user_managed_groups, user_events, user_photos, user_videos, user_friends, user_about_me, user_status, user_games_activity, user_tagged_places, user_posts, read_page_mailboxes, user_actions.news, user_actions.fitness, user_actions.music, user_actions.video, user_actions.books, public_profile" })
        }
    });
}

/**
* Inicializa la lista de tus amigos
*/

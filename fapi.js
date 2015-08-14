window.fbAsyncInit = function() {
    FB.init({
        appId      : '884863301601302',
        xfbml      : true,
        version    : 'v2.4',
        channelUrl:"http://fapi.conoz.ca/"
    });

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
              'GET',
              {},
                function(response) {
                    console.log(response)
                }
            );
            console.log("posts")
            FB.api(
                '/me/posts',
                'GET',
                {"fields":"actions,admin_creator,call_to_action,caption,child_attachments,application,coordinates,created_time,description,expanded_height,expanded_width,feed_targeting,from,full_picture,height,icon,id,link,message,message_tags,name,object_id,parent_id,picture,place,privacy,promotion_status,properties,scheduled_publish_time,shares,source,status_type,story,story_tags,subscribed,targeting,timeline_visibility,to,type,updated_time,via,width,with_tags,attachments"},
                function(response) {
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
            FB.login(facebookLoginCallBack,  { scope: "user_birthday, user_likes, user_photos, user_friends, user_posts, public_profile" })
        }
    });
}

/**
* Inicializa la lista de tus amigos
*/

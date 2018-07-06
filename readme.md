
#Install

## Get access facebook token for the Tinder App

1. Go to this link
https://www.facebook.com/v2.6/dialog/oauth?redirect_uri=fb464891386855067%3A%2F%2Fauthorize%2F&scope=user_birthday%2Cuser_photos%2Cuser_education_history%2Cemail%2Cuser_relationship_details%2Cuser_friends%2Cuser_work_history%2Cuser_likes&response_type=token%2Csigned_request&client_id=464891386855067

2. Open console and search Network tab
3. Search for POST response "https://www.facebook.com/v2.6/dialog/oauth/read?dpr=1"
4. Inside you will find the "access_token" in jsmod / require / 0 , etc

5. Read the docs for the API https://www.npmjs.com/package/tinder

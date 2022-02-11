from .models import SpotifyToken
from django.utils import timezone
from datetime import timedelta
from .credentials import CLIENT_ID, CLIENT_SECRET
from requests import post, put, get


BASE_URL = "https://api.spotify.com/v1/me/"


def get_user_tokens(session_id):
    """
    Gets the user's tokens from the database
    """
    user_tokens = SpotifyToken.objects.filter(user=session_id)

    return user_tokens[0] if user_tokens.exists() else None


def update_or_create_user_tokens(session_id, access_token, token_type, expires_in, refresh_token):
    """
    Updates or creates new tokens for the user
    """
    tokens = get_user_tokens(session_id)
    expires_in = timezone.now() + timedelta(seconds=expires_in)

    if tokens:
        tokens.access_token = access_token
        tokens.refresh_token = refresh_token
        tokens.expires_in = expires_in
        tokens.token_type = token_type
        tokens.save(update_fields=['access_token',
                                   'refresh_token', 'expires_in', 'token_type'])
    else:
        tokens = SpotifyToken(user=session_id, access_token=access_token,
                              refresh_token=refresh_token, token_type=token_type, expires_in=expires_in)
        tokens.save()


def is_spotify_authenticated(session_id):
    """
    Checks if Spotify is authenticated.
    """
    if tokens := get_user_tokens(session_id):
        expiry = tokens.expires_in
        if expiry <= timezone.now():
            refresh_spotify_token(session_id)

        return True

    return False


def refresh_spotify_token(session_id):
    """
    Refreshes the user's tokens so they don't expire
    """
    refresh_token = get_user_tokens(session_id).refresh_token

    response = post('https://accounts.spotify.com/api/token', data={
        'grant_type': 'refresh_token',
        'refresh_token': refresh_token,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }).json()

    access_token = response.get('access_token')
    token_type = response.get('token_type')
    expires_in = response.get('expires_in')

    update_or_create_user_tokens(
        session_id, access_token, token_type, expires_in, refresh_token)


def execute_spotify_api_request(session_id, endpoint, post_=False, put_=False):
    """
    Sends a request to Spotify API
    """
    tokens = get_user_tokens(session_id)
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {tokens.access_token}',
    }


    if post_:
        post(BASE_URL + endpoint, headers=headers)
    if put_:
        put(BASE_URL + endpoint, headers=headers)

    response = get(BASE_URL + endpoint, {}, headers=headers)
    try:
        response = response.json()
        # print('\n\n\n\n\n')
        # print(response)
        # print('\n\n\n\n\n')
        return response
    except:
        return {'Error': 'Issue with request'}


def play_song(session_id):
    """
    Unpauses the current song
    """
    return execute_spotify_api_request(session_id, "player/play", put_=True)


def pause_song(session_id):
    """
    Pauses the current song
    """
    return execute_spotify_api_request(session_id, "player/pause", put_=True)


def previous_song(session_id):
    """
    Rewinds to the previous song
    """
    return execute_spotify_api_request(session_id, "player/previous", post_=True)


def skip_song(session_id):
    """
    Skips the current song
    """
    return execute_spotify_api_request(session_id, "player/next", post_=True)


def song_context(session_id):
    """
    Get Song context
    """
    # print(f'\n\n\n\n{response}\n\n\n\n\n')

    return execute_spotify_api_request(session_id, "player")


def is_shuffled(session_id):
    """
    Checks if Spotify is shuffled or not
    """

    response = song_context(session_id)

    return response.get('shuffle_state')


def is_repeating(session_id):
    """
    Checks if Spotify is repeating or not
    """

    response = song_context(session_id)

    return response.get('repeat_state')


def shuffle_song(session_id):
    """
    Toggles shuffle for Spotify
    """
    if shuffle_state := is_shuffled(session_id):
        return execute_spotify_api_request(session_id, "player/shuffle?state=false", put_=True)
    else:
        return execute_spotify_api_request(session_id, "player/shuffle?state=true", put_=True)


def repeat_song(session_id):
    """
    Toggles repeat for Spotify
    """
    repeat_state = is_repeating(session_id)
    # print(repeat_state)
    if repeat_state == 'off':
        return execute_spotify_api_request(session_id, "player/repeat?state=context", put_=True)
    if repeat_state == 'context':
        return execute_spotify_api_request(session_id, "player/repeat?state=track", put_=True)
    if repeat_state == 'track':
        return execute_spotify_api_request(session_id, "player/repeat?state=off", put_=True)


def get_volume(session_id):
    """
    Get current volume
    """
    response = song_context(session_id)
    return response.get('volume_percent')


def increase_volume(session_id):
    """
    Increase volume by 1%
    """
    volume_percent = get_volume(session_id)
    volume_percent += 1
    if volume_percent == 101:
        return execute_spotify_api_request(
            session_id, 'player/volume?volume_percent=100'
        )

    else:
        return execute_spotify_api_request(session_id, f"player/volume?volume_percent={volume_percent}")


def decrease_volume(session_id):
    """
    Decrease volume by 1%
    """
    volume_percent = get_volume(session_id)
    volume_percent += 1
    if volume_percent == -1:
        return execute_spotify_api_request(
            session_id, 'player/volume?volume_percent=0'
        )

    else:
        return execute_spotify_api_request(session_id, f"player/volume?volume_percent={volume_percent}")

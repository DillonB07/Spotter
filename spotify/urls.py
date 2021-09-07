from django.urls import path
from .views import *

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
    path('redirect', spotify_callback),
    path('is-authenticated', IsAuthenticated.as_view()),
    path('current-song', CurrentSong.as_view()),
    path('pause-song', PauseSong.as_view()),
    path('play-song', PlaySong.as_view()),
    path('previous-song', PreviousSong.as_view()),
    path('skip-song', SkipSong.as_view()),
    path('shuffle-song', ShuffleSong.as_view()),
    path('repeat-song', RepeatSong.as_view()),
    path('spotify/current-song', SpotifyCurrentSong.as_view())
]

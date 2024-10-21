import React, { useEffect, useState } from 'react';
import SpotifyWebPlayer from 'react-spotify-web-playback';
import axios from 'axios';

const accessToken = 'ADD_your_Token';

function MusicPlayer({ mood, weather }) {
  const [trackUri, setTrackUri] = useState('');

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (mood || weather) {
        try {
          const seed_genres = getMoodGenres(mood, weather);
          const response = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            },
            params: {
              seed_genres: seed_genres.join(','),
              limit: 1
            }
          });

          if (response.data.tracks.length > 0) {
            setTrackUri(response.data.tracks[0].uri);
          }
        } catch (error) {
          console.error('Error fetching recommendation:', error);
        }
      }
    };

    fetchRecommendation();
  }, [mood, weather]);

  const getMoodGenres = (mood, weather) => {
    const moodGenres = {
      'Happy': ['pop', 'dance'],
      'Sad': ['blues', 'soul'],
      'Energetic': ['rock', 'electronic'],
      'Relaxed': ['ambient', 'chill'],
      'Focused': ['classical', 'jazz']
    };

    const weatherGenres = {
      'Clear': ['summer', 'tropical'],
      'Clouds': ['indie', 'folk'],
      'Rain': ['rainy-day', 'sleep'],
      'Snow': ['winter', 'holidays'],
      'Thunderstorm': ['dramatic', 'epic']
    };

    const genres = [];
    if (mood && moodGenres[mood]) {
      genres.push(...moodGenres[mood]);
    }
    if (weather && weatherGenres[weather]) {
      genres.push(...weatherGenres[weather]);
    }

    return genres.length > 0 ? genres : ['pop']; // Default to pop if no genres are selected
  };

  if (!accessToken) return null;

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Personalized Music</h2>
      {trackUri ? (
        <SpotifyWebPlayer
          token={accessToken}
          uris={[trackUri]}
          styles={{
            activeColor: '#fff',
            bgColor: '#333',
            color: '#fff',
            loaderColor: '#fff',
            sliderColor: '#1cb954',
            trackArtistColor: '#ccc',
            trackNameColor: '#fff',
          }}
        />
      ) : (
        <p className="text-center text-lg text-gray-600">Select a mood or wait for weather data to get music recommendations.</p>
      )}
    </div>
  );
}

export default MusicPlayer;
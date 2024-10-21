import React from 'react';

const moods = ['Happy', 'Sad', 'Energetic', 'Relaxed', 'Focused'];

function MoodSelector({ setMood }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">How are you feeling?</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setMood(mood)}
            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition-colors"
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodSelector;
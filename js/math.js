class MathSingleton {
	calculateOverallRating (listObj, nostalgia, story, music, replay, art_direction, mechanics) {
		const nostalgia_ratio = parseFloat(nostalgia) * listObj.newWeights.nostalgia_weight; // 30%
		const story_ratio = parseFloat(story) * listObj.newWeights.story_weight; // 18%
		const music_ratio = parseFloat(music) * listObj.newWeights.music_weight; // 16%
		const replay_ratio = parseFloat(replay) * listObj.newWeights.replay_weight; // 14%
		const art_direction_ratio = parseFloat(art_direction) * listObj.newWeights.art_direction_weight; // 12%
		const mechanics_ratio = parseFloat(mechanics) * listObj.newWeights.mechanics_weight; // 10%
		return parseFloat((nostalgia_ratio + story_ratio + music_ratio + replay_ratio + art_direction_ratio + mechanics_ratio)).toFixed(2);
	};
}

export default new MathSingleton();
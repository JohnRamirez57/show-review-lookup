export const CleanShowData = (shows, isFavorites = false, favoriteShowList = []) => {
  if (!Array.isArray(shows)) return [];
  
  // Convert all IDs to numbers for proper comparison cause .includes compares val and type, and id is a num while elements in list are strings
  const normalizedFavorites = new Set(favoriteShowList.map(id => Number(id))); //O(1) instead of 0(n)
  
  return shows.map((item) => {
    const show = isFavorites ? item : item.show || {};
    const showId = Number(show.id);
    return {
      showTitle: show.name || "Unknown",
      showScore: item.score || "N/A",
      averageRuntime: show.averageRuntime || "?",
      startDate: show.premiered || "",
      endDate: show.ended || "",
      genres: show.genres || [],
      language: show.language || "Unknown",
      coverPhoto: show.image?.original || "",
      rating: show.rating?.average || "?",
      runtime: show.runtime || "N/A",
      showStatus: show.status || "Unknown",
      scheduleDays: show.schedule?.days || [],
      scheduleTime: show.schedule?.time || "",
      summary: show.summary || "",
      type: show.type || "N/A",
      showID: show.id || "Missing ID",
      isFavorited: normalizedFavorites.has(showId),
    };
  });
};

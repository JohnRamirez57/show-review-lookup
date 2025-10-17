export const CleanShowData = (shows) => {
  if (!Array.isArray(shows)) return [];

  return shows.map((item) => {
    const show = item.show || {};

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
    };
  });
};

export const useTimeFormate = (isoString) => {
    if (!isoString) return "";

    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "";

    const diffMs = d.getTime() - Date.now();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (Math.abs(diffDays) < 7) return rtf.format(diffDays, "day");

    const diffWeeks = Math.round(diffDays / 7);
    if (Math.abs(diffWeeks) < 4) return rtf.format(diffWeeks, "week");

    const diffMonths = Math.round(diffDays / 30);
    if (Math.abs(diffMonths) < 12) return rtf.format(diffMonths, "month");

    const diffYears = Math.round(diffDays / 365);
    return rtf.format(diffYears, "year");
  };
import { useEffect, useState } from "react";
import { NotebookPen, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

function ChallengeNotes() {

  const { darkMode } = useTheme();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);

  const fetchNotes = async () => {

    try {

      setLoading(true);

      const response = await api.get("/challenge/notes", {
        timeout: 8000,
      });

      const list = response.data.notes || [];

      setNotes(list);
      // Land on the most recent entry by default, like opening a
      // journal to its last written page.
      setPageIndex(Math.max(list.length - 1, 0));

    } catch (error) {

      console.log(error.response?.data || error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchNotes();

  }, []);

  const current = notes[pageIndex];

  return (
    <div
      className={`rounded-3xl p-6 md:p-8 ${
        darkMode ? "bg-slate-900 border border-slate-800" : "bg-white shadow-xl"
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-6 flex items-center gap-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        <NotebookPen size={22} className="text-blue-500" />
        Saved Notes
      </h2>

      {loading ? (

        <p className={darkMode ? "text-slate-400" : "text-gray-500"}>
          Loading notes...
        </p>

      ) : notes.length === 0 ? (

        <p className={darkMode ? "text-slate-400" : "text-gray-500"}>
          Nothing saved yet — open today's circle in the tracker above and
          jot down what you learned. It'll show up here.
        </p>

      ) : (

        <div>

          {/* The "page" itself */}
          <div
            className={`relative rounded-2xl p-8 min-h-[220px] ${
              darkMode
                ? "bg-slate-950 border border-slate-800"
                : "bg-amber-50 border border-amber-100"
            }`}
            style={{
              backgroundImage: darkMode
                ? "repeating-linear-gradient(180deg, transparent, transparent 27px, rgba(148,163,184,0.12) 28px)"
                : "repeating-linear-gradient(180deg, transparent, transparent 27px, rgba(180,140,60,0.12) 28px)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen
                size={18}
                className={darkMode ? "text-blue-400" : "text-amber-700"}
              />
              <p
                className={`font-bold text-lg ${
                  darkMode ? "text-white" : "text-amber-900"
                }`}
              >
                Day {current.dayNumber}
              </p>
            </div>

            <p
              className={`whitespace-pre-wrap leading-7 ${
                darkMode ? "text-slate-200" : "text-amber-950"
              }`}
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {current.note}
            </p>
          </div>

          {/* Page-flip controls */}
          <div className="flex items-center justify-between mt-4">

            <button
              onClick={() => setPageIndex((i) => Math.max(i - 1, 0))}
              disabled={pageIndex === 0}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-30 ${
                darkMode
                  ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            <p className={darkMode ? "text-slate-500 text-xs" : "text-gray-400 text-xs"}>
              Page {pageIndex + 1} of {notes.length}
            </p>

            <button
              onClick={() =>
                setPageIndex((i) => Math.min(i + 1, notes.length - 1))
              }
              disabled={pageIndex === notes.length - 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition disabled:opacity-30 ${
                darkMode
                  ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Next
              <ChevronRight size={16} />
            </button>

          </div>

        </div>

      )}

    </div>
  );

}

export default ChallengeNotes;
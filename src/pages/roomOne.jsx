import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const sugars = [
  { id: "glucose", name: "Glucose" },
  { id: "fructose", name: "Fructose" },
  { id: "galactose", name: "Galactose" },
  // Wrong answers:
  { id: "xylose", name: "Xylose" },
  { id: "ribose", name: "Ribose" },
  { id: "mannose", name: "Mannose" },
];

const clues = [
  { id: "brain_fuel", label: "Brain’s fuel" },
  { id: "fruit_sugar", label: "Fruit sugar" },
  { id: "milk_sugar", label: "Milk sugar" },
];

const correctMatches = {
  glucose: "brain_fuel",
  fructose: "fruit_sugar",
  galactose: "milk_sugar",
};

const iconMap = {
  glucose: "🧠",
  fructose: "🍎",
  galactose: "🥛",
  xylose: "❓",
  ribose: "🧬",
  mannose: "🔬",
};

const colorStyles = {
  glucose: {
    bg: "from-green-200 via-green-300 to-green-400",
    border: "border-green-400",
    shadow: "rgba(74, 222, 128, 0.5)",
  },
  fructose: {
    bg: "from-pink-200 via-pink-300 to-pink-400",
    border: "border-pink-400",
    shadow: "rgba(236, 72, 153, 0.5)",
  },
  galactose: {
    bg: "from-blue-200 via-blue-300 to-blue-400",
    border: "border-blue-400",
    shadow: "rgba(59, 130, 246, 0.5)",
  },
  xylose: {
    bg: "from-gray-300 via-gray-400 to-gray-500",
    border: "border-gray-500",
    shadow: "rgba(107, 114, 128, 0.5)",
  },
  ribose: {
    bg: "from-purple-200 via-purple-300 to-purple-400",
    border: "border-purple-400",
    shadow: "rgba(168, 85, 247, 0.5)",
  },
  mannose: {
    bg: "from-yellow-300 via-yellow-400 to-yellow-500",
    border: "border-yellow-500",
    shadow: "rgba(234, 179, 8, 0.5)",
  },
};

export default function RoomOne() {
  const navigate = useNavigate();

  const [matches, setMatches] = useState({}); // clueId -> sugarId
  const [activeId, setActiveId] = useState(null);
  const [error, setError] = useState(null); // null | "incomplete" | "wrong"
  const [shuffledSugars, setShuffledSugars] = useState([]);

  // Shuffle sugars on mount
  useEffect(() => {
    setShuffledSugars(shuffleArray(sugars));
  }, []);

  const shuffleArray = (arr) => {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const reshuffleCards = () => {
    setShuffledSugars(shuffleArray(sugars));
    setMatches({});
    // do NOT clear error here, so message stays visible on wrong
  };

  // Sensors for dnd-kit (support pointer/touch)
  const sensors = useSensors(useSensor(PointerSensor));

  // Called when drag starts
  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  // Called when dragging ends
  const handleDragEnd = ({ active, over }) => {
    setActiveId(null);
    if (over && active.id && over.id) {
      // Check if over is a clue droppable
      if (clues.find((c) => c.id === over.id)) {
        setMatches((prev) => {
          // Remove this sugar from any clue it was previously assigned to
          const updated = Object.fromEntries(
            Object.entries(prev).filter(([_, sId]) => sId !== active.id)
          );
          // Assign sugar to this clue
          updated[over.id] = active.id;
          return updated;
        });
        setError(null); // clear error when user drops correctly
      }
    }
  };

  // Cancel drag
  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleSubmit = () => {
    const allCluesMatched = clues.every((clue) => matches[clue.id]);

    if (!allCluesMatched) {
      setError("incomplete");
      return;
    }

    const isAllCorrect = clues.every(
      (clue) => correctMatches[matches[clue.id]] === clue.id
    );

    if (isAllCorrect) {
      setError(null);
    } else {
      reshuffleCards();
      setError("wrong");
    }
  };

  const isUnlocked =
    clues.every((clue) => matches[clue.id]) &&
    clues.every((clue) => correctMatches[matches[clue.id]] === clue.id);

  const assignedSugarIds = new Set(Object.values(matches));

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center p-6 md:p-12">
      <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 mb-8 text-center">
        🔐 Room 1: Sweet Single Shots
      </h1>
      <p className="max-w-xl text-yellow-800 text-center mb-10 px-4">
        The chef spilled the sugar labels! Drag each sugar card on the left and drop it on the
        correct function on the right. Beware of tricky sugars that don’t belong! Get all three
        correct to unlock the next room.
      </p>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div className="flex flex-col md:flex-row w-full max-w-6xl gap-12">
          {/* Sugar cards */}
          <div
            className="
            md:w-1/2
            bg-white/30
            backdrop-blur-md
            border border-yellow-300
            rounded-3xl
            shadow-lg
            p-8
            grid grid-cols-3 gap-6
            min-h-[520px]
            max-w-[500px]
            mx-auto
          "
            aria-label="Draggable sugar cards container"
          >
            <h2 className="text-yellow-900 text-xl font-semibold mb-6 text-center col-span-3">
              🍬 Sugars (including some tricksters!)
            </h2>

            {shuffledSugars.map(({ id, name }) => {
              const isAssigned = assignedSugarIds.has(id);
              const styles = colorStyles[id] || colorStyles["xylose"];

              return (
                <DraggableSugarCard
                  key={id}
                  id={id}
                  name={name}
                  icon={iconMap[id]}
                  assigned={isAssigned}
                  styles={styles}
                />
              );
            })}
          </div>

          {/* Clues */}
          <div className="md:w-1/2 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-yellow-900 text-xl font-semibold mb-6 text-center">
              🧠 Functions
            </h2>
            <div className="flex flex-col gap-8">
              {clues.map(({ id, label }) => {
                const matchedSugarId = matches[id];
                const matchedSugarName =
                  sugars.find((sugar) => sugar.id === matchedSugarId)?.name || "";

                return (
                  <DroppableClue
                    key={id}
                    id={id}
                    label={label}
                    matchedSugarName={matchedSugarName}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Drag preview */}
        <DragOverlay>
          {activeId ? (
            <DragPreview
              id={activeId}
              name={sugars.find((s) => s.id === activeId)?.name || ""}
              icon={iconMap[activeId]}
              styles={colorStyles[activeId] || colorStyles["xylose"]}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Submit button and error messages */}
      <div className="mt-10 text-center">
        <button
          onClick={handleSubmit}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
        >
          ✅ Submit Answers
        </button>

        {error === "incomplete" && (
          <div className="mt-4 text-red-600 font-semibold">
            ❗ Please match all clues before submitting.
          </div>
        )}

        {error === "wrong" && (
          <div className="mt-4 text-red-600 font-semibold">
            ❌ One or more answers are incorrect! Try again.
          </div>
        )}
      </div>

      {/* Unlock next room */}
      {isUnlocked && (
        <div className="mt-10 text-center">
          <div className="text-green-700 font-bold text-xl mb-4">✅ Code Unlocked: GFG</div>
          <button
            onClick={() => navigate("/roomTwo")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg transition"
          >
            🚪 Enter Room 2
          </button>
        </div>
      )}
    </div>
  );
}

// Draggable sugar card
function DraggableSugarCard({ id, name, icon, assigned, styles }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    disabled: assigned,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        select-none rounded-2xl p-4 shadow-xl
        text-yellow-900 font-semibold text-lg text-center
        bg-gradient-to-tr ${styles.bg}
        border ${styles.border}
        backdrop-blur-sm
        transition-transform duration-200 ease-in-out
        ${assigned ? "opacity-50 cursor-not-allowed" : "cursor-move hover:scale-105"}
        ${isDragging ? "opacity-70" : ""}
      `}
      title={assigned ? `${name} is already matched` : `Drag ${name}`}
      style={{
        userSelect: "none",
        boxShadow: `0 4px 10px ${styles.shadow}`,
      }}
    >
      <div className="text-4xl mb-1">{icon}</div>
      <div>{name}</div>
    </div>
  );
}

// Droppable clue box
function DroppableClue({ id, label, matchedSugarName }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`
        min-h-[60px] border-4 border-dashed border-yellow-400 rounded-xl
        flex items-center justify-center bg-yellow-50
        hover:bg-yellow-100 transition relative
        ${isOver ? "bg-yellow-200 border-yellow-500" : ""}
      `}
    >
      {matchedSugarName ? (
        <div
          className="bg-yellow-300 rounded-xl px-6 py-3 shadow-md text-yellow-900 font-semibold cursor-pointer select-none"
          title={`${matchedSugarName} matched`}
        >
          🍬 {matchedSugarName}
        </div>
      ) : (
        <span className="text-yellow-700 font-medium">{label}</span>
      )}
    </div>
  );
}

// Drag preview
function DragPreview({ id, name, icon, styles }) {
  return (
    <div
      className={`
        cursor-grabbing select-none rounded-2xl p-4 shadow-xl
        text-yellow-900 font-semibold text-lg text-center
        bg-gradient-to-tr ${styles.bg}
        border ${styles.border}
        backdrop-blur-sm
        opacity-90
        scale-110
        pointer-events-none
      `}
      style={{
        userSelect: "none",
        boxShadow: `0 6px 16px ${styles.shadow}`,
      }}
    >
      <div className="text-5xl mb-1">{icon}</div>
      <div>{name}</div>
    </div>
  );
}

"use client";
import Keyboard from "@/components/Keyboard";
import Timer from "@/components/Timer";
import Layout from "@/components/common/Layout";
import randomWords from "@/scripts/randomWords";
import React, { useEffect, useState } from "react";

const Type = () => {
  const [start, setStart] = useState<boolean>(false);
  const [timer, setTimer] = useState(30);
  const [words, setWords] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [finish, setFinish] = useState<boolean>(false);
  const [caretPosition, setCaretPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const addClasses = (id: string, classes: string[]) => {
    document.getElementById(id)?.classList.add(...classes);
  };
  const removeClasses = (id: string, classes: string[]) => {
    document.getElementById(id)?.classList.remove(...classes);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const typed = e.target.value;
    const typed_words = typed.split(" ");
    setStart(true);
    if (!finish) setTyped(e.target.value);

    // match typed words with actual words
    for (let i = 0; i < typed_words.length; i++) {
      const w = typed_words[i];
      const actual = words[i];

      // check for in dividual letters
      for (let j = 0; j < actual.length; j++) {
        if (w.charAt(j) === actual.charAt(j)) {
          removeClasses(`word${i}letter${j}`, ["text-error"]);
          addClasses(`word${i}letter${j}`, ["text-primary"]);
        } else if (!actual.startsWith(w) && w.length > j) {
          removeClasses(`word${i}letter${j}`, ["text-primary"]);
          addClasses(`word${i}letter${j}`, ["text-error"]);
        } else {
          removeClasses(`word${i}letter${j}`, ["text-error"]);
          removeClasses(`word${i}letter${j}`, ["text-primary"]);
        }
      }

      // underline words if not equal to the text
      if (
        !actual.startsWith(w) ||
        (i !== typed_words.length - 1 && w.length !== actual.length)
      ) {
        addClasses(`word${i}`, ["underline", "decoration-error"]);
      } else {
        removeClasses(`word${i}`, ["underline", "decoration-error"]);
      }
    }

    let sum = 0;
    for (let i = 0; i < typed_words.length - 1; i++) {
      const wordWidth =
        document.getElementById(`word${i}`)?.getBoundingClientRect().width || 0;
      const finalWidth = wordWidth;
      sum += finalWidth + 14;
    }
    for (
      let i = 0;
      i < typed_words[typed_words.length - 1].split("").length;
      i++
    ) {
      let letterWidth = document
        .getElementById(`word${typed_words.length - 1}letter${i}`)
        ?.getBoundingClientRect().width;
      if (!letterWidth) {
        const span = document.createElement("span");
        span.textContent = typed_words[typed_words.length - 1].split("")[i];
        span.style.visibility = "hidden"; // Make the element hidden

        // Append the span to the document body
        document.body.appendChild(span);

        // Get the width of the span element
        letterWidth = span.getBoundingClientRect().width;
        letterWidth += 0.6 * letterWidth;

        // Remove the span element from the document body
        document.body.removeChild(span);
      } else {
        letterWidth += 0.09 * letterWidth;
      }
      sum += letterWidth + 0.01 * letterWidth;
    }
    setCaretPosition({
      top: 0,
      left: sum + (window.innerWidth >= 768 ? 40 : 0),
    });

    // remove underline if the word is not in typed_words
    for (let i = 0; i < words.length; i++) {
      const w = typed_words[i];
      const actual = words[i];
      if (!typed_words[i]) {
        removeClasses(`word${i}`, [
          "underline",
          "decoration-error",
          "text-primary",
          "text-error",
        ]);
      }

      if (w && w.length > actual.length) {
        const extras = w.slice(actual.length).split("");

        // remove all the extras before inserting again
        document.getElementById(`extra${i}`)?.remove();

        // create a element and append in the dom
        const e = document.createElement("span");
        e.classList.add("text-error");
        e.innerHTML = extras.join("");
        e.id = `extra${i}`;
        document.getElementById(`word${i}`)?.appendChild(e);
      } else {
        // remove the extras element if there are no extras
        document.getElementById(`extra${i}`)?.remove();
      }
    }
  };

  const disColor = () => {
    for (let i = 0; i < typed.length + 2; i++) {
      const w = words[i];
      removeClasses(`word${i}`, ["underline"]);
      if (w)
        for (let j = 0; j < w.split("").length; j++) {
          removeClasses(`word${i}letter${j}`, ["text-primary", "text-error"]);
        }
      document.getElementById(`extra${i}`)?.remove();
    }
  };

  useEffect(() => {
    let words = randomWords(100, "easy", false);
    setCaretPosition({ top: 0, left: window.innerWidth >= 768 ? 40 : 0 });
    setWords(words);
  }, []);

  useEffect(() => {
    if (finish) {
      // @ts-ignore
      detail_modal.showModal();
    }
  }, [finish]);

  const restart = () => {
    setStart(false);
    setWords(randomWords(100, "easy", false));
    disColor();
    setTyped("");
    setCaretPosition({ top: 0, left: window.innerWidth >= 768 ? 40 : 0 });
    setTimer(30);
    setFinish(false);
  };

  const repeat = () => {
    setStart(false);
    setWords(words);
    disColor();
    setTyped("");
    setCaretPosition({ top: 0, left: window.innerWidth >= 768 ? 40 : 0 });
    setTimer(30);
    setFinish(false);
  };

  return (
    <main>
      <Layout className="mt-24 flex flex-col gap-4">
        <div className="w-full flex flex-col items-center justify-center md:p-10 pt-0">
          <dialog
            id="detail_modal"
            className="rounded-box bg-base-100 w-[85%] h-[90%] z-50 drop-shadow-lg overflow-y-hidden text-right border border-accent/20 border-solid"
          >
            <form
              method="dialog"
              className="p-10 flex flex-col justify-center h-full gap-5 w-full"
            >
              <div className="stats">
                <div className="stat place-items-center">
                  <div className="stat-title">WPM</div>
                  <div className="stat-value text-secondary">95</div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Acc</div>
                  <div className="stat-value text-secondary">96%</div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">RAW</div>
                  <div className="stat-value">101</div>
                </div>
              </div>

              <div className="stats">
                <div className="stat place-items-center">
                  <div className="stat-title">CPM</div>
                  <div className="stat-value">483</div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Consistency</div>
                  <div className="stat-value">71%</div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Time</div>
                  <div className="stat-value">10s</div>
                </div>
              </div>

              <div className="stats">
                <div className="stat place-items-center">
                  <div className="stat-title">Mistakes</div>
                  <div className="stat-value">112/3/0/0</div>
                </div>
              </div>

              <div className="flex pt-20 justify-around items-center w-full">
                <button className="btn btn-primary w-[45%]" onClick={restart}>
                  Restart
                </button>
                <button className="btn btn-primary w-[45%]" onClick={repeat}>
                  Repeat
                </button>
              </div>
            </form>
          </dialog>
          <Timer
            start={start}
            setFinish={setFinish}
            timer={timer}
            setTimer={setTimer}
          />
          <div className="pb-10 !pt-0 md:p-10 overflow-hidden relative">
            <div
              className={`bg-primary w-[2px] absolute z-10 h-[30px] top-0 ${
                !start && "animate-blink"
              } transition-all duration-75`}
              style={{
                left: `${caretPosition.left}px`,
              }}
            ></div>
            <div className="max-h-[150px] min-w-full text-left break-words text-lg md:text-2xl overflow-hidden flex flex-wrap gap-x-3.5 gap-y-1 md:gap-y-2 text-base-content/60">
              {words &&
                words.map((w, index) => (
                  <span
                    key={index}
                    id={`word${index}`}
                    className="flex gap-x-[1.2px] underline-offset-4"
                  >
                    {w.split("").map((l, idx) => (
                      <span key={idx} id={`word${index}letter${idx}`}>
                        {l}
                      </span>
                    ))}
                  </span>
                ))}
            </div>
            <textarea
              className="absolute top-10 left-10 right-10 bottom-10 resize-none opacity-0 select-none"
              value={typed}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <Keyboard
            className="hidden sm:block"
            keyClasses="kbd-sm sm:kbd-md 2xl:kbd-lg"
          />
        </div>
      </Layout>
    </main>
  );
};

export default Type;

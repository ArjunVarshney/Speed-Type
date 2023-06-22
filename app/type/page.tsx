"use client";
import Keyboard from "@/components/Keyboard";
import Layout from "@/components/common/Layout";
import randomWords from "@/scripts/randomWords";
import React, { useEffect, useState } from "react";

const Type = () => {
  const [typed, setTyped] = useState("");
  const [words, setWords] = useState<string[]>([]);

  useEffect(() => {
    let words = randomWords(100, "easy", false);
    setWords(words);
  }, []);

  const addClasses = (id: string, classes: string[]) => {
    document.getElementById(id)?.classList.add(...classes);
  };
  const removeClasses = (id: string, classes: string[]) => {
    document.getElementById(id)?.classList.remove(...classes);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTyped(e.target.value);
    const typed = e.target.value;
    const typed_words = typed.split(" ");

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

    // remove underline if the word is not in typed_words
    for (let i = 0; i < typed_words.length + 2; i++) {
      const w = typed_words[i];
      const actual = words[i];
      if (!typed_words[i]) {
        removeClasses(`word${i}`, ["underline", "decoration-error"]);
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

  return (
    <main>
      <Layout className="mt-24 flex flex-col md:flex-row gap-4">
        <div className="w-full flex flex-col items-center justify-center p-10 pt-0">
          <div className="p-10 overflow-hidden relative">
            <div className="max-h-[150px] min-w-full text-left break-words text-2xl overflow-hidden flex flex-wrap gap-x-3.5 gap-y-2 text-base-content/60">
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
          <Keyboard keyClasses="kbd-sm sm:kbd-md 2xl:kbd-lg" />
        </div>
      </Layout>
    </main>
  );
};

export default Type;

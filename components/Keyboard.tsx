"use client";
import React, { useEffect, useState } from "react";

type KeyboardType = {
  className?: string;
  keyClasses?: string;
  isFocus?: boolean;
  setNPressed?: Function;
};

const Keyboard = ({
  className = "",
  keyClasses = "",
  isFocus = false,
  setNPressed,
}: KeyboardType) => {
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!pressedKeys.includes(event.key)) {
        setPressedKeys((prevKeys: any) => [...prevKeys, event.key]);
      }
      if (isFocus && setNPressed) setNPressed((prev: number) => prev + 1);
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      setPressedKeys((prevKeys: any[]) =>
        prevKeys.filter((key) => key !== event.key)
      );
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    for (let key of pressedKeys) {
      if (key.match(/[a-zA-Z]/) || key == "/" || key == " ") {
        if (key == "/") key = "slash";
        if (key == " ") key = "space";
        document
          .querySelector(`.${key}`)
          ?.classList.add("!bg-secondary", "scale-90");
        document.querySelector(`.${key}`)?.classList.remove("shadow-md");
        setTimeout(() => {
          document
            .querySelector(`.${key}`)
            ?.classList.remove("!bg-secondary", "scale-90");
          document.querySelector(`.${key}`)?.classList.add("shadow-md");
        }, 200);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys]);

  return (
    <>
      <div className={`${className} ` + "rounded-box bg-base-200"}>
        <div className="flex justify-center gap-1 my-1 w-full">
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md q"}>
            q
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md w"}>
            w
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md e"}>
            e
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md r"}>
            r
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md t"}>
            t
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md y"}>
            y
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md u"}>
            u
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md i"}>
            i
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md o"}>
            o
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md p"}>
            p
          </kbd>
        </div>
        <div className="flex justify-center gap-1 my-1 w-full">
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md a"}>
            a
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md s"}>
            s
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md d"}>
            d
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md f"}>
            f
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md g"}>
            g
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md h"}>
            h
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md j"}>
            j
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md k"}>
            k
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md l"}>
            l
          </kbd>
        </div>
        <div className="flex justify-center gap-1 my-1 w-full">
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md z"}>
            z
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md x"}>
            x
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md c"}>
            c
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md v"}>
            v
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md b"}>
            b
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md n"}>
            n
          </kbd>
          <kbd className={`${keyClasses} ` + "kbd transition-all shadow-md m"}>
            m
          </kbd>
          <kbd
            className={`${keyClasses} ` + "kbd transition-all shadow-md slash"}
          >
            /
          </kbd>
        </div>
        <div className="flex justify-center gap-1 my-1 w-full">
          <kbd
            className={
              `${keyClasses} ` +
              "kbd transition-all shadow-md space w-[60%] max-w-[300px]"
            }
          >
            {" "}
          </kbd>
        </div>
      </div>
    </>
  );
};

export default Keyboard;

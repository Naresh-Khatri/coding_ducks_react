import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";

import { dracula } from "@uiw/codemirror-theme-dracula";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { duotoneDark, duotoneLight } from "@uiw/codemirror-theme-duotone";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";

import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";

import "./CodeEditor.css";

export default function CodeEditor({ code, setCode, lang, theme }) {
  const supportedLangs = {
    python: python(),
    js: javascript(),
    cpp: cpp(),
    c: cpp(),
    java: java(),
  };
  const supportedThemes = {
    dracula: dracula,
    atomone: atomone,
    eclipse: eclipse,
    okaidia: okaidia,
    githubDark: githubDark,
    githubLight: githubLight,
    duotoneDark: duotoneDark,
    duotoneLight: duotoneLight,
    xcodeDark: xcodeDark,
    xcodeLight: xcodeLight,
  };
  return (
    <>
      <CodeMirror
        autoFocus
        value={code}
        height="90vh"
        theme={supportedThemes[theme]}
        // extensions={[loadLanguage('cpp')]}
        extensions={[supportedLangs[lang]]}
        onChange={(value) => {
          setCode(value);
        }}
      />
    </>
  );
}

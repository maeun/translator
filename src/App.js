import React, { useState } from 'react';
import { OpenAI } from "openai";
import {
  Input,
  Button,
  Typography
} from "@mui/joy";

const openai = new OpenAI({
  organization: "org-FtF6gV7TTvDQGBIAMsnGmKVY",
  apiKey: "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",
  dangerouslyAllowBrowser: true, // 브라우저 환경에서 실행 허용
});


function TranslationApp() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState(""); // 번역 결과 상태 추가

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = async () => {
    try{
    const completion = await openai.chat.completions.create({
      messages: [
      { role: "system", content: "You are a helpful translator. Please translate it in Korean." },
      { role: "user", content: inputText }, // 입력된 텍스트를 추가
    ],
      
      model: "gpt-3.5-turbo",
    });
    const translatedResult = completion.choices[0].message.content; // 번역 결과 추출
      setTranslatedText(translatedResult); // 번역 결과 상태 업데이트
    } catch (error) {
      console.error("Error fetching chat completion:", error);
    }
  };

  return (
    <div className="Main">
      <div className="InputWrapper">
        <Input
          color="danger"
          variant="soft"
          placeholder="여기에 입력하세요…"
          value={inputText}
          onChange={handleInputChange}
        />

<Button variant="soft" color="primary" onClick={handleButtonClick}>
          번역 시작
        </Button>
      </div>

      {translatedText && (
        <div>
          <Typography variant="h6">번역 결과:</Typography>
          <Typography variant="body1">{translatedText}</Typography>
        </div>
      )}
    </div>
  );
}

export default TranslationApp;

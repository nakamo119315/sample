import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Grid from '@mui/material/Grid2';
let { REACT_APP_GEMINI_API_KEY } = process.env;

function Material() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const theme = createTheme(); // デフォルトテーマ

  // 入力のテキストフィールドの変更イベントハンドラ
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // 入力のテキストフィールドのEnterイベントハンドラ
  const handleInputEnter = async(event) => {
    if (event.key === 'Enter') {
      const genAI = new GoogleGenerativeAI(REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(input);
      setOutput(result.response.text());
    }
  }

  return (
    <ThemeProvider theme={theme}>
        {/* TextField */}
        <Grid container alignItems="center" spacing={2} justify="center">
          <Grid size={3}><div></div></Grid>
          <Grid size={6}><TextField
            id="input"
            label="入力"
            value={input}
            fullWidth
            onChange={handleInputChange}
            onKeyDown={handleInputEnter}
            sx={{ mt:2, align:'center' }}
          /></Grid>
          <Grid size={3}><div></div></Grid>
          <Grid size={3}><div></div></Grid>
          <Grid size={6}>
            <TextField
            id="output"
            label="結果"
            value={output}
            multiline
            fullWidth
            sx={{ mt:2, align:'center' }}
            />
          </Grid>
          <Grid size={3}><div></div></Grid>
        </Grid>
    </ThemeProvider>
  );
}

export default Material;

import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function GroupRegister() {
  const [name, setName] = useState("")
  const [producer, setProducer] = useState("")
  const [category, setCategory] = useState("")
  const theme = createTheme(); // デフォルトテーマ
  const navigation = useNavigate()
  function registGroup(){
    const body = {
      name:name,
      producer:producer,
      category:category
    }
    console.log(body)
    axios.post('/group/register',body).then(response=>{
      navigation('/group')
    });
  }
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div>
          <TextField
            id="name"
            label="名前"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="producer"
            label="プロデューサ"
            defaultValue={producer}
            onChange={(e) => setProducer(e.target.value)}
          />
          <TextField
            id="category"
            label="カテゴリ"
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
            <Stack spacing={2} direction="row">
              <Button variant="outlined" onClick={()=>registGroup()}>
                登録
              </Button>
              <Button variant="outlined" onClick={()=>navigation("/group")} state={{}}>
                戻る
              </Button>
            </Stack>
        </div>
      </ThemeProvider>
    </div>
  )
}

export default GroupRegister
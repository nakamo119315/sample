import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function GroupUpdate() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [producer, setProducer] = useState("")
  const [category, setCategory] = useState("")
  const navigation = useNavigate()
  const location = useLocation();
  const updateId = location?.state?.id;
  const theme = createTheme(); // デフォルトテーマ
  function updateGroup(){
    const body = {
      id:id,
      name:name,
      producer:producer,
      category:category
    }
    axios.post('/group/update',body).then(response=>{
      navigation('/group')
    });
  }
  useEffect(() => {
    const body = {
      id:updateId
    }
    axios.post('/group/api', body).then(response=>{
      let data = response.data.data[0]
      setId(data.id)
      setName(data.name)
      setProducer(data.producer)
      setCategory(data.category)
    });
  },[updateId])
  return (
    <>
          {(id === "") ? (
          <p>Loading...</p>
          ): (
            <>
              <ThemeProvider theme={theme}>
                <div>
                  <TextField
                    id="name"
                    label="名前"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    id="producer"
                    label="プロデューサ"
                    value={producer}
                    onChange={(e) => setProducer(e.target.value)}
                  />
                  <TextField
                    id="category"
                    label="カテゴリ"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div>
                  <Stack spacing={2} direction="row">
                    <Button variant="outlined" onClick={()=>updateGroup()}>
                      更新 
                    </Button>
                    <Button variant="outlined" onClick={()=>navigation("/group")} state={{}}>
                      戻る
                    </Button>
                  </Stack>
                </div>
              </ThemeProvider>
            </>
          )}
    </>
  )
}

export default GroupUpdate
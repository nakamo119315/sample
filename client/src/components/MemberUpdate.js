import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function MemberRegister() {
  const [backendData, setBackendData] = useState({ data: [] });
  const [id, setId] = useState("")
  const [name, setName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  const theme = createTheme(); // デフォルトテーマ
  const location = useLocation();
  const updateId = location?.state?.id;

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    console.log(`Option selected:`, selected);
  };

  function updateMember() {
    if (!name || !selectedOption) {
      setError("名前とグループは必須です");
      return;
    }

    const body = {
      id: id,
      name: name,
      group_id: selectedOption
    };
    
    console.log(body);
    
    axios.post('/member/update', body)
      .then(response => {
        navigation('/member');
      })
      .catch(error => {
        console.error("メンバー更新中にエラーが発生しました:", error);
        setError("メンバー更新中にエラーが発生しました");
      });
  }

  useEffect(() => {
    const body = {
      id:updateId
    }
    axios.post('/member/api', body).then(response=>{
        console.log(response.data)
        let data = response.data.data[0]
        setId(data.id)
        setName(data.name)
        setSelectedOption(data.group_id)
      })
      .then(fetch("/member/group")
        .then(response => response.json())
        .then(data => {
          console.log('Fetched group data:', data);
          setBackendData(data);
      }))
      .catch(error => {
        console.error("メンバーデータの取得中にエラーが発生しました:", error);
        setError("メンバーデータの取得中にエラーが発生しました");
      });
  }, [updateId]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <TextField
            id="name"
            label="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            value={selectedOption}
            onChange={handleChange}
            displayEmpty
            input={<OutlinedInput label="GroupName" />}
            MenuProps={MenuProps}
          >
            {backendData.data && backendData.data.length > 0 ? (
              backendData.data.map(group => (
                <MenuItem key={group.value} value={group.value}>
                  {typeof group.label === 'string' ? group.label : 'グループ名が不正です'}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">
                グループデータがありません
              </MenuItem>
            )}
          </Select>
        </div>
        
        {error && <div style={{ color: 'red' }}>{error}</div>}
        
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={()=>updateMember()}>
            更新
          </Button>
          <Button variant="outlined" onClick={()=>navigation("/member")} state={{}}>
            戻る
          </Button>
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default MemberRegister;
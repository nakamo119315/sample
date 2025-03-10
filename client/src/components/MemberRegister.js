import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
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
  const [name, setName] = useState("");
  const [group_id, setGroupId] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigate();
  const theme = createTheme();

  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    setGroupId(selected);
    console.log(`Option selected:`, selected);
  };

  function registMember() {
    if (!name || !group_id) {
      setError("名前とグループは必須です");
      return;
    }

    const body = {
      name: name,
      group_id: group_id
    };
    
    console.log(body);
    
    axios.post('/member/register', body)
      .then(response => {
        navigation('/member');
      })
      .catch(error => {
        console.error("メンバー登録中にエラーが発生しました:", error);
        setError("メンバー登録中にエラーが発生しました");
      });
  }

  useEffect(() => {
    console.log("useEffect is triggered");
    fetch("/member/group")
      .then(response => response.json())
      .then(data => {
        console.log('Fetched group data:', data);
        setBackendData(data);
      })
      .catch(error => {
        console.error("グループデータの取得中にエラーが発生しました:", error);
        setError("グループデータの取得中にエラーが発生しました");
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          <TextField 
            sx={{ mt: 2 }}
            id="name"
            label="名前"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            sx={{ mt: 2 }}
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
        
        <div>
          <Stack spacing={2} direction="row">
            <Button variant="outlined" onClick={()=>registMember()}>
              登録
            </Button>
            <Button variant="outlined" onClick={()=>navigation("/member")} state={{}}>
              戻る
            </Button>
          </Stack>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default MemberRegister;
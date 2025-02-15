import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function GroupHome() {
  const [backendData, setBackendData] = useState([{}])
  const theme = createTheme(); // デフォルトテーマ
  const navigation = useNavigate();
  function deleteClick(deleteId){
    const body = {
      id:deleteId
    }
    axios.post('/group/delete',body).then(response=>{
      window.location.reload();
    });
  }
  useEffect(() => {
    fetch("/group/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  return (
    <ThemeProvider theme={theme}>
          {(typeof backendData.data === 'undefined') ? (
          <p>Loading...</p>
          ): (
            <>
             <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell align="right">名前</TableCell>
                    <TableCell align="right">プロデューサ</TableCell>
                    <TableCell align="right">カテゴリ</TableCell>
                    <TableCell align="right">更新</TableCell>
                    <TableCell align="right">削除</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {backendData.data.map((group, i) => (
                      <TableRow
                        key={i}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {group.id}
                        </TableCell>
                        <TableCell align="right">{group.name}</TableCell>
                        <TableCell align="right">{group.producer}</TableCell>
                        <TableCell align="right">{group.category}</TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" onClick={() => navigation("/group/update", {state:{id:group.id}})}>
                            Update 
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button variant="outlined" onClick={() => deleteClick(group.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </>
          )}
      <div>
        <Stack spacing={2} direction="row">
          <Button variant="outlined" onClick={() => { navigation("/group/register") }} state={{}}>
            Register
          </Button>
          <Button variant="outlined" onClick={() => { navigation("/") }} state={{}}>
            Home
          </Button>
        </Stack>
      </div>
    </ThemeProvider>
  )
}

export default GroupHome
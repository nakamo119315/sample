import TextField from "@mui/material/TextField";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';

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

// 検索バーのコンポーネント
const SearchName = (props) => {
  const { searched, initialRows, setRows, setSearched, selectedOption, setSelectedOption, groups } = props;
  const handleChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    requestSearch(searched, groups.filter((row) => {return row.value === selected})[0]?.label ?? "");
  };

  // 検索文字によってテーブルの行をフィルター関数
  const requestSearch = (searchedVal,searchedGroup) => {
    const filteredRows = initialRows.filter((row) => {
      return row.name.includes(searchedVal) && row.group_name.includes(searchedGroup);
    });
    setRows(filteredRows);
  };

  // 検索バーの文字が変化したときにフィルターを実行する関数
  const changeSearchedHandler = (event) => {
    setSearched(event.target.value);
    requestSearch(event.target.value, groups.filter((row) => {return row.value === selectedOption})[0]?.label ?? "");
  };

  return (
    <div>
      <TextField
        sx={{ mt: 2 }}
        id="standard-basic"
        label="SearchName"
        variant="standard"
        value={searched}
        onChange={(event) => changeSearchedHandler(event)}
        MenuProps={MenuProps}
      />
      <Select
        sx={{ mt: 2 }}
        value={selectedOption}
        onChange={handleChange}
        displayEmpty
        input={<OutlinedInput label="SearchGroupName" />}
        MenuProps={MenuProps}
      >
        <MenuItem value="">ALL</MenuItem>
        {groups && groups.length > 0 ? (
          groups.map(group => (
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
  );
};

export default SearchName;
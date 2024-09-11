import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import { ChangeEvent } from "react";
import { User } from "./types";
import { Box, Typography, List, ListItem, ListItemDecorator, Avatar, ListItemContent } from "@mui/joy";

interface SidebarProps {
  search?: string;
  setSearch: (data: string) => void;
  users: User[];
  selectUser: (userLogin: string) => void;
}

export default function Sidebar({ search, setSearch, users, selectUser }: SidebarProps) {
  const handleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: "sticky",
        transition: "transform 0.4s, width 0.4s",
        height: "100dvh",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Input onChange={handleChangeSearch} value={search} />
      <Box sx={{ width: 320 }}>
        <Typography
          id="ellipsis-list-demo"
          level="body-xs"
          sx={{ textTransform: "uppercase", letterSpacing: "0.15rem" }}
        >
          Users
        </Typography>
        <List aria-labelledby="ellipsis-list-demo" sx={{ "--ListItemDecorator-size": "56px" }}>
          {users.length > 0 &&
            users.map((user, index) => (
              <ListItem key={index} onClick={() => selectUser(user.login)}>
                <ListItemDecorator>
                  <Avatar src={user.avatar_url} />
                </ListItemDecorator>
                <ListItemContent>
                  <Typography level="title-sm">{user.login}</Typography>
                </ListItemContent>
              </ListItem>
            ))}
        </List>
      </Box>
    </Sheet>
  );
}

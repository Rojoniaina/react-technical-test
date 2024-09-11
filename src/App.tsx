import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import MessagesPane from "./MessagesPane";
import Sidebar from "./Sidebar";
import useFetch from "./useFetch";
import { Issue, Comment, User } from "./types";
import { GITHUB_REPO_URL } from "./constant";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState<string>();
  const [users, setUsers] = useState<User[]>([]);

  const { data: issue, isFetched } = useFetch<Issue>(
    { url: search ? `${GITHUB_REPO_URL}${search}` : "" },
    { retry: false },
  );

  const { data: comments } = useFetch<Comment[]>(
    { url: issue?.comments_url },
    { enabled: isFetched && issue?.comments_url != undefined },
  );

  useEffect(() => {
    if (comments?.length) {
      const reduceUser = comments.reduce((previewsUsers: User[], currentComment: Comment) => {
        if (!currentComment.user) {
          return previewsUsers;
        }
        if (previewsUsers.map((user) => user.login).includes(currentComment.user.login)) {
          return previewsUsers;
        }

        return [...previewsUsers, currentComment.user];
      }, []);
      setUsers(reduceUser);
    } else {
      setUsers([]);
    }
  }, [comments]);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="aside" sx={{ width: 300 }}>
          <Sidebar search={search} setSearch={setSearch} users={users} />
        </Box>
        <Box component="main" sx={{ flex: 1 }}>
          <MessagesPane issue={issue} comments={comments} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;

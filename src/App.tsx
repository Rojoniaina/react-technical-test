import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import MessagesPane from "./MessagesPane";
import Sidebar from "./Sidebar";
import useFetch from "./useFetch";
import { Issue, Comment, UserCount } from "./types";
import { GITHUB_REPO_URL } from "./constant";
import { useEffect, useState } from "react";

function App() {
  const [search, setSearch] = useState<string>();
  const [users, setUsers] = useState<UserCount[]>([]);
  const [usersFilter, setUsersFilter] = useState<string[]>([]);

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
      const reduceUser = comments.reduce((previewsUsers: UserCount[], currentComment: Comment) => {
        if (!currentComment.user) {
          return previewsUsers;
        }
        if (previewsUsers.map((prev) => prev.user.login).includes(currentComment.user.login)) {
          return previewsUsers;
        }
        const nbComments = comments.filter((c) => c.user.login === currentComment.user.login).length;
        return [...previewsUsers, { user: currentComment.user, nbComments }];
      }, []);
      setUsers(reduceUser);
    } else {
      setUsers([]);
    }
  }, [comments]);

  const selectUser = (userLogin: string) => {
    if (usersFilter.includes(userLogin)) {
      setUsersFilter((prev) => [...prev.filter((user) => user !== userLogin)]);
    } else {
      setUsersFilter((prev) => [...prev, userLogin]);
    }
  };

  const commentsList = comments ? comments?.filter((comment) => !usersFilter.includes(comment.user.login)) : undefined;

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="aside" sx={{ width: 300 }}>
          <Sidebar search={search} setSearch={setSearch} users={users} selectUser={selectUser} />
        </Box>
        <Box component="main" sx={{ flex: 1 }}>
          <MessagesPane issue={issue} comments={commentsList} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;

import Box from "@mui/joy/Box";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import MessagesPane from "./MessagesPane";
import Sidebar from "./Sidebar";
import useFetch from "./useFetch";
import { Issue } from "./types";
import { GITHUB_REPO_URL } from "./constant";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState<string>("");

  const { data, isFetched } = useFetch<Issue>({ url: search ? `${GITHUB_REPO_URL}${search}` : "" }, { retry: false });

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100dvh" }}>
        <Box component="aside" sx={{ width: 300 }}>
          <Sidebar search={search} setSearch={setSearch} />
        </Box>
        <Box component="main" sx={{ flex: 1 }}>
          <MessagesPane issue={data} isFetched={isFetched && data?.comments_url != undefined} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;

import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import ChatBubble from "./ChatBubble";
import useFetch from "./useFetch";
import { Issue, User } from "./types";

type Comment = {
  id: number;
  created_at: string;
  user: User;
  body: string;
};

interface MessagesPaneProps {
  issue?: Issue;
  isFetched: boolean;
}

export default function MessagesPane({ issue, isFetched }: MessagesPaneProps) {
  const { data: comments } = useFetch<Comment[]>({ url: issue?.comments_url }, { enabled: isFetched });

  return (
    <Sheet
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.level1",
      }}
    >
      {issue && issue?.user && (
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{
            borderBottom: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.body",
          }}
          py={{ xs: 2, md: 2 }}
          px={{ xs: 1, md: 2 }}
        >
          <Typography
            fontWeight="lg"
            fontSize="lg"
            component="h2"
            noWrap
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                color="neutral"
                sx={{
                  borderRadius: "sm",
                }}
              >
                #{issue?.number}
              </Chip>
            }
          >
            {issue.title}
          </Typography>
          <Typography level="body-sm">{issue.user.login}</Typography>
        </Stack>
      )}
      {comments && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          <ChatBubble variant="solid" {...issue!} />
          {comments?.length &&
            comments?.map((comment) => (
              <ChatBubble
                key={comment.id}
                variant={comment.user.login === issue!.user.login ? "solid" : "outlined"}
                {...comment}
              />
            ))}
        </Stack>
      )}

      {!issue && !comments && (
        <Stack spacing={2} justifyContent="flex-end" px={2} py={3}>
          Issue not found.
        </Stack>
      )}
    </Sheet>
  );
}

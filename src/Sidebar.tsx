import Input from "@mui/joy/Input";
import Sheet from "@mui/joy/Sheet";
import { ChangeEvent } from "react";

interface SidebarProps {
  search: string;
  setSearch: (data: any) => void;
}

export default function Sidebar({ search, setSearch }: SidebarProps) {
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
    </Sheet>
  );
}

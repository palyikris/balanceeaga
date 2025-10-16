import { TypingAnimation } from "../magicui/typing-animation";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TransactionHeaderProps {
  search: string;
  setSearch: (value: string) => void;
  setCategory: (value: string) => void;
  categories: { id: string; name: string }[];
}

export default function TransactionHeader(props: TransactionHeaderProps) {
  const { search, setSearch, setCategory, categories } = props;

  return (
    <div className="flex justify-between items-center mt-4">
      <h2 className="font-bold text-limeneon">
        <TypingAnimation style={{ fontSize: "1.5rem" }}>
          Your transactions.
        </TypingAnimation>
      </h2>
      <div className="flex gap-3 items-center">
        <Input
          placeholder="Search description or counterparty"
          className="w-80 bg-graphite-900 border border-offwhite/10 text-offwhite/80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select onValueChange={setCategory}>
          <SelectTrigger className="w-[180px] bg-graphite-900 border border-offwhite/10 text-offwhite/80">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent className="bg-graphite border border-offwhite/10 text-offwhite/80 max-h-60 overflow-y-auto">
            {categories.length === 0 && (
              <SelectItem value="all">No categories</SelectItem>
            )}
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}